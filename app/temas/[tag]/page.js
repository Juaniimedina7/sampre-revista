import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ARTICLE_TYPES } from '@/data/articles'
import { issues } from '@/data/issues'
import { getAllTags, getArticlesByTag, getTagLabel, slugifyTag } from '@/lib/tags'
import { getReadingTimeMinutes } from '@/lib/readingTime'
import { Tag, ChevronRight, Clock, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }) {
  const { tag } = await params
  const label = getTagLabel(tag)
  if (!label) return { title: 'Tema no encontrado' }
  return {
    title: `Tema: ${label}`,
    description: `Artículos publicados en la RAMP sobre ${label}.`,
    alternates: { canonical: `/temas/${tag}` },
    openGraph: {
      url: `/temas/${tag}`,
      title: `${label} | RAMP`,
      description: `Artículos sobre ${label} publicados en la RAMP.`,
    },
  }
}

export default async function TemaPage({ params }) {
  const { tag } = await params
  const label = getTagLabel(tag)
  if (!label) notFound()

  const tagArticles = getArticlesByTag(tag)
  const otherTags = getAllTags().filter((t) => t.slug !== tag).slice(0, 12)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-journal-cream border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/articulos" className="hover:text-primary-600 transition-colors">Artículos</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Tema</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <Tag className="w-6 h-6 text-primary-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">Tema</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {label}
            </h1>
            <p className="text-gray-600">
              {tagArticles.length} artículo{tagArticles.length !== 1 ? 's' : ''} publicado{tagArticles.length !== 1 ? 's' : ''} en la RAMP
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-4 gap-8">

            <div className="lg:col-span-3">
              <ul className="space-y-4">
                {tagArticles.map((article) => {
                  const typeInfo = ARTICLE_TYPES[article.type] || {}
                  const issue = issues.find((i) => i.id === article.issueId)
                  const readingTime = getReadingTimeMinutes(article)
                  return (
                    <li key={article.slug}>
                      <article className="group block bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                                {typeInfo.label || article.type}
                              </span>
                              {issue && (
                                <span className="text-xs text-gray-400">
                                  Vol. {issue.volume}, N.° {issue.number} · {issue.year}
                                </span>
                              )}
                              {readingTime && (
                                <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {readingTime} min
                                </span>
                              )}
                            </div>
                            <Link href={`/articulos/${article.slug}`}>
                              <h2 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-1 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                                {article.title}
                              </h2>
                              <p className="text-sm text-gray-600 mb-3">
                                {article.authors.map((a) => a.name).join(', ')}
                              </p>
                              {article.abstract && (
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{article.abstract}</p>
                              )}
                            </Link>
                            {article.keywords?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {article.keywords.map((kw) => {
                                  const kwSlug = slugifyTag(kw)
                                  const isActive = kwSlug === tag
                                  return (
                                    <Link
                                      key={kw}
                                      href={`/temas/${kwSlug}`}
                                      className={`text-xs px-2 py-0.5 rounded transition-colors ${
                                        isActive
                                          ? 'bg-primary-600 text-white'
                                          : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700'
                                      }`}
                                    >
                                      {kw}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                          <Link
                            href={`/articulos/${article.slug}`}
                            aria-label={`Leer ${article.title}`}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" />
                          </Link>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </div>

            <aside className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Otros temas
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {otherTags.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/temas/${t.slug}`}
                      className="text-xs bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 px-2 py-1 rounded transition-colors"
                    >
                      {t.label} <span className="text-gray-400">({t.count})</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/articulos"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-semibold mt-4 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Volver al buscador
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
