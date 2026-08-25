import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { certificates } from '../data/certificates'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseHours(effort) {
  if (!effort) return 0
  const m = effort.match(/\+?([\d.]+)\s*h/)
  if (!m) return 0
  return parseInt(m[1].replace(/\./g, ''), 10)
}

function buildMonthRange(start, end) {
  const out = []
  let [y, m] = start.split('-').map(Number)
  const [ey, em] = end.split('-').map(Number)
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    if (++m > 12) { m = 1; y++ }
  }
  return out
}

function cellColor(count) {
  if (count === 0) return 'rgba(255,255,255,0.06)'
  if (count === 1) return 'rgba(78,201,176,0.35)'
  if (count === 2) return 'rgba(78,201,176,0.65)'
  return '#4ec9b0'
}

function cellGlow(count) {
  if (count < 2) return 'none'
  if (count === 2) return '0 0 6px rgba(78,201,176,0.4)'
  return '0 0 10px rgba(78,201,176,0.7)'
}

// ─── Count-up con easeOutCubic ────────────────────────────────────────────────
function useCountUp(target, duration, trigger) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = null
    let raf
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, trigger])
  return val
}

// ─── Badge de delta ───────────────────────────────────────────────────────────
function Delta({ n, suffix = '', label }) {
  if (!n) return null
  return (
    <p className="font-mono text-[9px] text-[#4ec9b0]/70 mt-1 flex items-center gap-0.5">
      <span className="text-[#4ec9b0]">↑</span>
      +{n}{suffix} {label}
    </p>
  )
}

// ─── Heatmap ──────────────────────────────────────────────────────────────────
const MONTH_ABBR = ['en','fe','ma','ab','my','jn','jl','ag','se','oc','no','di']
const MONTH_ABBR_EN = ['ja','fe','ma','ap','my','jn','jl','au','se','oc','no','de']

function Heatmap({ heatData, lang }) {
  const [tip, setTip] = useState(null)

  // Agrupar por año
  const byYear = useMemo(() => {
    const map = {}
    heatData.forEach(d => {
      const y = d.month.slice(0, 4)
      if (!map[y]) map[y] = []
      map[y].push(d)
    })
    return Object.entries(map).sort()
  }, [heatData])

  const abbr = lang === 'en' ? MONTH_ABBR_EN : MONTH_ABBR

  return (
    <div className="mt-5 pt-4 border-t border-white/[0.06]">
      {/* Filas por año */}
      <div className="flex items-start gap-5">
        {byYear.map(([year, data]) => (
          <div key={year}>
            {/* Celdas */}
            <div className="flex items-end gap-[3px] mb-1">
              {data.map(({ month, count, hours }) => {
                const mo = Number(month.slice(5))
                const showLabel = [1, 4, 7, 10].includes(mo)
                return (
                  <div key={month} className="flex flex-col items-center gap-[3px]">
                    <div
                      className="w-[11px] h-[11px] rounded-[2px] cursor-default transition-transform duration-100 hover:scale-[1.4]"
                      style={{
                        background: cellColor(count),
                        boxShadow: cellGlow(count),
                      }}
                      onMouseEnter={() => setTip({ month, count, hours })}
                      onMouseLeave={() => setTip(null)}
                    />
                    <span className="font-mono text-[6px] text-white/20 leading-none select-none w-[11px] text-center">
                      {showLabel ? abbr[mo - 1] : ''}
                    </span>
                  </div>
                )
              })}
            </div>
            {/* Año */}
            <p className="font-mono text-[8px] text-white/25 mt-0.5">{year}</p>
          </div>
        ))}
      </div>

      {/* Info activa + leyenda */}
      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-[9px] text-[#4ec9b0]/70 min-h-[14px] transition-opacity duration-150">
          {tip
            ? `${tip.month} · ${tip.count} cert${tip.count !== 1 ? 's' : ''} · +${tip.hours}h`
            : <span className="text-white/20">{lang === 'en' ? 'hover a cell' : 'pasa sobre una celda'}</span>
          }
        </p>
        {/* Leyenda */}
        <div className="flex items-center gap-1">
          <span className="font-mono text-[7px] text-white/20">{lang === 'en' ? 'less' : 'menos'}</span>
          {[0, 1, 2, 3].map(n => (
            <div
              key={n}
              className="w-[9px] h-[9px] rounded-[2px]"
              style={{ background: cellColor(n), boxShadow: cellGlow(n) }}
            />
          ))}
          <span className="font-mono text-[7px] text-white/20">{lang === 'en' ? 'more' : 'más'}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function StatsBanner() {
  const navigate    = useNavigate()
  const { t, lang } = useLang()
  const containerRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); setStarted(true); obs.disconnect() }
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Totales ──────────────────────────────────────────────────────────────
  const totalHours = certificates.reduce((acc, c) => acc + parseHours(c.effort), 0)
  const totalCerts = certificates.length

  // ── Deltas ───────────────────────────────────────────────────────────────
  const now  = new Date()
  const ym   = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const yr   = String(now.getFullYear())

  const byMonth = certificates.filter(c => c.addedAt === ym)
  const byYear  = certificates.filter(c => c.addedAt?.startsWith(yr))

  const certsMonth = byMonth.length
  const certsYear  = byYear.length
  const hoursMonth = byMonth.reduce((s, c) => s + parseHours(c.effort), 0)
  const hoursYear  = byYear.reduce((s, c) => s + parseHours(c.effort), 0)

  const labelMonth = lang === 'en' ? 'this month' : 'este mes'
  const labelYear  = lang === 'en' ? 'this year'  : 'este año'

  // ── Count-up ─────────────────────────────────────────────────────────────
  const dispHours = useCountUp(totalHours, 1800, started)
  const dispCerts = useCountUp(totalCerts,  1200, started)
  const dispYears = useCountUp(4,            900, started)
  const fmtHours  = `+${dispHours.toLocaleString('es-CL')}h`

  // ── Heatmap data ──────────────────────────────────────────────────────────
  const heatData = useMemo(() => {
    const months = buildMonthRange('2024-06', ym)
    return months.map(month => ({
      month,
      count: certificates.filter(c => c.addedAt === month).length,
      hours: certificates.filter(c => c.addedAt === month).reduce((s, c) => s + parseHours(c.effort), 0),
    }))
  }, [ym])

  return (
    <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-12 lg:pb-16">
      <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
        <span className="text-white/20 select-none">~/</span>{t.hero.statCerts}
      </p>

      <button
        ref={containerRef}
        onClick={() => navigate('/certificates')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="reveal group w-full text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#4ec9b0]/25 rounded-xl px-6 py-5 lg:px-8 lg:py-6 transition-all duration-300"
      >
        {/* Estadísticas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="grid grid-cols-3 gap-x-4 sm:flex sm:items-start sm:gap-8 lg:gap-12">

            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">{fmtHours}</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statHours}</p>
              {hoursMonth > 0 ? <Delta n={hoursMonth} suffix="h" label={labelMonth} /> : <Delta n={hoursYear} suffix="h" label={labelYear} />}
            </div>

            <div className="hidden sm:block w-px bg-white/[0.07] self-stretch" />

            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">{dispCerts}</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statCerts}</p>
              {certsMonth > 0 ? <Delta n={certsMonth} label={labelMonth} /> : <Delta n={certsYear} label={labelYear} />}
            </div>

            <div className="hidden sm:block w-px bg-white/[0.07] self-stretch" />

            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">{dispYears} {lang === 'en' ? 'years' : 'años'}</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statYears}</p>
            </div>

          </div>

          <div className="flex items-center gap-2 font-mono text-[12px] lg:text-[13px] text-[#4ec9b0]/60 group-hover:text-[#4ec9b0] transition-colors shrink-0">
            {t.hero.statCta}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>

        {/* Heatmap — solo desktop, slide open en hover */}
        <div
          className="hidden sm:block overflow-hidden"
          style={{
            maxHeight: hovered ? '130px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.2s ease',
          }}
        >
          <Heatmap heatData={heatData} lang={lang} />
        </div>

      </button>
    </div>
  )
}
