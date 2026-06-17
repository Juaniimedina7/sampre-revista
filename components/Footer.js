import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'

function IconInstagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function IconFacebook({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconYoutube({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  )
}

const links = {
  revista: [
    { href: '/',                           label: 'Inicio' },
    { href: '/ediciones',                  label: 'Ediciones' },
    { href: '/comite-editorial',           label: 'Comité Editorial' },
  ],
  autores: [
    { href: '/instrucciones-para-autores', label: 'Instrucciones para Autores' },
    { href: '/politica-editorial',         label: 'Política Editorial' },
    { href: '/contacto',                   label: 'Enviar Manuscrito' },
  ],
  sampre: [
    { href: 'https://sampre.com.ar',       label: 'sampre.com.ar', external: true },
    { href: 'https://www.instagram.com/sampre.ar', label: 'Instagram', external: true },
    { href: 'https://www.facebook.com/SAMPREoficial', label: 'Facebook', external: true },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-journal-navy text-gray-300">
      {/* ── Tira superior dorada ── */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-journal-gold to-primary-600" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Identidad */}
          <div className="md:col-span-1">
            <img
              src="/images/logos/logo-sampre.PNG"
              alt="SAMPRE"
              className="h-14 w-auto object-contain brightness-0 invert mb-4"
            />
            <div
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              RAMP
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Revista Argentina de Medicina Prehospitalaria
            </p>
            <p className="text-xs text-gray-500">
              ISSN en trámite
            </p>
            <p className="text-xs text-gray-500">
              Licencia CC BY-NC-SA 4.0
            </p>
            <a
              href="mailto:revista-ramp@sampre.com.ar"
              className="flex items-center gap-2 mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              revista-ramp@sampre.com.ar
            </a>
          </div>

          {/* La Revista */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              La Revista
            </h3>
            <ul className="space-y-2.5">
              {links.revista.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Autores */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Para Autores
            </h3>
            <ul className="space-y-2.5">
              {links.autores.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SAMPRE */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              SAMPRE
            </h3>
            <ul className="space-y-2.5">
              {links.sampre.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {l.label}
                    {l.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
            {/* Redes SAMPRE */}
            <div className="flex gap-3 mt-5">
              {[
                { href: 'https://www.instagram.com/sampre.ar', Icon: IconInstagram, label: 'Instagram' },
                { href: 'https://www.facebook.com/SAMPREoficial', Icon: IconFacebook, label: 'Facebook' },
                { href: 'https://www.youtube.com/@samprearg8206', Icon: IconYoutube, label: 'YouTube' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Barra inferior ── */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {year} RAMP — Sociedad Argentina de Medicina Prehospitalaria (SAMPRE). Todos los derechos reservados.
          </p>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary-400 transition-colors"
          >
            CC BY-NC-SA 4.0
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}
