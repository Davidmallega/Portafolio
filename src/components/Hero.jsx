import { useState, useEffect } from 'react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Mail, MessageCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import avatarImg from '../assets/avatar.jpeg'
import { ChatWindow } from './About'

export default function Hero() {
  const { t } = useLang()
  const r2 = useReveal()
  const r3 = useReveal()
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (chatOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const top = parseInt(document.body.style.top || '0') * -1
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, top)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [chatOpen])

  return (
    <>
      <div className="w-full bg-gradient-to-b from-black/60 via-black/40 to-transparent">
        <section id="hero" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pt-16 lg:pt-24 pb-8 lg:pb-12">

          {/* Avatar + Name block */}
          <div ref={r2} className="reveal flex items-center gap-4 lg:gap-10 mb-8 lg:mb-12">

            {/* Columna izquierda: foto + botón IA */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="relative w-[110px] h-[110px] sm:w-28 sm:h-28 lg:w-40 lg:h-40 xl:w-48 xl:h-48">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4ec9b0]/30">
                  <img src={avatarImg} alt="David Mallega" className="w-full h-full object-cover" />
                </div>
                <span className="online-dot absolute bottom-1 right-1 lg:bottom-2.5 lg:right-2.5 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#4ec9b0] border-2 border-[#0d0d0f]" />
              </div>

              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-1 font-mono text-[9px] px-2.5 py-1 rounded-full border border-[#bc8cff]/50 bg-[#bc8cff]/10 text-[#bc8cff]/80 hover:border-[#bc8cff]/80 hover:text-[#bc8cff] hover:bg-[#bc8cff]/15 transition-all"
                style={{ boxShadow: '0 0 8px rgba(188,140,255,0.2)' }}
              >
                <MessageCircle size={9} />
                IA · chat
              </button>
            </div>

            {/* Columna derecha: nombre, rol, redes */}
            <div className="min-w-0">
              <h1 className="font-sans text-[1.85rem] sm:text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-tight mb-1.5 lg:mb-3">
                David Mallega
              </h1>
              <p className="font-mono text-[13px] lg:text-[16px] text-[#4ec9b0] mb-1 lg:mb-2">Fullstack Developer</p>
              <p className="font-mono text-[13px] lg:text-[16px] text-white/30 mb-3">Santiago, Chile 🇨🇱</p>
              <div className="flex items-center gap-3">
                <a href="mailto:davidmallega@gmail.com" className="text-white/30 hover:text-[#4ec9b0] transition-colors">
                  <Mail size={20} />
                </a>
                <a href="https://github.com/Davidmallega" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <SiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/david-mallega/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#0a66c2] transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://wa.me/56996148763" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#25d366] transition-colors">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={r3} className="reveal mb-10 lg:mb-14">
            <p className="font-sans text-[13px] lg:text-[14px] text-white/35 leading-relaxed">
              {t.hero.bio1}{' '}
              <br className="hidden sm:block" />
              {t.hero.bio2}{' '}
              <br className="hidden sm:block" />
              {t.hero.bio3}
            </p>
          </div>

        </section>
      </div>

      {/* Modal del chat */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 pt-4 sm:pt-6"
          onClick={() => setChatOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/88 backdrop-blur-sm" />

          {/* Contenedor del chat */}
          <div
            className="relative z-10 w-full sm:max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <ChatWindow onClose={() => setChatOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
