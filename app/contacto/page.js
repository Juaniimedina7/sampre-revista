import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactoForm from './ContactoForm'
import { Mail, FileText, Info } from 'lucide-react'

export const metadata = {
  title: 'Enviar Manuscrito',
  description:
    'Envío de manuscritos a la Revista Argentina de Medicina Prehospitalaria (RAMP). Formulario para autores, contacto editorial y proceso de revisión por pares.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    url: '/contacto',
    title: 'Enviar Manuscrito | RAMP',
    description: 'Formulario de envío de manuscritos a la RAMP.',
  },
}

const beforeSubmitItems = [
  'Revisá las instrucciones para autores',
  'El manuscrito debe ser en Word (.doc/.docx)',
  'Incluí resumen en inglés (abstract)',
  'Referencias en formato Vancouver',
  'Declaración de conflictos de interés',
  'La publicación es completamente gratuita',
]

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Enviar Manuscrito</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-journal-navy mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Enviar Manuscrito
            </h1>
            <p className="text-gray-600">
              Completá el formulario y nos pondremos en contacto para guiarte en el proceso de envío.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-10">

            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Datos del manuscrito
                </h2>
                <ContactoForm />
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4">Contacto directo</h2>
                <a href="mailto:revista-ramp@sampre.com.ar" className="flex items-center gap-3 text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-600" />
                  </div>
                  revista-ramp@sampre.com.ar
                </a>
              </div>

              <div className="bg-primary-50 rounded-xl border border-primary-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary-600" />
                  <h2 className="font-bold text-primary-900 text-sm">Antes de enviar</h2>
                </div>
                <ul className="space-y-2 text-xs text-primary-800">
                  {beforeSubmitItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/instrucciones-para-autores" className="inline-flex items-center gap-1.5 mt-4 text-xs text-primary-700 font-semibold hover:text-primary-800 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  Ver instrucciones completas
                </Link>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-2 text-sm">Proceso editorial</h2>
                <dl className="space-y-3 text-xs text-gray-600">
                  <div className="flex justify-between"><dt>Evaluación inicial</dt><dd className="font-semibold text-gray-800">1-2 semanas</dd></div>
                  <div className="flex justify-between"><dt>Revisión por pares</dt><dd className="font-semibold text-gray-800">4-8 semanas</dd></div>
                  <div className="flex justify-between"><dt>Revisores externos</dt><dd className="font-semibold text-gray-800">Mínimo 2</dd></div>
                  <div className="flex justify-between"><dt>Sistema</dt><dd className="font-semibold text-gray-800">Doble ciego</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
