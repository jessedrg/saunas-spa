import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: '--font-serif',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saunaspa.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sauna Spa | Saunas Finlandesas y Jacuzzis para Casa',
    template: '%s | Sauna Spa',
  },
  description: 'Saunas finlandesas, jacuzzis exterior y spas para tu hogar. Garantía 5 años. Presupuesto sin compromiso.',
  keywords: ['sauna finlandesa', 'jacuzzi exterior', 'spa casa', 'sauna casa precio', 'jacuzzi precio', 'bañera hidromasaje', 'cabina infrarrojos', 'spa hinchable'],
  authors: [{ name: 'Sauna Spa' }],
  creator: 'Sauna Spa',
  publisher: 'Sauna Spa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon-light-32x32.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'Sauna Spa',
    title: 'Sauna Spa | Saunas Finlandesas y Jacuzzis para Casa',
    description: 'Saunas finlandesas, jacuzzis exterior y spas para tu hogar. Garantía 5 años.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Sauna Spa - Saunas Finlandesas y Jacuzzis para Casa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sauna Spa | Saunas Finlandesas y Jacuzzis',
    description: 'Saunas finlandesas, jacuzzis y spas para tu hogar.',
    images: ['https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=1200&h=630&fit=crop&q=80'],
    creator: '@saunaspaio',
  },
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
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f4f0',
  width: 'device-width',
  initialScale: 1,
}

import { IntercomProvider } from '@/components/intercom'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  )
}
