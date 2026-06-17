import { useLang } from '../context/LanguageContext'

export default function StatusBar({ totalErrors, doneCount = 0 }) {
  const errors = Math.max(0, totalErrors - doneCount)
  const isOk   = errors === 0
  const { t }  = useLang()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-6 bg-[#0d0d0f]/97 border-t border-white/[0.07] backdrop-blur-md font-mono text-[11px]">
      <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-3 lg:px-16 xl:px-24 flex items-center h-full w-full">

        <div className={`flex items-center gap-2 h-full border-r border-white/[0.07] pr-4 transition-colors duration-500 ${isOk ? 'text-[#4ec9b0]' : 'text-[#ff6b6b]'}`}>
          <span className={`w-[6px] h-[6px] rounded-full transition-colors duration-500 ${isOk ? 'bg-[#4ec9b0]' : 'bg-[#ff6b6b]'}`} />
          <span className="hidden sm:inline">{isOk ? t.statusBar.ok : t.statusBar.errors(errors)}</span>
          <span className="sm:hidden">{isOk ? t.statusBar.okShort : t.statusBar.errorsShort(errors)}</span>
        </div>

        <div className="hidden sm:flex items-center px-4 h-full border-r border-white/[0.07] text-white/30">
          portfolio.js
        </div>

        <div className="hidden sm:flex items-center px-4 h-full border-r border-white/[0.07] text-white/30">
          JavaScript
        </div>

        <div className="hidden sm:flex items-center px-4 h-full border-r border-white/[0.07] text-white/30">
          UTF-8
        </div>

        <div className="flex items-center pl-4 h-full ml-auto border-l border-white/[0.07] text-white/30">
          <span className="hidden sm:inline">Santiago, Chile</span>
          <span className="sm:hidden">Santiago</span>
        </div>

      </div>
    </footer>
  )
}
