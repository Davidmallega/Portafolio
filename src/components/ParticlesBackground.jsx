import { useEffect, useRef } from 'react'

const COLORS   = ['#00d4ff', '#00aaff', '#0077ff', '#33eeff', '#00ffee']
const COUNT    = 80
const MAX_DIST = 150
const OPACITY  = 0.10  // 0.0 = invisible · 1.0 = máximo

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const stateRef  = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W, H

    function resize() {
      const dpr = window.devicePixelRatio || 1
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    function init() {
      stateRef.current = Array.from({ length: COUNT }, () => ({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * 0.1,
        vy:  (Math.random() - 0.5) * 0.1,
        r:   1 + Math.random() * 2,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
        a:   0.4 + Math.random() * 0.6,
      }))
    }

    function draw() {
      animRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)

      const pts = stateRef.current
      if (!pts) return

      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }

      // lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.4
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0, 160, 255, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of pts) {
        ctx.save()
        ctx.shadowBlur  = 8
        ctx.shadowColor = p.col
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.col
        ctx.globalAlpha = p.a
        ctx.fill()
        ctx.restore()
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: OPACITY,
      }}
    />
  )
}
