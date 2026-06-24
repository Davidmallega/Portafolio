// ─── Datos del chatbot "Habla con David" ───────────────────────────────────

export const DAVID_INFO = {
  name: 'David Mallega',
  role: 'Fullstack Developer',
  location: 'Santiago, Chile',
  available: true,
}

// ─── System prompt para Gemini (fallback) ──────────────────────────────────
export const SYSTEM_PROMPT = `Eres David Mallega, Fullstack Developer de Santiago, Chile.
Respondes preguntas de reclutadores y visitantes de tu portfolio personal.
Sé directo, cercano y profesional. Responde siempre en primera persona.
No inventes información — si no sabes algo específico, di que prefieren que te contacten directamente.
Máximo 3 oraciones por respuesta. Sin emojis. Sin listas.

=== CONTACTO Y PERFILES ===
- GitHub: https://github.com/Davidmallega
- LinkedIn: https://www.linkedin.com/in/david-mallega/
- Email: david.mallega@gmail.com

=== FORMACIÓN ACADÉMICA ===
- Título oficial: Técnico de Nivel Superior en Informática — IACC, 2026, Distinción Máxima (+1.100h, 3 años)
- Diplomado Desarrollo Web — IACC 2024 (+400h): React, Node.js, HTML, CSS, JS, BD
- Diplomado Programación Avanzada — IACC 2024 (+300h): patrones de diseño, arquitectura, algoritmos
- Diplomado Fundamentos de Programación y BD — IACC 2024 (+400h): lógica, SQL, modelado

=== CERTIFICACIONES VERIFICADAS (badges Credly) ===
- Introduction to Cybersecurity — Cisco 2026 (+40h)
- AI Fundamentals with IBM SkillsBuild — Cisco + IBM 2026 (+40h)
- Artificial Intelligence Fundamentals — IBM SkillsBuild 2026
- Gestión de Proyectos y Agile — Open Academy 2025
- JavaScript — SENCE/Movistar 2025 (+40h, score 100/100)
- React Native CLI — Udemy 2026 (+33h)
Cuando pregunten por certificados, sugiere ver la pestaña de certificados del portfolio.

=== PROYECTOS DEL PORTFOLIO ===
- Inspector IA: análisis de imágenes con Gemini + Cloud Storage
- Uptime Monitor: monitoreo de URLs con Cloud Scheduler + Pub/Sub
- Propinapp: SaaS de propinas para gastronomía, 4 roles, MercadoPago, Scrum
- GastosApp: app escritorio para gastos empresariales — fue encargo de un cliente real
- SismosCL: dashboard con 42.000 sismos, BigQuery, USGS
- ObjectLens: detección de objetos con Cloud Vision API
- Clima Live: clima mundial con OpenWeatherMap + Secret Manager
- Chat Live: chat en tiempo real con Firebase/Firestore
- Transferencia Bancaria: pagos async con Pub/Sub + polling
- Mini Tienda: CRUD con API REST en Cloud Run
- Galería Cloud Storage: subida por drag & drop a GCP

=== EXPERIENCIA LABORAL ===
1. Freelance Developer (may 2026 – presente): app de control de gastos para empresa gastronómica con React + Vite + Electron, empaquetada como ejecutable .exe.
2. Desarrollador Fullstack – Práctica Profesional (dic 2025 – feb 2026): sistema de control de inventario desde cero con React + Vite + MySQL en producción. API REST, modelo relacional, interfaz responsive con reportes.
3. Analista de Implementación TI / Soporte Técnico (ene 2026 – presente): implementación de sistema GeoVictoria (asistencia), configuración de infraestructura, importación de bases de datos masivas, capacitación a usuarios, soporte nivel 2.
4. Administrador Web WordPress (ene 2020 – presente): diseño y mantenimiento de sitios y landing pages en producción con WordPress + Elementor, SEO y UX. Gestión completa de actualizaciones.
5. Administrador General (oct 2015 – presente, +10 años): supervisión de operaciones financieras, reportes avanzados Excel (costos, remuneraciones, KPIs), gestión de personal completa, administración sistema de ventas Sofía.

=== PROYECTOS EN DESARROLLO (no publicados) ===
- Sistema para empresa de transporte (cliente)
- Plataforma inmobiliaria/construcción (con 2 desarrolladores más)

=== STACK TÉCNICO COMPLETO (igual a la pestaña Skills del portfolio) ===
Lenguajes y frameworks: JavaScript, TypeScript, React, Node.js, Express, REST APIs, Python, PHP, SQL, HTML5, CSS3, Tailwind CSS
Mobile/Desktop: React Native (certificado Udemy), Electron
Cloud: GCP (Cloud Run, Pub/Sub, BigQuery, Cloud Storage, Cloud Scheduler, Secret Manager, Vertex AI, Cloud Vision), Firebase, Docker
Bases de datos: MySQL, PostgreSQL, Firestore
Herramientas: Vite, Postman, WordPress, Elementor, Excel Avanzado, Git, GitHub
Diseño: Photoshop, Illustrator
Metodologías: Scrum, Kanban, Trello
Si preguntan si sabe o maneja alguna de estas tecnologías, confirma que sí con seguridad — están todas listadas en la pestaña Skills.

=== PERFIL PERSONAL Y PROFESIONAL ===
- Último empleo: 10 años en la misma empresa
- Meta: consolidarse en empresa a largo plazo, crecer hacia arquitectura o liderazgo técnico
- Ubicación: Maipú, Santiago de Chile
- Licencia de conducir: Clase B vigente, sin vehículo propio
- Disponibilidad: 100% remoto preferido — presencial solo si es cerca de casa (sector Maipú o alrededores)
- Familia: dos hijos, Rafaela y Lucas — su pilar y motivación principal
- Hobbies: guitarra eléctrica (Ibanez JS240PS Joe Satriani), home studio, videojuegos
- Ciberseguridad: certificado Cisco, estación Kali Linux, ethical hacking y pentesting`

// ─── Respuestas hardcodeadas — orden importa: más específico primero ───────
export const RESPONSES = [

  // ── Licencia de conducir ─────────────────────────────────────────────────
  {
    id: 'license',
    triggers: [
      'licencia', 'licencia de conducir', 'carnet', 'carné',
      'conducir', 'manejar', 'clase b', 'clase a',
      'vehiculo', 'vehículo', 'auto', 'automovil', 'automóvil', 'carro',
      'movilizacion', 'movilización', 'movilidad',
      'tienes auto', 'tienes vehiculo', 'tienes movilizacion',
    ],
    response:
      'Sí, tengo licencia de conducir Clase B vigente. No tengo vehículo propio, pero la licencia está al día por si es un requisito.',
    followUp: ['¿Estás disponible para trabajar?', '¿Dónde vives?'],
  },

  // ── Ubicación ────────────────────────────────────────────────────────────
  {
    id: 'location',
    triggers: [
      'donde vives', 'dónde vives', 'donde resides', 'dónde resides',
      'donde estas', 'dónde estás', 'donde te encuentras',
      'en que ciudad', 'en qué ciudad', 'en que lugar', 'en qué lugar',
      'de donde eres', 'de dónde eres', 'de donde es', 'de dónde es',
      'ciudad', 'ubicacion', 'ubicación', 'localidad',
      'maipu', 'maipú', 'santiago', 'chile',
    ],
    response:
      'Vivo en Maipú, Santiago de Chile. Para trabajo prefiero 100% remoto — si es presencial tiene que ser cerca del sector.',
    followUp: ['¿Estás disponible para trabajar?', '¿Dónde te ves en 5 años?'],
  },

  // ── Metas y proyección ───────────────────────────────────────────────────
  {
    id: 'goals',
    triggers: [
      // con números de años
      '5 años', '3 años', '10 años',
      // sustantivos directos
      'meta', 'metas', 'objetivo', 'objetivos', 'objetivos profesionales',
      'ambicion', 'ambiciones', 'aspiracion', 'aspiraciones',
      'proyeccion', 'proposito',
      // frases compuestas
      'ves en', 'largo plazo', 'plan a largo', 'planes futuros', 'planes profesionales',
      'crecimiento profesional', 'hacia donde', 'hacia adonde',
      'buscas profesionalmente', 'buscas en tu carrera',
      'carrera profesional', 'quieres lograr', 'donde quieres estar',
      'planeas', 'te proyectas', 'te imaginas en',
      'hacia donde vas', 'quieres ser', 'futuro profesional',
      'buscas a futuro', 'qué esperas lograr', 'que esperas lograr',
    ],
    response:
      'Busco consolidarme en una empresa donde pueda aportar por años — en mi último trabajo estuve 10 años y eso refleja cómo me relaciono con el trabajo. A mediano plazo me interesa crecer hacia roles de arquitectura de software o liderazgo técnico. La estabilidad es clave para mí, tengo compromisos serios como padre y dueño de propiedades.',
    followUp: ['¿Qué aprendiste últimamente?', '¿Cómo te mantienes al día?', '¿Cuáles son tus hobbies?'],
  },

  // ── Aprendizaje reciente ─────────────────────────────────────────────────
  {
    id: 'learning',
    triggers: [
      'aprendiste', 'aprendizaje', 'aprendido', 'qué has aprendido', 'que has aprendido',
      'qué aprendiste', 'que aprendiste', 'qué aprendes', 'que aprendes',
      'ultimo año', 'último año',
      'autocritica', 'autocrítica',
      'cursos', 'ultimo curso', 'qué curso', 'que curso',
      'sigues estudiando', 'seguiste estudiando', 'sigue estudiando', 'seguir estudiando',
      'capacitacion', 'te capacitas', 'formacion continua',
      'qué sabes nuevo', 'que sabes nuevo',
      'qué tecnologia aprendiste', 'que tecnologia aprendiste',
      'ultimamente aprendiste', 'últimamente aprendiste',
    ],
    response:
      'El último año lo invertí principalmente en arquitectura cloud con GCP — servicios como Cloud Run, Pub/Sub, BigQuery y Gemini. Cada proyecto de mi portfolio nació de algo que no sabía antes de empezarlo. Aprender construyendo es lo que más me funciona.',
    followUp: ['¿Cómo te mantienes al día?', '¿Tienes proyectos personales?', '¿Dónde te ves en 5 años?'],
  },

  // ── Cómo se mantiene al día ──────────────────────────────────────────────
  {
    id: 'uptodate',
    triggers: [
      'mantienes al dia', 'mantienes al día',
      'como aprendes', 'cómo aprendes',
      'tecnologias nuevas', 'tecnologías nuevas',
      'ultimas tecnologias', 'últimas tecnologías',
      'novedades tecnologicas', 'novedades tecnológicas',
      'tendencias', 'tendencia', 'sigues tendencias',
      'noticias tech', 'qué lees', 'que lees',
      'qué ves', 'que ves', 'qué escuchas', 'que escuchas',
      'comunidades', 'blogs', 'te informas', 'al tanto',
      'actualizas', 'actualizarte', 'te actualizas',
      'estudias nuevas', 'estudias tecnologias',
    ],
    response:
      'Construyendo cosas. Cuando algo me llama la atención lo implemento de cero — así nacieron la mayoría de los proyectos de mi portfolio. También sigo documentación oficial y comunidades técnicas. Para mí leer sin tocar el teclado no es suficiente.',
    followUp: ['¿Tienes proyectos personales?', '¿Cuál es tu stack?', '¿Qué aprendiste últimamente?'],
  },

  // ── Hobbies ──────────────────────────────────────────────────────────────
  {
    id: 'hobbies',
    triggers: [
      'hobby', 'hobbies', 'pasatiempo', 'pasatiempos', 'aficion', 'aficiones',
      'tiempo libre', 'ratos libres',
      'fuera del trabajo', 'fuera de la pc', 'fuera del pc', 'fuera de la computadora',
      'qué te gusta', 'que te gusta',
      'qué disfrutas', 'que disfrutas',
      'qué haces cuando no trabajas', 'que haces cuando no trabajas',
      'qué haces en tu tiempo', 'que haces en tu tiempo',
      'qué haces los fines de semana', 'que haces los fines de semana',
      'te entretienes', 'como te entretienes',
      'qué haces para divertirte', 'que haces para divertirte',
      'ocio', 'musica', 'música',
      'guitarra', 'tocar guitarra',
      'videojuegos', 'juegos', 'gaming', 'gamer',
      'consola', 'playstation', 'xbox', 'pc gaming',
      'intereses personales', 'qué te apasiona fuera', 'que te apasiona fuera',
    ],
    response:
      'Toco guitarra eléctrica — tengo una Ibanez JS240PS firma de Joe Satriani y un home studio con monitores KRK Rokit 5 e interfaz AXE I/O de IK Multimedia. Cuando no estoy grabando, estoy en los videojuegos. Tengo consolas y me lo tomo en serio, igual que el desarrollo.',
    followUp: ['¿Cómo desconectas del trabajo?', '¿Cuál es tu setup?', 'Setup musical'],
  },

  // ── Desconexión / equilibrio ──────────────────────────────────────────────
  {
    id: 'disconnect',
    triggers: [
      'desconectas', 'desconecto', 'como descansas', 'cómo descansas',
      'descanso', 'descansar', 'te tomas descanso',
      'equilibrio', 'balance', 'work life balance', 'vida laboral',
      'burnout', 'estres', 'estrés', 'presion laboral', 'presión laboral',
      'manejas el estres', 'manejas la presion',
      'relajas', 'te relajas', 'tiempo para ti',
      'vida fuera', 'horas extra', 'overtime',
      'ritmo de trabajo', 'te cansas', 'carga de trabajo',
    ],
    response:
      'Tocar guitarra o poner un videojuego. Tengo setups dedicados para cada cosa y separo bien el tiempo — con los compromisos que tengo como padre eso no es opcional, es necesario. Descansar bien es lo que me permite mantener la concentración cuando trabajo.',
    followUp: ['¿Cuáles son tus hobbies?', '¿Dónde te ves en 5 años?'],
  },

  // ── Proyectos personales / en desarrollo ─────────────────────────────────
  {
    id: 'sideprojects',
    triggers: [
      'proyecto personal', 'proyectos personales', 'proyectos propios',
      'open source', 'codigo abierto', 'código abierto',
      'side project', 'side projects',
      'proyectos actuales', 'proyectos fuera',
      'en qué trabajas', 'en que trabajas',
      'qué estás desarrollando', 'que estas desarrollando',
      'qué proyectos tienes', 'que proyectos tienes',
      'qué construyes', 'que construyes',
      'qué desarrollas', 'que desarrollas',
      'qué estás haciendo', 'que estas haciendo',
      'en qué proyecto estás', 'en que proyecto estas',
      'qué app', 'qué apps', 'que apps',
      'qué aplicacion', 'qué aplicación', 'que aplicacion',
      'proyectos en curso', 'proyectos que traes', 'proyectos que llevas',
    ],
    response:
      'La mayoría de los proyectos del portfolio los construí por aprendizaje propio, aunque GastosApp fue para un cliente real. Actualmente tengo dos proyectos en desarrollo que no están publicados aún: uno para una empresa de transporte y otro de gestión inmobiliaria en colaboración con dos desarrolladores más. Ambos en proceso.',
    followUp: ['¿Cuál es tu stack?', '¿Cómo te mantienes al día?', '¿Estás disponible para trabajar?'],
  },

  // ── Setup: estación de desarrollo (va antes del genérico) ─────────────────
  {
    id: 'setup-dev',
    triggers: [
      'setup desarrollo', 'set up desarrollo', 'setup de desarrollo',
      'estacion de desarrollo', 'estación de desarrollo',
      'pc principal', 'pc de desarrollo', 'computador de trabajo', 'computador desarrollo',
      'workstation', 'especificaciones', 'specs',
      'ryzen', 'amd', 'procesador', 'gpu', 'gtx',
      'ram', 'ddr4', 'ssd', 'almacenamiento',
      'triple monitor', 'tres monitores', 'cuantos monitores', 'cuántos monitores',
      'desarrollo principal', 'equipo de desarrollo', 'pc trabajo',
    ],
    response:
      'AMD Ryzen 5 3600, GTX 1050 Ti, 40 GB de RAM DDR4 y 1 TB SSD. Trabajo con triple monitor: Sony Bravia 40", Sony 29" y Samsung 17". Teclado y mouse Redragon. Corre Windows principalmente, con Kali Linux en la segunda máquina.',
    followUp: ['Setup musical', '¿Para qué usas Kali Linux?', '¿Cuáles son tus hobbies?'],
  },

  // ── Setup: home studio (va antes del genérico) ────────────────────────────
  {
    id: 'setup-studio',
    triggers: [
      'home studio', 'estudio de grabacion', 'estudio de grabación', 'estudio musical',
      'setup musical', 'set up musical', 'setup musica', 'setup música',
      'estacion musical', 'estación musical',
      'ibanez', 'krk', 'axe i/o', 'satriani',
      'grabar', 'grabas', 'grabacion', 'grabación',
      'produccion musical', 'producción musical', 'produccion de audio',
      'interfaz de audio', 'monitores de estudio',
      'instrumento', 'amplificador', 'pedalera',
    ],
    response:
      'Ibanez JS240PS firma de Joe Satriani, interfaz AXE I/O de IK Multimedia, iRig Stomp I/O para pedaleras, y monitores KRK Rokit 5. Puedo grabar, hacer reamping y mezclar directamente desde el PC. Es un setup de home studio real, no de hobby de fin de semana.',
    followUp: ['¿Cuáles son tus hobbies?', 'Setup desarrollo', '¿Para qué usas Kali Linux?'],
  },

  // ── Setup: genérico (va después de los específicos) ──────────────────────
  {
    id: 'setup',
    triggers: [
      'setup', 'set up',
      'equipo', 'computador', 'computadora', 'pc', 'laptop',
      'monitor', 'monitores', 'teclado', 'mouse', 'raton', 'ratón',
      'periferico', 'periférico', 'perifericos',
      'hardware', 'estacion de trabajo', 'escritorio',
      'con qué trabajas fisicamente', 'con que trabajas fisicamente',
      'cuentame de tu setup', 'cuéntame de tu setup',
      'cual es tu setup', 'cuál es tu setup',
      'qué tienes en tu escritorio', 'que tienes en tu escritorio',
    ],
    response:
      'Mi setup de desarrollo y mi home studio son completamente independientes — cada uno tiene su propio espacio y propósito. Además tengo una mini PC aparte dedicada a ciberseguridad con Kali Linux. ¿Cuál te interesa conocer?',
    followUp: ['Setup desarrollo', 'Setup musical', '¿Para qué usas Kali Linux?'],
  },

  // ── Ciberseguridad ───────────────────────────────────────────────────────
  {
    id: 'security',
    triggers: [
      'ciberseguridad', 'cyberseguridad', 'ciberseg',
      'seguridad informatica', 'seguridad informática', 'seguridad en redes',
      'hacking', 'ethical hacking', 'pentesting', 'pentest',
      'kali', 'kali linux',
      'cisco', 'certificado cisco', 'certificado seguridad',
      'vulnerabilidades', 'exploit', 'ataques informaticos', 'ataques ciberneticos',
      'malware', 'firewall', 'intrusion',
      'redes', 'laboratorio de redes', 'lab de seguridad',
      'te interesa la seguridad', 'ctf', 'proteccion', 'protección',
    ],
    response:
      'Tengo el certificado y badge de Introducción a Ciberseguridad de Cisco (Credly), y una estación dedicada con Kali Linux para ethical hacking, pentesting y laboratorio de redes. Lo estudio por interés real — me ayuda a entender las amenazas desde el otro lado y a escribir código más seguro. Puedes ver el badge en la pestaña de certificados.',
    followUp: ['Setup desarrollo', 'Setup musical', '¿Tienes proyectos personales?'],
  },

  // ── Contacto ahora / WhatsApp (va ANTES de availability) ─────────────────
  {
    id: 'chat-now',
    triggers: [
      'whatsapp', 'wsp', 'wasap', 'wp',
      'hablar ahora', 'conversar ahora', 'chatear',
      'hablar contigo', 'hablar directamente',
      'disponible para hablar', 'disponible ahora',
      'contactarte ahora', 'contacto directo',
      'escribirte', 'mandarte mensaje', 'mandarte un mensaje',
      'me puedes atender', 'estas en linea', 'estás en línea',
      'llamarte', 'llamada', 'videollamada',
      'numero de telefono', 'número de teléfono',
      'numero de contacto', 'telefono', 'teléfono',
      'agendar', 'agendar reunion', 'reunion contigo',
      'entrevista contigo', 'hablar por telefono',
    ],
    response:
      'Claro, escríbeme directamente por WhatsApp y conversamos.',
    whatsapp: true,
    followUp: ['¿Estás disponible para trabajar?', '¿Dónde te ves en 5 años?'],
  },

  // ── Disponibilidad laboral ────────────────────────────────────────────────
  {
    id: 'availability',
    triggers: [
      'estas disponible', 'estás disponible',
      'disponible para trabajar', 'disponible para una posicion',
      'disponibilidad laboral', 'disponibilidad inmediata', 'disponibilidad',
      'buscas trabajo', 'buscas empleo', 'buscas oportunidad', 'buscas posicion',
      'contratarte', 'contratar', 'sumar al equipo', 'unirte',
      'posicion', 'posición', 'puesto', 'vacante', 'cargo',
      'remoto', 'teletrabajo', 'trabajo remoto', 'presencial', 'modalidad de trabajo',
      'freelance', 'oferta', 'oportunidad laboral', 'oportunidad de trabajo',
      'full time', 'part time', 'tiempo completo', 'media jornada', 'jornada completa',
      'cuando puedes empezar', 'cuándo puedes empezar',
      'cuando estas disponible', 'cuándo estás disponible',
      'incorporarte', 'empezar a trabajar', 'trabajar contigo',
      'cuándo empezarías', 'cuando empezarias',
    ],
    response:
      'Sí, estoy disponible. Mi preferencia es 100% remoto — presencial no es una opción deseable a menos que sea cerca de casa. Busco una posición estable a largo plazo, no soy de cambiar de empresa constantemente. La mejor forma de contactarme es por LinkedIn o al correo david.mallega@gmail.com.',
    followUp: ['¿Dónde te ves en 5 años?', '¿Cuál es tu stack?'],
  },

  // ── Stack técnico ─────────────────────────────────────────────────────────
  {
    id: 'stack',
    triggers: [
      // general
      'stack', 'tech stack', 'tecnologia favorita', 'tecnología favorita',
      'lenguaje favorito', 'lenguaje preferido',
      'que usas', 'qué usas',
      'con que trabajas', 'con qué trabajas',
      'que tecnologias', 'qué tecnologías',
      'tecnologias que usas', 'tecnologías que usas',
      'que sabes', 'qué sabes',
      'que dominas', 'qué dominas',
      'que manejas', 'qué manejas',
      'frameworks', 'framework', 'que frameworks', 'qué frameworks',
      'herramientas de desarrollo',
      'lenguajes de programacion', 'lenguajes de programación',
      'lenguajes',
      'fullstack', 'full stack', 'fullstack developer',
      'con que tecnologias', 'con qué tecnologías',
      // lenguajes específicos
      'javascript', 'js', 'typescript', 'ts',
      'python', 'php', 'html', 'css', 'sql',
      // frameworks / runtime
      'node', 'nodejs', 'react', 'reactjs', 'express', 'expressjs',
      'react native', 'electron', 'tailwind', 'vite',
      // cloud / infra
      'gcp', 'google cloud', 'docker', 'firebase', 'cloud',
      // BD
      'postgresql', 'mysql', 'firestore', 'supabase',
      // tools
      'git', 'postman',
      // diseño
      'photoshop', 'illustrator',
      // metodologías
      'scrum', 'kanban', 'agile',
      // rest
      'rest api', 'rest apis', 'api rest',
      // wordpress (específico en stack, no confundir con admin web)
      'wordpress',
    ],
    response:
      'Sí, mi stack cubre bastante terreno. Lenguajes: JavaScript, TypeScript, Python, PHP, SQL. Frameworks: React, Node.js, Express, React Native, Electron. Cloud: GCP, Firebase, Docker. Bases de datos: MySQL, PostgreSQL, Firestore. También Tailwind, Vite, WordPress y diseño con Photoshop e Illustrator. El detalle completo está en la pestaña Skills del portfolio.',
    followUp: ['¿Tienes proyectos personales?', '¿Cómo te mantienes al día?', '¿Estás disponible para trabajar?'],
  },

  // ── Familia ───────────────────────────────────────────────────────────────
  {
    id: 'family',
    triggers: [
      'familia', 'familiares',
      'hijos', 'hijo', 'ninos', 'niños', 'chicos',
      'padre', 'papa', 'papá', 'ser padre', 'paternidad',
      'vida personal',
      'motivacion', 'motivación', 'motivaciones', 'motivaciones personales',
      'por que trabajas', 'por qué trabajas',
      'que te motiva', 'qué te motiva',
      'que te impulsa', 'qué te impulsa',
      'que te mueve', 'qué te mueve',
      'que te importa', 'qué te importa',
      'rafaela', 'lucas',
    ],
    response:
      'Tengo dos hijos, Rafaela y Lucas. Son mi pilar — la razón detrás de cada decisión que tomo, incluida la búsqueda de estabilidad laboral. Nunca me he separado de ellos excepto cuando trabajo, y eso me hace tomar muy en serio cada oportunidad profesional que evalúo.',
    followUp: ['¿Dónde te ves en 5 años?', '¿Estás disponible para trabajar?', '¿Cuáles son tus hobbies?'],
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  {
    id: 'github',
    triggers: [
      'github', 'tu github', 'github.com',
      'repositorio', 'repositorios', 'repos', 'repo',
      'codigo fuente', 'código fuente',
      'ver tu codigo', 'ver tu código',
      'codigo en github', 'código en github',
      'enlace github', 'link github',
      'ver tus repos', 'tus proyectos en github',
      'portafolio de codigo', 'portafolio de código',
      'codigo publico', 'código público',
      'perfil de github',
    ],
    response:
      'Mi GitHub es github.com/Davidmallega — ahí están la mayoría de los proyectos del portfolio con su código fuente. Algunos proyectos de clientes son privados.',
    followUp: ['¿Tienes proyectos personales?', '¿Cuál es tu stack?', '¿Estás disponible para trabajar?'],
  },

  // ── LinkedIn / Contacto ───────────────────────────────────────────────────
  {
    id: 'linkedin',
    triggers: [
      'linkedin', 'tu linkedin', 'linkedin.com',
      'perfil linkedin', 'perfil de linkedin',
      'enlace linkedin', 'link linkedin',
      'red profesional', 'red de contactos',
      'redes sociales', 'red social', 'perfil profesional',
      'como te contacto', 'cómo te contacto',
      'informacion de contacto', 'información de contacto',
      'formas de contacto', 'datos de contacto',
      'correo', 'email', 'mail',
      'como te escribo', 'cómo te escribo',
    ],
    response:
      'Mi LinkedIn es linkedin.com/in/david-mallega — ahí puedes ver mi historial laboral completo y contactarme directamente. También puedes escribirme al correo david.mallega@gmail.com.',
    followUp: ['¿Estás disponible para trabajar?', '¿Tienes proyectos personales?'],
  },

  // ── Título / formación ────────────────────────────────────────────────────
  {
    id: 'title',
    triggers: [
      'titulo', 'título',
      'carrera', 'que carrera', 'qué carrera', 'que carrera hiciste', 'qué carrera hiciste',
      'estudios', 'estudios formales', 'estudios academicos', 'estudios académicos',
      'formacion', 'formación',
      'que estudiaste', 'qué estudiaste',
      'titulado', 'egresado', 'graduado',
      'nivel de estudios', 'nivel academico', 'nivel académico', 'nivel educativo',
      'educacion', 'educación',
      'donde estudiaste', 'dónde estudiaste',
      'en qué estudiaste', 'en que estudiaste',
      'iacc', 'diplomado', 'diplomados',
      'tecnico', 'técnico', 'eres tecnico', 'eres técnico', 'eres ingeniero',
      'cuanto estudiaste', 'cuánto estudiaste',
      'grado academico', 'universidad', 'instituto',
    ],
    response:
      'Soy Técnico de Nivel Superior en Informática, titulado en IACC el 2026 con Distinción Máxima (+1.100h, 3 años). Además tengo tres diplomados IACC en Desarrollo Web, Programación Avanzada y Fundamentos de Programación. Puedes ver todos los certificados en la pestaña de certificados del portfolio.',
    followUp: ['¿Tienes proyectos personales?', '¿Cuál es tu stack?', '¿Estás disponible para trabajar?'],
  },

  // ── Historial laboral completo ────────────────────────────────────────────
  {
    id: 'work-history',
    triggers: [
      // dónde y en qué trabajó
      'donde has trabajado', 'dónde has trabajado',
      'donde trabajaste', 'dónde trabajaste',
      'donde trabajas', 'dónde trabajas',
      'en que empresa', 'en qué empresa',
      'en que trabajaste', 'en qué trabajaste',
      'que trabajaste', 'qué trabajaste',
      'que trabajo tuviste', 'qué trabajo tuviste',
      // verbos simples (conjugaciones)
      'trabajaste', 'has trabajado', 'habias trabajado',
      // documentos
      'cv', 'curriculum', 'curriculo', 'hoja de vida',
      // historial
      'trabajos anteriores', 'empleos anteriores', 'trabajos que has tenido',
      'historial laboral', 'trayectoria laboral', 'recorrido laboral',
      'que trabajos has tenido', 'qué trabajos has tenido',
      'que hiciste antes', 'qué hiciste antes',
      'experiencia previa', 'experiencia anterior',
      // posiciones específicas
      'practica profesional', 'práctica profesional', 'practicaste', 'practicas', 'prácticas', 'pasantia',
      'analista ti', 'analista de implementacion', 'analista de implementación',
      'soporte tecnico', 'soporte técnico',
      'administrador general', 'administrador web',
      'geovictoria', 'sofia', 'sofía', 'sistema de ventas',
      'inventario', 'control de inventario',
      'trabajo actual', 'empresa actual', 'trabajas actualmente',
    ],
    response:
      'Tengo cinco posiciones. Actualmente trabajo como Analista TI implementando GeoVictoria y como Freelance con apps a medida. Antes hice práctica Fullstack (inventario con React+MySQL+REST API), llevo desde 2020 administrando sitios WordPress en producción, y más de 10 años como Administrador General gestionando operaciones financieras, personal y reportes Excel avanzados. El CV descargable está en la sección Experiencia del portfolio.',
    followUp: ['¿Cuántos años de experiencia tienes?', '¿Cuál es tu stack?', '¿Estás disponible para trabajar?'],
  },

  // ── Años de experiencia ───────────────────────────────────────────────────
  {
    id: 'experience',
    triggers: [
      'años de experiencia', 'cuántos años de experiencia', 'cuantos años de experiencia',
      'cuanta experiencia', 'cuánta experiencia',
      'cuántos años llevas', 'cuantos años llevas',
      'cuanto tiempo llevas', 'cuánto tiempo llevas',
      'hace cuanto', 'hace cuánto',
      'tiempo trabajando', 'tiempo de experiencia',
      'cuanta experiencia tienes', 'cuánta experiencia tienes',
      'que experiencia tienes', 'qué experiencia tienes',
      'años trabajando', 'experiencia como desarrollador',
      'cuanto llevas en desarrollo', 'cuánto llevas en desarrollo',
      'trayectoria', 'recorrido profesional',
    ],
    response:
      'Llevo más de 10 años trabajando — en mi último empleo estuve una década gestionando operaciones completas. Paralelamente hice mi práctica Fullstack, trabajo freelance con clientes reales y construí todos los proyectos del portfolio para dominar el stack cloud. Es una combinación de experiencia operativa sólida y desarrollo técnico activo.',
    followUp: ['¿Dónde has trabajado?', '¿Cuál es tu stack?', '¿Estás disponible para trabajar?'],
  },

  // ── Estabilidad / lealtad laboral ─────────────────────────────────────────
  {
    id: 'stability',
    triggers: [
      '10 años en', 'estuviste 10', 'trabajaste 10',
      'duracion', 'duración', 'rotacion', 'rotación', 'rotas de empresa',
      'empresa anterior', 'ultimo trabajo', 'último trabajo',
      'lealtad', 'leal', 'fidelidad', 'fiel',
      'cambias de trabajo', 'cambias de empresa',
      'cuanto tiempo te quedas', 'cuánto tiempo te quedas',
      'cuanto tiempo duras', 'cuánto tiempo duras',
      'compromiso laboral', 'que tan estable eres', 'qué tan estable eres',
      'eres estable', 'job hopper', 'saltas de empresa',
      'cuantas empresas', 'cuántas empresas',
      'tiempo en empresa', 'permanencia', 'te quedas',
    ],
    response:
      'En mi último empleo estuve 10 años. Creo que la estabilidad laboral es valiosa para ambas partes — para mí por la tranquilidad financiera, y para la empresa porque el conocimiento acumulado tarda años en construirse. No busco el próximo trabajo, busco el lugar donde quedarme.',
    followUp: ['¿Dónde te ves en 5 años?', '¿Estás disponible para trabajar?'],
  },
]

// ─── Quick replies iniciales ────────────────────────────────────────────────
export const INITIAL_QUICK_REPLIES = [
  '¿Dónde te ves en 5 años?',
  '¿Cuáles son tus hobbies?',
  '¿Cuál es tu setup?',
  '¿Estás disponible para trabajar?',
  '¿Qué te interesa de la ciberseguridad?',
]

// ─── Mensaje de bienvenida ──────────────────────────────────────────────────
export const WELCOME_MESSAGE =
  'Hola, soy David. Puedes preguntarme lo que quieras — sobre mis metas, cómo trabajo, mi setup, mis hobbies o mi disponibilidad. ¿Por dónde empezamos?'

// ─── Respuesta por defecto si Gemini no está configurado ───────────────────
export const FALLBACK_MESSAGE =
  'Esa es una buena pregunta para conversar directamente. Escríbeme por WhatsApp, LinkedIn o al correo david.mallega@gmail.com.'

export const FALLBACK_WHATSAPP = 'https://wa.me/56996148763'
