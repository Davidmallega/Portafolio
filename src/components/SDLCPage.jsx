import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PHASES = [
  {
    id: 'ers',
    num: '01',
    filename: 'especificacion-requisitos.md',
    label: 'ERS — Especificación de Requisitos',
    dot: '#58a6ff',
    items: [
      'RF-01: Hero con nombre, rol, skills con iconos de marca y stats de formación.',
      'RF-02: Timeline de experiencia laboral expandible estilo VS Code Explorer.',
      'RF-03: Cards de proyectos con animación de compilación y tipeo de descripción.',
      'RF-04: Página de certificados con fases push → request → done y barras de progreso.',
      'RF-05: Sección contacto con tarjeta interactiva (efecto barniz con mouse).',
      'RNF-01: Estética VS Code — fondo #0d0d0f, acento teal #4ec9b0, fuente mono.',
      'RNF-02: Animaciones CSS nativo + React state, sin librerías externas.',
      'RNF-03: 100% estático — sin backend, deployable en cualquier CDN.',
    ],
  },
  {
    id: 'analisis',
    num: '02',
    filename: 'analisis.md',
    label: 'Análisis',
    dot: '#3fb950',
    items: [
      'HU-01: Como visitante, ver quién es David de un vistazo — hero minimal con foto y bio.',
      'HU-02: Como reclutador, explorar experiencia laboral de forma visual e interactiva.',
      'HU-03: Como dev, ver proyectos con stack y links de forma no aburrida.',
      'HU-04: Como visitante mobile, que todo funcione perfecto en celular.',
      'Dominio: 5 secciones — hero, experience, projects, certificates, contact.',
      'Datos estáticos en /src/data/ → projects.js, certificates.js, badges.js.',
      'Custom hook useReveal para IntersectionObserver en animaciones de scroll.',
    ],
  },
  {
    id: 'diseno',
    num: '03',
    filename: 'diseno-sistema.md',
    label: 'Diseño del Sistema',
    dot: '#bc8cff',
    items: [
      'Arquitectura de componentes: App → TopBar, Home (Hero/Experience/Projects/Contact), /certificates, /sdlc.',
      'Paleta: bg #0d0d0f · teal #4ec9b0 · yellow #e8d88a · red #ff6b6b · orange #f0a070.',
      'Headers ~/sección en teal — coherencia VS Code en todas las secciones.',
      'grid-template-rows: 0fr → 1fr para expand/collapse suave sin calcular alturas.',
      'StatusBar inferior fija: errores activos, rama git, ubicación — igual que VS Code.',
      'Tabs sin extensión .js en mobile para que quepan en pantalla pequeña.',
    ],
  },
  {
    id: 'planificacion',
    num: '04',
    filename: 'planificacion.md',
    label: 'Planificación',
    dot: '#d29922',
    items: [
      'Metodología: Kanban personal · iteraciones diarias · sin sprints formales.',
      'Sem 1 (25–31 mayo): Setup Vite + Tailwind · TopBar + StatusBar · Hero · Projects cards.',
      'Sem 2 (1–7 junio): Experience VS Code Explorer · Certificates página · Hero redesign · iconos.',
      'Sem 3 (8–14 junio): Fixes mobile · tipeo en certs · barras progresivas · badges · freelance entry.',
      'Stack: React 19 · Vite 8 · Tailwind CSS v3 · React Router DOM v7 · react-icons · lucide-react.',
    ],
  },
  {
    id: 'desarrollo',
    num: '05',
    filename: 'implementacion.md',
    label: 'Implementación / Desarrollo',
    dot: '#4ec9b0',
    items: [
      'Custom Hook useReveal → IntersectionObserver para animaciones al hacer scroll.',
      'State machine por card: fases idle | pushing | request | done en Certificates.',
      'Typing effect: setInterval a 22ms/char para simular escritura en tiempo real.',
      'CSS grid trick: grid-template-rows 0fr/1fr para altura animada sin JavaScript.',
      'Route-aware scroll: location.state.scrollTo para navegar a sección específica.',
      'Bug fix: doneCount acumulaba entre rutas → reset en useEffect cuando pathname === "/".',
      'Bug fix: touch mobile abría modal inmediato → guard if (phase !== "idle") return.',
    ],
  },
  {
    id: 'testing',
    num: '06',
    filename: 'testing.md',
    label: 'Testing',
    dot: '#f78166',
    items: [
      'Testing manual en dispositivos reales — sin suite automatizada (proyecto personal).',
      '✓ Desktop Chrome / Edge — todas las animaciones y fases.',
      '✓ Mobile iOS Safari — táctil, scroll, tipeo en cards.',
      '✓ Android Chrome — npm run dev --host sobre WiFi local.',
      '✓ Navegación entre rutas sin romper scroll ni acumular estado.',
      '✓ Resize breakpoints: 320px / 375px / 768px / 1280px / 1920px.',
      'Deuda técnica: tests unitarios Vitest + E2E Playwright pendientes.',
    ],
  },
  {
    id: 'cicd',
    num: '07',
    filename: 'ci-cd.md',
    label: 'CI/CD',
    dot: '#39d353',
    items: [
      'Pipeline actual: código → npm run dev (HMR) → revisión visual → npm run build → preview.',
      'Vite bundlea en dist/ con tree-shaking automático.',
      'npm run preview sirve dist/ local en :4173 para validar build antes de deploy.',
      'Próximo paso: GitHub Actions para auto-deploy a Vercel en push a main.',
    ],
  },
  {
    id: 'deploy',
    num: '08',
    filename: 'deploy.md',
    label: 'Deploy',
    dot: '#58a6ff',
    items: [
      'Estado actual: desarrollo local + acceso LAN con --host sobre WiFi.',
      'Target: Vercel o Netlify — sitio 100% estático, sin servidor.',
      'Requiere vercel.json con rewrite /* → /index.html para SPA routing.',
      'build output: dist/ ~180kb JS · ~25kb CSS · imágenes optimizadas.',
    ],
  },
  {
    id: 'monitoreo',
    num: '09',
    filename: 'monitoreo.md',
    label: 'Monitoreo',
    dot: '#bc8cff',
    items: [
      'Uptime: Vercel dashboard — meta 99.9%.',
      'Performance: Lighthouse — objetivo score > 90 en todas las categorías.',
      'Core Web Vitals: LCP < 2.5s · FID < 100ms · CLS < 0.1.',
      'Analytics: Vercel Analytics (free tier) — visitas únicas, bounce rate, países.',
    ],
  },
  {
    id: 'mantenimiento',
    num: '10',
    filename: 'mantenimiento.md',
    label: 'Mantenimiento y Evolución',
    dot: '#f0a070',
    items: [
      'Backlog: agregar proyectos nuevos · actualizar certificados · versión en inglés.',
      'Decisión técnica: CSS grid-template-rows vs max-height → grid no necesita valor fijo arbitrario.',
      'Decisión técnica: React state machine vs CSS :hover → mobile táctil no tiene hover real.',
      'Decisión técnica: location.state.scrollTo vs sessionStorage → nativo de React Router, más limpio.',
      'Ciclo: cada nuevo proyecto o certificado → actualizar data/ → build → deploy.',
    ],
  },
]

function PhaseNode({ phase, isLast }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-[19px] top-9 bottom-0 w-px bg-white/[0.08]" />
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className={`relative w-full flex items-center gap-2 py-2.5 px-2.5 rounded-lg transition-colors duration-150 group text-left
          ${open ? 'bg-white/[0.06]' : 'hover:bg-white/[0.05]'}`}
      >
        <ChevronRight
          size={13}
          className={`shrink-0 transition-transform duration-200
            ${open ? 'rotate-90 text-white/70' : 'text-white/40 group-hover:text-white/70'}`}
        />

        <span
          className="w-2 h-2 rounded-full shrink-0 ring-1 transition-opacity group-hover:opacity-100"
          style={{
            backgroundColor: phase.dot,
            boxShadow: `0 0 6px ${phase.dot}88`,
          }}
        />

        <span className={`font-mono text-[12px] lg:text-[13px] flex-1 min-w-0 truncate transition-colors
          ${open ? 'text-[#9cdcfe]' : 'text-white/80 group-hover:text-white'}`}>
          {phase.filename}
        </span>

        <span className="font-mono text-[10px] lg:text-[11px] shrink-0 ml-2 tabular-nums text-white/40 group-hover:text-white/60 transition-colors">
          {phase.num}
        </span>
      </button>

      <div className={`exp-body ${open ? 'open' : ''}`}>
        <div>
          <div className="ml-8 mb-2 pl-3 border-l border-[#4ec9b0]/25">
            <p className="font-mono text-[10px] lg:text-[11px] text-[#f0a070]/80 mb-2.5 mt-2">
              {'// '}{phase.label}
            </p>
            <div className="space-y-2 mb-2">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-white/25 shrink-0 mt-[3px] select-none">
                    {i === phase.items.length - 1 ? '└─' : '├─'}
                  </span>
                  <p className="font-mono text-[11px] lg:text-[12px] text-white/60 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SDLCPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto px-8 lg:px-16 pt-12 pb-32">

      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
          className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors mb-6 flex items-center gap-1"
        >
          ← volver a proyectos
        </button>

        <h1 className="font-sans text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-none mb-3">
          Este Portfolio
        </h1>
        <p className="font-mono text-[13px] lg:text-[14px] text-[#4ec9b0]">
          Ciclo de Desarrollo de Software · 25 mayo – 14 junio 2026
        </p>
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['React 19', 'Vite 8', 'Tailwind CSS v3', 'React Router v7', '~3 semanas', 'solo dev'].map(b => (
          <span key={b} className="font-mono text-[10px] px-2 py-[2px] rounded bg-white/[0.05] border border-white/[0.09] text-white/40">
            {b}
          </span>
        ))}
      </div>

      {/* Explorer */}
      <div className="bg-white/[0.04] border border-white/[0.09] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.03] select-none">
          <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest">EXPLORER</span>
          <span className="font-mono text-[10px] text-white/20">›</span>
          <span className="font-mono text-[10px] text-[#4ec9b0]/60">portfolio</span>
          <span className="font-mono text-[10px] text-white/20">/</span>
          <span className="font-mono text-[10px] text-white/40">sdlc · 10 fases</span>
        </div>

        <div className="p-2">
          {PHASES.map((phase, i) => (
            <PhaseNode key={phase.id} phase={phase} isLast={i === PHASES.length - 1} />
          ))}
        </div>
      </div>

    </div>
  )
}
