import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { issues } from '@/data/issues'
import { articles, ARTICLE_TYPES } from '@/data/articles'
import { Calendar, FileText, Download, ArrowLeft, ChevronRight } from 'lucide-react'

export async function generateStaticParams() {
  return issues.map((issue) => ({ numero: String(issue.id) }))
}

export async function generateMetadata({ params }) {
  const { numero } = await params
  const issue = issues.find((i) => String(i.id) === numero)
  if (!issue) return { title: 'Edición no encontrada' }
  const url = `/ediciones/${issue.id}`
  return {
    title: `Vol. ${issue.volume}, N.° ${issue.number} — ${issue.title}`,
    description: issue.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      type: 'website',
      title: `Vol. ${issue.volume}, N.° ${issue.number} — ${issue.title} | RAMP`,
      description: issue.description,
      images: issue.coverImage ? [{ url: issue.coverImage }] : undefined,
    },
  }
}

export default async function EdicionPage({ params }) {
  const { numero } = await params
  const issue = issues.find((i) => String(i.id) === numero)
  if (!issue) notFound()

  const issueArticles = articles.filter((a) => a.issueId === issue.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cabecera */}
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/ediciones" className="hover:text-primary-600 transition-colors">Ediciones</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Vol. {issue.volume}, N.° {issue.number}</span>
            </div>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {issue.month} {issue.year} · Vol. {issue.volume}, N.° {issue.number}
                </div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {issue.title}
                </h1>
                {issue.description && (
                  <p className="text-gray-600 max-w-2xl">{issue.description}</p>
                )}
              </div>
              {issue.pdfUrl && (
                <a
                  href={issue.pdfUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-sm flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Descargar número completo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {issueArticles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Los artículos de este número estarán disponibles próximamente.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2
                  className="text-xl font-bold text-journal-navy whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Tabla de Contenidos
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-500">{issueArticles.length} artículos</span>
              </div>

              <div className="space-y-4">
                {issueArticles.map((article) => {
                  const typeInfo = ARTICLE_TYPES[article.type] || {}
                  return (
                    <Link
                      key={article.slug}
                      href={`/articulos/${article.slug}`}
                      className="group block bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                              {typeInfo.label || article.type}
                            </span>
                            {article.pages && (
                              <span className="text-xs text-gray-500">Págs. {article.pages}</span>
                            )}
                          </div>
                          <h3
                            className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-2"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {article.authors.map((a) => a.name).join(', ')}
                          </p>
                          {article.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {article.keywords.map((kw) => (
                                <span key={kw} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 flex-shrink-0 mt-1 transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/ediciones"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a todas las ediciones
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
