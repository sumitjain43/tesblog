import React from 'react'

function TiltCard({ children, className = '' }) {
  const ref = React.useRef(null)
  const frame = React.useRef(0)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - py) * 10
    const rotateY = (px - 0.5) * 10
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return (
    <div
      className={`[transform-style:preserve-3d] transition-transform duration-300 ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default TiltCard