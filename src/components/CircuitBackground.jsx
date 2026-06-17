import React, { useEffect, useRef, useState } from "react";

// ─── CONFIG ────────────────────────────────────────────────────
const COLORS = {
  bg: "#020a18",
  traceDim: "rgba(30, 90, 180, 0.15)",
  traceLight: "rgba(40, 120, 220, 0.35)",
  nodeDim: "rgba(30, 100, 200, 0.6)",
  nodeGlow: "rgba(50, 140, 255, 0.95)",
  binaryDim: "rgba(30, 80, 160, 0.12)",
  binaryMid: "rgba(40, 100, 190, 0.25)",
  binaryBright: "rgba(60, 140, 230,  0.5)",
};

// ─── HELPERS ───────────────────────────────────────────────────
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function randInt(min, max) {
  return Math.floor(rand(min, max));
}
function pick(arr) {
  return arr[randInt(0, arr.length)];
}

// ─── CIRCUIT TRACE GENERATOR ───────────────────────────────────
function generateTrace(w, h) {
  const points = [];
  const startEdge = randInt(0, 4);
  let x, y;
  if (startEdge === 0) { x = 0; y = rand(50, h - 50); }
  else if (startEdge === 1) { x = w; y = rand(50, h - 50); }
  else if (startEdge === 2) { x = rand(50, w - 50); y = 0; }
  else { x = rand(50, w - 50); y = h; }
  points.push({ x, y });

  const segments = randInt(4, 10);
  for (let i = 0; i < segments; i++) {
    const dir = pick(["h", "v", "d"]);
    const len = rand(40, 200);
    if (dir === "h") x += pick([-1, 1]) * len;
    else if (dir === "v") y += pick([-1, 1]) * len;
    else { const d = pick([-1, 1]) * len * 0.7; x += d; y += pick([-1, 1]) * len * 0.7; }
    x = Math.max(20, Math.min(w - 20, x));
    y = Math.max(20, Math.min(h - 20, y));
    points.push({ x, y });
  }

  const nodes = [];
  for (let i = 1; i < points.length; i++) {
    if (Math.random() > 0.55) {
      nodes.push({
        x: points[i].x,
        y: points[i].y,
        radius: rand(2.5, 5),
        pulseSpeed: rand(0.005, 0.02),
        pulseOffset: rand(0, Math.PI * 2),
      });
    }
  }

  return {
    points,
    nodes,
    brightness: rand(0.4, 1),
    lineWidth: rand(0.5, 1.5),
  };
}

// ─── BINARY CLUSTER GENERATOR ──────────────────────────────────
function generateBinaryCluster(w, h) {
  const cx = rand(0, w);
  const cy = rand(0, h);
  const cols = randInt(6, 30);
  const rows = randInt(4, 18);
  const fontSize = pick([9, 10, 11, 12]);
  const charW = fontSize * 0.62;
  const lineH = fontSize * 1.15;
  const chars = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.3) {
        chars.push({
          ch: Math.random() > 0.5 ? "1" : "0",
          x: cx + c * charW,
          y: cy + r * lineH,
          brightness: rand(0, 1),
          flickerSpeed: rand(0.003, 0.015),
          flickerOffset: rand(0, Math.PI * 2),
        });
      }
    }
  }

  return { fontSize, chars };
}

// ─── MAIN COMPONENT ────────────────────────────────────────────
export default function CircuitBackground() {
  const canvasRef = useRef(null);
  const dataRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generate();
    }

    function generate() {
      const traces = [];
      const traceCount = Math.floor((w * h) / 60000);
      for (let i = 0; i < traceCount; i++) traces.push(generateTrace(w, h));

      const clusters = [];
      const clusterCount = Math.floor((w * h) / 80000);
      for (let i = 0; i < clusterCount; i++) clusters.push(generateBinaryCluster(w, h));

      // Floating particles
      const particles = [];
      const particleCount = Math.floor((w * h) / 25000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.15, 0.15),
          vy: rand(-0.15, 0.15),
          radius: rand(0.5, 1.5),
          pulseSpeed: rand(0.008, 0.025),
          pulseOffset: rand(0, Math.PI * 2),
        });
      }

      dataRef.current = { traces, clusters, particles };
    }

    function draw(time) {
      const t = time * 0.001;
      const data = dataRef.current;
      if (!data) { animRef.current = requestAnimationFrame(draw); return; }

      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      // ── Binary clusters ──
      for (const cluster of data.clusters) {
        ctx.font = `${cluster.fontSize}px "Courier New", monospace`;
        for (const ch of cluster.chars) {
          const flicker = Math.sin(t * ch.flickerSpeed * 60 + ch.flickerOffset) * 0.5 + 0.5;
          const alpha = 0.04 + flicker * ch.brightness * 0.35;
          ctx.fillStyle = `rgba(40, 110, 200, ${alpha})`;
          ctx.fillText(ch.ch, ch.x, ch.y);
        }
      }

      // ── Circuit traces ──
      for (const trace of data.traces) {
        const pts = trace.points;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        const alpha = 0.08 + trace.brightness * 0.18;
        ctx.strokeStyle = `rgba(35, 100, 200, ${alpha})`;
        ctx.lineWidth = trace.lineWidth;
        ctx.stroke();

        // Nodes
        for (const node of trace.nodes) {
          const pulse = Math.sin(t * node.pulseSpeed * 60 + node.pulseOffset) * 0.5 + 0.5;
          const r = node.radius * (0.8 + pulse * 0.6);

          // Outer glow
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
          grad.addColorStop(0, `rgba(50, 140, 255, ${0.15 + pulse * 0.2})`);
          grad.addColorStop(0.4, `rgba(30, 100, 220, ${0.05 + pulse * 0.08})`);
          grad.addColorStop(1, "rgba(30, 100, 220, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(60, 150, 255, ${0.6 + pulse * 0.4})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Floating particles ──
      for (const p of data.particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulse = Math.sin(t * p.pulseSpeed * 60 + p.pulseOffset) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(50, 130, 230, ${0.1 + pulse * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Subtle vignette ──
      const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.75);
      vg.addColorStop(0, "rgba(2, 10, 24, 0)");
      vg.addColorStop(1, "rgba(2, 10, 24, 0.6)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: COLORS.bg }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
      />
      {/* Example overlay content — remove or replace with your portfolio content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "rgba(140, 190, 255, 0.85)",
          fontFamily: '"Courier New", monospace',
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textShadow: "0 0 30px rgba(50, 140, 255, 0.4)",
            margin: 0,
          }}
        >
          La Sintaxis Rota
        </h1>
        <p
          style={{
            fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
            opacity: 0.5,
            marginTop: "1rem",
            letterSpacing: "0.3em",
          }}
        >
          FULLSTACK DEVELOPER
        </p>
      </div>
    </div>
  );
}
