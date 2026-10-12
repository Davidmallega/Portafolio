// Función serverless de Vercel: proxy hacia Gemini.
// La clave vive solo en el servidor (GEMINI_API_KEY), nunca llega al bundle del navegador.
import { SYSTEM_PROMPT } from '../src/data/chatbot.js'

const GEMINI_MODEL = 'gemini-2.5-flash'
const MAX_MESSAGE_LENGTH = 500

// Rate limit simple por IP (en memoria, por instancia).
// En serverless cada instancia tiene su propio contador, así que es un freno
// best-effort contra abuso casual, no una garantía estricta.
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 8
const hits = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every(t => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > MAX_REQUESTS_PER_WINDOW
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'Chat no disponible' })
  }

  if (isRateLimited(clientIp(req))) {
    res.setHeader('Retry-After', '60')
    return res.status(429).json({ error: 'Demasiadas solicitudes' })
  }

  const message = req.body?.message
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message debe ser un texto no vacío' })
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `message supera ${MAX_MESSAGE_LENGTH} caracteres` })
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
        }),
      },
    )

    if (!upstream.ok) {
      console.error('[chat] Gemini error', upstream.status)
      return res.status(502).json({ error: 'Error del modelo' })
    }

    const data = await upstream.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) return res.status(502).json({ error: 'Respuesta vacía' })

    return res.status(200).json({ reply, model: GEMINI_MODEL })
  } catch (err) {
    console.error('[chat] fetch failed', err)
    return res.status(502).json({ error: 'Error del modelo' })
  }
}
