import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/projects'

function ProjectCard({ project, onCompile }) {
  const navigate = useNavigate()
  const [phase, setPhase]   = useState('idle')
  const [typed, setTyped]   = useState('')
  const intervalRef = useRef(null)

  const handleEnter = () => {
    if (phase !== 'idle') return
    setPhase('compiling')
    setTyped('')

    let i = 0
    const text = project.description
    intervalRef.current = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current)
        setTimeout(() => {
          setPhase('done')
          onCompile()
        }, 350)
      }
    }, 28)
  }

  const handleLeave = () => {
    if (phase === 'done') return
    clearInterval(intervalRef.current)
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
        <div className="ml-2 shrink-0 flex items-center justify-end" style={{ minWidth: 60, minHeight: 20 }}>
          {phase === 'idle' && (
            <span className="err-badge font-mono text-[10px] px-2 py-[2px] rounded bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[#ff6b6b] whitespace-nowrap">
              {project.error} ⚠
            </span>
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

      {/* idle: error message */}
      {phase === 'idle' && (
        <p className="font-mono text-[11px] text-[#ff6b6b]/50 italic squiggle">
          {project.errorMsg}
        </p>
      )}

      {/* compiling: texto escribiéndose */}
      {phase === 'compiling' && (
        <p className="font-sans text-[12px] text-white/40 leading-relaxed">
          {typed}
          <span className="inline-block w-[2px] h-[13px] bg-[#4ec9b0] ml-[1px] align-middle animate-pulse" />
        </p>
      )}

      {/* done: descripción completa + link */}
      {phase === 'done' && (
        <div className="compile-done">
          <p className="text-[12px] text-white/50 font-sans leading-relaxed mb-3">
            {project.description}
          </p>
          {project.internal ? (
            <button
              onClick={e => { e.stopPropagation(); navigate(project.internalLink) }}
              className="font-mono text-[11px] text-[#4ec9b0] hover:opacity-70 transition-opacity"
            >
              → {project.linkLabel}
            </button>
          ) : (
            <>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-[#4ec9b0] hover:opacity-70 transition-opacity"
                onClick={e => e.stopPropagation()}
              >
                → {project.linkLabel}
              </a>
              {project.demo && (
                <span className="ml-3 font-mono text-[10px] px-2 py-[2px] rounded bg-[#4ec9b0]/10 border border-[#4ec9b0]/20 text-[#4ec9b0]">
                  demo live
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function Projects({ onCompile }) {
  const ref = useReveal()

  return (
    <section id="projects" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 pb-20 lg:pb-28">
      <div className="h-px bg-white/[0.07] mb-12" />

      <div ref={ref} className="reveal">
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>proyectos <span className="text-white/30 normal-case">— hover para compilar</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onCompile={onCompile} />
          ))}
        </div>
      </div>
    </section>
  )
}
