'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen } from 'lucide-react'

const navLinks = [
  { href: '/',                             label: 'Inicio' },
  { href: '/ediciones',                    label: 'Ediciones' },
  { href: '/articulos',                    label: 'Artículos' },
  { href: '/comite-editorial',             label: 'Comité Editorial' },
  { href: '/instrucciones-para-autores',   label: 'Instrucciones' },
  { href: '/politica-editorial',           label: 'Política Editorial' },
  { href: '/contacto',                     label: 'Enviar Manuscrito' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Barra superior ── */}
      <div className="bg-journal-navy text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <span className="text-gray-300">
            ISSN&nbsp;en&nbsp;trámite&nbsp;·&nbsp;Acceso Abierto&nbsp;·&nbsp;CC&nbsp;BY-NC-SA&nbsp;4.0
          </span>
          <a
            href="mailto:revistaramp@sampre.com.ar"
            className="text-primary-300 hover:text-primary-200 transition-colors"
          >
            revistaramp@sampre.com.ar
          </a>
        </div>
      </div>

      {/* ── Masthead ── */}
      <div className="bg-white border-b-2 border-journal-navy">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo + Título */}
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/images/logos/logo-sampre.PNG"
              alt="SAMPRE"
              className="h-12 w-auto object-contain"
            />
            <div>
              <div
                className="text-3xl font-bold leading-none tracking-tight text-journal-navy"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                RAMP
              </div>
              <div className="text-xs text-gray-500 leading-tight mt-0.5 max-w-xs">
                Revista Argentina de Medicina Prehospitalaria
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const isSubmit = link.href === '/contacto'
              if (isSubmit) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-journal-navy hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Hamburger mobile */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                    pathname === link.href
                      ? 'text-primary-700 bg-primary-50'
                      : link.href === '/contacto'
                      ? 'text-white bg-primary-600 hover:bg-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
