import { useState, useRef, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { certificates } from '../data/certificates'
import { credlyBadges } from '../data/badges'
import CertificateModal from './CertificateModal'

function CertCard({ cert, onClick }) {
  const [phase, setPhase]         = useState('idle')
  const [arrowOn, setArrowOn]     = useState(true)
  const [typed, setTyped]         = useState('')
  const [filledBars, setFilledBars] = useState(0)
  const tos       = useRef([])
  const typingRef = useRef(null)
  const barRef    = useRef(null)

  useEffect(() => () => {
    tos.current.forEach(clearTimeout)
    clearInterval(typingRef.current)
    clearInterval(barRef.current)
  }, [])

  useEffect(() => {
    if (phase !== 'pushing') { setArrowOn(true); return }
    const id = setInterval(() => setArrowOn(v => !v), 500)
    return () => clearInterval(id)
  }, [phase])

  const handleEnter = () => {
    if (phase === 'done') return
    tos.current.forEach(clearTimeout)
    clearInterval(typingRef.current)
    clearInterval(barRef.current)
    tos.current = []
    setPhase('pushing')
    setTyped('')
    setFilledBars(0)

    let i = 0
    const text = cert.description
    typingRef.current = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(typingRef.current)
    }, 22)

    const barDelay = Math.floor(1800 / cert.bars)
    let barCount = 0
    barRef.current = setInterval(() => {
      barCount++
      setFilledBars(barCount)
      if (barCount >= cert.bars) clearInterval(barRef.current)
    }, barDelay)

    tos.current = [
      setTimeout(() => setPhase('request'), 1000),
      setTimeout(() => setPhase('done'),    1800),
    ]
  }

  const handleLeave = () => {
    if (phase === 'done') return
    tos.current.forEach(clearTimeout)
    clearInterval(typingRef.current)
    clearInterval(barRef.current)
    tos.current = []
    setPhase('idle')
    setTyped('')
    setFilledBars(0)
  }

  return (
    <div
      className={`ccard p-5 ${phase === 'done' ? 'ccard-done' : ''}`}
      onClick={() => phase === 'idle' ? handleEnter() : null}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-sans text-[14px] lg:text-[16px] font-medium text-white leading-snug pr-2">
          {cert.title}
        </h3>

        <div className="ml-2 shrink-0 flex items-center justify-end min-w-[90px]">
          {phase === 'idle' && (
            <span className="font-mono text-[10px] px-2 py-[2px] rounded bg-[#e8d88a]/10 border border-[#e8d88a]/20 text-[#e8d88a] whitespace-nowrap">
              ~ modified
            </span>
          )}
          {phase === 'pushing' && (
            <span className="font-mono text-[10px] text-[#4ec9b0] whitespace-nowrap flex items-center gap-1">
              <span style={{ opacity: arrowOn ? 1 : 0, transition: 'opacity 0.15s' }}>↑</span>
              <span>pushing</span>
            </span>
          )}
          {phase === 'request' && (
            <span className="font-mono text-[10px] text-[#4ec9b0] whitespace-nowrap flex items-center gap-1">
              <span className="inline-block animate-spin" style={{ animationDuration: '0.9s' }}>⟳</span>
              <span>p.request</span>
            </span>
          )}
          {phase === 'done' && (
            <span className="compile-check font-mono text-[14px] text-[#4ec9b0]">✓</span>
          )}
        </div>
      </div>

      <p className={`font-mono text-[11px] lg:text-[12px] text-white/30 leading-relaxed ${phase !== 'idle' ? 'mb-3' : ''}`}>
        {cert.institution} · {cert.category} · {cert.year}
      </p>

      {phase !== 'idle' && (
        <div
          className="flex items-center gap-3 flex-wrap mb-3"
          style={{ opacity: filledBars > 0 ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
          <span className="font-mono text-[11px] text-[#e8d88a]/60">{cert.effort}</span>
          <span className="font-mono text-[13px] tracking-[3px] leading-none">
            <span className="text-[#e8d88a]/35">{'█'.repeat(filledBars)}</span>
            <span className="text-white/10">{'░'.repeat(Math.max(0, 8 - filledBars))}</span>
          </span>
          {filledBars >= cert.bars && cert.badge && (
            <span className="compile-done font-mono text-[10px] px-2 py-[1px] rounded bg-[#e8d88a]/10 border border-[#e8d88a]/20 text-[#e8d88a]">
              {cert.badge}
            </span>
          )}
        </div>
      )}

      {typed && (
        <p className="font-sans text-[12px] lg:text-[13px] text-[#4ec9b0]/80 leading-relaxed">
          {typed}
          {typed.length < cert.description.length && (
            <span className="inline-block w-[2px] h-[12px] bg-[#4ec9b0] ml-[1px] align-middle animate-pulse" />
          )}
        </p>
      )}

      {phase === 'done' && (
        <button
          onClick={e => { e.stopPropagation(); onClick(cert) }}
          className="compile-done mt-3 font-mono text-[11px] text-[#4ec9b0]/60 hover:text-[#4ec9b0] transition-colors flex items-center gap-1"
        >
          → ver certificado
        </button>
      )}
    </div>
  )
}

function BadgeCard({ badge }) {
  return (
    <div className="badge-card group flex flex-col items-center p-5 text-center">
      <img
        src={badge.img}
        alt={badge.name}
        className="w-24 h-24 lg:w-28 lg:h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
      />
      <p className="font-sans text-[13px] lg:text-[14px] font-medium text-white leading-snug mb-1">
        {badge.name}
      </p>
      <p className="font-mono text-[10px] lg:text-[11px] text-white/30 mb-3">
        {badge.issuer} · {badge.date}
      </p>
      <a
        href={badge.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] px-2 py-[2px] rounded bg-[#4ec9b0]/10 border border-[#4ec9b0]/20 text-[#4ec9b0] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✓ verificar credencial
      </a>
    </div>
  )
}

export default function Certificates() {
  const r1 = useReveal()
  const r2 = useReveal()
  const r3 = useReveal()
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="certificates"
      className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 pt-16 lg:pt-24 pb-32 lg:pb-40"
    >
      <div ref={r1} className="reveal mb-10 lg:mb-14">
        <h1 className="font-sans text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-none mb-4">
          Certificados
        </h1>
        <p className="font-mono text-[12px] lg:text-[14px] text-white/35">
          <span className="text-[#4ec9b0]">{certificates.length}</span>
          <span className="text-white/20"> commits · </span>
          <span className="text-white/50">cada uno, una versión nueva.</span>
        </p>
      </div>

      <div ref={r2} className="reveal">
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>certificados <span className="text-white/30 normal-case">— {certificates.length} commits</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {certificates.map(c => (
            <CertCard key={c.id} cert={c} onClick={setSelected} />
          ))}
        </div>
      </div>

      <div ref={r3} className="reveal mt-16 lg:mt-20">
        <div className="h-px bg-white/[0.07] mb-10" />
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-2 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>insignias verificadas
        </p>
        <p className="font-mono text-[10px] text-white/20 mb-8">
          {'// verified credentials · credly.com'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          {credlyBadges.map(b => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </div>

      {selected && (
        <CertificateModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
