import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import StatsBanner from './components/StatsBanner'
import Contact from './components/Contact'
import Certificates from './components/Certificates'
import SDLCPage from './components/SDLCPage'
import About from './components/About'
import ParticlesBackground from './components/ParticlesBackground'
import StatusBar from './components/StatusBar'
import { projects } from './data/projects'

function Home({ onCompile }) {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects onCompile={onCompile} />
      <StatsBanner />
      <Skills />
      <Contact />
    </main>
  )
}

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const target = location.state?.scrollTo
    if (target && target !== 'hero') {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.key])
  return null
}

function AppInner() {
  const [compiledIds, setCompiledIds] = useState(new Set())
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') setCompiledIds(new Set())
  }, [location.pathname])

  const handleCompile = (id) => setCompiledIds(prev => new Set([...prev, id]))

  return (
    <>
      <ScrollToTop />
      <ParticlesBackground />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home onCompile={handleCompile} />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/sdlc" element={<SDLCPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <StatusBar totalErrors={projects.length} doneCount={compiledIds.size} />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </LanguageProvider>
  )
}
