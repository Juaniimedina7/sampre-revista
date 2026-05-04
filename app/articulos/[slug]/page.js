import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { articles, ARTICLE_TYPES } from '@/data/articles'
import { issues } from '@/data/issues'
import { Calendar, User, Tag, Download, ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Artículo no encontrado' }
  return {
    title: article.title,
    description: article.abstract?.slice(0, 200),
  }
}

export default async function ArticuloPage({ params }) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const issue = issues.find((i) => i.id === article.issueId)
  const typeInfo = ARTICLE_TYPES[article.type] || {}

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cabecera */}
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              {issue && (
                <>
                  <Link href={`/ediciones/${issue.id}`} className="hover:text-primary-600 transition-colors">
                    Vol. {issue.volume}, N.° {issue.number}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
            </div>

            {/* Badge tipo */}
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                {typeInfo.label || article.type}
              </span>
            </div>

            {/* Título */}
            <h1
              className="text-2xl md:text-4xl font-bold text-journal-navy mb-4 max-w-4xl leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {article.title}
            </h1>

            {/* Título en inglés */}
            {article.titleEn && (
              <p className="text-lg text-gray-500 mb-4 italic max-w-4xl">{article.titleEn}</p>
            )}

            {/* Autores */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
              {article.authors.map((author, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-medium">{author.name}</span>
                  {author.isCorresponding && (
                    <span className="text-primary-600 text-xs">✉</span>
                  )}
                </span>
              ))}
            </div>

            {/* Afiliaciones */}
            {article.authors.some((a) => a.affiliation) && (
              <div className="text-xs text-gray-500 mb-4">
                {article.authors
                  .filter((a) => a.affiliation)
                  .map((a, i) => (
                    <span key={i} className="block">{a.name}: {a.affiliation}</span>
                  ))}
              </div>
            )}

            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              {article.publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Publicado: {article.publishedDate}
                </span>
              )}
              {issue && (
                <Link
                  href={`/ediciones/${issue.id}`}
                  className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Vol. {issue.volume}, N.° {issue.number} · {issue.year}
                </Link>
              )}
              {article.pages && (
                <span>Págs. {article.pages}</span>
              )}
              {article.doi && (
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  DOI: {article.doi} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* ── Artículo ── */}
            <div className="lg:col-span-3 space-y-8">
              {/* Resumen */}
              {article.abstract && (
                <section>
                  <h2
                    className="text-lg font-bold text-journal-navy mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Resumen
                  </h2>
                  <div className="bg-journal-cream rounded-xl border border-gray-200 p-6">
                    <p
                      className="text-gray-700 leading-relaxed text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {article.abstract}
                    </p>
                    {article.abstractEn && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 mb-2">Abstract (English)</p>
                        <p
                          className="text-gray-600 leading-relaxed text-sm italic"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {article.abstractEn}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Palabras clave */}
              {article.keywords?.length > 0 && (
                <section>
                  <h2
                    className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4 text-primary-600" />
                    Palabras clave
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((kw) => (
                      <span key={kw} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                  {article.keywordsEn?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {article.keywordsEn.map((kw) => (
                        <span key={kw} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-200 italic">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Texto completo / PDF */}
              {article.pdfUrl ? (
                <section>
                  <h2
                    className="text-lg font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Texto Completo
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                    <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">El texto completo está disponible en PDF.</p>
                    <a
                      href={article.pdfUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar PDF
                    </a>
                  </div>
                </section>
              ) : null}

              {/* Fechas */}
              <section className="border-t border-gray-100 pt-6">
                <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                  {article.receivedDate && <span>Recibido: {article.receivedDate}</span>}
                  {article.acceptedDate && <span>Aceptado: {article.acceptedDate}</span>}
                  {article.publishedDate && <span>Publicado: {article.publishedDate}</span>}
                </div>
              </section>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              {/* Acciones */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Acciones
                </h3>
                <div className="space-y-2">
                  {article.pdfUrl && (
                    <a
                      href={article.pdfUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm justify-center"
                    >
                      <Download className="w-4 h-4" />
                      Descargar PDF
                    </a>
                  )}
                  {article.doi && (
                    <a
                      href={`https://doi.org/${article.doi}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver DOI
                    </a>
                  )}
                </div>
              </div>

              {/* Info del número */}
              {issue && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Publicado en
                  </h3>
                  <Link
                    href={`/ediciones/${issue.id}`}
                    className="group flex items-start gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {issue.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Vol. {issue.volume}, N.° {issue.number} · {issue.year}
                      </p>
                    </div>
                  </Link>
                </div>
              )}

              {/* Licencia */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Licencia
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Este artículo está publicado bajo licencia{' '}
                  <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank" rel="noopener noreferrer"
                    className="text-primary-600 hover:underline font-medium"
                  >
                    CC BY-NC-SA 4.0
                  </a>
                  . Los autores conservan los derechos de autor.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={issue ? `/ediciones/${issue.id}` : '/ediciones'}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la edición
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
