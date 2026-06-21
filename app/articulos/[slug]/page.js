import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { articles, ARTICLE_TYPES } from '@/data/articles'
import { issues } from '@/data/issues'
import { slugifyTag } from '@/lib/tags'
import { getReadingTimeMinutes } from '@/lib/readingTime'
import ShareButtons from '../_components/ShareButtons'
import CiteButton from '../_components/CiteButton'
import ArticleBody, { ArticleTOC } from '../_components/ArticleBody'
import { Calendar, User, Tag, Download, ArrowLeft, ExternalLink, BookOpen, Clock } from 'lucide-react'

const SITE_URL = 'https://ramp.sampre.com.ar'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Artículo no encontrado' }
  const url = `/articulos/${article.slug}`
  const description = article.abstract?.slice(0, 200)
  return {
    title: article.title,
    description,
    keywords: article.keywords,
    authors: article.authors.map((a) => ({ name: a.name })),
    alternates: { canonical: url },
    openGraph: {
      url,
      type: 'article',
      title: article.title,
      description,
      images: article.heroImage ? [{ url: article.heroImage }] : undefined,
      publishedTime: article.publishedDate || undefined,
      authors: article.authors.map((a) => a.name),
      tags: article.keywords,
      section: ARTICLE_TYPES[article.type]?.label,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
    },
  }
}

export default async function ArticuloPage({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const issue = issues.find((i) => i.id === article.issueId)
  const typeInfo = ARTICLE_TYPES[article.type] || {}
  const readingTime = getReadingTimeMinutes(article)
  const fullUrl = `${SITE_URL}/articulos/${article.slug}`
  const hasBody = Array.isArray(article.sections) && article.sections.length > 0

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      article: a,
      score: (a.keywords || []).filter((kw) => (article.keywords || []).includes(kw)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.article)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: article.title,
    alternativeHeadline: article.titleEn || undefined,
    inLanguage: 'es-AR',
    abstract: article.abstract || undefined,
    keywords: article.keywords?.join(', ') || undefined,
    datePublished: article.publishedDate || undefined,
    dateCreated: article.receivedDate || undefined,
    dateModified: article.acceptedDate || undefined,
    author: article.authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      affiliation: a.affiliation ? { '@type': 'Organization', name: a.affiliation } : undefined,
      identifier: a.orcid ? `https://orcid.org/${a.orcid}` : undefined,
    })),
    image: article.heroImage || undefined,
    pagination: article.pages || undefined,
    url: fullUrl,
    license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    isAccessibleForFree: true,
    isPartOf: issue ? {
      '@type': 'PublicationIssue',
      issueNumber: issue.number,
      datePublished: `${issue.year}`,
      isPartOf: {
        '@type': 'PublicationVolume',
        volumeNumber: issue.volume,
        isPartOf: {
          '@type': 'Periodical',
          name: 'Revista Argentina de Medicina Prehospitalaria',
        },
      },
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Sociedad Argentina de Medicina Prehospitalaria',
      url: 'https://sampre.com.ar',
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Header />
      <main className="flex-1">
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-4">
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
            </nav>

            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                {typeInfo.label || article.type}
              </span>
            </div>

            <h1
              className="text-2xl md:text-4xl font-bold text-journal-navy mb-4 max-w-4xl leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {article.title}
            </h1>

            {article.titleEn && (
              <p className="text-lg text-gray-500 mb-4 italic max-w-4xl">{article.titleEn}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
              {article.authors.map((author, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-medium">{author.name}</span>
                  {author.isCorresponding && (
                    <span className="text-primary-600 text-xs" title="Autor de correspondencia">✉</span>
                  )}
                </span>
              ))}
            </div>

            {article.authors.some((a) => a.affiliation) && (
              <details className="text-xs text-gray-500 mb-4">
                <summary className="cursor-pointer hover:text-primary-600 transition-colors font-medium">
                  Ver afiliaciones
                </summary>
                <div className="mt-2 space-y-1">
                  {article.authors
                    .filter((a) => a.affiliation)
                    .map((a, i) => (
                      <span key={i} className="block">{a.name}: {a.affiliation}</span>
                    ))}
                </div>
              </details>
            )}

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
              {article.pages && <span>Págs. {article.pages}</span>}
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} min de lectura
                </span>
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

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-4 gap-10">

            <div className="lg:col-span-3 space-y-8">

              {article.heroImage && (
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {article.abstract && (
                <section aria-labelledby="resumen-heading">
                  <h2
                    id="resumen-heading"
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

              {article.keywords?.length > 0 && (
                <section aria-labelledby="keywords-heading">
                  <h2 id="keywords-heading" className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary-600" />
                    Palabras clave
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((kw) => (
                      <Link
                        key={kw}
                        href={`/temas/${slugifyTag(kw)}`}
                        className="text-sm bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 px-3 py-1 rounded-full border border-gray-200 transition-colors"
                      >
                        {kw}
                      </Link>
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

              {article.videoUrl && (
                <section>
                  <h2
                    className="text-lg font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Material audiovisual
                  </h2>
                  <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video">
                    <iframe
                      src={article.videoUrl}
                      title="Video del artículo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </section>
              )}

              {hasBody && (
                <section>
                  <h2
                    className="text-lg font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Texto completo
                  </h2>
                  <ArticleBody sections={article.sections} />
                </section>
              )}

              {!hasBody && article.pdfUrl && (
                <section>
                  <h2
                    className="text-lg font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Texto completo
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
              )}

              <section className="border-t border-gray-100 pt-6">
                <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                  {article.receivedDate && <span>Recibido: {article.receivedDate}</span>}
                  {article.acceptedDate && <span>Aceptado: {article.acceptedDate}</span>}
                  {article.publishedDate && <span>Publicado: {article.publishedDate}</span>}
                </div>
              </section>

              {relatedArticles.length > 0 && (
                <section className="border-t border-gray-100 pt-8">
                  <h2
                    className="text-lg font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Artículos relacionados
                  </h2>
                  <ul className="space-y-3">
                    {relatedArticles.map((rel) => {
                      const relType = ARTICLE_TYPES[rel.type] || {}
                      return (
                        <li key={rel.slug}>
                          <Link
                            href={`/articulos/${rel.slug}`}
                            className="group block bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm p-4 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary-50 text-primary-700">
                                {relType.label || rel.type}
                              </span>
                            </div>
                            <p className="font-semibold text-gray-900 group-hover:text-primary-700 text-sm leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                              {rel.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{rel.authors.map((a) => a.name).join(', ')}</p>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}
            </div>

            <div className="space-y-5">
              {hasBody && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
                  <ArticleTOC sections={article.sections} />
                </div>
              )}

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
                  <CiteButton article={article} issue={issue} />
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

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <ShareButtons url={fullUrl} title={article.title} />
              </div>

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
