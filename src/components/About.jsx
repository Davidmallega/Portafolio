import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import {
  RESPONSES,
  INITIAL_QUICK_REPLIES,
  WELCOME_MESSAGE,
  FALLBACK_MESSAGE,
  FALLBACK_WHATSAPP,
  SYSTEM_PROMPT,
  DAVID_INFO,
} from '../data/chatbot'

// ─── Gemini API (fallback para preguntas sin match) ─────────────────────────
const GEMINI_KEY  = import.meta.env.VITE_GEMINI_KEY ?? ''
const GEMINI_MODEL = 'gemini-2.5-flash'
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`

async function askGemini(userMessage) {
  if (!GEMINI_KEY) return null
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('[Gemini error]', JSON.stringify(data))
    return null
  }
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null
}

// ─── Normaliza texto: minúsculas + sin tildes ────────────────────────────────
function norm(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

// ─── Resolver de respuestas hardcodeadas ─────────────────────────────────────
function resolveLocal(input) {
  const lower = norm(input)
  for (const r of RESPONSES) {
    if (r.triggers.some(t => lower.includes(norm(t)))) return r
  }
  return null
}

// ─── Utils ───────────────────────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms))

// ─── Componente: burbuja de mensaje ─────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  const showWhatsApp = msg.fallback || msg.whatsapp
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#4ec9b0]/20 border border-[#4ec9b0]/40 flex items-center justify-center shrink-0 mt-1 mr-2">
          <span className="font-mono text-[9px] text-[#4ec9b0]">D</span>
        </div>
      )}
      <div
        className={`max-w-[78%] px-3 py-2 rounded-2xl font-sans text-[13px] leading-relaxed ${
          isUser
            ? 'bg-[#bc8cff]/15 border border-[#bc8cff]/25 text-white/80 rounded-br-sm'
            : 'bg-white/[0.05] border border-white/[0.08] text-white/75 rounded-bl-sm'
        }`}
      >
        {msg.text}
        {showWhatsApp && (
          <a
            href={FALLBACK_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 mt-2 font-mono text-[11px] text-[#25d366] hover:text-[#25d366]/70 transition-colors"
          >
            <span className="text-[13px]">↗</span> Abrir WhatsApp
          </a>
        )}
        {msg.source === 'gemini' && (
          <span className="block mt-1 font-mono text-[9px] text-[#4ec9b0]/40">
            via {GEMINI_MODEL} · {msg.ms}ms
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Componente: indicador "David está escribiendo..." ───────────────────────
function TypingIndicator({ status }) {
  if (!status) return null
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-[#4ec9b0]/20 border border-[#4ec9b0]/40 flex items-center justify-center shrink-0">
        <span className="font-mono text-[9px] text-[#4ec9b0]">D</span>
      </div>
      <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-bl-sm px-3 py-2">
        {status === 'thinking' ? (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/30 inline-block"
                style={{ animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite` }}
              />
            ))}
          </div>
        ) : (
          <span className="font-mono text-[10px] text-[#4ec9b0]/60 animate-pulse">{status}</span>
        )}
      </div>
    </div>
  )
}

// ─── Componente: chips de sugerencia ─────────────────────────────────────────
function QuickReplies({ replies, onSelect }) {
  if (!replies?.length) return null
  return (
    <div className="flex flex-wrap gap-2 px-3 py-3">
      {replies.map(r => (
        <button
          key={r}
          onClick={() => onSelect(r)}
          className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/40 hover:border-[#bc8cff]/40 hover:text-[#bc8cff]/80 hover:bg-[#bc8cff]/05 transition-all"
        >
          {r}
        </button>
      ))}
    </div>
  )
}

// ─── ChatWindow: ventana de chat reutilizable ────────────────────────────────
export function ChatWindow({ onClose } = {}) {
  const [messages, setMessages]         = useState([
    { id: 0, role: 'david', text: WELCOME_MESSAGE, source: 'local' },
  ])
  const [input, setInput]               = useState('')
  const [typing, setTyping]             = useState(null)
  const [quickReplies, setQuickReplies] = useState(INITIAL_QUICK_REPLIES)
  const bottomRef                       = useRef(null)
  const inputRef                        = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: trimmed }])
    setInput('')
    setQuickReplies([])
    inputRef.current?.focus()

    const local = resolveLocal(trimmed)

    if (local) {
      setTyping('thinking')
      await delay(600 + Math.random() * 600)
      setTyping(null)
      setMessages(prev => [...prev, { id: Date.now(), role: 'david', text: local.response, source: 'local', whatsapp: !!local.whatsapp }])
      setQuickReplies(local.followUp ?? [])
      return
    }

    if (GEMINI_KEY) {
      setTyping(`> ${GEMINI_MODEL}...`)
      const t0 = Date.now()
      const reply = await askGemini(trimmed)
      const ms = Date.now() - t0
      setTyping(null)
      if (reply) {
        setMessages(prev => [...prev, { id: Date.now(), role: 'david', text: reply, source: 'gemini', ms }])
        setQuickReplies(INITIAL_QUICK_REPLIES)
        return
      }
    }

    setTyping('thinking')
    await delay(500)
    setTyping(null)
    setMessages(prev => [...prev, { id: Date.now(), role: 'david', text: FALLBACK_MESSAGE, source: 'local', fallback: true }])
    setQuickReplies(INITIAL_QUICK_REPLIES)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <div
      className="rounded-2xl border border-[#4ec9b0]/45 bg-[#0f0f12] overflow-hidden w-full"
      style={{ boxShadow: '0 0 30px rgba(78,201,176,0.15), 0 0 60px rgba(78,201,176,0.06)' }}
    >

      {/* Barra de título estilo VS Code */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#4ec9b0]/20 bg-[#0c0c10]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ec9b0] animate-pulse" />
          <span className="font-mono text-[11px] text-white/30">
            chat · {DAVID_INFO.name.toLowerCase().replace(' ', '-')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {GEMINI_KEY && (
            <span className="font-mono text-[9px] text-[#4ec9b0]/40">{GEMINI_MODEL} ✓</span>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-1 font-mono text-[13px] text-white/70 hover:text-[#4ec9b0] transition-colors"
            >
              cerrar <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Historial de mensajes */}
      <div className="h-[340px] overflow-y-auto p-4 flex flex-col bg-[#0f0f12]">
        {messages.map(m => <Bubble key={m.id} msg={m} />)}
        <TypingIndicator status={typing} />
        <div ref={bottomRef} />
      </div>

      {/* Chips de sugerencia */}
      <QuickReplies replies={quickReplies} onSelect={sendMessage} />

      {/* Input */}
      <div className="border-t border-white/[0.06] flex items-center gap-2 px-3 py-2.5">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Escríbeme algo..."
          className="flex-1 bg-transparent font-mono text-[12px] text-white/70 placeholder:text-white/20 outline-none"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="font-mono text-[11px] px-3 py-1 rounded-lg bg-[#4ec9b0]/10 border border-[#4ec9b0]/20 text-[#4ec9b0]/70 hover:bg-[#4ec9b0]/20 hover:text-[#4ec9b0] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          enviar
        </button>
      </div>
    </div>
  )
}

// ─── Página /about completa ──────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 pt-28 pb-20 lg:pb-28">
      <div className="h-px bg-white/[0.07] mb-12" />

      <p className="font-mono text-[13px] lg:text-[15px] text-[#4ec9b0] uppercase tracking-widest mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-white/[0.07]">
        <span className="text-white/20 select-none">~/</span>
        about
        <span className="text-white/30 normal-case text-[12px]">
          — {DAVID_INFO.role} · {DAVID_INFO.location}
        </span>
      </p>

      <div className="max-w-xl">
        <ChatWindow />
      </div>

      {import.meta.env.DEV && !GEMINI_KEY && (
        <p className="font-mono text-[10px] text-white/20 mt-3">
          ⚠ VITE_GEMINI_KEY no configurada — modo solo respuestas locales
        </p>
      )}
    </section>
  )
}
