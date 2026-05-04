import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Eye, CheckCircle, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Política Editorial',
  description: 'Política editorial, sistema de revisión por pares, ética, derechos de autor y acceso abierto de la RAMP.',
}

function Section({ id, title, Icon, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
        )}
        <h2
          className="text-xl font-bold text-journal-navy"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-4 pl-12">{children}</div>
    </section>
  )
}

export default function PoliticaEditorialPage() {
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
              <span className="text-gray-800 font-medium">Política Editorial</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Política Editorial
            </h1>
            <p className="text-gray-600">
              Revista Argentina de Medicina Prehospitalaria (RAMP)
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

          {/* Política de acceso abierto */}
          <Section id="acceso" title="Acceso Abierto" Icon={Eye}>
            <p>
              La RAMP promueve el <strong>acceso abierto</strong> al conocimiento científico y la difusión libre de
              los contenidos publicados. Todos los artículos son de acceso inmediato y gratuito, sin períodos de embargo.
            </p>
            <p>
              La publicación es completamente <strong>gratuita para los autores</strong>: no se cobran cargos por
              procesamiento de artículos (APC), cargos de envío ni de revisión.
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-5">
              <p className="font-semibold text-primary-900 mb-2">Licencia Creative Commons CC BY-NC-SA 4.0</p>
              <p className="text-sm text-primary-800 mb-3">
                Todos los trabajos publicados quedan disponibles bajo esta licencia. Los autores conservan sus
                derechos de autor y autorizan a cualquier persona a:
              </p>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>✓ Compartir y redistribuir el material en cualquier medio o formato</li>
                <li>✓ Adaptar, mezclar y transformar el material</li>
                <li>✗ Uso comercial no permitido</li>
                <li>✓ Las obras derivadas deben distribuirse bajo la misma licencia</li>
              </ul>
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-primary-700 font-semibold hover:text-primary-800 transition-colors"
              >
                Ver texto completo de la licencia <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Section>

          {/* Revisión por pares */}
          <Section id="revision" title="Sistema de Revisión por Pares" Icon={Eye}>
            <p>
              La RAMP utiliza un sistema de <strong>revisión por pares doble ciego</strong>: los revisores
              desconocen la identidad de los autores y viceversa. Esto garantiza la imparcialidad del proceso evaluativo.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Tipo de revisión', value: 'Doble ciego' },
                { label: 'Revisores por artículo', value: 'Mínimo 2 externos' },
                { label: 'Tiempo estimado', value: '4 a 8 semanas' },
                { label: 'Idioma de revisión', value: 'Español / Inglés' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Posibles decisiones editoriales:</p>
              <div className="space-y-2">
                {[
                  { decision: 'Aceptado',                  color: 'bg-green-50 border-green-200 text-green-800' },
                  { decision: 'Aceptado con revisiones menores', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                  { decision: 'Revisión mayor requerida',  color: 'bg-amber-50 border-amber-200 text-amber-800' },
                  { decision: 'Rechazado',                 color: 'bg-red-50 border-red-200 text-red-800' },
                ].map(({ decision, color }) => (
                  <div key={decision} className={`px-4 py-2.5 rounded-lg border text-sm font-medium ${color}`}>
                    {decision}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Ética */}
          <Section id="etica" title="Ética e Integridad Científica" Icon={Shield}>
            <p>
              La RAMP adhiere a los más altos estándares de ética en publicación científica.
              Los manuscritos deben cumplir con los principios de la <strong>Declaración de Helsinki</strong> y
              las guías del <strong>ICMJE</strong>.
            </p>
            <div className="space-y-3">
              {[
                { titulo: 'Originalidad', descripcion: 'Los trabajos deben ser originales e inéditos, no sometidos simultáneamente a evaluación en otras publicaciones.' },
                { titulo: 'Conflictos de interés', descripcion: 'Todos los autores deben declarar cualquier conflicto de interés real o potencial que pueda influir en los resultados o interpretación del trabajo.' },
                { titulo: 'Consentimiento informado', descripcion: 'En casos clínicos, se debe adjuntar el consentimiento informado del paciente o su representante legal.' },
                { titulo: 'Aprobación ética', descripcion: 'Los estudios que involucren seres humanos o animales deben contar con la aprobación del comité de ética institucional correspondiente.' },
                { titulo: 'Financiamiento', descripcion: 'Se debe declarar la fuente de financiamiento del estudio, si corresponde.' },
                { titulo: 'Plagio y fraude', descripcion: 'El comité editorial se reserva el derecho de rechazar o retirar artículos en caso de detectarse plagio, fabricación o falsificación de datos.' },
              ].map(({ titulo, descripcion }) => (
                <div key={titulo} className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-4">
                  <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{titulo}: </span>
                    <span className="text-sm text-gray-600">{descripcion}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Derechos de autor */}
          <Section id="derechos" title="Derechos de Autor" Icon={Shield}>
            <p>
              Los autores <strong>conservan los derechos de autor</strong> sobre sus trabajos. Al enviar un
              manuscrito a la RAMP, los autores ceden a la revista los derechos de publicación con carácter
              no exclusivo.
            </p>
            <p>
              Los autores pueden, de manera independiente, establecer acuerdos adicionales para la difusión
              no exclusiva de la versión publicada (por ejemplo, en repositorios institucionales), siempre que
              se cite correctamente la fuente original: <em>Revista Argentina de Medicina Prehospitalaria (RAMP)</em>.
            </p>
          </Section>

          {/* Registro de ensayos */}
          <Section id="registro" title="Registro de Ensayos Clínicos" Icon={CheckCircle}>
            <p>
              Los ensayos clínicos deben estar registrados en un registro de ensayos reconocido (ClinicalTrials.gov,
              ANZCTR, REBEC u otro aceptado por la OMS) <strong>antes del inicio del reclutamiento</strong>.
              El número de registro debe incluirse en el manuscrito.
            </p>
          </Section>

          {/* Contacto */}
          <div className="bg-journal-cream rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-600 mb-4 text-sm">
              ¿Tenés dudas sobre la política editorial de la RAMP?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Contactar al comité editorial
              </Link>
              <a
                href="mailto:revistaramp@sampre.com.ar"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                revistaramp@sampre.com.ar
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
