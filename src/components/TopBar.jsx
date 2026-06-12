import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'hero',         label: 'portfolio',     route: null,            showDot: true,  color: '#4ec9b0' },
  { id: 'projects',     label: 'projects',      route: null,            showDot: false, color: '#ff6b6b' },
  { id: 'contact',      label: 'contact',       route: null,            showDot: false, color: '#4ec9b0' },
  { id: 'certificates', label: 'certificates',  route: '/certificates', showDot: false, color: '#e8d88a' },
]

const ROUTE_ACTIVE = {
  '/':             'hero',
  '/certificates': 'certificates',
  '/sdlc':         'projects',
}

export default function TopBar({ errCount }) {
  const navigate   = useNavigate()
  const location   = useLocation()
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
    <header className="sticky top-0 z-50 flex items-center h-10 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-white/[0.07]">
      {/* Traffic lights */}
      <div className="flex items-center gap-[6px] px-4">
        <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
        <span className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
        <span className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
      </div>

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
                <span
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ backgroundColor: tab.color }}
                />
              )}
              {tab.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
