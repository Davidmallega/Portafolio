# Portfolio — David Mallega

Portfolio personal desarrollado con estética VS Code. Animaciones CSS puras, SPA routing y diseño responsive mobile-first.

## Stack

React 19 · Vite · Tailwind CSS · React Router DOM · react-icons · lucide-react

## Secciones

- **Hero** — presentación con skills e iconos de marca
- **Experience** — timeline laboral estilo VS Code Explorer
- **Projects** — cards con animación de compilación
- **Certificates** — animación push/request/done con barras de progreso
- **Contact** — tarjeta interactiva con efecto barniz

## Correr localmente

```bash
npm install
npm run dev
```

### Chat con IA (Gemini)

El chat "Habla con David" usa una función serverless (`api/chat.js`) para que la clave de Gemini nunca llegue al navegador. `npm run dev` no sirve `/api`, así que para probar el chat completo:

```bash
cp .env.example .env.local   # y completa GEMINI_API_KEY
npm i -g vercel
vercel dev
```

Con `npm run dev` el chat sigue funcionando con las respuestas locales; las preguntas sin match caen al mensaje de fallback.

Para ver desde celular en la misma red:

```bash
npm run dev -- --host
```

## Live

🔗 Próximamente en Vercel
