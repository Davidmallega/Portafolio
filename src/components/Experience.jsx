import { useState } from 'react'
import { ChevronRight, Download } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../context/LanguageContext'

const JOBS = [
  {
    id: 'freelance',
    filename: 'freelance-developer',
    role: 'Desarrollador Freelance',
    period: 'may 2026',
    dot: '#c792ea',
    items: [
      'Desarrollé aplicación de control de gastos para empresa del rubro gastronómico con React + Vite + Electron.',
      'Implementé módulos de registro, categorización y visualización de egresos adaptados al flujo del negocio.',
      'Empaquetté e instalé la app como ejecutable de escritorio (.exe) en los equipos del cliente.',
    ],
    itemsEn: [
      'Developed an expense tracking app for a food service company using React + Vite + Electron.',
      'Built modules for recording, categorizing and visualizing expenses tailored to the business workflow.',
      'Packaged and installed the app as a desktop executable (.exe) on client machines.',
    ],
  },
  {
    id: 'dev-fullstack',
    filename: 'desarrollador-fullstack',
    role: 'Desarrollador Fullstack — Práctica Profesional',
    period: 'dic 2025 – feb 2026',
    dot: '#61dafb',
    items: [
      'Desarrollé sistema de control de inventario desde cero con React + Vite + MySQL, desplegado en entorno productivo.',
      'Diseñé modelo de base de datos relacional en MySQL y API REST para operaciones CRUD de productos y stock.',
      'Implementé interfaz responsive con validaciones en tiempo real y módulo de reportes de inventario.',
    ],
    itemsEn: [
      'Built an inventory control system from scratch with React + Vite + MySQL, deployed in production.',
      'Designed a relational database model in MySQL and a REST API for CRUD operations on products and stock.',
      'Implemented a responsive interface with real-time validations and an inventory reporting module.',
    ],
  },
  {
    id: 'analista-ti',
    filename: 'analista-implementacion-ti',
    role: 'Analista de Implementación TI / Soporte Técnico',
    period: 'ene 2026 – presente',
    dot: '#4ec9b0',
    items: [
      'Implementé sistema de control de asistencia GeoVictoria, configurando turnos complejos y permisos de seguridad.',
      'Preparé y configuré estaciones de trabajo (formateo, SO, red) en rollout de infraestructura.',
      'Importé y depuré bases de datos masivas de trabajadores, garantizando integridad de la información.',
      'Capacité a usuarios finales y resolví incidencias técnicas nivel 2.',
    ],
    itemsEn: [
      'Implemented GeoVictoria attendance system, configuring complex shifts and security permissions.',
      'Prepared and configured workstations (formatting, OS, networking) in infrastructure rollout.',
      'Imported and cleaned large employee databases, ensuring data integrity.',
      'Trained end users and resolved level-2 technical incidents.',
    ],
  },
  {
    id: 'admin-web',
    filename: 'admin-web-wordpress',
    role: 'Administrador Web WordPress',
    period: 'ene 2020 – presente',
    dot: '#e8d88a',
    items: [
      'Diseñé y mantuve sitios web y landing pages en producción con WordPress + Elementor, con foco en SEO y UX.',
      'Administré ciclo completo de actualizaciones de núcleo, temas y plugins, asegurando disponibilidad y seguridad.',
    ],
    itemsEn: [
      'Designed and maintained production websites and landing pages with WordPress + Elementor, focused on SEO and UX.',
      'Managed the full update cycle for core, themes and plugins, ensuring availability and security.',
    ],
  },
  {
    id: 'admin-general',
    filename: 'administrador-general',
    role: 'Administrador General',
    period: 'oct 2015 – presente',
    dot: '#f0a070',
    items: [
      'Supervisé operaciones financieras y ejecuté cruces de compra/venta durante más de 10 años de gestión continua.',
      'Desarrollé reportes avanzados en Excel para control de costos, remuneraciones y KPIs operativos.',
      'Gestioné ciclo completo de personal: comunicaciones internas, remuneraciones, asistencia y beneficios.',
      'Administré sistema de ventas Sofía, garantizando integridad de datos y cierres diarios.',
    ],
    itemsEn: [
      'Supervised financial operations and executed buy/sell reconciliations over 10+ years of continuous management.',
      'Developed advanced Excel reports for cost control, payroll and operational KPIs.',
      'Managed the full personnel cycle: internal communications, payroll, attendance and benefits.',
      'Administered the Sofía sales system, ensuring data integrity and daily closings.',
    ],
  },
]

function JobNode({ job, isLast, lang }) {
  const [open, setOpen] = useState(false)
  const items = lang === 'en' && job.itemsEn ? job.itemsEn : job.items

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
            backgroundColor: job.dot,
            boxShadow: `0 0 6px ${job.dot}88`,
            ringColor: `${job.dot}44`,
          }}
        />

        <span className={`font-mono text-[12px] lg:text-[13px] flex-1 min-w-0 truncate transition-colors
          ${open ? 'text-[#9cdcfe]' : 'text-white/80 group-hover:text-white'}`}>
          {job.filename}
        </span>

        <span className="font-mono text-[10px] lg:text-[11px] shrink-0 ml-2 tabular-nums text-white/40 group-hover:text-white/60 transition-colors">
          {job.period}
        </span>
      </button>

      <div className={`exp-body ${open ? 'open' : ''}`}>
        <div>
          <div className="ml-8 mb-2 pl-3 border-l border-[#4ec9b0]/25">
            <p className="font-mono text-[10px] lg:text-[11px] text-[#f0a070]/80 mb-2.5 mt-2">
              {'// '}{job.role}
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

export default function Experience() {
  const ref = useReveal()
  const { lang, t } = useLang()

  return (
    <section
      id="experience"
      className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pb-20 lg:pb-28"
    >
      <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-5 lg:mb-7 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
        <span className="text-white/20 select-none">~/</span>{t.experience.header}
        <a
          href="/cv-david-mallega.pdf"
          download
          className="normal-case font-mono text-[11px] px-3 py-[4px] rounded bg-[#4ec9b0]/10 border border-[#4ec9b0]/20 text-[#4ec9b0]/60 hover:text-[#4ec9b0] hover:border-[#4ec9b0]/40 transition-colors flex items-center gap-1 shrink-0"
          onClick={e => e.stopPropagation()}
        >
          <Download size={10} />
          cv
        </a>
      </p>

      <div ref={ref} className="reveal bg-white/[0.04] border border-white/[0.09] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.03] select-none">
          <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest">EXPLORER</span>
          <span className="font-mono text-[10px] text-white/20">›</span>
          <span className="font-mono text-[10px] text-[#4ec9b0]/60">{t.experience.explorerLabel}</span>
          <span className="font-mono text-[10px] text-white/20">/</span>
          <span className="font-mono text-[10px] text-white/40">{t.experience.explorerPath}</span>
        </div>

        <div className="p-2">
          {JOBS.map((job, i) => (
            <JobNode key={job.id} job={job} isLast={i === JOBS.length - 1} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
