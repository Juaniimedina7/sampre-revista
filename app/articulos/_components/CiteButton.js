'use client'

import { useState, useEffect } from 'react'
import { Quote, Copy, Check, X, Download } from 'lucide-react'
import { citeAPA, citeVancouver, citeBibTeX, citeRIS } from '@/lib/citations'

const FORMATS = [
  { key: 'vancouver', label: 'Vancouver', fn: citeVancouver, ext: 'txt' },
  { key: 'apa',       label: 'APA',       fn: citeAPA,       ext: 'txt' },
  { key: 'bibtex',    label: 'BibTeX',    fn: citeBibTeX,    ext: 'bib' },
  { key: 'ris',       label: 'RIS',       fn: citeRIS,       ext: 'ris' },
]

export default function CiteButton({ article, issue }) {
  const [open, setOpen] = useState(false)
  const [activeFmt, setActiveFmt] = useState('vancouver')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const fmt = FORMATS.find((f) => f.key === activeFmt)
  const citation = fmt.fn(article, issue)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const download = () => {
    const blob = new Blob([citation], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${article.slug}.${fmt.ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm justify-center"
      >
        <Quote className="w-4 h-4" />
        Citar artículo
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cite-modal-title"
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 id="cite-modal-title" className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                  Citar este artículo
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Seleccioná el formato de cita</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-1 px-5 pt-4 border-b border-gray-100">
              {FORMATS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFmt(f.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeFmt === f.key
                      ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600 -mb-px'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto">
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                {citation}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={download}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Descargar .{fmt.ext}
              </button>
              <button
                onClick={copy}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '¡Copiado!' : 'Copiar al portapapeles'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
