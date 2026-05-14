import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: '2026 FIFA 世界杯日历 | 完整赛程表 - 北京时间',
    template: '%s | 2026世界杯日历',
  },
  description: '2026年FIFA世界杯完整赛程表，北京时间显示。包含48支球队、12个小组、104场比赛的详细时间、场馆、球队阵容信息。美国、加拿大、墨西哥联合举办，支持Apple日历订阅。',
  keywords: [
    '2026世界杯',
    '2026 FIFA World Cup',
    '世界杯赛程',
    '世界杯日历',
    '世界杯时间表',
    '北京时间',
    '世界杯直播时间',
    '世界杯小组赛',
    '世界杯淘汰赛',
    '世界杯决赛',
    '美国世界杯',
    '加拿大世界杯',
    '墨西哥世界杯',
    '足球世界杯',
    '世界杯球队阵容',
    '世界杯观赛指南',
    'FIFA World Cup 2026',
    'World Cup Schedule',
    'World Cup Calendar',
  ],
  authors: [{ name: '2026世界杯日历' }],
  creator: '2026世界杯日历',
  publisher: '2026世界杯日历',
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
    title: '2026 FIFA 世界杯日历 | 完整赛程表 - 北京时间',
    description: '2026年FIFA世界杯完整赛程，北京时间显示。48支球队、104场比赛详细信息，支持Apple日历订阅。',
    siteName: '2026世界杯日历',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '2026 FIFA 世界杯赛程日历',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 FIFA 世界杯日历 | 完整赛程表',
    description: '2026年FIFA世界杯完整赛程，北京时间显示。支持日历订阅，不错过任何精彩比赛。',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
