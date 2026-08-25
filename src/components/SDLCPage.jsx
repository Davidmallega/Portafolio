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
      'RF-06: Chat IA en /about — respuestas hardcodeadas + fallback Gemini 2.5 Flash.',
      'RF-07: Badges Credly verificados con modal de certificado local (ver certificado).',
      'RF-08: Filtro de institución por iconos sobre grilla de certificados.',
      'RF-09: Portfolio bilingüe ES/EN — mismo componente, textos externalizados a i18n.',
      'RNF-01: Estética VS Code — fondo #0d0d0f, acento teal #4ec9b0, fuente mono.',
      'RNF-02: Animaciones CSS nativo + React state, sin librerías de animación.',
      'RNF-03: Sin backend propio — Gemini API como único servicio externo opcional.',
    ],
    labelEn: 'SRS — Software Requirements Specification',
    itemsEn: [
      'RF-01: Hero with name, role, brand-icon skills and training stats.',
      'RF-02: Expandable work experience timeline in VS Code Explorer style.',
      'RF-03: Project cards with compile animation and description typing effect.',
      'RF-04: Certificates page with push → request → done phases and progress bars.',
      'RF-05: Contact section with interactive card (mouse varnish effect).',
      'RF-06: AI chat on /about — hardcoded responses + Gemini 2.5 Flash fallback.',
      'RF-07: Verified Credly badges with local certificate modal (ver certificado).',
      'RF-08: Institution icon filter above the certificates grid.',
      'RF-09: Bilingual portfolio ES/EN — same components, texts in i18n object.',
      'RNF-01: VS Code aesthetic — bg #0d0d0f, teal accent #4ec9b0, mono font.',
      'RNF-02: Native CSS animations + React state, no animation libraries.',
      'RNF-03: No own backend — Gemini API as the only optional external service.',
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
      'HU-05: Como reclutador internacional, poder leer el portfolio en inglés.',
      'HU-06: Como visitante, preguntar sobre David a través de un chat IA.',
      'Dominio: 6 secciones — hero, experience, projects, certificates, about (chat), contact.',
      'Datos estáticos en /src/data/ → projects.js, certificates.js, badges.js, chatbot.js.',
      'Custom hook useReveal para IntersectionObserver en animaciones de scroll.',
      'LanguageContext + strings.js para i18n ES/EN sin librerías.',
    ],
    labelEn: 'Analysis',
    itemsEn: [
      'US-01: As a visitor, see who David is at a glance — minimal hero with photo and bio.',
      'US-02: As a recruiter, explore work experience in a visual and interactive way.',
      'US-03: As a dev, view projects with stack and links in a non-boring way.',
      'US-04: As a mobile visitor, everything works perfectly on phone.',
      'US-05: As an international recruiter, read the portfolio in English.',
      'US-06: As a visitor, ask questions about David through an AI chat.',
      'Domain: 6 sections — hero, experience, projects, certificates, about (chat), contact.',
      'Static data in /src/data/ → projects.js, certificates.js, badges.js, chatbot.js.',
      'Custom hook useReveal for IntersectionObserver scroll animations.',
      'LanguageContext + strings.js for ES/EN i18n without libraries.',
    ],
  },
  {
    id: 'diseno',
    num: '03',
    filename: 'Diseño-Sistema',
    label: 'Diseño del Sistema',
    dot: '#bc8cff',
    items: [
      'Arquitectura: App → TopBar, Home (Hero/Experience/Projects/Contact), /certificates, /about (ChatWindow), /sdlc.',
      'ChatWindow: componente reutilizable — usado en Hero (modal) y /about (página completa).',
      'i18n: LanguageContext + strings.js — mismo JSX, idioma como estado global.',
      'Paleta: bg #0d0d0f · teal #4ec9b0 · yellow #e8d88a · red #ff6b6b · orange #f0a070.',
      'Headers ~/sección en teal — coherencia VS Code en todas las secciones.',
      'grid-template-rows: 0fr → 1fr para expand/collapse suave sin calcular alturas.',
      'StatusBar inferior fija: errores activos, rama git, ubicación — igual que VS Code.',
      'createPortal en PreviewModal para renderizar sobre el DOM raíz.',
    ],
    labelEn: 'System Design',
    itemsEn: [
      'Architecture: App → TopBar, Home (Hero/Experience/Projects/Contact), /certificates, /about (ChatWindow), /sdlc.',
      'ChatWindow: reusable component — used in Hero (modal) and /about (full page).',
      'i18n: LanguageContext + strings.js — same JSX, language as global state.',
      'Palette: bg #0d0d0f · teal #4ec9b0 · yellow #e8d88a · red #ff6b6b · orange #f0a070.',
      'Section headers ~/name in teal — VS Code consistency across all sections.',
      'grid-template-rows: 0fr → 1fr for smooth expand/collapse without calculating heights.',
      'Fixed bottom StatusBar: active errors, git branch, location — just like VS Code.',
      'createPortal in PreviewModal to render above the root DOM.',
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
      'Sem 1 (25–31 may): Setup Vite + Tailwind · TopBar + StatusBar · Hero · Project cards.',
      'Sem 2 (1–7 jun): Experience VS Code Explorer · Certificates · Hero redesign · iconos.',
      'Sem 3 (8–14 jun): Fixes mobile · tipeo en certs · barras progresivas · badges Credly.',
      'Sem 4–6 (15 jun – 5 jul): i18n ES/EN · LanguageContext · strings.js · Chat IA con Gemini.',
      'Sem 7–9 (6–26 jul): Badges "ver certificado" · nuevos certs Google/Coursera · Ethical Hacker.',
      'Sem 10–12 (27 jul – 19 ago): Python Essentials 1&2 · JS Moderno · filtro institución · LogTrans MVP · chatbot bilingüe · bug fixes críticos.',
      'Stack: React 19 · Vite 8 · Tailwind CSS v3 · React Router DOM v7 · react-icons · lucide-react.',
    ],
    labelEn: 'Planning',
    itemsEn: [
      'Methodology: personal Kanban · daily iterations · no formal sprints.',
      'Week 1 (May 25–31): Vite + Tailwind setup · TopBar + StatusBar · Hero · Project cards.',
      'Week 2 (Jun 1–7): Experience VS Code Explorer · Certificates page · Hero redesign · icons.',
      'Week 3 (Jun 8–14): Mobile fixes · cert typing · progressive bars · Credly badges.',
      'Week 4–6 (Jun 15 – Jul 5): i18n ES/EN · LanguageContext · strings.js · AI chat with Gemini.',
      'Week 7–9 (Jul 6–26): Badges "ver certificado" · new Google/Coursera certs · Ethical Hacker.',
      'Week 10–12 (Jul 27 – Aug 19): Python Essentials 1&2 · JS Moderno · institution filter · LogTrans MVP · bilingual chatbot · critical bug fixes.',
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
      'ChatWindow: resolveLocal() con norm() para triggers sin tildes + fallback Gemini API.',
      'detectLang(): detección de idioma por palabras clave ES → elige response o responseEn.',
      'Bug fix: doneCount acumulaba entre rutas → cambiado a Set de IDs compilados.',
      'Bug fix: overflow:hidden en PreviewModal causaba scroll-jump → cambiado a position:fixed.',
      'Bug fix: scroll perdido al cerrar chat modal → useRef guarda scrollY antes de bloquear.',
      'Bug fix: iOS Safari zoom al enfocar input → font-size text-[16px] en mobile.',
      'Bug fix: Gemini fetch sin try/catch → typing indicator quedaba bloqueado en error de red.',
    ],
    labelEn: 'Implementation / Development',
    itemsEn: [
      'Custom Hook useReveal → IntersectionObserver for scroll animations.',
      'State machine per card: idle | pushing | request | done phases in Certificates.',
      'Typing effect: setInterval at 22ms/char to simulate real-time typing.',
      'CSS grid trick: grid-template-rows 0fr/1fr for animated height without JavaScript.',
      'Route-aware scroll: location.state.scrollTo to navigate to specific section.',
      'ChatWindow: resolveLocal() with norm() for accent-insensitive triggers + Gemini API fallback.',
      'detectLang(): language detection by ES keyword match → picks response or responseEn.',
      'Bug fix: doneCount accumulated across routes → changed to Set of compiled IDs.',
      'Bug fix: overflow:hidden on PreviewModal caused scroll-jump → changed to position:fixed.',
      'Bug fix: scroll position lost when closing chat modal → useRef saves scrollY before locking.',
      'Bug fix: iOS Safari zoom on input focus → font-size text-[16px] on mobile.',
      'Bug fix: Gemini fetch without try/catch → typing indicator stuck on network error.',
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
      'Implementado: versión EN completa — LanguageContext, strings.js, responseEn en chatbot.',
      'Implementado: Chat IA bilingüe — 18 respuestas hardcodeadas + fallback Gemini 2.5 Flash.',
      'Implementado: filtro de institución con iconos (Google, Cisco, IBM, Udemy, IACC, etc.).',
      'Implementado: LogTrans MVP en proyectos y experiencia (cliente real, ago 2026).',
      'Decisión técnica: position:fixed vs overflow:hidden para scroll lock → evita scroll-jump.',
      'Decisión técnica: Set de IDs vs contador para builds — inmune a eventos duplicados.',
      'Decisión técnica: Gemini API como fallback opcional — chatbot funciona sin API key.',
    ],
    labelEn: 'Maintenance & Evolution',
    itemsEn: [
      'Active cycle: edit data/ → git push → Vercel auto-deploy in ~30s.',
      'Implemented: full EN version — LanguageContext, strings.js, responseEn in chatbot.',
      'Implemented: bilingual AI chat — 18 hardcoded responses + Gemini 2.5 Flash fallback.',
      'Implemented: institution filter with icons (Google, Cisco, IBM, Udemy, IACC, etc.).',
      'Implemented: LogTrans MVP in projects and experience (real client, Aug 2026).',
      'Tech decision: position:fixed vs overflow:hidden for scroll lock → prevents scroll-jump.',
      'Tech decision: Set of IDs vs counter for builds — immune to duplicate events.',
      'Tech decision: Gemini API as optional fallback — chatbot works without API key.',
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
