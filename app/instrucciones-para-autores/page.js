import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Instrucciones para Autores',
  description: 'Guía completa para el envío de manuscritos a la Revista Argentina de Medicina Prehospitalaria (RAMP). Tipos de artículos, formato, estructura y normas éticas.',
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <h2
          className="text-xl font-bold text-journal-navy whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
    </section>
  )
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
      <span className="text-sm">{children}</span>
    </li>
  )
}

const articleTypes = [
  { tipo: 'Artículo Original',         extension: 'Hasta 4.000 palabras', figuras: 'Hasta 6 tablas/figuras', descripcion: 'Investigaciones clínicas, epidemiológicas, operativas o educativas.' },
  { tipo: 'Revisión',                  extension: 'Hasta 5.000 palabras', figuras: '—',                      descripcion: 'Revisiones narrativas o sistemáticas.' },
  { tipo: 'Reporte de Caso',           extension: 'Hasta 2.000 palabras', figuras: 'Hasta 3 figuras',        descripcion: 'Casos clínicos relevantes en el ámbito prehospitalario.' },
  { tipo: 'Serie de Casos',            extension: 'Hasta 3.000 palabras', figuras: '—',                      descripcion: 'Análisis de una serie de casos con características comunes.' },
  { tipo: 'Protocolo / Guía Operativa',extension: 'Variable',             figuras: 'Variable',               descripcion: 'Experiencias de implementación o normativas locales.' },
  { tipo: 'Artículo Especial',         extension: 'Variable',             figuras: 'Variable',               descripcion: 'Gestión, docencia, simulación, entrevistas, temas de actualidad.' },
  { tipo: 'Carta al Editor',           extension: 'Hasta 800 palabras',   figuras: '—',                      descripcion: 'Comentarios sobre artículos publicados o temas de interés.' },
]

const toc = [
  { id: 'alcance',         label: '1. Alcance' },
  { id: 'tipos',           label: '2. Tipos de Artículos' },
  { id: 'preparacion',     label: '3. Preparación del Manuscrito' },
  { id: 'referencias',     label: '4. Referencias' },
  { id: 'normas',          label: '5. Normas Internacionales' },
  { id: 'etica',           label: '6. Ética y Aspectos Legales' },
  { id: 'autoria',         label: '7. Autoría' },
  { id: 'derechos',        label: '8. Derechos de Autor' },
  { id: 'ia',              label: '9. Uso de IA' },
  { id: 'proceso',         label: '10. Proceso Editorial' },
  { id: 'envio',           label: '11. Envío' },
]

export default function InstruccionesPage() {
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
              <span className="text-gray-800 font-medium">Instrucciones para Autores</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Instrucciones para Autores
            </h1>
            <p className="text-gray-600">Revista Argentina de Medicina Prehospitalaria (RAMP)</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* ── Tabla de contenidos (sticky) ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  Contenidos
                </h3>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-primary-600 py-1 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-gray-100 mt-5 pt-5">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-1.5 text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Enviar Manuscrito <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Contenido principal ── */}
            <div className="lg:col-span-3 space-y-12">

              <Section id="alcance" title="1. Alcance y Objetivo">
                <p>
                  La <strong>Revista Argentina de Medicina Prehospitalaria (RAMP)</strong> es una publicación científica
                  de acceso abierto destinada a la difusión de conocimientos relacionados con la atención de emergencias
                  en el ámbito extrahospitalario. Es el órgano oficial de la Sociedad Argentina de Medicina
                  Prehospitalaria (SAMPRE).
                </p>
                <p>Se aceptan contribuciones originales e inéditas en <strong>español</strong>, preferentemente con resumen en inglés.</p>
                <p className="text-sm text-gray-600">La publicación en la RAMP es completamente <strong>gratuita</strong> para los autores.</p>
              </Section>

              <Section id="tipos" title="2. Tipos de Artículos">
                <p>La revista acepta los siguientes tipos de manuscritos:</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-journal-navy text-white">
                        <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">Tipo</th>
                        <th className="px-4 py-3 text-left font-semibold">Extensión</th>
                        <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">Tablas/Figuras</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articleTypes.map((row, i) => (
                        <tr
                          key={row.tipo}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-100">
                            {row.tipo}
                            <p className="font-normal text-xs text-gray-500 mt-0.5">{row.descripcion}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-700 border-b border-gray-100">{row.extension}</td>
                          <td className="px-4 py-3 text-gray-700 border-b border-gray-100">{row.figuras}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section id="preparacion" title="3. Preparación del Manuscrito">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">3.1 Formato general</h3>
                  <ul className="space-y-1.5">
                    {[
                      'Procesador de texto: Microsoft Word (.doc / .docx)',
                      'Fuente: Times New Roman, tamaño 12',
                      'Interlineado: 1,5',
                      'Márgenes: 2,5 cm',
                      'Páginas numeradas',
                    ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 mt-6">3.2 Estructura del manuscrito</h3>
                  <p className="text-sm mb-3">El manuscrito debe incluir las siguientes secciones:</p>
                  <div className="space-y-3">
                    {[
                      { title: 'Página de título', items: ['Título en español e inglés', 'Nombre completo de los autores', 'Afiliación institucional de cada autor', 'Autor de correspondencia (con email)'] },
                      { title: 'Resumen (Abstract)', items: ['Máximo 250-300 palabras', 'Estructurado para artículos originales: Introducción, Métodos, Resultados, Conclusiones', 'Incluir 3 a 5 palabras clave (según términos MeSH)', 'Versión en inglés (preferente)'] },
                      { title: 'Texto principal — Estructura IMRyD', items: ['Introducción: contexto y objetivo del estudio', 'Métodos: diseño, población, variables, análisis estadístico', 'Resultados: presentación clara, sin interpretación', 'Discusión: interpretación y comparación con la literatura', 'Conclusiones: implicancias prácticas'] },
                    ].map(({ title, items }) => (
                      <div key={title} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h4>
                        <ul className="space-y-1">
                          {items.map((i) => <CheckItem key={i}>{i}</CheckItem>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 mt-6">3.3 Tablas y figuras</h3>
                  <ul className="space-y-1.5">
                    {[
                      'Numeradas consecutivamente',
                      'Título descriptivo en cada tabla/figura',
                      'Enviadas en archivos editables',
                      'Indicar fuente si corresponde',
                    ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                  </ul>
                </div>
              </Section>

              <Section id="referencias" title="4. Referencias">
                <p>
                  Las referencias deben seguir el <strong>estilo Vancouver</strong>, numeradas según el orden de aparición
                  en el texto. Se recomienda el uso de literatura indexada en bases reconocidas (PubMed, SciELO, LILACS).
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm">
                  <p className="font-semibold text-gray-800 mb-1">Ejemplo de referencia estilo Vancouver:</p>
                  <p className="text-gray-600 font-mono text-xs leading-relaxed">
                    Autor AB, Autor CD, Autor EF. Título del artículo. Abreviatura de la Revista. Año;Volumen(Número):páginas.
                  </p>
                </div>
              </Section>

              <Section id="normas" title="5. Normas Internacionales">
                <p>Se recomienda que los manuscritos sigan las guías internacionales según su diseño:</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { sigla: 'ICMJE', descripcion: 'Requisitos uniformes para manuscritos' },
                    { sigla: 'CONSORT', descripcion: 'Ensayos controlados aleatorizados' },
                    { sigla: 'STROBE', descripcion: 'Estudios observacionales en epidemiología' },
                    { sigla: 'PRISMA', descripcion: 'Revisiones sistemáticas y meta-análisis' },
                  ].map(({ sigla, descripcion }) => (
                    <div key={sigla} className="flex items-start gap-3 bg-primary-50 rounded-lg p-3 border border-primary-100">
                      <span className="font-bold text-primary-700 text-sm w-20 flex-shrink-0">{sigla}</span>
                      <span className="text-sm text-gray-700">{descripcion}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">El comité editorial podrá solicitar el envío del checklist correspondiente.</p>
              </Section>

              <Section id="etica" title="6. Ética y Aspectos Legales">
                <p>Los trabajos deben cumplir con los principios éticos internacionales, incluyendo la <strong>Declaración de Helsinki</strong>.</p>
                <p className="font-semibold text-gray-900">Requisitos obligatorios:</p>
                <ul className="space-y-1.5">
                  {[
                    'Aprobación por comité de ética institucional (cuando corresponda)',
                    'Consentimiento informado de los pacientes en casos clínicos',
                    'Declaración de conflictos de interés de todos los autores',
                    'Declaración de financiamiento del estudio',
                    'Registro de ensayos clínicos cuando corresponda',
                  ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
              </Section>

              <Section id="autoria" title="7. Autoría">
                <p>
                  La autoría debe cumplir con los criterios establecidos por el <strong>ICMJE</strong>.
                  Para ser considerado autor, se debe cumplir con los siguientes criterios:
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Contribución sustancial al diseño, adquisición, análisis o interpretación de los datos',
                    'Redacción del artículo o revisión crítica de su contenido intelectual',
                    'Aprobación final de la versión a publicar',
                    'Responsabilidad por todos los aspectos del trabajo',
                  ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
                <p className="text-sm text-gray-600">
                  Los chatbots y herramientas de IA <strong>no</strong> pueden ser listados como autores o coautores.
                </p>
              </Section>

              <Section id="derechos" title="8. Derechos de Autor">
                <p>
                  Todos los trabajos publicados en la RAMP quedan disponibles bajo la licencia{' '}
                  <strong>Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)</strong>.
                </p>
                <p>
                  Los autores <strong>conservan los derechos de autor</strong> (copyright) sobre su obra.
                  Al enviar un manuscrito, ceden a la RAMP los derechos de publicación con carácter no exclusivo.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-primary-900 mb-1">Bajo esta licencia, los lectores pueden:</p>
                  <ul className="space-y-1 text-primary-800">
                    <li>✓ Compartir y redistribuir el material en cualquier medio o formato</li>
                    <li>✓ Adaptar, mezclar y transformar el material</li>
                    <li>✗ No se permite el uso comercial</li>
                    <li>✓ Las obras derivadas deben distribuirse bajo la misma licencia</li>
                  </ul>
                </div>
              </Section>

              <Section id="ia" title="9. Uso de Inteligencia Artificial">
                <p>
                  Los autores deben <strong>revelar explícitamente</strong> si utilizaron tecnologías asistidas por
                  inteligencia artificial (IA) — incluyendo LLMs, chatbots o generadores de imágenes — en la producción
                  del trabajo.
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Si se usó IA para asistencia de escritura, describirlo en la sección de agradecimientos',
                    'Si se usó IA para recopilación de datos o análisis, describirlo en Métodos',
                    'Los chatbots no pueden figurar como autores ni coautores',
                    'Los autores son responsables de verificar la precisión del contenido generado por IA',
                    'Los autores deben garantizar que no hay plagio, incluyendo en texto e imágenes generados por IA',
                  ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
              </Section>

              <Section id="proceso" title="10. Proceso Editorial">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { paso: '1', titulo: 'Evaluación inicial', descripcion: 'El comité editorial evalúa la pertinencia y calidad metodológica.', tiempo: '1-2 semanas' },
                    { paso: '2', titulo: 'Revisión por pares', descripcion: 'Sistema doble ciego con mínimo 2 revisores externos.', tiempo: '4-8 semanas' },
                    { paso: '3', titulo: 'Decisión editorial', descripcion: 'Aceptado, revisiones menores/mayores o rechazado.', tiempo: 'Variable' },
                  ].map(({ paso, titulo, descripcion, tiempo }) => (
                    <div key={paso} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                        {paso}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">{titulo}</h4>
                      <p className="text-xs text-gray-600 mb-2">{descripcion}</p>
                      <span className="text-xs font-semibold text-primary-600">{tiempo}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="envio" title="11. Envío de Manuscritos">
                <p>
                  Los trabajos deben enviarse al correo oficial de la revista o mediante el formulario de envío.
                  El envío implica la aceptación expresa de todos los términos y condiciones establecidos en estas
                  instrucciones.
                </p>
                <div className="bg-white rounded-xl border-2 border-primary-200 p-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">¿Listo para enviar tu manuscrito?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Enviar Manuscrito <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="mailto:revistaramp@sampre.com.ar"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      revistaramp@sampre.com.ar
                    </a>
                  </div>
                </div>
              </Section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
