import { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import { Mail, MapPin } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const ref      = useReveal()
  const cardRef  = useRef(null)
  const { t }    = useLang()
  const [pos, setPos]         = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  return (
    <section id="contact" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-32 lg:pb-40">
      <div ref={ref} className="reveal">
        <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-10 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
          <span className="text-white/20 select-none">~/</span>{t.contact.header}
        </p>

        {/* Business Card */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-full max-w-[560px] lg:max-w-none rounded-2xl overflow-hidden select-none"
            style={{ aspectRatio: '1.75 / 1' }}
          >
            {/* Base oscuro de la tarjeta */}
            <div className="absolute inset-0 bg-[#010812] border border-[#1a3a5c]/30 rounded-2xl" />

            {/* Patrón de barniz — sólo visible donde apunta el mouse */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  rgba(255,255,255,0.09) 0px,
                  rgba(255,255,255,0.09) 1px,
                  transparent 1px,
                  transparent 7px
                )`,
                WebkitMaskImage: `radial-gradient(circle 130px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`,
                maskImage:       `radial-gradient(circle 130px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Punto de luz / destello especular */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%,
                  rgba(255,255,255,0.07) 0%,
                  rgba(255,255,255,0.02) 40%,
                  transparent 100%)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Borde interior sutil que brilla con la luz */}
            <div
              className="absolute inset-[1px] rounded-2xl pointer-events-none"
              style={{
                background: `radial-gradient(circle 200px at ${pos.x}% ${pos.y}%,
                  rgba(255,255,255,0.04) 0%,
                  transparent 70%)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Contenido — mobile: columna / lg: fila */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-0">

              {/* Nombre + título */}
              <div className="lg:shrink-0">
                <h2 className="font-sans text-2xl lg:text-4xl xl:text-5xl font-semibold text-white tracking-tight leading-none mb-2">
                  David Mallega
                </h2>
                <p className="font-mono text-[12px] lg:text-[14px] text-[#4ec9b0] tracking-wide">
                  Fullstack Developer
                </p>
              </div>

              {/* Línea divisoria — horizontal en mobile, vertical en lg */}
              <div className="h-px bg-white/[0.06] lg:hidden" />
              <div className="hidden lg:block w-px h-16 bg-white/[0.06] shrink-0" />

              {/* Links de contacto */}
              <div className="space-y-2.5">
                <a href="mailto:davidmallega@gmail.com" className="flex items-center gap-2 group" onClick={e => e.stopPropagation()}>
                  <Mail size={12} className="text-white/25 shrink-0" />
                  <span className="font-mono text-[11px] lg:text-[13px] text-white/40 group-hover:text-white/80 transition-colors">
                    davidmallega@gmail.com
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/david-mallega/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group" onClick={e => e.stopPropagation()}>
                  <FaLinkedin size={12} className="text-white/25 group-hover:text-[#0a66c2] shrink-0 transition-colors" />
                  <span className="font-mono text-[11px] lg:text-[13px] text-white/40 group-hover:text-white/80 transition-colors">
                    linkedin.com/in/david-mallega
                  </span>
                </a>
                <a href="https://github.com/Davidmallega" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group" onClick={e => e.stopPropagation()}>
                  <SiGithub size={12} className="text-white/25 group-hover:text-white shrink-0 transition-colors" />
                  <span className="font-mono text-[11px] lg:text-[13px] text-white/40 group-hover:text-white/80 transition-colors">
                    github.com/Davidmallega
                  </span>
                </a>
                <a href="https://wa.me/56996148763" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group" onClick={e => e.stopPropagation()}>
                  <FaWhatsapp size={12} className="text-white/25 group-hover:text-[#25d366] shrink-0 transition-colors" />
                  <span className="font-mono text-[11px] lg:text-[13px] text-white/40 group-hover:text-[#25d366] transition-colors">
                    +56 9 9614 8763
                  </span>
                </a>
              </div>

              {/* Ubicación */}
              <div className="hidden lg:flex items-center gap-1.5 text-white/20 shrink-0">
                <MapPin size={12} />
                <span className="font-mono text-[12px]">Santiago, Chile</span>
              </div>


            </div>
          </div>
        </div>

        {/* Footer code */}
        <div className="text-center mt-8 space-y-1.5">
          <p className="font-mono text-[11px] text-white/20">
            ~<span className="cursor" />
          </p>
          <p className="font-mono text-[10px] text-white/15">
            © {new Date().getFullYear()} David Mallega — Diseñado y desarrollado por mí.
          </p>
        </div>
      </div>
    </section>
  )
}
