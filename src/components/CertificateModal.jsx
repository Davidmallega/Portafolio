import { useEffect } from 'react'

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 bg-[#1a1a1f] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] bg-[#0d0d0f] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-[3px] h-4 rounded-full bg-[#e8d88a]/70" />
            <div>
              <p className="font-mono text-[12px] text-white/60">{cert.title}</p>
              <p className="font-mono text-[10px] text-white/25">{cert.institution} · {cert.year}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[12px] text-white/30 hover:text-white/70 transition-colors ml-4"
          >
            × cerrar
          </button>
        </div>

        {/* Image */}
        {cert.img ? (
          <img
            src={cert.img}
            alt={cert.title}
            className="w-full object-contain max-h-[75vh]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <span className="font-mono text-[13px] text-[#e8d88a]/40">~ modified · {cert.category}</span>
            <p className="font-mono text-[12px] text-white/20">diploma no disponible aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
