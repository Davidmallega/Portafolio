import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const tabs = [
  { id: 'hero',         label: 'portfolio',     route: null,            showDot: true,  color: '#4ec9b0' },
  { id: 'projects',     label: 'projects',      route: null,            showDot: false, color: '#ff6b6b' },
  { id: 'contact',      label: 'contact',       route: null,            showDot: false, color: '#4ec9b0' },
  { id: 'certificates', label: 'certificates',  route: '/certificates', showDot: false, color: '#e8d88a' },
  { id: 'timeline',     label: 'timeline',       route: '/timeline',     showDot: false, color: '#bc8cff' },
]

const ROUTE_ACTIVE = {
  '/':             'hero',
  '/certificates': 'certificates',
  '/timeline':     'timeline',
  '/sdlc':         'projects',
}

export default function TopBar() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { lang, toggle } = useLang()
  const onSubpage  = location.pathname !== '/'
  const [active, setActive] = useState(ROUTE_ACTIVE[location.pathname] ?? 'hero')

  useEffect(() => {
    setActive(ROUTE_ACTIVE[location.pathname] ?? 'hero')
  }, [location.pathname])

  const handleTab = (tab) => {
    setActive(tab.id)
    if (tab.route) {
      navigate(tab.route)
    } else if (onSubpage) {
      navigate('/', { state: { scrollTo: tab.id } })
    } else if (tab.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 h-10 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-0 lg:px-16 xl:px-24 flex items-center h-full w-full">
        {/* Tabs */}
        <nav className="flex h-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab)}
                style={isActive ? { borderTopColor: tab.color } : {}}
                className={`
                  flex items-center gap-[7px] px-3 sm:px-4 h-full text-[11px] sm:text-[12px] font-mono shrink-0
                  border-r border-white/[0.07] transition-colors border-t border-t-transparent
                  ${isActive ? 'text-[#e8e8e8]' : 'text-white/30 hover:text-white/60'}
                `}
              >
                {tab.showDot && isActive && (
                  <span className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: tab.color }} />
                )}
                {tab.id === 'certificates'
                  ? <><span className="sm:hidden">certs</span><span className="hidden sm:inline">certificates</span></>
                  : tab.label
                }
              </button>
            )
          })}
        </nav>

        {/* Language toggle */}
        <button
          onClick={toggle}
          className="ml-auto px-3 h-full font-mono text-[12px] text-white/50 hover:text-[#4ec9b0] transition-colors shrink-0 flex items-center gap-1.5"
        >
          {lang === 'es' ? (
            <>
              <svg width="16" height="11" viewBox="0 0 16 11" className="rounded-[1px] shrink-0 opacity-75">
                <rect width="16" height="11" fill="#B22234"/>
                {[0,1,2,3,4,5].map(i => <rect key={i} y={i*1.54+0.77} width="16" height="0.77" fill="white"/>)}
                <rect width="7" height="5.5" fill="#3C3B6E"/>
              </svg>
              <span className="tracking-widest">EN</span>
            </>
          ) : (
            <>
              <svg width="16" height="11" viewBox="0 0 16 11" className="rounded-[1px] shrink-0 opacity-75">
                <rect width="16" height="5.5" fill="white"/>
                <rect y="5.5" width="16" height="5.5" fill="#D52B1E"/>
                <rect width="6" height="5.5" fill="#003DA5"/>
                <text x="3" y="2.75" fontSize="5.5" fill="white" textAnchor="middle" dominantBaseline="middle">★</text>
              </svg>
              <span className="tracking-widest">ES</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
