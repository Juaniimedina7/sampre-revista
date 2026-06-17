'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { articles, ARTICLE_TYPES } from '@/data/articles'
import { issues } from '@/data/issues'
import { slugifyTag } from '@/lib/tags'
import { getReadingTimeMinutes } from '@/lib/readingTime'
import { Search, X, Filter, ChevronRight, BookOpen, Clock } from 'lucide-react'

const ALL_YEARS = [...new Set(articles.map((a) => {
  const issue = issues.find((i) => i.id === a.issueId)
  return issue?.year
}).filter(Boolean))].sort((a, b) => b - a)

export default function ArticulosSearch({ initialQuery = '', initialType = 'all', initialYear = 'all' }) {
  const [query, setQuery]     = useState(initialQuery)
  const [typeFilter, setType] = useState(initialType)
  const [yearFilter, setYear] = useState(initialYear)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return articles.filter((a) => {
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        (a.titleEn && a.titleEn.toLowerCase().includes(q)) ||
        a.authors.some((au) => au.name.toLowerCase().includes(q)) ||
        (a.keywords && a.keywords.some((kw) => kw.toLowerCase().includes(q))) ||
        (a.abstract && a.abstract.toLowerCase().includes(q))

      const matchesType = typeFilter === 'all' || a.type === typeFilter
      const issue = issues.find((i) => i.id === a.issueId)
      const matchesYear = yearFilter === 'all' || String(issue?.year) === yearFilter

      return matchesQuery && matchesType && matchesYear
    })
  }, [query, typeFilter, yearFilter])

  const clearFilters = () => {
    setQuery('')
    setType('all')
    setYear('all')
  }

  const hasActiveFilters = query || typeFilter !== 'all' || yearFilter !== 'all'

  return (
    <>
      <div className="bg-journal-cream border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Artículos</span>
          </nav>
          <h1
            className="text-3xl md:text-4xl font-bold text-journal-navy mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Artículos
          </h1>
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <label htmlFor="search-articulos" className="sr-only">Buscar artículos</label>
            <input
              id="search-articulos"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, autor, palabras clave..."
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Filter className="w-4 h-4 text-primary-600" />
                  Filtros
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    Limpiar
                  </button>
                )}
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Tipo</p>
                <div className="space-y-1">
                  <button onClick={() => setType('all')} className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${typeFilter === 'all' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    Todos
                  </button>
                  {Object.entries(ARTICLE_TYPES).map(([key, { label }]) => (
                    <button key={key} onClick={() => setType(key)} className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${typeFilter === key ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {ALL_YEARS.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Año</p>
                  <div className="space-y-1">
                    <button onClick={() => setYear('all')} className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${yearFilter === 'all' ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      Todos
                    </button>
                    {ALL_YEARS.map((y) => (
                      <button key={y} onClick={() => setYear(String(y))} className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${yearFilter === String(y) ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                {articles.length === 0
                  ? 'Aún no hay artículos publicados'
                  : filtered.length === 0
                  ? 'Sin resultados para los filtros aplicados'
                  : `${filtered.length} artículo${filtered.length !== 1 ? 's' : ''}`}
              </p>
              {hasActiveFilters && articles.length > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  <X className="w-3.5 h-3.5" />
                  Limpiar filtros
                </button>
              )}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-primary-400" />
                </div>
                <h2 className="text-xl font-bold text-journal-navy mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Primer número en preparación
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
                  Los artículos estarán disponibles con el lanzamiento del número inaugural de la RAMP.
                </p>
                <Link href="/contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
                  Enviar mi manuscrito
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {articles.length > 0 && filtered.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No se encontraron artículos con esos criterios.</p>
                <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  Limpiar filtros
                </button>
              </div>
            )}

            {filtered.length > 0 && (
              <ul className="space-y-4">
                {filtered.map((article) => {
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
                              {article.pages && <span className="text-xs text-gray-400">Págs. {article.pages}</span>}
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
                              {article.titleEn && <p className="text-sm text-gray-400 italic mb-2">{article.titleEn}</p>}
                              <p className="text-sm text-gray-600 mb-3">
                                {article.authors.map((a) => a.name).join(', ')}
                              </p>
                              {article.abstract && (
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{article.abstract}</p>
                              )}
                            </Link>
                            {article.keywords?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {article.keywords.map((kw) => (
                                  <Link
                                    key={kw}
                                    href={`/temas/${slugifyTag(kw)}`}
                                    className="text-xs bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 px-2 py-0.5 rounded transition-colors"
                                  >
                                    {kw}
                                  </Link>
                                ))}
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}
