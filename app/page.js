import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { articles, ARTICLE_TYPES } from '@/data/articles'
import { issues } from '@/data/issues'
import { slugifyTag, getAllTags } from '@/lib/tags'
import { getReadingTimeMinutes } from '@/lib/readingTime'
import {
  ArrowRight,
  BookOpen,
  FileText,
  Microscope,
  ClipboardList,
  Star,
  MessageSquare,
  Users,
  Globe,
  Flame,
  Stethoscope,
  FlaskConical,
  GraduationCap,
  ChevronRight,
  Ambulance,
  Clock,
} from 'lucide-react'

const articleTypes = [
  { type: 'Artículo Original',          description: 'Investigaciones clínicas, epidemiológicas, operativas o educativas con metodología rigurosa.', limit: 'Hasta 4000 palabras · 6 tablas/figuras', Icon: Microscope,     accent: 'border-primary-600 bg-primary-50',     iconColor: 'text-primary-600 bg-primary-100' },
  { type: 'Revisión',                   description: 'Revisiones narrativas o sistemáticas sobre temáticas de la medicina prehospitalaria.',         limit: 'Hasta 5000 palabras',                  Icon: BookOpen,       accent: 'border-secondary-600 bg-secondary-50', iconColor: 'text-secondary-600 bg-secondary-100' },
  { type: 'Reporte de Caso',            description: 'Casos clínicos relevantes o infrecuentes en el ámbito prehospitalario.',                       limit: 'Hasta 2000 palabras · 3 figuras',      Icon: FileText,       accent: 'border-teal-600 bg-teal-50',           iconColor: 'text-teal-600 bg-teal-100' },
  { type: 'Serie de Casos',             description: 'Análisis de una serie de casos con características comunes y relevancia científica.',          limit: 'Hasta 3000 palabras',                  Icon: ClipboardList,  accent: 'border-amber-600 bg-amber-50',         iconColor: 'text-amber-600 bg-amber-100' },
  { type: 'Protocolo / Guía Operativa', description: 'Experiencias de implementación de protocolos locales o normativas del sistema EMS.',           limit: 'Extensión variable',                   Icon: Star,           accent: 'border-violet-600 bg-violet-50',       iconColor: 'text-violet-600 bg-violet-100' },
  { type: 'Artículo Especial',          description: 'Trabajos de gestión, docencia, simulación, entrevistas a referentes o temas de actualidad.',  limit: 'Extensión variable',                   Icon: GraduationCap,  accent: 'border-rose-600 bg-rose-50',           iconColor: 'text-rose-600 bg-rose-100' },
  { type: 'Carta al Editor',            description: 'Comentarios críticos o de apoyo sobre artículos publicados, o temas de interés comunitario.', limit: 'Hasta 800 palabras',                   Icon: MessageSquare,  accent: 'border-gray-500 bg-gray-50',           iconColor: 'text-gray-600 bg-gray-100' },
]

const scopeTopics = [
  { label: 'Emergencias Prehospitalarias',         Icon: Ambulance },
  { label: 'Sistemas EMS',                          Icon: Stethoscope },
  { label: 'Medicina de Desastres',                 Icon: Flame },
  { label: 'Transporte Sanitario',                  Icon: Globe },
  { label: 'Cuidados Críticos Extrahospitalarios',  Icon: FlaskConical },
  { label: 'Simulación y Educación en Emergencias', Icon: GraduationCap },
]

const editorialBoard = {
  jefe: { name: 'Lucas Henkel', role: 'Editor en Jefe' },
  editorial: [
    { name: 'William Medina' },
    { name: 'Norma Raúl' },
    { name: 'Silvio Aguilera' },
    { name: 'Gabriel Sosa' },
  ],
}

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'RAMP — Revista Argentina de Medicina Prehospitalaria',
    description: 'Publicación científica de acceso abierto de SAMPRE. Atención prehospitalaria, EMS, desastres y transporte sanitario.',
  },
}

const periodicalLd = {
  '@context': 'https://schema.org',
  '@type': 'Periodical',
  name: 'Revista Argentina de Medicina Prehospitalaria',
  alternateName: 'RAMP',
  url: 'https://revista.sampre.com.ar',
  inLanguage: 'es-AR',
  publisher: {
    '@type': 'Organization',
    name: 'Sociedad Argentina de Medicina Prehospitalaria',
    alternateName: 'SAMPRE',
    url: 'https://sampre.com.ar',
    email: 'sampreweb@gmail.com',
  },
  about: ['Medicina prehospitalaria', 'Emergencias', 'Atención extrahospitalaria', 'Sistemas EMS'],
  license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  isAccessibleForFree: true,
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RAMP',
  url: 'https://revista.sampre.com.ar',
  inLanguage: 'es-AR',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://revista.sampre.com.ar/articulos?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

function ArticleCard({ article, issue, variant = 'default' }) {
  const typeInfo = ARTICLE_TYPES[article.type] || {}
  const readingTime = getReadingTimeMinutes(article)
  const isFeature = variant === 'feature'

  if (isFeature) {
    return (
      <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all flex flex-col">
        <div className="relative aspect-[16/10] bg-gradient-to-br from-journal-navy via-primary-800 to-primary-600 overflow-hidden">
          {article.heroImage ? (
            <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <img src="/images/logos/logo-sampre.PNG" alt="" aria-hidden="true" className="h-10 w-auto brightness-0 invert opacity-60 mx-auto mb-3" />
                <span className="text-white/80 font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>RAMP</span>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-primary-700 shadow-sm">
              Destacado
            </span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
              {typeInfo.label || article.type}
            </span>
            {readingTime && (
              <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readingTime} min de lectura
              </span>
            )}
          </div>
          <Link href={`/articulos/${article.slug}`}>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-3 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
              {article.title}
            </h3>
            {article.abstract && (
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.abstract}</p>
            )}
          </Link>
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <p className="text-xs text-gray-500 truncate">
              {article.authors.map((a) => a.name).join(', ')}
            </p>
            <Link
              href={`/articulos/${article.slug}`}
              className="inline-flex items-center gap-1 text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors flex-shrink-0"
            >
              Leer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all p-5 h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary-50 text-primary-700">
          {typeInfo.label || article.type}
        </span>
        {readingTime && (
          <span className="text-xs text-gray-400 inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime} min
          </span>
        )}
      </div>
      <Link href={`/articulos/${article.slug}`} className="flex-1">
        <h3 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug line-clamp-3" style={{ fontFamily: 'var(--font-display)' }}>
          {article.title}
        </h3>
        {article.abstract && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{article.abstract}</p>
        )}
      </Link>
      <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100 truncate">
        {article.authors.map((a) => a.name).join(', ')}
      </p>
    </article>
  )
}

export default function HomePage() {
  const latestIssue = issues[0] || null
  const issueArticles = latestIssue
    ? articles.filter((a) => a.issueId === latestIssue.id)
    : []

  const featuredArticle = issueArticles[0]
  const gridArticles = issueArticles.slice(1, 4)
  const sidebarArticles = articles.slice(0, 5)
  const topTags = getAllTags().slice(0, 10)

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(periodicalLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <Header />
      <main className="flex-1">

        {/* ── HERO COMPACTO ── */}
        <section className="bg-journal-cream border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
                  Sociedad Argentina de Medicina Prehospitalaria
                </p>
                <h1
                  className="text-4xl md:text-5xl font-bold text-journal-navy mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  RAMP
                </h1>
                <h2
                  className="text-base md:text-lg text-gray-600 mb-4 font-medium"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Revista Argentina de Medicina Prehospitalaria
                </h2>
                {latestIssue && (
                  <p className="text-xs text-gray-500">
                    Vol. {latestIssue.volume}, N.° {latestIssue.number} · {latestIssue.month} {latestIssue.year} · {issueArticles.length} artículo{issueArticles.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-all shadow"
                >
                  Enviar Manuscrito
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/articulos"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-journal-navy text-journal-navy text-sm font-semibold rounded-lg hover:bg-journal-navy hover:text-white transition-all"
                >
                  Explorar artículos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ÚLTIMO NÚMERO + DESTACADOS ── */}
        {latestIssue && issueArticles.length > 0 && (
          <section className="relative py-12 md:py-14 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <h2
                  className="text-xl md:text-2xl font-bold text-journal-navy whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Último Número
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
                <Link
                  href={`/ediciones/${latestIssue.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors whitespace-nowrap"
                >
                  Ver edición completa <ChevronRight className="inline w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {featuredArticle && (
                    <ArticleCard article={featuredArticle} issue={latestIssue} variant="feature" />
                  )}
                  {gridArticles.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {gridArticles.map((a) => (
                        <ArticleCard key={a.slug} article={a} issue={latestIssue} />
                      ))}
                    </div>
                  )}
                </div>

                <aside className="space-y-6">
                  {/* Más recientes */}
                  <div className="bg-journal-cream rounded-xl border border-gray-200 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-journal-gold" />
                      Recientes
                    </h3>
                    <ol className="space-y-3">
                      {sidebarArticles.map((a, idx) => {
                        const typeInfo = ARTICLE_TYPES[a.type] || {}
                        const rt = getReadingTimeMinutes(a)
                        return (
                          <li key={a.slug}>
                            <Link
                              href={`/articulos/${a.slug}`}
                              className="group flex gap-3 items-start"
                            >
                              <span className="text-xl font-bold text-journal-gold flex-shrink-0 leading-none mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <div className="min-w-0">
                                <p className="text-xs text-primary-700 font-semibold mb-0.5">{typeInfo.label || a.type}</p>
                                <p className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                                  {a.title}
                                </p>
                                {rt && (
                                  <span className="text-xs text-gray-400 inline-flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3" />
                                    {rt} min
                                  </span>
                                )}
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ol>
                  </div>

                  {/* Temas destacados */}
                  {topTags.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                        Temas
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {topTags.map((t) => (
                          <Link
                            key={t.slug}
                            href={`/temas/${t.slug}`}
                            className="text-xs bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 px-2.5 py-1 rounded-full transition-colors"
                          >
                            {t.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </section>
        )}

        {/* Estado vacío: sin números aún */}
        {(!latestIssue || issueArticles.length === 0) && (
          <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-8 h-8 text-primary-400" />
              </div>
              <h2
                className="text-2xl font-bold text-journal-navy mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Primer número en preparación
              </h2>
              <p className="text-gray-600 mb-6">
                La RAMP lanzará su primera edición convocando a referentes nacionales de la medicina prehospitalaria.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Enviar mi manuscrito
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* ── ALCANCE Y TEMÁTICAS ── */}
        <section className="relative py-14 md:py-16 bg-journal-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2
                className="text-2xl md:text-3xl font-bold text-journal-navy mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Alcance y Temáticas
              </h2>
              <p className="text-gray-600">
                La RAMP publica trabajos originales e inéditos relacionados con la atención de
                emergencias en el ámbito extrahospitalario. Contribuciones en español, preferentemente
                con resumen en inglés.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {scopeTopics.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIPOS DE ARTÍCULOS ── */}
        <section className="py-14 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <h2
                className="text-2xl md:text-3xl font-bold text-journal-navy whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tipos de Artículos Aceptados
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {articleTypes.map(({ type, description, limit, Icon, accent, iconColor }) => (
                <div
                  key={type}
                  className={`rounded-xl p-6 border-l-4 ${accent} border border-gray-100 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1.5">{type}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{description}</p>
                      <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                        {limit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/instrucciones-para-autores"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Ver guía completa para autores <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMITÉ EDITORIAL PREVIEW ── */}
        <section className="py-14 md:py-16 bg-gradient-to-br from-journal-navy to-journal-navy-light text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-primary-300 px-4 py-2 rounded-full mb-4 text-sm font-medium">
                <Users className="w-4 h-4" />
                Período 2026-2028
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Comité Editorial
              </h2>
              <p className="text-gray-400">
                Profesionales de referencia que garantizan el rigor científico de cada publicación.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-4 text-center border border-white/20">
                <div className="text-xs font-semibold uppercase tracking-widest text-journal-gold mb-2">
                  Editor en Jefe
                </div>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {editorialBoard.jefe.name}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 text-center">
                  Comité Editorial
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {editorialBoard.editorial.map(({ name }) => (
                    <div key={name} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-6">
                <Link
                  href="/comite-editorial"
                  className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  Ver comité científico completo <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ENVIAR MANUSCRITO ── */}
        <section className="py-14 md:py-16 bg-primary-600 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ¿Tenés una investigación para compartir?
            </h2>
            <p className="text-primary-100 mb-6 text-base">
              La RAMP invita a médicos, paramédicos, técnicos en emergencias y todo el equipo
              de salud a publicar sus trabajos. La publicación es completamente gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition-all shadow-xl"
              >
                Enviar Manuscrito
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/instrucciones-para-autores"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all"
              >
                Instrucciones para Autores
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
