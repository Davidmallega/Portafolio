import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import { projects } from '../data/projects'

function PreviewModal({ project, lang, onClose }) {
  const images = project.previews ?? (project.preview ? [project.preview] : [])
  const mobileImages = project.previewMobile ? [project.previewMobile] : images
  const [idx, setIdx] = useState(0)
  const total = images.length
  const touchX    = useRef(null)
  const swipeRef  = useRef(null)

  // Bloquea scroll mientras el modal está abierto (position:fixed evita el scroll-jump que dispara mouseenter)
  useEffect(() => {
    const y = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${y}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, y)
    }
  }, [])

  // Previene scroll de página al hacer swipe en la imagen (requiere passive:false)
  useEffect(() => {
    const el = swipeRef.current
    if (!el) return
    const prevent = (e) => e.preventDefault()
    el.addEventListener('touchmove', prevent, { passive: false })
    return () => el.removeEventListener('touchmove', prevent)
  }, [])

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + total) % total) }
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % total) }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) dx < 0 ? setIdx(i => (i + 1) % total) : setIdx(i => (i - 1 + total) % total)
    touchX.current = null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/10 backdrop-blur-md flex items-center justify-center lg:p-6"
      onClick={onClose}
    >
      {/* Mobile */}
      <div className="md:hidden flex flex-col w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-3 pb-2">
          <span className="font-mono text-[11px] text-[#4ec9b0]/70">{project.title} — preview</span>
          {total > 1 && <span className="font-mono text-[10px] text-white/30">{idx + 1} / {total}</span>}
        </div>
        <div ref={swipeRef} className="relative w-full" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <img src={mobileImages[idx]} alt={`Preview ${project.title}`} className="w-full rounded-lg" />
          </div>
          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-white font-mono text-[14px]">‹</button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-white font-mono text-[14px]">›</button>
            </>
          )}
        </div>
        {total > 1 && (
          <div className="flex justify-center gap-1.5 pt-2">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-[#bc8cff]' : 'bg-white/20'}`} />
            ))}
          </div>
        )}
        {(project.previewDesc || project.previewDescEn) && (
          <p className="font-sans text-[11px] text-white/35 leading-relaxed px-3 pt-2">
            {lang === 'en' && project.previewDescEn ? project.previewDescEn : project.previewDesc}
          </p>
        )}
        <button onClick={onClose} className="font-mono text-[15px] text-[#bc8cff] hover:text-[#bc8cff]/70 transition-colors px-3 pt-2 pb-1 text-right">
          × cerrar
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col relative w-full max-w-[820px] max-h-[88vh]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="font-mono text-[11px] text-[#4ec9b0]/70">
            {project.title} — preview {total > 1 && <span className="text-white/30">{idx + 1} / {total}</span>}
          </span>
          <button onClick={onClose} className="font-mono text-[13px] text-[#bc8cff] hover:text-[#bc8cff]/70 transition-colors">
            × cerrar
          </button>
        </div>
        <div className="overflow-y-auto">
        <div className="relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <img src={images[idx]} alt={`Preview ${project.title}`} className="w-full rounded-xl" />
          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-white font-mono text-[20px]">‹</button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-white font-mono text-[20px]">›</button>
            </>
          )}
        </div>
        {total > 1 && (
          <div className="flex justify-center gap-2 pt-3">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-[#bc8cff]' : 'bg-white/20'}`} />
            ))}
          </div>
        )}
        {(project.previewDesc || project.previewDescEn) && (
          <p className="font-sans text-[12px] text-white/35 leading-relaxed mt-4 border-t border-white/[0.06] pt-3">
            {lang === 'en' && project.previewDescEn ? project.previewDescEn : project.previewDesc}
          </p>
        )}
        </div>{/* overflow-y-auto */}
      </div>{/* desktop wrapper */}
    </div>,
    document.body
  )
}

function ProjectCard({ project, onCompile, lang }) {
  const navigate = useNavigate()
  const [phase, setPhase]       = useState('idle')
  const [typed, setTyped]       = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef  = useRef(null)

  // Reset typed text when language changes while card is in done state
  useEffect(() => {
    if (phase === 'done') {
      const text = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description
      setTyped(text)
    }
  }, [lang])

  const handleEnter = () => {
    if (phase !== 'idle') return
    setPhase('compiling')
    setTyped('')

    let i = 0
    const text = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description
    intervalRef.current = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current)
        timeoutRef.current = setTimeout(() => {
          setPhase('done')
          onCompile(project.id)
        }, 350)
      }
    }, 28)
  }

  const handleLeave = () => {
    if (phase === 'done') return
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    setPhase('idle')
    setTyped('')
  }

  return (
    <div
      className="pcard p-5"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-sans text-[14px] lg:text-[16px] font-medium text-white">{project.title}</h3>
        <div className="ml-2 shrink-0 flex items-center justify-end">
          {phase === 'idle' && (
            <span className="font-mono text-[12px] px-2 py-[2px] rounded bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b]">⚠</span>
          )}
          {phase === 'compiling' && (
            <span className="compile-spinner-active" />
          )}
          {phase === 'done' && (
            <span className="compile-check font-mono text-[14px] text-[#4ec9b0]">✓</span>
          )}
        </div>
      </div>

      {/* Stack */}
      <p className="font-mono text-[11px] text-white/30 mb-3 leading-relaxed">
        {project.stack}
      </p>


      {/* texto: persiste durante compiling y done sin re-render */}
      {(phase === 'compiling' || phase === 'done') && (
        <p className="font-sans text-[12px] text-white/40 leading-relaxed mb-3">
          {typed}
          {phase === 'compiling' && (
            <span className="inline-block w-[2px] h-[13px] bg-[#4ec9b0] ml-[1px] align-middle animate-pulse" />
          )}
        </p>
      )}

      {/* link + preview: aparece solo en done con fade-in */}
      {phase === 'done' && (
        <div className="compile-done flex flex-col gap-1.5">
          {project.internal ? (
            <button
              onClick={e => { e.stopPropagation(); navigate(project.internalLink) }}
              className="font-mono text-[11px] text-[#4ec9b0] hover:opacity-70 transition-opacity text-left"
            >
              → {project.linkLabel}
            </button>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#4ec9b0] hover:opacity-70 transition-opacity"
              onClick={e => e.stopPropagation()}
            >
              → {project.linkLabel}
            </a>
          )}
          {(project.preview || project.previews) && (
            <button
              onClick={e => { e.stopPropagation(); setShowPreview(true) }}
              className="font-mono text-[11px] text-[#bc8cff]/60 hover:text-[#bc8cff] transition-colors flex items-center gap-1 text-left"
            >
              ▶ preview
            </button>
          )}
        </div>
      )}

      {showPreview && (
        <PreviewModal project={project} lang={lang} onClose={() => setShowPreview(false)} />
      )}
    </div>
  )
}

export default function Projects({ onCompile }) {
  const ref = useReveal()
  const { lang, t } = useLang()

  return (
    <section id="projects" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-20 lg:pb-28">
      <div className="h-px bg-white/[0.07] mb-12" />

      <div ref={ref} className="reveal">
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>{t.projects.header} <span className="text-white/30 normal-case">— <span className="sm:hidden">touch</span><span className="hidden sm:inline">hover</span> {t.projects.hint}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onCompile={onCompile} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
