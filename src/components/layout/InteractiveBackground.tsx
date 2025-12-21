import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const calculateParticleCount = (width: number, height: number, isMobile: boolean) => {
  const min = isMobile ? 30 : 60
  const max = isMobile ? 120 : 200
  const densityDivisor = isMobile ? 3600 : 2400

  return Math.min(max, Math.max(min, Math.floor((width * height) / densityDivisor)))
}

const createParticles = (width: number, height: number, count: number): Particle[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }))

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) {
      return
    }

    const isMobileQuery = window.matchMedia('(max-width: 768px)')
    const sizeRef = { width: 0, height: 0 }

    const setSize = (resetParticles: boolean) => {
      const { innerWidth, innerHeight } = window
      if (sizeRef.width === innerWidth && sizeRef.height === innerHeight && !resetParticles) return

      sizeRef.width = innerWidth
      sizeRef.height = innerHeight

      canvas.width = innerWidth
      canvas.height = innerHeight

      const particleCount = calculateParticleCount(innerWidth, innerHeight, isMobileQuery.matches)

      if (resetParticles || particlesRef.current.length === 0) {
        particlesRef.current = createParticles(innerWidth, innerHeight, particleCount)
        return
      }

      if (particlesRef.current.length > particleCount) {
        particlesRef.current = particlesRef.current.slice(0, particleCount)
      } else if (particlesRef.current.length < particleCount) {
        particlesRef.current = particlesRef.current.concat(
          createParticles(innerWidth, innerHeight, particleCount - particlesRef.current.length),
        )
      }
    }

    setSize(true)

    const handlePointerMove = (event: PointerEvent | MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }
    }

    let resizeFrame: number | null = null
    const handleResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        setSize(false)
        resizeFrame = null
      })
    }

    const animate = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy)

        const repulseRadius = 140
        if (distanceToMouse < repulseRadius) {
          particle.vx += (dx / distanceToMouse) * 0.02
          particle.vy += (dy / distanceToMouse) * 0.02
        }

        ctx.beginPath()
        ctx.fillStyle = 'rgba(148, 163, 184, 0.55)'
        ctx.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]

          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 140) {
            const opacity = 0.22 * (1 - distance / 140)
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      const { x: mx, y: my } = mouseRef.current
      particlesRef.current.forEach((particle) => {
        const dx = particle.x - mx
        const dy = particle.y - my
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 180) {
          const opacity = 0.24 * (1 - distance / 180)
          ctx.strokeStyle = `rgba(110, 231, 183, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden
    />
  )
}
