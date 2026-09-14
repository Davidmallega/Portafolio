import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import { timelineProjects, TIMELINE_TYPES } from '../data/timeline'

const STATUS = {
  active: { es: 'en curso', en: 'active', dot: '#4ec9b0', pulse: true },
  paused: { es: 'en pausa', en: 'paused', dot: '#e8d88a', pulse: false },
  shipped: { es: 'entregado', en: 'shipped', dot: '#58a6ff', pulse: false },
}

function MilestoneRow({ milestone, lang, isLast }) {
  const [open, setOpen] = useState(false)
  const type = TIMELINE_TYPES[milestone.type]
  const title = lang === 'en' && milestone.titleEn ? milestone.titleEn : milestone.title
  const detail = lang === 'en' && milestone.detailEn ? milestone.detailEn : milestone.detail
  const problem = lang === 'en' && milestone.problemEn ? milestone.problemEn : milestone.problem
  const solution = lang === 'en' && milestone.solutionEn ? milestone.solutionEn : milestone.solution
  const hasBody = Boolean(detail || problem || solution)

  return (
    <div className="relative pl-6">
      <div
        className="absolute left-[5px] top-[6px] w-[9px] h-[9px] rounded-full ring-2 ring-[#0d0d0f]"
        style={{ backgroundColor: type.color, boxShadow: `0 0 6px ${type.color}88` }}
      />
      {!isLast && (
        <div className="absolute left-[9px] top-[15px] bottom-[-16px] w-px bg-white/[0.08]" />
      )}

      <div className="pb-4">
        <button
          onClick={() => hasBody && setOpen(o => !o)}
          disabled={!hasBody}
          className={`w-full text-left group ${hasBody ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {hasBody && (
              <ChevronRight
                size={11}
                className={`shrink-0 -ml-4 transition-transform duration-200
                  ${open ? 'rotate-90 text-white/60' : 'text-white/25 group-hover:text-white/50'}`}
              />
            )}
            <span
              className="font-mono text-[10px] px-1.5 py-[1px] rounded border"
              style={{ borderColor: `${type.color}40`, backgroundColor: `${type.color}15`, color: type.color }}
            >
              {type.label}
            </span>
            <span className="font-mono text-[10px] text-white/30 tabular-nums">{milestone.date}</span>
          </div>
          <p className={`font-sans text-[13px] lg:text-[14px] leading-snug transition-colors
            ${open ? 'text-white' : 'text-white/85 group-hover:text-white'}`}>
            {title}
          </p>
        </button>

        {hasBody && (
          <div className={`exp-body ${open ? 'open' : ''}`}>
            <div>
              <div className="pt-1.5">
                {detail && (
                  <p className="font-mono text-[11px] lg:text-[12px] text-white/40 leading-relaxed">
                    {detail}
                  </p>
                )}
                {(problem || solution) && (
                  <div className="mt-2.5 rounded-lg border border-[#4ec9b0]/20 bg-[#4ec9b0]/[0.04] overflow-hidden">
                    {problem && (
                      <div className="px-3 pt-2.5 pb-2">
                        <p className="font-mono text-[9px] text-[#ff6b6b]/70 uppercase tracking-widest mb-1">
                          {lang === 'en' ? 'problem' : 'problema'}
                        </p>
                        <p className="font-mono text-[11px] lg:text-[12px] text-white/55 leading-relaxed">
                          {problem}
                        </p>
                      </div>
                    )}
                    {solution && (
                      <div className={`px-3 pb-2.5 ${problem ? 'pt-2 border-t border-white/[0.06]' : 'pt-2.5'}`}>
                        <p className="font-mono text-[9px] text-[#4ec9b0]/70 uppercase tracking-widest mb-1">
                          {lang === 'en' ? 'solution' : 'solución'}
                        </p>
                        <p className="font-mono text-[11px] lg:text-[12px] text-white/55 leading-relaxed">
                          {solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectTimeline({ project, lang, defaultOpen, onViewProject }) {
  const [open, setOpen] = useState(defaultOpen)
  const status = STATUS[project.status]

  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        onClick={() => setOpen(o => !o)}
        className={`relative w-full flex items-center gap-2.5 py-3 px-3.5 transition-colors duration-150 group text-left
          ${open ? 'bg-white/[0.05]' : 'hover:bg-white/[0.04]'}`}
      >
        <ChevronRight
          size={13}
          className={`shrink-0 transition-transform duration-200
            ${open ? 'rotate-90 text-white/70' : 'text-white/40 group-hover:text-white/70'}`}
        />

        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}88` }}
        />

        <span className={`font-mono text-[12px] lg:text-[13px] flex-1 min-w-0 truncate transition-colors
          ${open ? 'text-[#9cdcfe]' : 'text-white/80 group-hover:text-white'}`}>
          {project.name}
        </span>

        <span
          className="font-mono text-[10px] shrink-0 flex items-center gap-1.5 px-2 py-[3px] rounded-full border"
          style={{ borderColor: `${status.dot}40`, backgroundColor: `${status.dot}15`, color: status.dot }}
        >
          <span className="relative w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: status.dot }}>
            {status.pulse && (
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: status.dot }} />
            )}
          </span>
          {status[lang]}
        </span>

        <span className="font-mono text-[10px] lg:text-[11px] shrink-0 text-white/30 tabular-nums">
          {project.milestones.length}
        </span>
      </button>

      <div className={`exp-body ${open ? 'open' : ''}`}>
        <div>
          <div className="px-4 pt-3 pb-1">
            {(project.fullName || project.stack || project.statusNote) && (
              <div className="mb-4 pb-3 border-b border-white/[0.06]">
                {project.fullName && (
                  <p className="font-sans text-[12px] lg:text-[13px] text-white/50 mb-1">
                    {lang === 'en' && project.fullNameEn ? project.fullNameEn : project.fullName}
                  </p>
                )}
                {project.stack && (
                  <p className="font-mono text-[10px] lg:text-[11px] text-[#9cdcfe]/60">
                    {project.stack}
                  </p>
                )}
                {project.statusNote && (
                  <p className="font-mono text-[10px] text-white/25 mt-1">
                    {'// '}{lang === 'en' && project.statusNoteEn ? project.statusNoteEn : project.statusNote}
                  </p>
                )}
              </div>
            )}

            {project.milestones.map((m, i) => (
              <MilestoneRow key={m.id} milestone={m} lang={lang} isLast={i === project.milestones.length - 1} />
            ))}

            {project.summary && (
              <div className="mt-1 mb-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="font-mono text-[10px] text-[#e8d88a]/60 uppercase tracking-widest mb-1.5">
                  {lang === 'en' ? 'summary' : 'resumen'}
                </p>
                <p className="font-mono text-[11px] text-white/45 leading-relaxed">
                  {lang === 'en' && project.summaryEn ? project.summaryEn : project.summary}
                </p>
              </div>
            )}

            {project.projectId != null && (
              <button
                onClick={() => onViewProject(project.projectId)}
                className="font-mono text-[10px] text-white/30 hover:text-[#4ec9b0] transition-colors mb-2"
              >
                {lang === 'en' ? '→ view project' : '→ ver proyecto'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsTimeline() {
  const r1 = useReveal()
  const r2 = useReveal()
  const { lang } = useLang()
  const navigate = useNavigate()

  const totalMilestones = timelineProjects.reduce((n, p) => n + p.milestones.length, 0)
  const activeCount = timelineProjects.filter(p => p.status === 'active').length

  const handleViewProject = () => {
    navigate('/', { state: { scrollTo: 'projects' } })
  }

  return (
    <section className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pt-16 lg:pt-24 pb-32 lg:pb-40">
      <div ref={r1} className="reveal mb-10 lg:mb-14">
        <h1 className="font-sans text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-none mb-4">
          {lang === 'en' ? 'Real-Time Skills' : 'Habilidades en Tiempo Real'}
        </h1>
        <p className="font-mono text-[12px] lg:text-[14px] text-white/50 mb-1">
          {lang === 'en'
            ? 'A public build log per project — not the diff, but the decisions: what I built, what I fixed, what each client asked for, and why I chose each approach.'
            : 'Un registro público de hitos por proyecto — no el diff, sino las decisiones: qué construí, qué corregí, qué pidió cada cliente y por qué elegí cada enfoque.'}
        </p>
        <p className="font-mono text-[10px] text-white/25">
          {lang === 'en'
            ? `${totalMilestones} milestones · ${activeCount} project${activeCount !== 1 ? 's' : ''} active now`
            : `${totalMilestones} hitos · ${activeCount} proyecto${activeCount !== 1 ? 's' : ''} en curso ahora`}
        </p>
      </div>

      <div ref={r2} className="reveal space-y-3">
        {timelineProjects.map((p, i) => (
          <ProjectTimeline
            key={p.id}
            project={p}
            lang={lang}
            defaultOpen={false}
            onViewProject={handleViewProject}
          />
        ))}
      </div>
    </section>
  )
}
