import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { issues } from '@/data/issues'
import { BookOpen, Calendar, FileText, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Ediciones',
  description: 'Archivo completo de ediciones de la Revista Argentina de Medicina Prehospitalaria (RAMP).',
}

export default function EdicionesPage() {
  const grouped = issues.reduce((acc, issue) => {
    const year = issue.year
    if (!acc[year]) acc[year] = []
    acc[year].push(issue)
    return acc
  }, {})

  const years = Object.keys(grouped).sort((a, b) => b - a)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cabecera de página */}
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Ediciones</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ediciones
            </h1>
            <p className="text-gray-600">Archivo completo de la Revista Argentina de Medicina Prehospitalaria</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {issues.length === 0 ? (
            /* ── Estado vacío ── */
            <div className="max-w-xl mx-auto text-center py-20">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary-600" />
              </div>
              <h2
                className="text-2xl font-bold text-journal-navy mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Primer número en preparación
              </h2>
              <p className="text-gray-600 mb-8">
                La RAMP se encuentra preparando su número inaugural. Te invitamos a enviar tu trabajo
                para ser parte de este lanzamiento histórico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Enviar Manuscrito
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/instrucciones-para-autores"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-journal-navy text-journal-navy font-semibold rounded-lg hover:bg-journal-navy hover:text-white transition-all"
                >
                  Ver Instrucciones
                </Link>
              </div>
            </div>
          ) : (
            /* ── Lista de ediciones agrupadas por año ── */
            <div className="space-y-12">
              {years.map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-3 mb-6">
                    <h2
                      className="text-2xl font-bold text-journal-navy"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {year}
                    </h2>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grouped[year].map((issue) => (
                      <Link
                        key={issue.id}
                        href={`/ediciones/${issue.id}`}
                        className="group bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all overflow-hidden"
                      >
                        {/* Portada o placeholder */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-journal-navy to-primary-800 relative overflow-hidden">
                          {issue.coverImage ? (
                            <img
                              src={issue.coverImage}
                              alt={`Portada ${issue.title}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <div
                                className="text-3xl font-bold mb-1"
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                RAMP
                              </div>
                              <div className="w-8 h-px bg-journal-gold mx-auto mb-2" />
                              <p className="text-xs text-white/70">
                                Vol. {issue.volume}, N.° {issue.number}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-primary-600 font-semibold mb-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {issue.month} {issue.year} · Vol. {issue.volume}, N.° {issue.number}
                          </div>
                          <h3
                            className="font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {issue.title}
                          </h3>
                          {issue.description && (
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                              {issue.description}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <FileText className="w-3.5 h-3.5" />
                            {issue.articleSlugs?.length || 0} artículos
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
