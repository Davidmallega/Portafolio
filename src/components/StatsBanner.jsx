import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'
import { certificates } from '../data/certificates'

export default function StatsBanner() {
  const navigate = useNavigate()
  const ref = useReveal()
  const { t } = useLang()

  return (
    <div ref={ref} className="reveal max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-12 lg:pb-16">
      <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
        <span className="text-white/20 select-none">~/</span>{t.hero.statCerts}
      </p>
      <button
        onClick={() => navigate('/certificates')}
        className="group w-full text-left bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#4ec9b0]/25 rounded-xl px-6 py-5 lg:px-8 lg:py-6 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="grid grid-cols-3 gap-x-4 sm:flex sm:items-center sm:gap-8 lg:gap-12">
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">1.100h</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statHours}</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">{certificates.length}</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statCerts}</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
            <div>
              <p className="font-sans text-[18px] sm:text-2xl lg:text-3xl font-semibold text-white leading-none mb-1">4 años</p>
              <p className="font-mono text-[10px] lg:text-[12px] text-white/30">{t.hero.statYears}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px] lg:text-[13px] text-[#4ec9b0]/60 group-hover:text-[#4ec9b0] transition-colors shrink-0">
            {t.hero.statCta}
            <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        </div>
      </button>
    </div>
  )
}
