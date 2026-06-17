import { SiGithub } from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import avatarImg from '../assets/avatar.jpeg'

export default function Hero() {
  const { t } = useLang()
  const r2 = useReveal()
  const r3 = useReveal()

  return (
    <div className="w-full bg-gradient-to-b from-black/60 via-black/40 to-transparent">
    <section id="hero" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pt-16 lg:pt-24 pb-8 lg:pb-12">

      {/* Avatar + Name block */}
      <div ref={r2} className="reveal flex items-center gap-4 lg:gap-10 mb-8 lg:mb-12">
        <div className="relative shrink-0 w-[110px] h-[110px] sm:w-28 sm:h-28 lg:w-40 lg:h-40 xl:w-48 xl:h-48">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4ec9b0]/30">
            <img src={avatarImg} alt="David Mallega" className="w-full h-full object-cover" />
          </div>
          <span className="online-dot absolute bottom-1 right-1 lg:bottom-2.5 lg:right-2.5 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#4ec9b0] border-2 border-[#0d0d0f]" />
        </div>

        <div className="min-w-0">
          <h1 className="font-sans text-[1.85rem] sm:text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-tight mb-1.5 lg:mb-3 whitespace-nowrap">
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

      {/* About */}
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
  )
}
