import { Bath, Scissors, Van, ShoppingBag, Droplets, Ribbon } from 'lucide-react'
import { Tooth, Comb } from './ui'

export const WHATS_NUMBER = '5511992304932'
export const whatsUrl = (msg = 'Olá! Vim pelo site do Amigão Pet e gostaria de agendar um horário.') =>
  `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`
export const WHATS_URL = whatsUrl()
export const INSTAGRAM_URL = 'https://www.instagram.com/amigao_pet2023/'
export const GOOGLE_URL = 'https://share.google/Ecel2n8wiakkziLPh'
export const ADDRESS = 'Rua Dom Bernardo Nogueira, 972'
export const DISTRICT = 'Vila Gumercindo · São Paulo/SP · 04134-001'
const FULL_ADDRESS = 'Rua Dom Bernardo Nogueira, 972, São Paulo - SP, 04134-001'
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(FULL_ADDRESS)}&z=16&output=embed`
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FULL_ADDRESS)}`

export const GOOGLE_RATING = 5.0
export const GOOGLE_COUNT = 21

export const NAV = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'precos', label: 'Preços' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'contato', label: 'Onde estamos' },
]

export const SERVICES = [
  {
    icon: Bath,
    title: 'Banho',
    text: 'Shampoo certo pra cada tipo de pelo, secagem bem feita e limpeza de ouvidos.',
    tone: 'bg-royal text-white',
  },
  {
    icon: Scissors,
    title: 'Tosa',
    text: 'Tosa higiênica, na máquina ou na tesoura, do jeito que combina com o seu cachorro.',
    tone: 'bg-sun text-royal-ink',
  },
  {
    icon: Van,
    title: 'Leva e traz',
    text: 'Buscamos seu pet em casa e levamos de volta depois do banho.',
    tone: 'bg-white text-royal-ink',
  },
  {
    icon: ShoppingBag,
    title: 'Pet Shop',
    text: 'Rações, petiscos, brinquedos e acessórios.',
    tone: 'bg-royal-ink text-white',
  },
]

export const STEPS = [
  { n: '01', title: 'Chama no WhatsApp', text: 'Diz o serviço e o melhor horário pra você.' },
  { n: '02', title: 'A gente busca', text: 'Passamos na sua casa, ou você traz aqui na Vila Gumercindo.' },
  { n: '03', title: 'Banho e tosa', text: 'Com calma, sem pressa pra terminar.' },
  { n: '04', title: 'Volta pra casa', text: 'Entregamos no mesmo dia, limpinho e cheiroso.' },
]

/* ---------- Preços (valores de exemplo para o protótipo) ---------- */

export const SIZES = [
  { id: 'p', label: 'P', hint: 'até 5 kg', scale: 0.7 },
  { id: 'm', label: 'M', hint: '5 a 15 kg', scale: 0.9 },
  { id: 'g', label: 'G', hint: '15 a 30 kg', scale: 1.1 },
  { id: 'gg', label: 'GG', hint: '+30 kg', scale: 1.3 },
]

export const PLANS = [
  { id: 'banho', label: 'Banho', desc: 'Banho, secagem, limpeza de ouvidos e corte de unhas', dog: [55, 70, 90, 120], cat: 80 },
  { id: 'higienica', label: 'Banho + Tosa higiênica', desc: 'Tudo do banho + tosa das patinhas, barriga e partes íntimas', dog: [70, 85, 110, 145], cat: 95 },
  { id: 'completa', label: 'Banho + Tosa completa', desc: 'Tudo do banho + tosa na máquina ou na tesoura, do seu jeito', dog: [95, 120, 150, 190], cat: 130 },
]

export const EXTRAS = [
  { id: 'hidratacao', label: 'Hidratação', icon: Droplets, price: 25 },
  { id: 'dental', label: 'Escovação dental', icon: Tooth, price: 15 },
  { id: 'nos', label: 'Desembolo de nós', icon: Comb, price: 20 },
  { id: 'laco', label: 'Lacinho ou gravatinha', icon: Ribbon, price: 0 },
]

export const PICKUP_PRICE = 15
export const MONTHLY_DISCOUNT = 0.15

/* ---------- Avaliações do Google ---------- */

export const REVIEWS = [
  {
    name: 'Bianca L.',
    when: 'há 1 ano',
    text: 'O atendimento no Amigão Pet foi excelente! Todos os funcionários foram super atenciosos e trataram meus bichinhos com muito carinho. Minha família toda amou o resultado, elas saíram lindas e cheirosas!',
  },
  {
    name: 'Beatriz M.',
    when: 'há 4 meses',
    badge: 'Local Guide',
    text: 'Meu marido levou minha cachorrinha pra tosar e cortar unha, o Thiago e o Felipe foram ótimos! Minha cachorra ficou linda! Muito obrigada pelo serviço ótimo e atendimento maravilhoso.',
  },
  {
    name: 'Roberta G.',
    when: 'há 1 ano',
    text: 'Tiago é um profissional de excelência, experiente, dedicado, esforçado, prestativo e cuidadoso! Confio os cuidados com a pelagem dos meus Collies a ele há anos, desde filhotes!',
  },
  {
    name: 'Leticia L.',
    when: 'há 9 meses',
    text: 'Lugar maravilhoso. Thiago e sua equipe cuidam da minha cachorrinha há quase 5 anos!!!!',
  },
  {
    name: 'Pietra B.',
    when: 'há 1 ano',
    text: 'Peguei a indicação pelo Google e, por ver tantos comentários positivos, dei uma chance. Que experiência maravilhosa! O Tiago é uma pessoa super do bem e tem todo carinho e cuidado com nossos pets.',
  },
  {
    name: 'Rafaela L.',
    when: 'há 2 anos',
    text: 'Tiago é um ótimo profissional e só confio nele para dar banho e tosar meus bichinhos. Tenho uma cadelinha idosa e ele sempre é muito cuidadoso e atencioso com ela e com o meu pastor!',
  },
  {
    name: 'Silvia L.',
    when: 'há 1 ano',
    text: 'Excelente atendimento! As minhas seis shih tzus tomaram banho e fizeram tosa, deu pra ver que se sentiram super à vontade e foram muito bem tratadas. Isso pra mim fez total diferença.',
  },
  {
    name: 'Patricia A.',
    when: 'há 2 anos',
    text: 'Levei um dos meus cães para banho e tosa e foi muito tranquilo, o Thiago é um exemplo de profissional. A equipe toda foi muito atenciosa, voltaremos em breve!',
  },
  {
    name: 'Denis M.',
    when: 'há 7 meses',
    badge: 'Local Guide',
    text: 'Ótimo atendimento, um bom papo, um ótimo café. Pessoas especiais com bom coração.',
  },
  {
    name: 'Gabriel M.',
    when: 'há 1 mês',
    text: 'Incrível, muito bom o atendimento! Simpáticos, têm muito cuidado e carinho pelos animais. Amei!',
  },
]

/* ---------- Conversas do WhatsApp (prints do Instagram) ---------- */

export const CHATS = [
  {
    who: 'Tutora de um Shih Tzu',
    msg: 'Me indicaram no grupo do prédio e adorei! Vieram buscar todos com o maior carinho e atenção. Ficaram lindos e super bem tosados. Super indico o trabalho do Tiago!',
    time: '10:45',
    reply: 'Ficamos muito felizes! Obrigado pela confiança 💙💛',
  },
  {
    who: 'Vizinha do pet shop',
    msg: 'Estava estacionada na rua e vi o rapaz pegando um shitzu no colo. Quanta empatia com o cão, dava pra ver a conexão entre os dois. Parabéns por ter funcionários assim!',
    time: '16:56',
    reply: 'Esse é o Tiago! Nosso foco sempre foi dar o melhor tratamento que esses amiguinhos merecem.',
  },
  {
    who: 'Patrícia · tutora do Bento (maltês)',
    msg: 'Tiago, muito obrigada por hoje! Vocês são muito simpáticos, logo voltaremos. Você faz jus a todas as boas indicações.',
    time: '17:20',
    reply: 'Olá dona Patrícia! Ficamos muito felizes que tenha gostado 💙💛',
  },
]
