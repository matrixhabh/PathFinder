import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'PathFinder AI — Your adaptive career path',
  description: 'A living learning path that helps ambitious people build the skills for what is next.',
  generator: 'PathFinder AI',
}

export const viewport: Viewport = { colorScheme: 'light dark', themeColor: '#17122f', width: 'device-width', initialScale: 1, userScalable: true }

const themeBootstrap = `(()=>{try{const saved=localStorage.getItem('pathfinder-theme');const dark=saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light'}catch{}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}><head><script dangerouslySetInnerHTML={{__html:themeBootstrap}} /></head><body><SmoothScroll />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
