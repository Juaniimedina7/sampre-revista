'use client'

import { useState } from 'react'
import { Share2, Link as LinkIcon, Check, Mail } from 'lucide-react'

function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function IconLinkedIn({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function IconFacebook({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}
function IconTelegram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
function IconWhatsApp({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  )
}
function IconInstagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}
function IconInstagramStory({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" strokeDasharray="3 2"/>
      <circle cx="12" cy="12" r="3.4"/>
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor"/>
    </svg>
  )
}

function isMobile() {
  if (typeof navigator === 'undefined') return false
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent)
}

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const copyLink = async () => {
    const ok = await copyToClipboard(url)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareInstagram = async () => {
    await copyToClipboard(`${title} — ${url}`)
    if (isMobile()) {
      window.open('instagram://camera', '_blank')
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
        }
      }, 800)
    } else {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
    }
    showToast('Enlace copiado. Pegalo en tu publicación de Instagram.')
  }

  const shareInstagramStory = async () => {
    await copyToClipboard(url)
    if (isMobile()) {
      const deepLink = `instagram-stories://share?source_application=ramp_sampre`
      window.location.href = deepLink
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
        }
      }, 1200)
    } else {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
    }
    showToast('Enlace copiado. Abrí Instagram desde el teléfono y pegalo en tu historia.')
  }

  const linkTargets = [
    { label: 'X (Twitter)', Icon: IconX,        href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: 'LinkedIn',    Icon: IconLinkedIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: 'Facebook',    Icon: IconFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: 'Telegram',    Icon: IconTelegram, href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
    { label: 'WhatsApp',    Icon: IconWhatsApp, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: 'Email',       Icon: Mail,         href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ]

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-4 h-4 text-primary-600" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Compartir</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {linkTargets.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${label}`}
            title={`Compartir en ${label}`}
            className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 text-gray-500 flex items-center justify-center transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <button
          type="button"
          onClick={shareInstagram}
          aria-label="Compartir en Instagram (copiar enlace)"
          title="Instagram — copia el enlace para pegarlo en una publicación"
          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 text-gray-500 flex items-center justify-center transition-colors"
        >
          <IconInstagram className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={shareInstagramStory}
          aria-label="Compartir en Instagram Stories (copiar enlace)"
          title="Instagram Stories — copia el enlace para pegarlo en una historia"
          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 text-gray-500 flex items-center justify-center transition-colors"
        >
          <IconInstagramStory className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copiar enlace"
          title="Copiar enlace"
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
            copied
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'border-gray-200 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 text-gray-500'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>

      {toast && (
        <div role="status" aria-live="polite" className="mt-3 text-xs text-primary-700 bg-primary-50 border border-primary-200 rounded-lg px-3 py-2 leading-snug">
          {toast}
        </div>
      )}
    </div>
  )
}
