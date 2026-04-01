// src/lib/constants.ts

export interface WorldMeta {
  slug: string
  label: string
  navLabel: string
  route: string
  accentColor: string
  description: string
  icon: string
}

export const WORLDS: WorldMeta[] = [
  {
    slug: 'portal',
    label: 'THE PORTAL',
    navLabel: 'PORTAL',
    route: '/',
    accentColor: '#D4A017',
    description: 'Enter the Universe',
    icon: '🌌',
  },
  {
    slug: 'origin',
    label: 'THE ORIGIN',
    navLabel: 'ORIGIN',
    route: '/origin',
    accentColor: '#8B6914',
    description: 'The bloodline. The journey.',
    icon: '⏳',
  },
  {
    slug: 'broadcast',
    label: 'THE BROADCAST',
    navLabel: 'BROADCAST',
    route: '/broadcast',
    accentColor: '#C0392B',
    description: 'Live from the studio.',
    icon: '📺',
  },
  {
    slug: 'empire',
    label: 'THE EMPIRE',
    navLabel: 'EMPIRE',
    route: '/empire',
    accentColor: '#00D4FF',
    description: '150+ AI agents. One vision.',
    icon: '🤖',
  },
  {
    slug: 'memoir',
    label: 'THE WORD',
    navLabel: 'MEMOIR',
    route: '/memoir',
    accentColor: '#F5C842',
    description: 'Born Broke. Built Loud.',
    icon: '📖',
  },
  {
    slug: 'movement',
    label: 'THE MOVEMENT',
    navLabel: 'MOVEMENT',
    route: '/movement',
    accentColor: '#E07B39',
    description: '47 counties. One mission.',
    icon: '🔥',
  },
  {
    slug: 'future',
    label: 'THE ORACLE',
    navLabel: 'ORACLE',
    route: '/future',
    accentColor: '#00D4FF',
    description: 'Transmission from 2027.',
    icon: '🔮',
  },
  {
    slug: 'archive',
    label: 'THE ARCHIVE',
    navLabel: 'ARCHIVE',
    route: '/archive',
    accentColor: '#888888',
    description: 'Every receipt. Every proof.',
    icon: '🗂️',
  },
  {
    slug: 'contact',
    label: 'THE SIGNAL',
    navLabel: 'SIGNAL',
    route: '/contact',
    accentColor: '#D4A017',
    description: 'Send your signal.',
    icon: '📡',
  },
]

export const EUGINE = {
  name: 'Eugine Micah',
  tagline: 'Media Entrepreneur & Storytelling Strategist',
  origin: 'Born Broke. Built Loud.',
  location: 'Nairobi, Kenya',
  email: 'euginemicah@gmail.com',
  brand: 'Roylandz',

  roles: {
    current: [
      'Head of Digital, PPP TV Kenya',
      'Co-Host & Producer, Urban News (StarTimes Channel 430)',
    ],
    past: [
      'News Reporter, Citizen TV',
      'CEO, Roylandz TV',
      'CEO, Outta the Box',
    ],
  },

  stats: {
    weeklyReach: '2,000,000+',
    aiAgents: '150+',
    yearsInMedia: '10+',
    activeShows: 3,
    countiesReached: 47,
    platforms: 6,
  },

  memoir: {
    title: 'Born Broke, Built Loud',
    parts: 3,
    style: 'Will Smith + Kevin Hart + Trevor Noah + Jeff Koinange',
  },

  quote: 'Power corresponds to the human ability not just to act, but to act in concert.',
  quoteAuthor: 'Hannah Arendt',

  philosophy: "AI doesn't replace the storyteller. It amplifies him.",

  heritage: {
    tribe: 'Luhya Nation',
    clans: [
      "Abatongoi (Bunyore) — Father's side",
      'Avamaseero (Maragoli) — Mother\'s side',
    ],
    county: 'Kakamega County, Western Kenya',
    ancestors: [
      "Rev. Micah Ob'bayi (great-grandfather)",
      'David & Gladys Zarembka (grandparents, educators)',
    ],
    father: "Joab Ob'bayi — Abatongoi Clan, Bunyore",
    mother: 'Josephine Kemoli — Avamaseero Clan, Maragoli',
  },

  platforms: ['LinkedIn', 'Twitter/X', 'Instagram', 'Facebook', 'TikTok', 'Website'],

  projects: {
    propost: '150+ AI agents across 9 companies, 6 platforms',
    autoNewsStation: 'Next.js media automation platform with Meta Graph API',
    nairobi_podcast: 'With Lucy Ogunde, Mary Maina, Rania Biketi',
    urban_tour: 'High school talent search, national Kenya',
    tushinde: 'Twende Tusaidie Tushinde — 47 counties charity show',
  },

  social: {
    linkedin: 'https://linkedin.com/in/euginemicah',
    twitter: 'https://twitter.com/euginemicah',
    instagram: 'https://instagram.com/euginemicah',
    facebook: 'https://facebook.com/euginemicah',
    tiktok: 'https://tiktok.com/@euginemicah',
    youtube: 'https://youtube.com/@euginemicah',
  },
} as const

// Parallax speed constants
export const PARALLAX_SPEEDS = {
  background: 0.1,
  hero: 0.3,
  foreground: 1.0,
} as const

// Pure function — testable (Property 4)
export function computeParallaxOffset(
  scrollY: number,
  speed: number,
  isMobile: boolean,
): number {
  if (isMobile) return 0
  return scrollY * speed
}

// Pure function — testable (Property 5)
export function getParticleCount(isMobile: boolean): number {
  return isMobile ? 50 : 200
}

// Era configurations for Origin timeline
export interface EraConfig {
  id: number
  title: string
  period: string
  bgColor: string
  accentColor: string
  quote: string
  description: string
  highlights: string[]
}

export const ERA_CONFIGS: EraConfig[] = [
  {
    id: 1,
    title: 'THE BEGINNING',
    period: '2000',
    bgColor: '#2D1B00',
    accentColor: '#D4A017',
    quote: "Born into a story that didn't look like success.",
    description: 'Kakamega County. The seed of a man who would move mountains.',
    highlights: ['Born in Kakamega County', 'Western Kenya roots', 'Luhya Nation heritage'],
  },
  {
    id: 2,
    title: 'PRIMARY SCHOOL',
    period: '2009–2015',
    bgColor: '#001A3A',
    accentColor: '#4A90D9',
    quote: "When you're broke, your imagination becomes your empire.",
    description: 'The foundation years. Learning to dream bigger than the circumstances.',
    highlights: ['Primary education', 'First stories told', 'Imagination as currency'],
  },
  {
    id: 3,
    title: 'SECONDARY SCHOOL',
    period: '2015–2019',
    bgColor: '#0A2A0A',
    accentColor: '#4CAF50',
    quote: 'Education was the gift they gave before they gave anything else.',
    description: "Mua Hills Harambee Secondary School. Grandparents' legacy. The roots of discipline.",
    highlights: ['Mua Hills Harambee Secondary School', "Grandparents' school", 'Academic foundation'],
  },
  {
    id: 4,
    title: 'THE RISE',
    period: '2019–2022',
    bgColor: '#1A0A2E',
    accentColor: '#C0392B',
    quote: 'Every desk. Every camera. Every byline. Building toward something.',
    description: 'Nairobi. The city that tests you. Citizen TV. Roylandz TV. Outta the Box.',
    highlights: ['News Reporter, Citizen TV', 'CEO, Roylandz TV', 'CEO, Outta the Box'],
  },
  {
    id: 5,
    title: 'THE EMPIRE',
    period: '2022–PRESENT',
    bgColor: '#0A0F2E',
    accentColor: '#D4A017',
    quote: "This is what it looks like when a man refuses to stay broke.",
    description: 'PPP TV. Urban News. ProPost. The memoir. The podcast. The empire.',
    highlights: [
      'Head of Digital, PPP TV Kenya',
      'Co-Host & Producer, Urban News (StarTimes Ch.430)',
      'Born Broke Built Loud — Memoir published',
      'ProPost — 150+ AI agents',
      'The Nairobi Podcast',
    ],
  },
  {
    id: 6,
    title: 'THE FUTURE',
    period: '2025–2027+',
    bgColor: '#001A2E',
    accentColor: '#00D4FF',
    quote: "The story hasn't been written yet. But the pen is in my hand.",
    description: 'Continental reach. Political narrative. Pan-African media empire.',
    highlights: [
      'ProPost at scale → continental reach',
      'Urban Tour — national high school talent search',
      '2027 Kenya political cycle',
      'NSE investments, value investing strategy',
      'Pan-African media empire',
    ],
  },
]

// ProPost companies for Empire page
export interface ProPostCompany {
  name: string
  purpose: string
  agents: number
  status: 'ACTIVE' | 'BUILDING' | 'STEALTH'
  platforms: string[]
}

export const PROPOST_COMPANIES: ProPostCompany[] = [
  { name: 'Roylandz Media', purpose: 'Brand content & storytelling', agents: 20, status: 'ACTIVE', platforms: ['LinkedIn', 'Instagram'] },
  { name: 'Urban News Digital', purpose: 'News automation & distribution', agents: 18, status: 'ACTIVE', platforms: ['Twitter/X', 'Facebook'] },
  { name: 'ProPost X', purpose: 'Influencer monetization protocol', agents: 15, status: 'ACTIVE', platforms: ['Twitter/X'] },
  { name: 'Auto News Station', purpose: 'Automated news image generation', agents: 22, status: 'ACTIVE', platforms: ['Instagram', 'Facebook'] },
  { name: 'Nairobi Podcast Network', purpose: 'Podcast content amplification', agents: 12, status: 'ACTIVE', platforms: ['YouTube', 'Spotify'] },
  { name: 'PPP TV Digital', purpose: 'TV show digital extension', agents: 16, status: 'ACTIVE', platforms: ['TikTok', 'YouTube'] },
  { name: 'Roylandz Analytics', purpose: 'Performance tracking & insights', agents: 10, status: 'BUILDING', platforms: ['All'] },
  { name: 'Continental Reach', purpose: 'Pan-African content distribution', agents: 20, status: 'BUILDING', platforms: ['All'] },
  { name: 'Project 2027', purpose: 'Political narrative strategy', agents: 17, status: 'STEALTH', platforms: ['Twitter/X', 'Facebook'] },
]

// Ticker items for Portal
export const TICKER_ITEMS = [
  'EUGINE MICAH | HEAD OF DIGITAL @ PPP TV KENYA',
  'URBAN NEWS | STARTIMES CHANNEL 430 | 2M+ VIEWERS WEEKLY',
  'BORN BROKE BUILT LOUD | MEMOIR NOW AVAILABLE',
  'PROPOST | 150+ AI AGENTS | FULL AUTOMATION EMPIRE',
  'THE NAIROBI PODCAST | WITH LUCY OGUNDE & TEAM',
  'ROYLANDZ UNIVERSE | BORN BROKE. BUILT LOUD. BUILT DIFFERENT.',
]

// Classified files for Oracle page
export interface ClassifiedFile {
  filename: string
  status: 'IN PROGRESS' | 'BUILDING' | 'ACCUMULATING' | 'DEPLOYING'
  eta: string
  mission: string
  clearanceLevel: 'TOP SECRET' | 'CLASSIFIED' | 'RESTRICTED'
}

export const CLASSIFIED_FILES: ClassifiedFile[] = [
  {
    filename: 'POLITICAL_DOMINANCE.txt',
    status: 'IN PROGRESS',
    eta: '2027 Kenya Elections',
    mission: 'Shape the political narrative through digital strategy + ProPost X power.',
    clearanceLevel: 'TOP SECRET',
  },
  {
    filename: 'PAN_AFRICAN_MEDIA.txt',
    status: 'BUILDING',
    eta: '2026–2028',
    mission: 'Roylandz TV → Pan-African media platform. Not just Kenya. The continent.',
    clearanceLevel: 'CLASSIFIED',
  },
  {
    filename: 'NSE_PORTFOLIO.txt',
    status: 'ACCUMULATING',
    eta: 'Ongoing',
    mission: 'NSE value investing strategy. Benjamin Graham principles. Buy undervalued. Hold long.',
    clearanceLevel: 'RESTRICTED',
  },
  {
    filename: 'PROPOST_SCALE.txt',
    status: 'DEPLOYING',
    eta: '2025–2026',
    mission: '150 agents → 1,500 agents. 6 platforms → 12 platforms. Kenya → Africa → World.',
    clearanceLevel: 'CLASSIFIED',
  },
]

// Archive stats
export const ARCHIVE_STATS = [
  { label: 'Weekly Viewers', value: 2000000, display: '2M+', suffix: '' },
  { label: 'AI Agents Deployed', value: 150, display: '150+', suffix: '' },
  { label: 'Years In Media', value: 10, display: '10+', suffix: '' },
  { label: 'Active Shows', value: 3, display: '3', suffix: '' },
  { label: 'Kenya Counties', value: 47, display: '47', suffix: '' },
  { label: 'Memoir Written', value: 1, display: '1', suffix: '' },
  { label: 'Digital Platforms', value: 6, display: '6', suffix: '' },
]
