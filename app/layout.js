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
  ],
  authors: [{ name: 'SAMPRE — Sociedad Argentina de Medicina Prehospitalaria' }],
  creator: 'SAMPRE',
  publisher: 'Sociedad Argentina de Medicina Prehospitalaria',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://revista.sampre.com.ar',
    title: 'RAMP — Revista Argentina de Medicina Prehospitalaria',
    description:
      'Publicación científica de acceso abierto de SAMPRE. Emergencias prehospitalarias, EMS, desastres y más.',
    siteName: 'RAMP',
    images: [{ url: '/images/logos/logo-sampre.PNG', width: 1200, height: 630, alt: 'RAMP' }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
