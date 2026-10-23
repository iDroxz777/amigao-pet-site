import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Paw({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="32" cy="42" rx="12" ry="10" />
      <ellipse cx="16" cy="28" rx="5.5" ry="7" transform="rotate(-20 16 28)" />
      <ellipse cx="25" cy="17" rx="5.5" ry="7.5" transform="rotate(-8 25 17)" />
      <ellipse cx="39" cy="17" rx="5.5" ry="7.5" transform="rotate(8 39 17)" />
      <ellipse cx="48" cy="28" rx="5.5" ry="7" transform="rotate(20 48 28)" />
    </svg>
  )
}

export function WhatsIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.14c-.24.68-1.42 1.3-1.96 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.94-2.24.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.46.24.55.8 1.9.87 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.28-.12.55.16.27.7 1.16 1.51 1.88 1.04.93 1.91 1.21 2.18 1.35.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.33Z" />
    </svg>
  )
}

export function InstaIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z" />
    </svg>
  )
}

/* Ícones no mesmo traço do Lucide, para o que a biblioteca não tem */
export function Tooth({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5.5c-1.2-.9-2.3-1.5-3.7-1.5C6 4 4.5 5.8 4.5 8.3c0 1.9.7 3.4 1.2 5.2.6 2.3.8 6.5 2.6 6.5 1.6 0 1.6-4.5 3.7-4.5s2.1 4.5 3.7 4.5c1.8 0 2-4.2 2.6-6.5.5-1.8 1.2-3.3 1.2-5.2C19.5 5.8 18 4 15.7 4c-1.4 0-2.5.6-3.7 1.5Z" />
    </svg>
  )
}

export function Comb({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="5" rx="1.5" />
      <path d="M5.5 9v10M9 9v8M12.5 9v10M16 9v8M19 9v10" />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return <img src="/logo.png" alt="Amigão Pet Banho e Tosa" className={`rounded-full bg-white object-cover ${className}`} draggable="false" />
}

export function SectionTitle({ kicker, title, light = false, center = false, children }) {
  return (
    <div className={`reveal mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`mb-3 font-extrabold uppercase tracking-[0.2em] ${light ? 'text-sun' : 'text-royal'}`}>{kicker}</p>
      <h2 className={`font-display text-4xl font-extrabold leading-tight sm:text-5xl ${light ? 'text-white' : 'text-royal-ink'}`}>
        {title}
      </h2>
      {children}
    </div>
  )
}

/* Número que "rola" suavemente até o novo valor */
export function AnimatedNumber({ value, format = (v) => Math.round(v).toString() }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 })
  const text = useTransform(spring, format)
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span>{text}</motion.span>
}

export const brl = (v) => `R$ ${Math.round(v).toLocaleString('pt-BR')}`
