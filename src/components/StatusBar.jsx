export default function StatusBar({ totalErrors, doneCount = 0 }) {
  const errors = Math.max(0, totalErrors - doneCount)
  const isOk   = errors === 0

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-6 bg-[#0d0d0f]/97 border-t border-white/[0.07] backdrop-blur-md flex items-center font-mono text-[11px]">

      <div className={`flex items-center gap-2 px-4 h-full border-r border-white/[0.07] transition-colors duration-500 ${isOk ? 'text-[#4ec9b0]' : 'text-[#ff6b6b]'}`}>
        <span className={`w-[6px] h-[6px] rounded-full transition-colors duration-500 ${isOk ? 'bg-[#4ec9b0]' : 'bg-[#ff6b6b]'}`} />
        <span className="hidden sm:inline">{isOk ? '0 errores — build exitoso ✓' : `${errors} error${errors > 1 ? 'es' : ''}`}</span>
        <span className="sm:hidden">{isOk ? 'build ✓' : `${errors} err`}</span>
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

      <div className="flex items-center px-4 h-full ml-auto border-l border-white/[0.07] text-white/30">
        <span className="hidden sm:inline">Santiago, Chile</span>
        <span className="sm:hidden">Santiago</span>
      </div>

    </footer>
  )
}
