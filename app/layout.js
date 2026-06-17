import { Playfair_Display, Lora, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://revista.sampre.com.ar'),
  title: {
    default: 'RAMP — Revista Argentina de Medicina Prehospitalaria',
    template: '%s | RAMP',
  },
  description:
    'Revista Argentina de Medicina Prehospitalaria (RAMP). Publicación científica de acceso abierto de la Sociedad Argentina de Medicina Prehospitalaria (SAMPRE). Emergencias prehospitalarias, sistemas EMS, desastres, transporte sanitario.',
  applicationName: 'RAMP',
  keywords: [
    'revista médica prehospitalaria',
    'RAMP',
    'SAMPRE',
    'emergencias prehospitalarias',
    'medicina de emergencias Argentina',
    'EMS',
    'sistemas de emergencias médicas',
    'medicina de desastres',
    'transporte sanitario',
    'acceso abierto',
    'publicación científica',
    'revista científica argentina',
    'paramédicos',
    'enfermería de emergencias',
    'medicina extrahospitalaria',
  ],
  authors: [{ name: 'SAMPRE — Sociedad Argentina de Medicina Prehospitalaria', url: 'https://sampre.com.ar' }],
  creator: 'SAMPRE',
  publisher: 'Sociedad Argentina de Medicina Prehospitalaria',
  category: 'Medical Journal',
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: '/',
    languages: { 'es-AR': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://revista.sampre.com.ar',
    title: 'RAMP — Revista Argentina de Medicina Prehospitalaria',
    description:
      'Publicación científica de acceso abierto de SAMPRE. Emergencias prehospitalarias, EMS, desastres, transporte sanitario y más.',
    siteName: 'RAMP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAMP — Revista Argentina de Medicina Prehospitalaria',
    description: 'Publicación científica de acceso abierto de SAMPRE.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/logos/favicon.png', type: 'image/png' },
    ],
    shortcut: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
  referrer: 'origin-when-cross-origin',
}

export const viewport = {
  themeColor: '#0f2240',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
