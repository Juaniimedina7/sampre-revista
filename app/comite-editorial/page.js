import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Comité Editorial',
  description: 'Editor en jefe, comité editorial y comité científico de la Revista Argentina de Medicina Prehospitalaria (RAMP).',
}

const jefe = {
  name: 'Lucas Henkel',
  role: 'Editor en Jefe',
  bio: 'Técnico Superior en Emergencias Médicas. Especialidad en Medicina de Montaña (ICAR). Facultado NAEMT PHTLS y AMLS. Instructor ACLS. Miembro del Comité Latinoamericano de Educación NAEMT. Director SAR Bariloche. Secretario Administrativo de SAMPRE.',
}

const comiteEditorial = [
  { name: 'William Medina', role: 'Miembro Comité Editorial', bio: 'Médico Cirujano especialista en cirugía de tórax. Profesor UNAJ. Facultado NAEMT PHTLS y AMLS. Instructor ACLS-ECSI. Director General de Emergencias del municipio de Lanús. Presidente de SAMPRE.' },
  { name: 'Norma Raúl',     role: 'Miembro Comité Editorial', bio: 'Médica especialista en Pediatría. Vocal de la Comisión Directiva de SAMPRE.' },
  { name: 'Silvio Aguilera', role: 'Miembro Comité Editorial', bio: 'Especialista en Emergentología. Ex presidente de SAMPRE, SAE y ALACED. Presidente de la Fundación Emergencias.' },
  { name: 'Gabriel Sosa',   role: 'Miembro Comité Editorial', bio: 'Licenciado en Protección Civil y Emergencias. Magíster Internacional en Gestión de Riesgos y Desastres. Coordinador de la Tecnicatura en Emergencias Sanitarias y Desastres — UNAJ. Vicepresidente de SAMPRE.' },
]

const comiteCientifico = [
  { name: 'Diego Pizzini',            role: 'Comité Científico', bio: 'Especialista en reanimación y emergencias prehospitalarias. Vocal de la Comisión Directiva de SAMPRE.' },
  { name: 'Rodrigo García Marte',     role: 'Comité Científico', bio: 'Técnico en Emergencias Extrahospitalarias. Jefe del Departamento Técnico Operativo de Emergencias — Tierra del Fuego.' },
  { name: 'Kevin Bleuer',             role: 'Comité Científico', bio: 'Especialista en Medicina Agreste. Docente en formación prehospitalaria.' },
  { name: 'Carolina Pereyra Girardi', role: 'Comité Científico', bio: 'Profesional del área de emergencias médicas prehospitalarias.' },
]

function MemberCard({ member }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {member.name.charAt(0)}
        </div>
        <div>
          <h3
            className="font-bold text-gray-900 mb-0.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-primary-600 mb-2">{member.role}</p>
          {member.bio && (
            <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ComiteEditorialPage() {
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
              <span className="text-gray-800 font-medium">Comité Editorial</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Comité Editorial
            </h1>
            <p className="text-gray-600">
              Profesionales de referencia en medicina prehospitalaria. Período 2026-2028.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

          {/* Editor en Jefe */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-xl font-bold text-journal-navy whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Editor en Jefe
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="max-w-2xl">
              <div className="bg-gradient-to-br from-journal-navy to-journal-navy-light text-white rounded-xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {jefe.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-journal-gold mb-1">
                      {jefe.role}
                    </div>
                    <h3
                      className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {jefe.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{jefe.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comité Editorial */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-xl font-bold text-journal-navy whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Comité Editorial
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {comiteEditorial.map((m) => <MemberCard key={m.name} member={m} />)}
            </div>
          </section>

          {/* Comité Científico */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-xl font-bold text-journal-navy whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Comité Científico
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {comiteCientifico.map((m) => <MemberCard key={m.name} member={m} />)}
            </div>
          </section>

          {/* Nota institucional */}
          <section>
            <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600 max-w-3xl">
              <h3 className="font-bold text-gray-900 mb-2">Convocatoria para revisores</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                La RAMP convoca a profesionales con experiencia en medicina prehospitalaria para
                integrar el panel de revisores externos. El proceso de revisión es doble ciego
                con un tiempo estimado de 4 a 8 semanas.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Contactar al comité editorial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
