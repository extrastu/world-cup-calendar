import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'CupCalendar - 2026 FIFA World Cup Schedule | 世界杯赛程',
    template: '%s | CupCalendar',
  },
  description: '2026 FIFA World Cup Schedule with Beijing Time. Complete World Cup 2026 Calendar featuring 48 teams, 104 matches across USA, Canada & Mexico. Subscribe to Apple Calendar. 世界杯赛程北京时间，支持日历订阅。',
  keywords: [
    '2026 FIFA World Cup Schedule',
    '世界杯赛程',
    'World Cup 2026 Calendar',
    'CupCalendar',
    'FIFA World Cup 2026',
    '2026世界杯',
    'World Cup Schedule',
    'World Cup Calendar',
    '世界杯日历',
    'World Cup 2026 Fixtures',
    'World Cup Beijing Time',
    '北京时间',
    'World Cup Match Schedule',
    'FIFA 2026',
    'USA Canada Mexico World Cup',
    '世界杯直播时间',
    'World Cup Teams',
    'World Cup Groups',
    'World Cup Knockout',
    '世界杯小组赛',
    '世界杯淘汰赛',
  ],
  authors: [{ name: 'CupCalendar' }],
  creator: 'CupCalendar',
  publisher: 'CupCalendar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    title: 'CupCalendar - 2026 FIFA World Cup Schedule | 世界杯赛程',
    description: '2026 FIFA World Cup Schedule with Beijing Time. 48 teams, 104 matches. Subscribe to Apple Calendar. 世界杯赛程北京时间。',
    siteName: 'CupCalendar',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CupCalendar - 2026 FIFA World Cup Schedule',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CupCalendar - 2026 FIFA World Cup Schedule',
    description: '2026 FIFA World Cup Schedule with Beijing Time. Subscribe to Apple Calendar. 世界杯赛程。',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  manifest: '/manifest.json',
  category: 'sports',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
