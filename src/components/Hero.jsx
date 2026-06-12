import { useNavigate } from 'react-router-dom'
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiPython, SiPhp,
  SiHtml5, SiTailwindcss, SiGooglecloud, SiFirebase, SiDocker, SiGit,
  SiMysql, SiElectron, SiVite, SiWordpress, SiTrello,
  SiGithub,
} from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { skillGroups } from '../data/projects'
import { certificates } from '../data/certificates'
import avatarImg from '../assets/avatar.jpeg'

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
  'MySQL':             SiMysql,
  'Electron':          SiElectron,
  'React Native':      SiReact,
  'Vite':              SiVite,
  'WordPress':         SiWordpress,
  'Trello':            SiTrello,
}

export default function Hero() {
  const navigate = useNavigate()
  const r2 = useReveal()
  const r3 = useReveal()
  const r4 = useReveal()

  return (
    <section id="hero" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 pt-16 lg:pt-24 pb-20 lg:pb-28">

      {/* Avatar + Name block */}
      <div ref={r2} className="reveal flex items-center gap-6 lg:gap-10 mb-8 lg:mb-12">
        <div className="relative shrink-0 w-28 h-28 lg:w-40 lg:h-40 xl:w-48 xl:h-48">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4ec9b0]/30">
            <img src={avatarImg} alt="David Mallega" className="w-full h-full object-cover" />
          </div>
          <span className="online-dot absolute bottom-1.5 right-1.5 lg:bottom-2.5 lg:right-2.5 w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-[#4ec9b0] border-2 border-[#0d0d0f]" />
        </div>

        <div>
          <h1 className="font-sans text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-none mb-2 lg:mb-3">
            David Mallega
          </h1>
          <p className="font-mono text-[13px] lg:text-[16px] text-[#4ec9b0] mb-1 lg:mb-2">Fullstack Developer</p>
          <p className="font-mono text-[12px] lg:text-[14px] text-white/30 mb-3">Santiago, Chile 🇨🇱</p>
          <div className="flex items-center gap-3">
            <a href="mailto:davidmallega@gmail.com" className="text-white/30 hover:text-[#4ec9b0] transition-colors">
              <Mail size={13} />
            </a>
            <a href="https://github.com/Davidmallega" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
              <SiGithub size={13} />
            </a>
            <a href="https://www.linkedin.com/in/david-mallega/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#0a66c2] transition-colors">
              <FaLinkedin size={13} />
            </a>
            <a href="https://wa.me/56996148763" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#25d366] transition-colors">
              <FaWhatsapp size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <div ref={r3} className="reveal mb-10 lg:mb-14">
        <p className="font-mono text-[12px] lg:text-[13px] text-white/35 mb-1">
          Técnico de Nivel Superior en Informática
          <span className="ml-3 text-[#4ec9b0]/60">· distinción <span className="squiggle text-[#f0a070]/80">Máxima</span> ✓</span>
        </p>
        <div className="h-px bg-white/[0.06] my-5" />
        <div className="space-y-1.5">
          <p className="font-sans text-[14px] lg:text-[16px] text-white/55 leading-relaxed">10 años administrando empresas.</p>
          <p className="font-sans text-[14px] lg:text-[16px] text-white/55 leading-relaxed"> 4 años desarrollando.</p>
          <p className="font-sans text-[14px] lg:text-[16px] text-white/70 leading-relaxed font-medium">No le temo al error — es mi materia prima.</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] mb-8" />

      {/* Skills agrupados */}
      <div>
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-5 lg:mb-7 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>skills
        </p>
        <div className="flex flex-col gap-4 lg:gap-4">
          {skillGroups.map(group => (
            <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 lg:gap-4">
              <span className="font-mono text-[10px] lg:text-[11px] text-white/20 uppercase tracking-widest sm:w-16 lg:w-20 sm:shrink-0 sm:pt-[5px]">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-[6px]">
                {group.items.map(s => {
                  const Icon = SKILL_ICONS[s.label]
                  const initials = s.label.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()
                  return (
                    <span
                      key={group.label + s.label}
                      className={`skill-badge group relative inline-flex items-center justify-center w-8 h-8 ${s.cls}`}
                    >
                      {Icon
                        ? <Icon size={15} className="shrink-0 transition-opacity opacity-60 group-hover:opacity-100" />
                        : <span className="font-mono text-[10px] font-semibold opacity-60 group-hover:opacity-100 transition-opacity">{initials}</span>
                      }
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-[3px] font-mono text-[10px] text-white/80 bg-[#1a1a1f] border border-white/[0.12] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
                        {s.label}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat bar → certificates */}
      <div ref={r4} className="reveal mt-8 lg:mt-10">
        <div className="h-px bg-white/[0.07] mb-6" />
        <button
          onClick={() => navigate('/certificates')}
          className="group w-full text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#4ec9b0]/25 rounded-xl px-6 py-5 lg:px-8 lg:py-6 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-0 sm:flex sm:items-center sm:gap-8 lg:gap-12">
              <div>
                <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">1.100h</p>
                <p className="font-mono text-[10px] lg:text-[12px] text-white/30">de estudio</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
              <div>
                <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">{certificates.length}</p>
                <p className="font-mono text-[10px] lg:text-[12px] text-white/30">certificados</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
              <div>
                <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">4 años</p>
                <p className="font-mono text-[10px] lg:text-[12px] text-white/30">de formación</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 font-mono text-[12px] lg:text-[13px] text-[#4ec9b0]/60 group-hover:text-[#4ec9b0] transition-colors shrink-0">
              ver diplomas
              <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </div>
        </button>
      </div>

    </section>
  )
}
