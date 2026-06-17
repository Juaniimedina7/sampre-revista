'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

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

export default function ContactoForm() {
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
      const res = await fetch('https://formsubmit.co/revista-ramp@sampre.com.ar', {
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre y apellido *</label>
          <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Dr. Juan Pérez" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="tu@email.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
        </div>
      </div>

      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institución / Afiliación</label>
        <input id="institution" type="text" name="institution" value={form.institution} onChange={handleChange} autoComplete="organization" placeholder="Hospital, universidad, servicio de emergencias..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
      </div>

      <div>
        <label htmlFor="articleType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de artículo *</label>
        <select id="articleType" name="articleType" value={form.articleType} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white">
          <option value="">Seleccioná un tipo...</option>
          {ARTICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del manuscrito *</label>
        <input id="title" type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Título provisorio o definitivo del trabajo" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje / Consulta</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Resumen breve del trabajo, consultas sobre el proceso de envío, etc." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none" />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
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
          <p>Por favor intentá nuevamente o escribinos directamente a <a href="mailto:revista-ramp@sampre.com.ar" className="underline">revista-ramp@sampre.com.ar</a></p>
        </div>
      )}
    </form>
  )
}
