import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { Bath, Scissors, Van, Dog, Camera, MapPin, Clock } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react'
import {
  NAV, SERVICES, STEPS, CHATS, WHATS_URL, INSTAGRAM_URL, GOOGLE_URL, GOOGLE_RATING, GOOGLE_COUNT,
  ADDRESS, DISTRICT, MAPS_EMBED, MAPS_LINK,
} from './data'
import { Paw, WhatsIcon, InstaIcon, Star, Logo, SectionTitle, prefersReducedMotion } from './ui'
import Pricing from './Pricing'
import Reviews from './Reviews'

gsap.registerPlugin(ScrollTrigger, useGSAP)

let lenisInstance = null

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ---------- Abertura ---------- */

function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-royal"
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${(i * 37) % 100}%`,
            width: 16 + ((i * 13) % 50),
            height: 16 + ((i * 13) % 50),
            bottom: -60,
            animation: `float-up ${2 + (i % 5) * 0.4}s ease-out ${(i % 6) * 0.15}s infinite`,
          }}
        />
      ))}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12 }}
        >
          <Logo className="h-40 w-40 shadow-2xl ring-4 ring-sun" />
        </motion.div>
        <motion.p
          className="mt-6 font-display text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Preparando o banho<span className="animate-pulse">...</span>
        </motion.p>
      </div>
    </motion.div>
  )
}

/* ---------- Cabeçalho ---------- */

function ScrollDog() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const left = useTransform(progress, (v) => `calc(${v * 100}% - ${v * 28}px)`)
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1" aria-hidden="true">
      <motion.div className="h-full origin-left bg-sun" style={{ scaleX: progress }} />
      <motion.span className="absolute -top-5" style={{ left }}>
        <span className="trot inline-block text-royal"><Dog className="h-5 w-5" strokeWidth={2.4} /></span>
      </motion.span>
    </div>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/85 shadow-[0_8px_30px_-12px_rgb(7_20_73/0.25)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => go('topo')} className="flex items-center gap-2.5" aria-label="Voltar ao topo">
          <Logo className="h-12 w-12 shadow-md" />
          <span className={`font-display text-xl font-extrabold leading-none ${scrolled ? 'text-royal' : 'text-white'}`}>
            Amigão <span className="text-sun">Pet</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`font-bold transition-colors hover:text-sun ${scrolled ? 'text-royal-ink' : 'text-white/90'}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={WHATS_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-sun px-5 py-2.5 font-extrabold text-royal-ink shadow-[0_4px_0_#c99400] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Agendar
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full md:hidden ${scrolled ? 'bg-royal text-white' : 'bg-white/15 text-white'}`}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {scrolled && <ScrollDog />}

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-4 mb-3 rounded-3xl bg-royal-ink p-4 shadow-xl md:hidden"
            aria-label="Menu mobile"
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="block w-full rounded-2xl px-4 py-3 text-left font-bold text-white hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WHATS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-whats px-4 py-3 font-extrabold text-white"
            >
              <WhatsIcon className="h-5 w-5" /> Agendar pelo WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- Hero ---------- */

function Hero({ ready }) {
  const root = useRef(null)
  const bubbles = useRef(null)
  const lastBubble = useRef(0)

  // Inclinação 3D da logo seguindo o mouse
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 14 })
  const sy = useSpring(my, { stiffness: 120, damping: 14 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-22, 22])
  const rotateX = useTransform(sy, [-0.5, 0.5], [18, -18])
  const glare = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(circle at ${50 + x * 80}% ${50 + y * 80}%, rgb(255 255 255 / 0.35), transparent 55%)`,
  )

  const onPointerMove = (e) => {
    const rect = root.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)

    // Bolhas saindo do cursor
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const now = performance.now()
    if (now - lastBubble.current < 70) return
    lastBubble.current = now
    const b = document.createElement('span')
    const size = gsap.utils.random(10, 34)
    b.className = 'bubble'
    Object.assign(b.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
      bottom: 'auto',
    })
    bubbles.current.appendChild(b)
    gsap.fromTo(
      b,
      { scale: 0.3, opacity: 1 },
      {
        y: gsap.utils.random(-220, -120),
        x: gsap.utils.random(-40, 40),
        scale: 1,
        duration: gsap.utils.random(1.2, 2),
        ease: 'power1.out',
        onComplete: () =>
          gsap.to(b, { scale: 1.6, opacity: 0, duration: 0.15, onComplete: () => b.remove() }),
      },
    )
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  useGSAP(
    () => {
      if (!ready) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.25 })
        tl.from('.hero-word', { yPercent: 110, opacity: 0, rotate: 4, stagger: 0.07, duration: 0.9, ease: 'back.out(1.6)' })
          .from('.hero-logo', { scale: 0.3, rotate: -200, opacity: 0, duration: 1.3, ease: 'elastic.out(1, 0.55)' }, 0.1)
          .from('.hero-fade', { y: 24, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, 0.45)
          .from('.hero-chip', { scale: 0, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(2)' }, 0.8)

        gsap.to('.hero-float', { y: -16, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to('.hero-chip', { y: '-=14', duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.4, from: 'random' } })
        gsap.to('.hero-ring', { rotate: 360, duration: 40, ease: 'none', repeat: -1 })

        // Espuma subindo sem parar
        const container = bubbles.current
        const created = []
        for (let i = 0; i < 24; i++) {
          const b = document.createElement('span')
          b.className = 'bubble'
          const size = gsap.utils.random(14, 70)
          Object.assign(b.style, { width: `${size}px`, height: `${size}px`, left: `${gsap.utils.random(0, 100)}%` })
          container.appendChild(b)
          created.push(b)
          gsap.to(b, {
            y: () => -(window.innerHeight + 160),
            x: `+=${gsap.utils.random(-60, 60)}`,
            duration: gsap.utils.random(7, 16),
            ease: 'none',
            repeat: -1,
            delay: gsap.utils.random(0, 8),
          })
        }

        gsap.to('.hero-visual', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })

        return () => created.forEach((b) => b.remove())
      })
    },
    { scope: root, dependencies: [ready] },
  )

  const words = ['O', 'melhor', 'para', 'o', 'seu', 'amigo']

  return (
    <section
      id="topo"
      ref={root}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate overflow-hidden bg-royal pb-28 pt-32 text-white sm:pt-36 lg:pb-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,#2c56e6_0%,transparent_55%),radial-gradient(circle_at_10%_90%,#0b1f73_0%,transparent_60%)]" />
      <div ref={bubbles} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true" />
      <Paw className="absolute -left-10 top-40 -z-10 h-40 w-40 -rotate-12 text-white/5" />
      <Paw className="absolute bottom-16 right-1/3 -z-10 h-28 w-28 rotate-12 text-white/5" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-sun-soft ring-1 ring-white/20">
            <span className="flex text-sun">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4" />
              ))}
            </span>
            {GOOGLE_RATING.toFixed(1).replace('.', ',')} no Google · Vila Gumercindo
          </p>

          <h1 className="font-display text-[clamp(2.8rem,8vw,5.6rem)] font-extrabold leading-[0.95] tracking-tight">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                <span className={`hero-word mr-[0.22em] inline-block ${w === 'amigo' ? 'text-sun' : ''}`}>{w}</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <span className="hero-word inline-block text-sun">
                <Paw className="h-[0.7em] w-[0.7em] -rotate-12" />
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-lg text-lg leading-relaxed text-white/85">
            Banho, tosa e pet shop na Vila Gumercindo. Buscamos seu pet em casa e levamos de volta depois do banho.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-4">
            <a
              href={WHATS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-sun px-7 py-4 text-lg font-extrabold text-royal-ink shadow-[0_6px_0_#c99400] transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-none"
            >
              <WhatsIcon className="h-6 w-6 transition-transform group-hover:rotate-12" />
              Agendar banho
            </a>
            <button
              onClick={() => scrollToId('precos')}
              className="rounded-full px-7 py-4 text-lg font-bold text-white ring-2 ring-white/30 transition hover:bg-white/10 hover:ring-white/60"
            >
              Ver preços
            </button>
          </div>

          <dl className="hero-fade mt-12 flex flex-wrap gap-x-10 gap-y-4 text-white/80">
            <div>
              <dt className="text-sm">Aberto</dt>
              <dd className="font-display text-xl font-bold text-white">Seg a Sáb · 8h–18h</dd>
            </div>
            <div>
              <dt className="text-sm">Leva e traz</dt>
              <dd className="font-display text-xl font-bold text-white">Buscamos em casa</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual relative mx-auto aspect-square w-full max-w-[24rem] [perspective:900px]">
          <div className="absolute inset-4 rounded-full bg-sun/30 blur-3xl" />
          <svg className="hero-ring absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-sun/70" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" />
          </svg>
          <div className="hero-float h-full w-full">
            <motion.div className="hero-logo relative h-full w-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
              <Logo className="h-full w-full shadow-[0_40px_60px_-15px_rgb(7_20_73/0.6)] ring-8 ring-white/15" />
              {/* brilho */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: glare }}
              />
            </motion.div>
          </div>
          <span className="hero-chip absolute -left-3 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-2 font-display text-lg font-bold text-royal shadow-xl sm:-left-10">
            <Bath className="h-5 w-5" /> Banho
          </span>
          <span className="hero-chip absolute -right-2 top-1/3 flex items-center gap-2 rounded-2xl bg-sun px-4 py-2 font-display text-lg font-bold text-royal-ink shadow-xl sm:-right-10">
            <Scissors className="h-5 w-5" /> Tosa
          </span>
          <span className="hero-chip absolute -bottom-2 left-2 flex items-center gap-2 rounded-2xl bg-royal-ink px-4 py-2 font-display text-lg font-bold text-white shadow-xl">
            <Van className="h-5 w-5" /> Leva e traz
          </span>
        </div>
      </div>

      <svg className="absolute inset-x-0 -bottom-px w-full text-cream" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 60c120-30 240-45 360-30s240 45 360 45 240-30 360-45 240 0 360 15v45H0Z" />
      </svg>
    </section>
  )
}

function Marquee() {
  const items = ['Banho', 'Tosa', 'Leva e traz', 'Pet Shop', 'Hidratação', 'Nota 5,0 no Google', 'Muito carinho']
  const row = [...items, ...items]
  return (
    <div className="relative z-10 -mt-2 overflow-hidden bg-sun py-4 -rotate-1 shadow-lg" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-extrabold uppercase text-royal-ink">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <Paw className="h-6 w-6 text-royal" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Serviços ---------- */

function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionTitle kicker="Serviços" title="Banho, tosa e o que mais ele precisar" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            className={`reveal-card group relative overflow-hidden rounded-[2rem] p-7 shadow-[0_20px_40px_-20px_rgb(7_20_73/0.35)] ring-1 ring-royal-ink/5 ${s.tone}`}
            whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <Paw className="absolute -bottom-6 -right-6 h-28 w-28 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
            <motion.div
              className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${i === 1 ? 'bg-royal-ink/10' : i === 2 ? 'bg-royal/10' : 'bg-white/15'}`}
              whileHover={{ scale: 1.15, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <s.icon className="h-7 w-7" strokeWidth={2} />
            </motion.div>
            <h3 className="font-display text-2xl font-extrabold">{s.title}</h3>
            <p className="mt-2 leading-relaxed opacity-85">{s.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Como funciona (a van leva o pet pelos passos) ---------- */

function Steps() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 55%', scrub: 0.6 },
        })
        tl.from('.step-line', { scaleX: 0, transformOrigin: 'left center', ease: 'none' }, 0).fromTo(
          '.step-van',
          { left: '0%' },
          { left: '100%', xPercent: -100, ease: 'none' },
          0,
        )
      })
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.step', {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-royal-ink py-24 lg:py-32">
      <Paw className="absolute -right-16 top-10 h-72 w-72 rotate-12 text-white/[0.03]" />
      <div ref={root} className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle light kicker="Como funciona" title="Você chama, a gente busca" />
        <div className="relative">
          <div className="step-line absolute left-0 right-0 top-9 hidden h-1 rounded-full bg-gradient-to-r from-sun via-sun to-royal lg:block" />
          <span className="step-van absolute -top-1 z-20 hidden rounded-xl bg-royal-ink px-1 text-sun lg:block" aria-hidden="true">
            <Van className="h-9 w-9" strokeWidth={2} />
          </span>
          <ol className="grid gap-6 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="step relative">
                <div className="relative z-10 mb-5 grid h-18 w-18 place-items-center rounded-full bg-sun font-display text-2xl font-extrabold text-royal-ink ring-8 ring-royal-ink">
                  {s.n}
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white">{s.title}</h3>
                <p className="mt-1 text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- Equipe ---------- */

function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const fmt = (v) => `${v.toFixed(decimals).replace('.', ',')}${suffix}`
  useGSAP(() => {
    const el = ref.current
    if (prefersReducedMotion()) {
      el.textContent = fmt(to)
      return
    }
    const obj = { v: 0 }
    gsap.to(obj, {
      v: to,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => (el.textContent = fmt(obj.v)),
    })
  })
  return <span ref={ref}>{fmt(0)}</span>
}

function Team() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal relative mx-auto aspect-[4/5] w-full max-w-md">
          <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-sun" />
          {/* Trocar por uma foto real do Tiago com um pet */}
          <div className="absolute inset-0 -rotate-2 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-royal to-royal-deep">
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white/80">
              <Camera className="h-14 w-14" strokeWidth={1.5} />
              <p className="font-display text-xl font-bold text-sun-soft">Foto do Tiago Santana</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-royal-ink/5">
            <p className="font-display text-5xl font-extrabold leading-none text-royal">
              <Counter to={15} suffix="+" />
            </p>
            <p className="font-bold text-royal-ink/70">anos cuidando de pets</p>
          </div>
        </div>

        <div className="reveal">
          <p className="mb-3 font-extrabold uppercase tracking-[0.2em] text-royal">Quem cuida</p>
          <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Quem cuida é o <span className="text-royal">Tiago Santana</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-royal-ink/80">
            São mais de 15 anos trabalhando com banho e tosa. Hoje o Tiago toca o Amigão Pet junto com o Felipe e a equipe.
            Tem cliente que traz os collies desde filhotes e tutora que está com a gente há quase 5 anos.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-royal-ink/80">
            Paciência com os bravinhos, colo pros medrosos e cuidado redobrado com os idosos. E tem café pra quem vem
            buscar.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-sm">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-royal-ink/5">
              <p className="flex items-center gap-1 font-display text-3xl font-extrabold text-royal">
                <Counter to={GOOGLE_RATING} decimals={1} /> <Star className="h-6 w-6 text-sun" />
              </p>
              <p className="text-sm font-bold text-royal-ink/60">nota no Google</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-royal-ink/5">
              <p className="font-display text-3xl font-extrabold text-royal">
                <Counter to={183} />
              </p>
              <p className="text-sm font-bold text-royal-ink/60">posts de pets felizes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- WhatsApp ---------- */

function Chats() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.chat').forEach((chat) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: chat, start: 'top 80%' } })
          tl.from(chat.querySelector('.bubble-in'), { x: -40, opacity: 0, scale: 0.8, transformOrigin: 'left bottom', duration: 0.6, ease: 'back.out(1.8)' })
            .from(chat.querySelector('.typing'), { opacity: 0, duration: 0.2 }, '+=0.1')
            .to(chat.querySelector('.typing'), { opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0, duration: 0.2 }, '+=0.9')
            .from(chat.querySelector('.bubble-out'), { x: 40, opacity: 0, scale: 0.8, transformOrigin: 'right bottom', duration: 0.6, ease: 'back.out(1.8)' })
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.typing', { display: 'none' })
      })
    },
    { scope: root },
  )

  return (
    <section className="relative overflow-hidden bg-sun-soft pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6" ref={root}>
        <SectionTitle kicker="No WhatsApp" title="Mensagens que a gente recebe" />
        <div className="grid gap-6 lg:grid-cols-3">
          {CHATS.map((c) => (
            <figure
              key={c.who}
              className="chat flex flex-col rounded-[2rem] bg-[#efe7dd] p-5 shadow-[0_20px_40px_-20px_rgb(7_20_73/0.35)] ring-4 ring-white"
            >
              <figcaption className="mb-4 flex items-center gap-3 border-b border-black/5 pb-4">
                <Logo className="h-10 w-10" />
                <span className="font-bold text-royal-ink">{c.who}</span>
              </figcaption>
              <blockquote className="bubble-in max-w-[92%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-sm">
                {c.msg}
                <span className="mt-1 block text-right text-xs text-neutral-400">{c.time}</span>
              </blockquote>
              <div className="typing mt-3 flex w-16 gap-1 self-end rounded-2xl bg-whats-bubble px-4 py-3" aria-hidden="true">
                <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500" />
              </div>
              <p className="bubble-out mt-3 max-w-[88%] self-end rounded-2xl rounded-br-md bg-whats-bubble px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-sm">
                {c.reply}
                <span className="mt-1 block text-right text-xs text-neutral-500">Amigão Pet ✓✓</span>
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Instagram + Contato + Rodapé ---------- */

function InstaCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="reveal group relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-royal via-royal-deep to-royal-ink p-10 text-white sm:flex-row sm:items-center sm:p-14"
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        <Paw className="absolute -right-10 -top-10 h-60 w-60 rotate-12 text-white/5 transition-transform duration-700 group-hover:rotate-45" />
        <div>
          <p className="mb-2 font-extrabold uppercase tracking-[0.2em] text-sun">@amigao_pet2023</p>
          <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Os pets da semana <br className="hidden sm:block" /> estão no Instagram
          </h2>
        </div>
        <span className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-lg font-extrabold text-royal-ink transition-transform group-hover:translate-x-2">
          <InstaIcon className="h-6 w-6" /> Seguir no Instagram
        </span>
      </motion.a>
    </section>
  )
}

function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
      <SectionTitle kicker="Onde estamos" title="Na Vila Gumercindo, zona sul de SP" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal flex flex-col gap-4">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-royal-ink/5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-royal">
              <MapPin className="h-4 w-4" /> Endereço
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{ADDRESS}</p>
            <p className="text-royal-ink/70">{DISTRICT}</p>
            <p className="mt-3 font-bold text-royal group-hover:underline">Abrir no mapa →</p>
          </a>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-royal-ink/5">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-royal">
              <Clock className="h-4 w-4" /> Horário
            </p>
            <p className="mt-2 font-display text-2xl font-bold">Segunda a Sábado</p>
            <p className="text-royal-ink/70">das 08:00 às 18:00</p>
          </div>
          <a
            href={WHATS_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-3xl bg-whats p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <WhatsIcon className="h-12 w-12 shrink-0 transition-transform group-hover:rotate-12" />
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-white/80">WhatsApp</p>
              <p className="font-display text-2xl font-bold">(11) 99230-4932</p>
            </div>
          </a>
        </div>
        <div className="reveal overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-20px_rgb(7_20_73/0.35)] ring-4 ring-white">
          <iframe
            title="Mapa do Amigão Pet"
            src={MAPS_EMBED}
            className="h-full min-h-[22rem] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-royal-ink pb-10 pt-14 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <Logo className="h-16 w-16" />
          <div>
            <p className="font-display text-xl font-extrabold text-white">
              Amigão <span className="text-sun">Pet</span>
            </p>
            <p className="text-sm">O melhor para o seu amigo</p>
          </div>
        </div>
        <div className="flex gap-3">
          <a href={GOOGLE_URL} target="_blank" rel="noreferrer" aria-label={`${GOOGLE_COUNT} avaliações no Google`} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-sun transition hover:bg-sun hover:text-royal-ink">
            <Star className="h-5 w-5" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-sun hover:text-royal-ink">
            <InstaIcon className="h-5 w-5" />
          </a>
          <a href={WHATS_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-whats">
            <WhatsIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-center text-sm text-white/40 sm:px-6">
        © {new Date().getFullYear()} Amigão Pet · {ADDRESS} · São Paulo/SP
      </p>
    </footer>
  )
}

function FloatingWhats({ ready }) {
  return (
    <AnimatePresence>
      {ready && (
        <motion.a
          href={WHATS_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Agendar pelo WhatsApp"
          className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-whats text-white shadow-[0_10px_30px_-5px_rgb(37_211_102/0.6)]"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="ping-soft absolute inset-0 rounded-full bg-whats" />
          <WhatsIcon className="relative h-8 w-8" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/* ---------- App ---------- */

export default function App() {
  const main = useRef(null)
  const [loading, setLoading] = useState(() => !prefersReducedMotion())
  const finishLoading = useCallback(() => setLoading(false), [])

  // Rolagem suave (Lenis) sincronizada com o ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  // Recalcula os gatilhos de scroll quando a altura da página muda (ex.: calculadora abrindo campos)
  useEffect(() => {
    let timer
    let lastHeight = document.body.scrollHeight
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (h === lastHeight) return
      lastHeight = h
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      clearTimeout(timer)
    }
  }, [])

  // Trava a rolagem durante a abertura
  useEffect(() => {
    if (!lenisInstance) return
    if (loading) lenisInstance.stop()
    else lenisInstance.start()
  }, [loading])

  // Revelar elementos ao rolar
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        })
        gsap.set('.reveal-card', { y: 80, opacity: 0, rotate: 3 })
        ScrollTrigger.batch('.reveal-card', {
          start: 'top 88%',
          onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, rotate: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)' }),
        })
      })
    },
    { scope: main },
  )

  return (
    <div ref={main}>
      <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>
      <Header />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Services />
        <Pricing />
        <Steps />
        <Team />
        <Reviews />
        <Chats />
        <InstaCta />
        <Contact />
      </main>
      <Footer />
      <FloatingWhats ready={!loading} />
    </div>
  )
}
