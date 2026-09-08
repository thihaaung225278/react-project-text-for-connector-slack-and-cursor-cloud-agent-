import slide01 from '../assets/showcase/slide-01.jpg'
import slide02 from '../assets/showcase/slide-02.jpg'
import slide03 from '../assets/showcase/slide-03.jpg'
import slide04 from '../assets/showcase/slide-04.jpg'

export type WorkCategory = 'All' | 'Motion' | 'Spatial' | 'Brand'

export type ShowcaseSlide = {
  id: string
  title: string
  kicker: string
  blurb: string
  image: string
  alt: string
}

export type WorkItem = {
  id: string
  title: string
  category: Exclude<WorkCategory, 'All'>
  year: string
  summary: string
}

export type SignalQuote = {
  id: string
  quote: string
  name: string
  role: string
}

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 's1',
    title: 'Orbital brand films',
    kicker: '01 — Cinema',
    blurb: 'Scroll-locked sequences where light and timing share the same beat.',
    image: slide01,
    alt: 'Sunlit forest canopy with deep green atmosphere',
  },
  {
    id: 's2',
    title: 'Spatial product stages',
    kicker: '02 — WebGL',
    blurb: 'Quiet Three.js stages that keep the product hero and the UI honest.',
    image: slide02,
    alt: 'Modern architectural facade with clean geometric lines',
  },
  {
    id: 's3',
    title: 'Launch narratives',
    kicker: '03 — GSAP',
    blurb: 'Intro timelines and scrubbed chapters without drowning the message.',
    image: slide03,
    alt: 'Neon-lit tech hardware on a dark desk',
  },
  {
    id: 's4',
    title: 'Signal systems',
    kicker: '04 — Systems',
    blurb: 'Reusable motion tokens so every page feels like one studio.',
    image: slide04,
    alt: 'Bright open studio workspace with long desks',
  },
]

export const WORK_FILTERS: WorkCategory[] = ['All', 'Motion', 'Spatial', 'Brand']

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'w1',
    title: 'Northline reel',
    category: 'Motion',
    year: '2026',
    summary: 'Hero cutdowns with scrubbed chapter marks.',
  },
  {
    id: 'w2',
    title: 'Atrium viewer',
    category: 'Spatial',
    year: '2026',
    summary: 'Soft-lit mesh stage for a hardware drop.',
  },
  {
    id: 'w3',
    title: 'Fieldmark identity',
    category: 'Brand',
    year: '2025',
    summary: 'Type + motion rules for a climate studio.',
  },
  {
    id: 'w4',
    title: 'Pulse chapters',
    category: 'Motion',
    year: '2025',
    summary: 'Pinned storytelling with reduced-motion peers.',
  },
  {
    id: 'w5',
    title: 'Lumen shelf',
    category: 'Spatial',
    year: '2025',
    summary: 'Interactive shelf with gentle camera drift.',
  },
  {
    id: 'w6',
    title: 'Verdant system',
    category: 'Brand',
    year: '2024',
    summary: 'Lime-forward palette kit and CTA grammar.',
  },
  {
    id: 'w7',
    title: 'Cascade edit',
    category: 'Motion',
    year: '2024',
    summary: 'Staggered editorial transitions for a magazine.',
  },
  {
    id: 'w8',
    title: 'Harbor scene',
    category: 'Spatial',
    year: '2024',
    summary: 'Fog + emissive accents for a port authority.',
  },
  {
    id: 'w9',
    title: 'Signal lockup',
    category: 'Brand',
    year: '2023',
    summary: 'Wordmark kinetics for a broadcast network.',
  },
]

export const SIGNAL_QUOTES: SignalQuote[] = [
  {
    id: 'q1',
    quote: 'They treat motion like typography — deliberate, sparse, unforgettable.',
    name: 'Mira Chen',
    role: 'Creative Director, Fieldmark',
  },
  {
    id: 'q2',
    quote: 'The 3D never stole the story. It carried it.',
    name: 'Jonah Adeyemi',
    role: 'Product Lead, Atrium',
  },
  {
    id: 'q3',
    quote: 'GSAP and WebGL finally felt like one craft, not two demos.',
    name: 'Elena Voss',
    role: 'Founder, Northline',
  },
]

export const WORKS_PAGE_SIZE = 6
