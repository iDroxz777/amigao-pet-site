import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { Dog, Cat, Van } from 'lucide-react'
import { SIZES, PLANS, EXTRAS, PICKUP_PRICE, MONTHLY_DISCOUNT, whatsUrl } from './data'
import { SectionTitle, AnimatedNumber, WhatsIcon, Paw, brl } from './ui'

const spring = { type: 'spring', stiffness: 420, damping: 32 }

function StepLabel({ n, children }) {
  return (
    <p className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-royal-ink">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-royal text-sm text-white">{n}</span>
      {children}
    </p>
  )
}

function Segmented({ id, options, value, onChange, render }) {
  return (
    <div role="radiogroup" className="flex gap-2 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-royal-ink/5">
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={`relative flex-1 rounded-2xl px-2 py-3 font-bold transition-colors ${active ? 'text-royal-ink' : 'text-royal-ink/60 hover:text-royal-ink'}`}
          >
            {active && <motion.span layoutId={`seg-${id}`} className="absolute inset-0 rounded-2xl bg-sun shadow-[0_3px_0_#c99400]" transition={spring} />}
            <span className="relative">{render(opt, active)}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Pricing() {
  const [pet, setPet] = useState('dog')
  const [size, setSize] = useState('m')
  const [plan, setPlan] = useState('higienica')
  const [extras, setExtras] = useState(() => new Set(['laco']))
  const [pickup, setPickup] = useState(true)
  const [monthly, setMonthly] = useState(false)

  const sizeIndex = SIZES.findIndex((s) => s.id === size)
  const planData = PLANS.find((p) => p.id === plan)
  const basePrice = pet === 'cat' ? planData.cat : planData.dog[sizeIndex]

  const lines = useMemo(() => {
    const out = [{ key: 'plan', label: `${planData.label} (${pet === 'cat' ? 'gato' : `porte ${SIZES[sizeIndex].label}`})`, price: basePrice }]
    EXTRAS.filter((e) => extras.has(e.id)).forEach((e) => out.push({ key: e.id, label: e.label, icon: e.icon, price: e.price }))
    if (pickup) out.push({ key: 'pickup', label: 'Leva e traz', icon: Van, price: PICKUP_PRICE })
    return out
  }, [planData, pet, sizeIndex, basePrice, extras, pickup])

  const visit = lines.reduce((sum, l) => sum + l.price, 0)
  const total = monthly ? visit * 4 * (1 - MONTHLY_DISCOUNT) : visit
  const savings = visit * 4 * MONTHLY_DISCOUNT

  const toggleExtra = (id) =>
    setExtras((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Só texto: o wa.me corrompe emojis no WhatsApp Web/desktop
  const message = [
    'Olá! Montei um pacote pelo site do Amigão Pet:',
    '',
    ...lines.map((l) => `- ${l.label}: ${l.price ? brl(l.price) : 'cortesia'}`),
    '',
    monthly ? `Plano mensal com 4 visitas (15% de desconto): ${brl(total)} por mês` : `Total: ${brl(total)}`,
    '',
    'Qual o melhor dia e horário?',
  ].join('\n')

  return (
    <section id="precos" className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <Paw className="absolute -left-20 top-24 h-80 w-80 -rotate-12 text-royal/[0.04]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle kicker="Preços" title="Monte o banho do seu amigo">
          <p className="mt-4 text-lg text-royal-ink/70">Escolha as opções, veja o valor e mande o pedido pelo WhatsApp.</p>
        </SectionTitle>

        <LayoutGroup>
          <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
            {/* Configurador */}
            <div className="reveal space-y-8">
              <div>
                <StepLabel n="1">Quem vem tomar banho?</StepLabel>
                <Segmented
                  id="pet"
                  value={pet}
                  onChange={setPet}
                  options={[
                    { id: 'dog', label: 'Cachorro', icon: Dog },
                    { id: 'cat', label: 'Gato', icon: Cat },
                  ]}
                  render={(o) => (
                    <span className="flex items-center justify-center gap-2 text-lg">
                      <o.icon className="h-6 w-6" strokeWidth={2.2} /> {o.label}
                    </span>
                  )}
                />
              </div>

              <AnimatePresence initial={false}>
                {pet === 'dog' && (
                  <motion.div
                    key="size"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <StepLabel n="2">Qual o porte?</StepLabel>
                    <Segmented
                      id="size"
                      value={size}
                      onChange={setSize}
                      options={SIZES}
                      render={(o, active) => (
                        <span className="flex flex-col items-center">
                          <span className="flex h-12 items-end">
                            <motion.span
                              className="inline-block origin-bottom"
                              animate={{ scale: o.scale, rotate: active ? [0, -12, 10, 0] : 0 }}
                              transition={{ duration: 0.45 }}
                            >
                              <Dog className="h-8 w-8" strokeWidth={2} />
                            </motion.span>
                          </span>
                          <span className="font-display text-xl font-extrabold">{o.label}</span>
                          <span className="text-xs font-semibold opacity-70">{o.hint}</span>
                        </span>
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <StepLabel n={pet === 'dog' ? '3' : '2'}>Qual serviço?</StepLabel>
                <div role="radiogroup" className="grid gap-3">
                  {PLANS.map((p) => {
                    const active = p.id === plan
                    const price = pet === 'cat' ? p.cat : p.dog[sizeIndex]
                    return (
                      <button
                        key={p.id}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setPlan(p.id)}
                        className={`relative flex items-center justify-between gap-4 rounded-3xl p-5 text-left ring-2 transition ${
                          active ? 'bg-royal text-white ring-royal' : 'bg-white text-royal-ink ring-royal-ink/5 hover:ring-royal/30'
                        }`}
                      >
                        <span className="flex items-start gap-3">
                          <span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ring-2 ${active ? 'bg-sun ring-sun' : 'ring-royal-ink/20'}`}>
                            {active && <motion.span layoutId="plan-dot" className="h-2.5 w-2.5 rounded-full bg-royal-ink" transition={spring} />}
                          </span>
                          <span>
                            <span className="block font-display text-xl font-bold">{p.label}</span>
                            <span className={`block text-sm ${active ? 'text-white/75' : 'text-royal-ink/60'}`}>{p.desc}</span>
                          </span>
                        </span>
                        <span className={`shrink-0 font-display text-2xl font-extrabold ${active ? 'text-sun' : 'text-royal'}`}>
                          <AnimatedNumber value={price} format={brl} />
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <StepLabel n={pet === 'dog' ? '4' : '3'}>Quer um mimo a mais?</StepLabel>
                <div className="flex flex-wrap gap-3">
                  {EXTRAS.map((e) => {
                    const on = extras.has(e.id)
                    return (
                      <motion.button
                        key={e.id}
                        onClick={() => toggleExtra(e.id)}
                        aria-pressed={on}
                        whileTap={{ scale: 0.92 }}
                        className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-bold ring-2 transition-colors ${
                          on ? 'bg-sun text-royal-ink ring-sun' : 'bg-white text-royal-ink/70 ring-royal-ink/10 hover:ring-royal/30'
                        }`}
                      >
                        <e.icon className="h-4.5 w-4.5" />
                        {e.label}
                        <span className="text-sm opacity-70">{e.price ? `+${brl(e.price)}` : 'grátis'}</span>
                      </motion.button>
                    )
                  })}
                  <motion.button
                    onClick={() => setPickup((v) => !v)}
                    aria-pressed={pickup}
                    whileTap={{ scale: 0.92 }}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-bold ring-2 transition-colors ${
                      pickup ? 'bg-royal text-white ring-royal' : 'bg-white text-royal-ink/70 ring-royal-ink/10 hover:ring-royal/30'
                    }`}
                  >
                    <Van className="h-4.5 w-4.5" /> Leva e traz <span className="text-sm opacity-70">+{brl(PICKUP_PRICE)}</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Recibo */}
            <div className="reveal lg:sticky lg:top-28">
              <motion.div layout className="receipt relative rounded-t-[2rem] bg-white px-7 pb-8 pt-7 shadow-[0_30px_60px_-30px_rgb(7_20_73/0.45)]">
                <div className="flex items-center justify-between border-b-2 border-dashed border-royal-ink/10 pb-5">
                  <div>
                    <p className="font-display text-2xl font-extrabold text-royal">Seu pacote</p>
                    <p className="text-sm text-royal-ink/50">Amigão Pet · Banho e Tosa</p>
                  </div>
                  <motion.span
                    key={pet + size}
                    initial={{ scale: 0.4, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className="grid h-14 w-14 place-items-center rounded-full bg-sun text-royal-ink"
                  >
                    {pet === 'cat' ? <Cat className="h-7 w-7" /> : <Dog className="h-7 w-7" />}
                  </motion.span>
                </div>

                <ul className="space-y-3 py-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-baseline justify-between gap-4 text-royal-ink"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          {l.icon && <l.icon className="h-4 w-4 shrink-0 text-royal/70" />}
                          {l.label}
                        </span>
                        <span className="shrink-0 font-bold tabular-nums">{l.price ? brl(l.price) : <span className="text-whats">cortesia</span>}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <motion.div layout className="border-t-2 border-dashed border-royal-ink/10 pt-5">
                  <label className="mb-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-sun-soft p-4">
                    <span>
                      <span className="block font-bold text-royal-ink">Plano mensal · 4 visitas</span>
                      <span className="text-sm text-royal-ink/60">Economize 15% todo mês</span>
                    </span>
                    <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} className="peer sr-only" />
                    <span className="relative h-8 w-14 shrink-0 rounded-full bg-royal-ink/15 transition-colors peer-checked:bg-royal peer-focus-visible:ring-4 peer-focus-visible:ring-royal/30">
                      <motion.span
                        className="absolute top-1 h-6 w-6 rounded-full bg-white shadow"
                        animate={{ left: monthly ? 28 : 4 }}
                        transition={spring}
                      />
                    </span>
                  </label>

                  <div className="flex items-end justify-between">
                    <span className="font-bold text-royal-ink/60">{monthly ? 'Por mês' : 'Total'}</span>
                    <span className="font-display text-5xl font-extrabold leading-none text-royal">
                      <AnimatedNumber value={total} format={brl} />
                    </span>
                  </div>
                  <AnimatePresence>
                    {monthly && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-right font-bold text-whats"
                      >
                        Você economiza {brl(savings)} por mês
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.a
                    href={whatsUrl(message)}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 2 }}
                    className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl bg-whats px-6 py-4 text-lg font-extrabold text-white shadow-[0_5px_0_#1a9e4b]"
                  >
                    <WhatsIcon className="h-6 w-6" /> Agendar esse pacote
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </LayoutGroup>

        {/* Tabela completa */}
        <div className="reveal mt-20">
          <h3 className="mb-6 font-display text-3xl font-extrabold text-royal-ink">Tabela completa</h3>
          <div className="overflow-x-auto rounded-[2rem] bg-white shadow-sm ring-1 ring-royal-ink/5">
            <table className="w-full min-w-[40rem] text-left">
              <thead>
                <tr className="bg-royal-ink text-white">
                  <th className="px-6 py-4 font-display text-lg">Serviço</th>
                  {SIZES.map((s) => (
                    <th key={s.id} className={`px-4 py-4 text-center transition-colors ${pet === 'dog' && s.id === size ? 'bg-sun text-royal-ink' : ''}`}>
                      <span className="block font-display text-lg">{s.label}</span>
                      <span className="block text-xs font-semibold opacity-70">{s.hint}</span>
                    </th>
                  ))}
                  <th className={`px-4 py-4 text-center transition-colors ${pet === 'cat' ? 'bg-sun text-royal-ink' : ''}`}>
                    <span className="block font-display text-lg">Gato</span>
                    <span className="block text-xs font-semibold opacity-70">porte único</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((p) => (
                  <tr key={p.id} className={`border-t border-royal-ink/5 transition-colors ${p.id === plan ? 'bg-sun-soft/60' : ''}`}>
                    <td className="px-6 py-4 font-bold text-royal-ink">{p.label}</td>
                    {p.dog.map((v, i) => (
                      <td key={i} className={`px-4 py-4 text-center font-bold tabular-nums ${pet === 'dog' && i === sizeIndex ? 'bg-sun/15 text-royal' : 'text-royal-ink/80'}`}>
                        {brl(v)}
                      </td>
                    ))}
                    <td className={`px-4 py-4 text-center font-bold tabular-nums ${pet === 'cat' ? 'bg-sun/15 text-royal' : 'text-royal-ink/80'}`}>{brl(p.cat)}</td>
                  </tr>
                ))}
                <tr className="border-t border-royal-ink/5 bg-cream/60">
                  <td colSpan={6} className="px-6 py-4 text-sm text-royal-ink/70">
                    <strong className="text-royal-ink">Extras:</strong>{' '}
                    {EXTRAS.map((e) => `${e.label} ${e.price ? `+${brl(e.price)}` : '(grátis)'}`).join(' · ')} · Leva e traz +{brl(PICKUP_PRICE)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-royal-ink/50">* Valores de exemplo. Pets com nós ou comportamento especial podem ter ajuste, combinado pelo WhatsApp.</p>
        </div>
      </div>
    </section>
  )
}
