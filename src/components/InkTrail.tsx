import { useEffect, useRef } from 'react'

/** Quanto tempo (ms) cada trecho do risco leva para sumir por completo. */
const LIFE = 2500
const MAX_WIDTH = 3.4
const MIN_WIDTH = 1.4
/** Distância mínima (px) entre pontos gravados; menor = curva mais fiel ao gesto. */
const MIN_STEP = 2

/** Elementos em que arrastar tem outro significado (clicar, digitar, mídia…). */
const INTERACTIVE =
  'a, button, input, textarea, select, summary, label, img, video, canvas, [role="button"], [contenteditable]'

type Point = { x: number; y: number; t: number; w: number }

/**
 * Textura de grafite: ladrilho de ruído na cor da tinta, com falhas (papel
 * aparecendo) e pontos mais densos. Usado como estilo do traço, dá o grão.
 */
function makeGraphite(color: string, dpr: number, ctx: CanvasRenderingContext2D) {
  const size = 96
  const mask = document.createElement('canvas')
  mask.width = mask.height = size
  const mctx = mask.getContext('2d')!
  const img = mctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const r = Math.random()
    img.data[i + 3] = r < 0.22 ? 0 : 110 + Math.random() * 145
  }
  mctx.putImageData(img, 0, 0)

  const tile = document.createElement('canvas')
  tile.width = tile.height = size
  const tctx = tile.getContext('2d')!
  tctx.fillStyle = color
  tctx.fillRect(0, 0, size, size)
  tctx.globalCompositeOperation = 'destination-in'
  tctx.drawImage(mask, 0, 0)

  const pattern = ctx.createPattern(tile, 'repeat')
  // o contexto já é escalado pelo dpr; desfaz para o grão ter 1px de verdade
  pattern?.setTransform(new DOMMatrix().scale(1 / dpr))
  return pattern
}

/** Só risca em áreas sem texto: o alvo não pode ser interativo nem ter texto próprio. */
function canStartInk(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  if (target.closest(INTERACTIVE)) return false
  return !Array.from(target.childNodes).some(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
  )
}

/**
 * Clicar e arrastar no fundo deixa um risco de tinta que apaga sozinho.
 * Um canvas fixo (sem eventos de ponteiro) fica por cima da página; a cor
 * vem de --c-ink, então acompanha o tema, com textura de grafite.
 */
export function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const strokes: Point[][] = []
    let current: Point[] | null = null
    let raf = 0
    let dpr = 1
    let grain: CanvasPattern | null = null
    let grainColor = ''

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      grainColor = '' // refaz a textura para o novo dpr
    }

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--c-ink')
        .trim()
      if (color !== grainColor) {
        grainColor = color
        grain = makeGraphite(color, dpr, ctx)
      }
      ctx.lineJoin = 'round'

      for (let s = strokes.length - 1; s >= 0; s--) {
        const pts = strokes[s]
        // descarta pontos já apagados; um traço sem pontos sai da lista
        while (pts.length && now - pts[0].t >= LIFE) pts.shift()
        if (!pts.length) {
          if (pts !== current) strokes.splice(s, 1)
          continue
        }
        // curva suave: cada ponto é controle de uma quadrática entre os pontos médios
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]
          const prev = pts[i - 1]
          const next = pts[i + 1]
          const sx = prev ? (prev.x + p.x) / 2 : p.x
          const sy = prev ? (prev.y + p.y) / 2 : p.y
          const ex = next ? (p.x + next.x) / 2 : p.x
          const ey = next ? (p.y + next.y) / 2 : p.y
          const fade = Math.pow(1 - (now - p.t) / LIFE, 1.3)

          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(sx, sy)
          ctx.quadraticCurveTo(p.x, p.y, ex, ey)
          // 1) halo suave: o pó de grafite em volta do traço
          ctx.globalAlpha = fade * 0.16
          ctx.strokeStyle = color
          ctx.lineWidth = p.w + 2
          ctx.stroke()
          // 2) núcleo com grão
          ctx.globalAlpha = fade * 0.92
          ctx.strokeStyle = grain ?? color
          ctx.lineWidth = p.w
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      raf = strokes.length ? requestAnimationFrame(draw) : 0
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      current = null
      document.documentElement.style.userSelect = ''
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !e.isPrimary || e.pointerType === 'touch') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (!canStartInk(e.target)) return

      // evita que o arrasto também selecione o texto por onde o risco passa
      document.documentElement.style.userSelect = 'none'
      window.getSelection()?.removeAllRanges()

      current = [{ x: e.clientX, y: e.clientY, t: performance.now(), w: MAX_WIDTH }]
      strokes.push(current)
      kick()
    }

    const addPoint = (x: number, y: number, now: number) => {
      if (!current) return
      const last = current[current.length - 1]
      const dist = Math.hypot(x - last.x, y - last.y)
      if (dist < MIN_STEP) return
      // traço mais fino quando o mouse corre, mais grosso quando devagar
      const speed = dist / Math.max(now - last.t, 1)
      const target = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, MAX_WIDTH - speed * 0.9))
      const w = last.w + (target - last.w) * 0.25
      current.push({ x, y, t: now, w })
    }

    const onMove = (e: PointerEvent) => {
      if (!current) return
      // eventos coalescidos trazem todas as amostras do mouse entre dois frames
      const samples = e.getCoalescedEvents?.() ?? []
      const now = performance.now()
      for (const c of samples.length ? samples : [e]) addPoint(c.clientX, c.clientY, now)
      kick()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    window.addEventListener('blur', stop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
      window.removeEventListener('blur', stop)
      document.documentElement.style.userSelect = ''
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-screen w-screen"
    />
  )
}
