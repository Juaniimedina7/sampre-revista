import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { issues } from '@/data/issues'
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
} from 'lucide-react'

const articleTypes = [
  {
    type: 'Artículo Original',
    description: 'Investigaciones clínicas, epidemiológicas, operativas o educativas con metodología rigurosa.',
    limit: 'Hasta 4000 palabras · 6 tablas/figuras',
    Icon: Microscope,
    accent: 'border-primary-600 bg-primary-50',
    iconColor: 'text-primary-600 bg-primary-100',
  },
  {
    type: 'Revisión',
    description: 'Revisiones narrativas o sistemáticas sobre temáticas de la medicina prehospitalaria.',
    limit: 'Hasta 5000 palabras',
    Icon: BookOpen,
    accent: 'border-secondary-600 bg-secondary-50',
    iconColor: 'text-secondary-600 bg-secondary-100',
  },
  {
    type: 'Reporte de Caso',
    description: 'Casos clínicos relevantes o infrecuentes en el ámbito prehospitalario.',
    limit: 'Hasta 2000 palabras · 3 figuras',
    Icon: FileText,
    accent: 'border-teal-600 bg-teal-50',
    iconColor: 'text-teal-600 bg-teal-100',
  },
  {
    type: 'Serie de Casos',
    description: 'Análisis de una serie de casos con características comunes y relevancia científica.',
    limit: 'Hasta 3000 palabras',
    Icon: ClipboardList,
    accent: 'border-amber-600 bg-amber-50',
    iconColor: 'text-amber-600 bg-amber-100',
  },
  {
    type: 'Protocolo / Guía Operativa',
    description: 'Experiencias de implementación de protocolos locales o normativas del sistema EMS.',
    limit: 'Extensión variable',
    Icon: Star,
    accent: 'border-violet-600 bg-violet-50',
    iconColor: 'text-violet-600 bg-violet-100',
  },
  {
    type: 'Artículo Especial',
    description: 'Trabajos de gestión, docencia, simulación, entrevistas a referentes o temas de actualidad.',
    limit: 'Extensión variable',
    Icon: GraduationCap,
    accent: 'border-rose-600 bg-rose-50',
    iconColor: 'text-rose-600 bg-rose-100',
  },
  {
    type: 'Carta al Editor',
    description: 'Comentarios críticos o de apoyo sobre artículos publicados, o temas de interés comunitario.',
    limit: 'Hasta 800 palabras',
    Icon: MessageSquare,
    accent: 'border-gray-500 bg-gray-50',
    iconColor: 'text-gray-600 bg-gray-100',
  },
]

const scopeTopics = [
  { label: 'Emergencias Prehospitalarias', Icon: Ambulance },
  { label: 'Sistemas EMS', Icon: Stethoscope },
  { label: 'Medicina de Desastres', Icon: Flame },
  { label: 'Transporte Sanitario', Icon: Globe },
  { label: 'Cuidados Críticos Extrahospitalarios', Icon: FlaskConical },
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

export default function HomePage() {
  const latestIssue = issues[0] || null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ── HERO MASTHEAD ── */}
        <section className="bg-journal-cream border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 mb-4">
                Sociedad Argentina de Medicina Prehospitalaria
              </p>
              <h1
                className="text-6xl md:text-8xl font-bold text-journal-navy mb-4 leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                RAMP
              </h1>
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-16 bg-journal-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-journal-gold" />
                <div className="h-px w-16 bg-journal-gold" />
              </div>
              <h2
                className="text-xl md:text-2xl text-gray-600 mb-2 font-medium"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Revista Argentina de Medicina Prehospitalaria
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Enviar Manuscrito
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/instrucciones-para-autores"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-journal-navy text-journal-navy font-semibold rounded-lg hover:bg-journal-navy hover:text-white transition-all"
                >
                  Ver Instrucciones
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ÚLTIMO NÚMERO / INAUGURAL ── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold text-journal-navy whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {latestIssue ? 'Último Número' : 'Número Inaugural'}
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {latestIssue ? (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  {latestIssue.coverImage && (
                    <img
                      src={latestIssue.coverImage}
                      alt={`Portada ${latestIssue.title}`}
                      className="w-full rounded-xl shadow-lg border border-gray-200"
                    />
                  )}
                </div>
                <div className="md:col-span-2 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-2">
                    Vol. {latestIssue.volume}, N.° {latestIssue.number} · {latestIssue.month} {latestIssue.year}
                  </span>
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {latestIssue.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{latestIssue.description}</p>
                  <Link
                    href={`/ediciones/${latestIssue.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Ver tabla de contenidos <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Portada simulada */}
                <div className="relative flex justify-center">
                  <div className="aspect-[3/4] w-64 rounded-xl overflow-hidden shadow-2xl border border-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-journal-navy via-journal-navy-light to-primary-800" />
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-white"
                          style={{
                            width: `${60 + i * 40}px`,
                            height: `${60 + i * 40}px`,
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <img
                        src="/images/logos/logo-sampre.PNG"
                        alt="SAMPRE"
                        className="h-10 w-auto object-contain brightness-0 invert mb-5 opacity-80"
                      />
                      <div
                        className="text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        RAMP
                      </div>
                      <div className="w-10 h-px bg-journal-gold mx-auto mb-3" />
                      <p className="text-white/70 text-xs leading-relaxed">
                        Revista Argentina de<br />Medicina Prehospitalaria
                      </p>
                      <div className="mt-5 px-3 py-1 rounded-full bg-journal-gold/30 border border-journal-gold/50">
                        <span className="text-journal-gold-light text-xs font-semibold">
                          Volumen 1 · 2025
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Texto */}
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full mb-4">
                    En preparación
                  </span>
                  <h3
                    className="text-3xl font-bold text-journal-navy mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Número Inaugural 2025
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    La RAMP lanzará su primera edición por invitación, convocando a referentes nacionales de la medicina prehospitalaria. El número inaugural incluirá guías operativas, artículos originales y revisiones de los principales comités de SAMPRE.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Publicación de acceso abierto y gratuita',
                      'Revisión por pares doble ciego',
                      'Alineada con estándares ICMJE, CONSORT, PRISMA',
                      'Indexación en Latindex y SciELO (objetivo)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
                  >
                    Enviar mi manuscrito
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── ALCANCE Y TEMÁTICAS ── */}
        <section className="py-16 md:py-20 bg-journal-cream border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-bold text-journal-navy mb-4"
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
        <section className="py-16 md:py-20 bg-white">
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
        <section className="py-16 md:py-20 bg-gradient-to-br from-journal-navy to-journal-navy-light text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 text-primary-300 px-4 py-2 rounded-full mb-4 text-sm font-medium">
                <Users className="w-4 h-4" />
                Período 2025-2028
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-4"
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
        <section className="py-16 md:py-20 bg-primary-600 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ¿Tenés una investigación para compartir?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              La RAMP invita a médicos, paramédicos, técnicos en emergencias y todo el equipo
              de salud a publicar sus trabajos. La publicación es completamente gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-lg hover:bg-primary-50 transition-all shadow-xl hover:scale-105"
              >
                Enviar Manuscrito
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/instrucciones-para-autores"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all"
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
