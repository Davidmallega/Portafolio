import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const PHASES = [
  {
    id: 'ers',
    num: '01',
    filename: 'Especificacion-Requisitos',
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
    labelEn: 'SRS — Software Requirements Specification',
    itemsEn: [
      'RF-01: Hero with name, role, brand-icon skills and training stats.',
      'RF-02: Expandable work experience timeline in VS Code Explorer style.',
      'RF-03: Project cards with compile animation and description typing effect.',
      'RF-04: Certificates page with push → request → done phases and progress bars.',
      'RF-05: Contact section with interactive card (mouse varnish effect).',
      'RNF-01: VS Code aesthetic — bg #0d0d0f, teal accent #4ec9b0, mono font.',
      'RNF-02: Native CSS animations + React state, no external libraries.',
      'RNF-03: 100% static — no backend, deployable on any CDN.',
    ],
  },
  {
    id: 'analisis',
    num: '02',
    filename: 'Análisis',
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
    labelEn: 'Analysis',
    itemsEn: [
      'US-01: As a visitor, see who David is at a glance — minimal hero with photo and bio.',
      'US-02: As a recruiter, explore work experience in a visual and interactive way.',
      'US-03: As a dev, view projects with stack and links in a non-boring way.',
      'US-04: As a mobile visitor, everything works perfectly on phone.',
      'Domain: 5 sections — hero, experience, projects, certificates, contact.',
      'Static data in /src/data/ → projects.js, certificates.js, badges.js.',
      'Custom hook useReveal for IntersectionObserver scroll animations.',
    ],
  },
  {
    id: 'diseno',
    num: '03',
    filename: 'Diseño-Sistema',
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
    labelEn: 'System Design',
    itemsEn: [
      'Component architecture: App → TopBar, Home (Hero/Experience/Projects/Contact), /certificates, /sdlc.',
      'Palette: bg #0d0d0f · teal #4ec9b0 · yellow #e8d88a · red #ff6b6b · orange #f0a070.',
      'Section headers ~/name in teal — VS Code consistency across all sections.',
      'grid-template-rows: 0fr → 1fr for smooth expand/collapse without calculating heights.',
      'Fixed bottom StatusBar: active errors, git branch, location — just like VS Code.',
      'Tabs without .js extension on mobile so they fit on small screens.',
    ],
  },
  {
    id: 'planificacion',
    num: '04',
    filename: 'Planificación',
    label: 'Planificación',
    dot: '#d29922',
    items: [
      'Metodología: Kanban personal · iteraciones diarias · sin sprints formales.',
      'Sem 1 (25–31 mayo): Setup Vite + Tailwind · TopBar + StatusBar · Hero · Projects cards.',
      'Sem 2 (1–7 junio): Experience VS Code Explorer · Certificates página · Hero redesign · iconos.',
      'Sem 3 (8–14 junio): Fixes mobile · tipeo en certs · barras progresivas · badges · freelance entry.',
      'Stack: React 19 · Vite 8 · Tailwind CSS v3 · React Router DOM v7 · react-icons · lucide-react.',
    ],
    labelEn: 'Planning',
    itemsEn: [
      'Methodology: personal Kanban · daily iterations · no formal sprints.',
      'Week 1 (May 25–31): Vite + Tailwind setup · TopBar + StatusBar · Hero · Project cards.',
      'Week 2 (Jun 1–7): Experience VS Code Explorer · Certificates page · Hero redesign · icons.',
      'Week 3 (Jun 8–14): Mobile fixes · cert typing · progressive bars · badges · freelance entry.',
      'Stack: React 19 · Vite 8 · Tailwind CSS v3 · React Router DOM v7 · react-icons · lucide-react.',
    ],
  },
  {
    id: 'desarrollo',
    num: '05',
    filename: 'Implementación',
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
    labelEn: 'Implementation / Development',
    itemsEn: [
      'Custom Hook useReveal → IntersectionObserver for scroll animations.',
      'State machine per card: idle | pushing | request | done phases in Certificates.',
      'Typing effect: setInterval at 22ms/char to simulate real-time typing.',
      'CSS grid trick: grid-template-rows 0fr/1fr for animated height without JavaScript.',
      'Route-aware scroll: location.state.scrollTo to navigate to specific section.',
      'Bug fix: doneCount accumulated across routes → reset in useEffect when pathname === "/".',
      'Bug fix: touch mobile opened modal immediately → guard if (phase !== "idle") return.',
    ],
  },
  {
    id: 'testing',
    num: '06',
    filename: 'Testing',
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
    labelEn: 'Testing',
    itemsEn: [
      'Manual testing on real devices — no automated suite (personal project).',
      '✓ Desktop Chrome / Edge — all animations and phases.',
      '✓ Mobile iOS Safari — touch, scroll, card typing.',
      '✓ Android Chrome — npm run dev --host over local WiFi.',
      '✓ Cross-route navigation without breaking scroll or accumulating state.',
      '✓ Resize breakpoints: 320px / 375px / 768px / 1280px / 1920px.',
      'Tech debt: Vitest unit tests + Playwright E2E pending.',
    ],
  },
  {
    id: 'cicd',
    num: '07',
    filename: 'CI-CD',
    label: 'CI/CD',
    dot: '#39d353',
    items: [
      'Pipeline local: npm run dev (HMR) → revisión visual → npm run build → npm run preview.',
      'Vite bundlea en dist/ con tree-shaking automático.',
      'Pipeline en producción: git push → GitHub → Vercel auto-deploy en ~30s.',
      'Sin GitHub Actions configuradas — la integración nativa Vercel ↔ GitHub lo maneja.',
      'Rama main protegida como rama de producción — cada merge dispara un deploy.',
    ],
    labelEn: 'CI/CD',
    itemsEn: [
      'Local pipeline: npm run dev (HMR) → visual review → npm run build → npm run preview.',
      'Vite bundles to dist/ with automatic tree-shaking.',
      'Production pipeline: git push → GitHub → Vercel auto-deploy in ~30s.',
      'No GitHub Actions configured — the native Vercel ↔ GitHub integration handles it.',
      'Main branch protected as production branch — every merge triggers a deploy.',
    ],
  },
  {
    id: 'deploy',
    num: '08',
    filename: 'Deploy',
    label: 'Deploy',
    dot: '#58a6ff',
    items: [
      'Plataforma: Vercel Hobby — sitio 100% estático, CDN global, HTTPS automático.',
      'URL de producción: davidmallega.vercel.app',
      'vercel.json con rewrite /* → /index.html para SPA routing (React Router DOM).',
      'Build output: dist/ — JS tree-shaken · CSS purged · imágenes optimizadas.',
      'Decisión Vercel vs Firebase Hosting: Vercel integra GitHub de forma nativa sin configuración extra.',
    ],
    labelEn: 'Deploy',
    itemsEn: [
      'Platform: Vercel Hobby — 100% static site, global CDN, automatic HTTPS.',
      'Production URL: davidmallega.vercel.app',
      'vercel.json with /* → /index.html rewrite for SPA routing (React Router DOM).',
      'Build output: dist/ — tree-shaken JS · purged CSS · optimized images.',
      'Decision Vercel vs Firebase Hosting: Vercel integrates GitHub natively with no extra config.',
    ],
  },
  {
    id: 'monitoreo',
    num: '09',
    filename: 'Monitoreo',
    label: 'Monitoreo',
    dot: '#bc8cff',
    items: [
      'Uptime: Vercel dashboard — meta 99.9%.',
      'Performance: Lighthouse — objetivo score > 90 en todas las categorías.',
      'Core Web Vitals: LCP < 2.5s · FID < 100ms · CLS < 0.1.',
      'Analytics: Vercel Analytics (free tier) — visitas únicas, bounce rate, países.',
    ],
    labelEn: 'Monitoring',
    itemsEn: [
      'Uptime: Vercel dashboard — target 99.9%.',
      'Performance: Lighthouse — target score > 90 in all categories.',
      'Core Web Vitals: LCP < 2.5s · FID < 100ms · CLS < 0.1.',
      'Analytics: Vercel Analytics (free tier) — unique visits, bounce rate, countries.',
    ],
  },
  {
    id: 'mantenimiento',
    num: '10',
    filename: 'Mantenimiento',
    label: 'Mantenimiento y Evolución',
    dot: '#f0a070',
    items: [
      'Ciclo activo: editar data/ → git push → Vercel auto-deploy en ~30s.',
      'Backlog: versión en inglés para alcance internacional · proyectos nuevos · certificados.',
      'Versión EN: mismos componentes, textos externalizados a un objeto i18n — sin librerías.',
      'Decisión técnica: CSS grid-template-rows vs max-height → grid no necesita valor fijo arbitrario.',
      'Decisión técnica: React state machine vs CSS :hover → mobile táctil no tiene hover real.',
      'Decisión técnica: Vercel vs Firebase Hosting → Vercel sin config extra, deploy desde GitHub.',
    ],
    labelEn: 'Maintenance & Evolution',
    itemsEn: [
      'Active cycle: edit data/ → git push → Vercel auto-deploy in ~30s.',
      'Backlog: English version for international reach · new projects · certificates.',
      'EN version: same components, texts externalized to an i18n object — no libraries.',
      'Tech decision: CSS grid-template-rows vs max-height → grid needs no fixed arbitrary value.',
      'Tech decision: React state machine vs CSS :hover → mobile touch has no real hover.',
      'Tech decision: Vercel vs Firebase Hosting → Vercel with no extra config, deploy from GitHub.',
    ],
  },
]

function PhaseNode({ phase, isLast, lang }) {
  const [open, setOpen] = useState(false)
  const items = lang === 'en' && phase.itemsEn ? phase.itemsEn : phase.items
  const label = lang === 'en' && phase.labelEn ? phase.labelEn : phase.label

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
              {'// '}{label}
            </p>
            <div className="space-y-2 mb-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-white/25 shrink-0 mt-[3px] select-none">
                    {i === items.length - 1 ? '└─' : '├─'}
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
  const { lang, t } = useLang()

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto px-8 lg:px-16 pt-12 pb-32">

      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
          className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors mb-6 flex items-center gap-1"
        >
          {t.sdlc.back}
        </button>

        <h1 className="font-sans text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-none mb-3">
          {lang === 'en' ? 'This Portfolio' : 'Este Portfolio'}
        </h1>
        <p className="font-mono text-[13px] lg:text-[14px] text-[#4ec9b0]">
          {t.sdlc.subtitle}
        </p>
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['React 19', 'Vite 8', 'Tailwind CSS v3', 'React Router v7', lang === 'en' ? '~3 weeks' : '~3 semanas', 'solo dev'].map(b => (
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
          <span className="font-mono text-[10px] text-white/40">{t.sdlc.explorerPath}</span>
        </div>

        <div className="p-2">
          {PHASES.map((phase, i) => (
            <PhaseNode key={phase.id} phase={phase} isLast={i === PHASES.length - 1} lang={lang} />
          ))}
        </div>
      </div>

    </div>
  )
}
