import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { REVIEWS, GOOGLE_URL, GOOGLE_RATING, GOOGLE_COUNT } from './data'
import { Star, SectionTitle } from './ui'

const AVATAR_COLORS = ['bg-royal', 'bg-sun text-royal-ink', 'bg-royal-ink', 'bg-whats', 'bg-[#e8505b]']

function ReviewCard({ r, i }) {
  return (
    <article className="flex w-[20rem] shrink-0 flex-col rounded-3xl bg-white p-6 shadow-[0_15px_35px_-20px_rgb(7_20_73/0.35)] ring-1 ring-royal-ink/5 transition-transform duration-300 hover:-translate-y-2 hover:rotate-[-1deg] sm:w-[23rem]">
      <header className="mb-4 flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-full font-display text-lg font-extrabold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
          {r.name[0]}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-royal-ink">{r.name}</p>
          <p className="text-xs text-royal-ink/50">
            {r.badge ? `${r.badge} · ` : ''}
            {r.when}
          </p>
        </div>
        <span className="ml-auto rounded-full bg-cream px-2.5 py-1 text-xs font-extrabold text-royal-ink/60">Google</span>
      </header>
      <div className="mb-3 flex text-sun" aria-label="5 estrelas">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="h-5 w-5" />
        ))}
      </div>
      <p className="leading-relaxed text-royal-ink/80">“{r.text}”</p>
    </article>
  )
}

function Row({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row group flex overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className={`flex w-max gap-6 pr-6 ${reverse ? 'marquee-track-reverse' : 'marquee-track-slow'}`}>
        {doubled.map((r, i) => (
          <ReviewCard key={i} r={r} i={i} />
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.rating-card', start: 'top 80%' } })
        const obj = { v: 0 }
        tl.from('.rating-card', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
          .to(obj, { v: GOOGLE_RATING, duration: 1.2, ease: 'power2.out', onUpdate: () => (root.current.querySelector('.rating-num').textContent = obj.v.toFixed(1).replace('.', ',')) }, '<0.2')
          .from('.rating-star', { scale: 0, rotate: -180, stagger: 0.12, duration: 0.5, ease: 'back.out(2.5)' }, '<')
      })
    },
    { scope: root },
  )

  const half = Math.ceil(REVIEWS.length / 2)

  return (
    <section id="avaliacoes" ref={root} className="relative overflow-hidden bg-gradient-to-b from-cream to-sun-soft py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle kicker="Avaliações" title="O que os clientes dizem no Google" />
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noreferrer"
            className="rating-card group mb-12 flex items-center gap-5 rounded-[2rem] bg-white p-6 pr-8 shadow-[0_20px_40px_-20px_rgb(7_20_73/0.35)] ring-1 ring-royal-ink/5 transition-[translate] hover:-translate-y-1"
          >
            <span className="rating-num font-display text-6xl font-extrabold leading-none text-royal">
              {GOOGLE_RATING.toFixed(1).replace('.', ',')}
            </span>
            <span>
              <span className="flex text-sun">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="rating-star h-7 w-7" />
                ))}
              </span>
              <span className="mt-1 block font-bold text-royal-ink">
                {GOOGLE_COUNT} avaliações no Google
              </span>
              <span className="text-sm font-bold text-royal group-hover:underline">Ver todas →</span>
            </span>
          </a>
        </div>
      </div>

      <Row items={REVIEWS.slice(0, half)} />
      <Row items={REVIEWS.slice(half)} reverse />

      <div className="mt-10 text-center">
        <a
          href={GOOGLE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-royal-ink px-7 py-4 font-extrabold text-white transition hover:-translate-y-1 hover:bg-royal"
        >
          <Star className="h-5 w-5 text-sun" /> Já é cliente? Deixe sua avaliação
        </a>
      </div>
    </section>
  )
}
