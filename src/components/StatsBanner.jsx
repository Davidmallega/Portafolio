import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { certificates } from '../data/certificates'

// ─── Extrae horas numéricas de un string de effort ──────────────────────────
function parseHours(effort) {
  if (!effort) return 0
  const m = effort.match(/\+?([\d.]+)\s*h/)
  if (!m) return 0
  return parseInt(m[1].replace(/\./g, ''), 10)
}

// ─── Cuenta desde 0 hasta target con easeOutCubic ───────────────────────────
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

// ─── Badge de delta ──────────────────────────────────────────────────────────
function Delta({ n, suffix = '', label }) {
  if (!n) return null
  return (
    <p className="font-mono text-[9px] text-[#4ec9b0]/70 mt-1 flex items-center gap-0.5">
      <span className="text-[#4ec9b0]">↑</span>
      +{n}{suffix} {label}
    </p>
  )
}

export default function StatsBanner() {
  const navigate  = useNavigate()
  const { t, lang } = useLang()
  const containerRef = useRef(null)
  const [started, setStarted]   = useState(false)

  // Intersection observer: dispara reveal + count-up al entrar en pantalla
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        setStarted(true)
        obs.disconnect()
      }
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Totales ──────────────────────────────────────────────────────────────
  const totalHours = certificates.reduce((acc, c) => acc + parseHours(c.effort), 0)
  const totalCerts = certificates.length

  // ── Deltas por mes / año ─────────────────────────────────────────────────
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

  const fmtHours = `+${dispHours.toLocaleString('es-CL')}h`

  return (
    <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-12 lg:pb-16">
      <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
        <span className="text-white/20 select-none">~/</span>{t.hero.statCerts}
      </p>

      <button
        ref={containerRef}
        onClick={() => navigate('/certificates')}
        className="reveal group w-full text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#4ec9b0]/25 rounded-xl px-6 py-5 lg:px-8 lg:py-6 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-x-4 sm:flex sm:items-start sm:gap-8 lg:gap-12">

            {/* Horas */}
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">
                {fmtHours}
              </p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statHours}</p>
              {hoursMonth > 0
                ? <Delta n={hoursMonth} suffix="h" label={labelMonth} />
                : <Delta n={hoursYear}  suffix="h" label={labelYear}  />
              }
            </div>

            <div className="hidden sm:block w-px bg-white/[0.07] self-stretch" />

            {/* Certificados */}
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">
                {dispCerts}
              </p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statCerts}</p>
              {certsMonth > 0
                ? <Delta n={certsMonth} label={labelMonth} />
                : <Delta n={certsYear}  label={labelYear}  />
              }
            </div>

            <div className="hidden sm:block w-px bg-white/[0.07] self-stretch" />

            {/* Años */}
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">
                {dispYears} {lang === 'en' ? 'years' : 'años'}
              </p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statYears}</p>
            </div>

          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 font-mono text-[12px] lg:text-[13px] text-[#4ec9b0]/60 group-hover:text-[#4ec9b0] transition-colors shrink-0">
            {t.hero.statCta}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>

        </div>
      </button>
    </div>
  )
}
