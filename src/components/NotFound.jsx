import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { lang } = useLang()

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-8 py-24">
      <div className="max-w-xl w-full">
        <p className="font-mono text-[11px] text-[#ff6b6b]/70 mb-2">
          {lang === 'en' ? 'Uncaught RouteError' : 'Uncaught RouteError'}
        </p>

        <h1 className="font-sans text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-none mb-4">
          404
        </h1>

        <p className="font-mono text-[13px] text-white/50 mb-6">
          {lang === 'en'
            ? <>Cannot GET <span className="text-[#e8d88a]">'{pathname}'</span> — this route doesn't exist.</>
            : <>No se pudo resolver <span className="text-[#e8d88a]">'{pathname}'</span> — esta ruta no existe.</>}
        </p>

        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 mb-8 overflow-x-auto">
          <p className="font-mono text-[11px] text-white/30 leading-relaxed whitespace-pre">
{`  at Router.resolve (react-router-dom.js:1:1)
  at <Routes /> (App.jsx:64:9)
  at <BrowserRouter /> (App.jsx:82:5)`}
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="font-mono text-[13px] text-[#4ec9b0] hover:opacity-70 transition-opacity"
        >
          {lang === 'en' ? '← back to the portfolio' : '← volver al portfolio'}
        </button>
      </div>
    </section>
  )
}
