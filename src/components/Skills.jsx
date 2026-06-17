import { useState } from 'react'
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiPython, SiPhp,
  SiHtml5, SiTailwindcss, SiGooglecloud, SiFirebase, SiDocker, SiGit, SiGithub,
  SiMysql, SiElectron, SiVite, SiWordpress, SiTrello, SiTypescript, SiPostgresql, SiPostman,
} from 'react-icons/si'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import { skillGroups } from '../data/projects'

const SKILL_ICONS = {
  'JavaScript':        SiJavascript,
  'React':             SiReact,
  'Node.js':           SiNodedotjs,
  'Express':           SiExpress,
  'Python':            SiPython,
  'PHP':               SiPhp,
  'HTML / CSS':        SiHtml5,
  'Tailwind CSS':      SiTailwindcss,
  'GCP':               SiGooglecloud,
  'Cloud Run':         SiGooglecloud,
  'BigQuery':          SiGooglecloud,
  'Vertex AI':         SiGooglecloud,
  'Firebase':          SiFirebase,
  'Firestore':         SiFirebase,
  'Firestore (NoSQL)': SiFirebase,
  'Docker':            SiDocker,
  'Git':               SiGit,
  'GitHub':            SiGithub,
  'TypeScript':        SiTypescript,
  'PostgreSQL':        SiPostgresql,
  'Postman':           SiPostman,
  'MySQL':             SiMysql,
  'Electron':          SiElectron,
  'React Native':      SiReact,
  'Vite':              SiVite,
  'WordPress':         SiWordpress,
  'Trello':            SiTrello,
}

function SkillGroup({ group }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative border rounded-lg px-4 pb-4 pt-5 transition-all duration-300"
      style={{
        borderColor: hovered ? group.color : 'rgba(255,255,255,0.08)',
        backgroundColor: hovered ? group.color + '12' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute -top-[9px] left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest bg-[#0d0d0f] px-2 whitespace-nowrap transition-colors duration-300"
        style={{ color: hovered ? group.color : 'rgba(255,255,255,0.3)' }}
      >
        {group.label}
      </span>
      <div className="flex flex-wrap gap-[6px]">
        {group.items.map(s => {
          const Icon = SKILL_ICONS[s.label]
          const initials = s.label.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()
          return (
            <span
              key={s.label}
              className={`skill-badge group relative inline-flex items-center justify-center w-8 h-8 ${s.cls}`}
            >
              {Icon
                ? <Icon size={15} className="shrink-0 transition-opacity opacity-60 group-hover:opacity-100" />
                : <span className="font-mono text-[10px] font-semibold opacity-60 group-hover:opacity-100 transition-opacity">{initials}</span>
              }
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-[3px] font-mono text-[10px] text-white/80 bg-[#1a1a1f] border border-white/[0.12] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
                {s.label}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useReveal()
  const { t } = useLang()

  return (
    <section
      id="skills"
      className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-20 lg:pb-28"
    >
      <div ref={ref} className="reveal">
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-5 lg:mb-7 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>{t.skills.header}
        </p>
        <div className="flex flex-wrap gap-4">
          {skillGroups.map(group => (
            <SkillGroup key={group.label} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
