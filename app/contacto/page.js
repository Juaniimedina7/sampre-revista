'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Send, FileText, Info } from 'lucide-react'

const ARTICLE_TYPES = [
  'Artículo Original',
  'Revisión',
  'Reporte de Caso',
  'Serie de Casos',
  'Protocolo / Guía Operativa',
  'Artículo Especial',
  'Carta al Editor',
  'Otra consulta',
]

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: '',
    articleType: '',
    title: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('https://formsubmit.co/revistaramp@sampre.com.ar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `RAMP — Envío de manuscrito: ${form.title || form.articleType}`,
          _captcha: 'false',
          _template: 'table',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', institution: '', articleType: '', title: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <span className="text-gray-800 font-medium">Enviar Manuscrito</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-journal-navy mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Enviar Manuscrito
            </h1>
            <p className="text-gray-600">
              Completá el formulario y nos pondremos en contacto para guiarte en el proceso de envío.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-10">

            {/* ── Formulario ── */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  Datos del manuscrito
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre y apellido *
                      </label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="Dr. Juan Pérez"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder="tu@email.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institución / Afiliación
                    </label>
                    <input
                      type="text" name="institution" value={form.institution} onChange={handleChange}
                      placeholder="Hospital, universidad, servicio de emergencias..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de artículo *
                    </label>
                    <select
                      name="articleType" value={form.articleType} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Seleccioná un tipo...</option>
                      {ARTICLE_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título del manuscrito *
                    </label>
                    <input
                      type="text" name="title" value={form.title} onChange={handleChange} required
                      placeholder="Título provisorio o definitivo del trabajo"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje / Consulta
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={5}
                      placeholder="Resumen breve del trabajo, consultas sobre el proceso de envío, etc."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                    <Send className="w-4 h-4" />
                  </button>

                  {status === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
                      <p className="font-semibold">¡Mensaje enviado con éxito!</p>
                      <p>El comité editorial te contactará a la brevedad al email ingresado.</p>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                      <p className="font-semibold">Error al enviar el mensaje.</p>
                      <p>Por favor intentá nuevamente o escribinos directamente a <a href="mailto:revistaramp@sampre.com.ar" className="underline">revistaramp@sampre.com.ar</a></p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* ── Info lateral ── */}
            <div className="space-y-5">
              {/* Contacto directo */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contacto directo</h3>
                <a
                  href="mailto:revistaramp@sampre.com.ar"
                  className="flex items-center gap-3 text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-600" />
                  </div>
                  revistaramp@sampre.com.ar
                </a>
              </div>

              {/* Antes de enviar */}
              <div className="bg-primary-50 rounded-xl border border-primary-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary-600" />
                  <h3 className="font-bold text-primary-900 text-sm">Antes de enviar</h3>
                </div>
                <ul className="space-y-2 text-xs text-primary-800">
                  {[
                    'Revisá las instrucciones para autores',
                    'El manuscrito debe ser en Word (.doc/.docx)',
                    'Incluí resumen en inglés (abstract)',
                    'Referencias en formato Vancouver',
                    'Declaración de conflictos de interés',
                    'La publicación es completamente gratuita',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/instrucciones-para-autores"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-primary-700 font-semibold hover:text-primary-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Ver instrucciones completas
                </Link>
              </div>

              {/* Tiempo de respuesta */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Proceso editorial</h3>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Evaluación inicial</span>
                    <span className="font-semibold text-gray-800">1-2 semanas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revisión por pares</span>
                    <span className="font-semibold text-gray-800">4-8 semanas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revisores externos</span>
                    <span className="font-semibold text-gray-800">Mínimo 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sistema</span>
                    <span className="font-semibold text-gray-800">Doble ciego</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
