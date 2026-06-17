'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Search } from 'lucide-react'

const navLinks = [
  { href: '/',                             label: 'Inicio' },
  { href: '/ediciones',                    label: 'Ediciones' },
  { href: '/articulos',                    label: 'Artículos' },
  { href: '/comite-editorial',             label: 'Comité Editorial', shortLabel: 'Comité' },
  { href: '/instrucciones-para-autores',   label: 'Instrucciones' },
  { href: '/politica-editorial',           label: 'Política Editorial', xlOnly: true },
  { href: '/contacto',                     label: 'Enviar Manuscrito', shortLabel: 'Enviar' },
]

function DesktopSearch({ active, setActive }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const onClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target) && !query.trim()) {
        setActive(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setQuery('')
        setActive(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [active, query, setActive])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/articulos?q=${encodeURIComponent(q)}` : '/articulos')
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const open = () => {
    setActive(true)
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      role="search"
      className={`relative transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex-shrink-0 ${
        active ? 'w-72 xl:w-96' : 'w-10'
      }`}
    >
      <button
        type="button"
        onClick={open}
        tabIndex={active ? -1 : 0}
        aria-label="Abrir buscador"
        className={`absolute inset-y-0 left-0 z-10 flex items-center justify-center transition-colors ${
          active
            ? 'w-10 text-primary-600 pointer-events-none'
            : 'w-10 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100 cursor-pointer'
        }`}
      >
        <Search className="w-4 h-4" />
      </button>
      <label htmlFor="header-search" className="sr-only">Buscar artículos</label>
      <input
        ref={inputRef}
        id="header-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setActive(true)}
        placeholder="Buscar artículos, autores, palabras clave..."
        autoComplete="off"
        tabIndex={active ? 0 : -1}
        aria-hidden={!active}
        className={`w-full pl-9 py-2 text-sm text-gray-900 placeholder:text-gray-400 rounded-lg outline-none transition-all duration-300 ${
          active
            ? 'border border-primary-300 bg-white ring-2 ring-primary-500 pr-9 shadow-sm opacity-100'
            : 'border border-transparent bg-transparent pr-0 opacity-0 pointer-events-none'
        }`}
      />
      {active && query && (
        <button
          type="button"
          onClick={() => { setQuery(''); inputRef.current?.focus() }}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  )
}

function MobileSearch({ onSubmit }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/articulos?q=${encodeURIComponent(q)}` : '/articulos')
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <label htmlFor="header-search-mobile" className="sr-only">Buscar artículos</label>
      <input
        ref={inputRef}
        id="header-search-mobile"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar artículos, autores, palabras clave..."
        autoComplete="off"
        className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
      />
    </form>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
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
            href="mailto:revista-ramp@sampre.com.ar"
            className="text-primary-300 hover:text-primary-200 transition-colors"
          >
            revista-ramp@sampre.com.ar
          </a>
        </div>
      </div>

      {/* ── Masthead ── */}
      <div className="bg-white border-b-2 border-journal-navy">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 md:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 group min-w-0 flex-1 lg:flex-initial">
            <img
              src="/images/logos/logo-sampre.PNG"
              alt="SAMPRE"
              className="h-9 sm:h-10 md:h-12 w-auto object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <div
                className="text-xl sm:text-2xl md:text-3xl font-bold leading-none tracking-tight text-journal-navy"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                RAMP
              </div>
              <div className="hidden sm:block text-[10px] md:text-xs text-gray-500 leading-tight mt-0.5 max-w-xs truncate">
                Revista Argentina de Medicina Prehospitalaria
              </div>
            </div>
          </Link>

          {/* Buscador + nav desktop */}
          <div className="hidden lg:flex items-center flex-shrink-0 justify-end gap-2">
            <nav
              aria-hidden={searchActive}
              className={`flex items-center gap-0.5 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                searchActive
                  ? 'opacity-0 translate-x-6 pointer-events-none max-w-0 overflow-hidden'
                  : 'opacity-100 translate-x-0 max-w-[60rem]'
              }`}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const isSubmit = link.href === '/contacto'
                const hideClass = link.xlOnly ? 'hidden xl:inline-flex' : 'inline-flex'
                if (isSubmit) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      tabIndex={searchActive ? -1 : 0}
                      className={`${hideClass} ml-2 px-3.5 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap items-center`}
                    >
                      <span className="xl:inline hidden">{link.label}</span>
                      <span className="xl:hidden inline">{link.shortLabel || link.label}</span>
                    </Link>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={searchActive ? -1 : 0}
                    className={`${hideClass} px-2 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap items-center ${
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-600 hover:text-journal-navy hover:bg-gray-50'
                    }`}
                  >
                    <span className="xl:inline hidden">{link.label}</span>
                    <span className="xl:hidden inline">{link.shortLabel || link.label}</span>
                  </Link>
                )
              })}
            </nav>

            <DesktopSearch active={searchActive} setActive={setSearchActive} />
          </div>

          {/* Iconos mobile */}
          <div className="flex items-center gap-0.5 sm:gap-1 lg:hidden flex-shrink-0">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false) }}
              aria-label="Buscar"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false) }}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Buscador mobile */}
        {searchOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3">
            <MobileSearch onSubmit={() => setSearchOpen(false)} />
          </div>
        )}

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
