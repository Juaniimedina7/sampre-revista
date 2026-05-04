/**
 * Artículos de la RAMP
 * Para agregar un artículo, agregá un objeto al array articles.
 *
 * Estructura de cada artículo:
 * {
 *   slug: 'titulo-corto-del-articulo',   // URL-friendly, sin espacios ni acentos
 *   title: 'Título completo del artículo',
 *   titleEn: 'Full title in English',
 *   type: 'original',   // 'original' | 'revision' | 'caso' | 'serie' | 'protocolo' | 'especial' | 'carta'
 *   authors: [
 *     {
 *       name: 'Dr. Juan Pérez',
 *       affiliation: 'Hospital General de Buenos Aires',
 *       email: 'jperez@hospital.com.ar',
 *       orcid: null,
 *       isCorresponding: true,
 *     }
 *   ],
 *   keywords: ['medicina prehospitalaria', 'emergencias'],
 *   keywordsEn: ['prehospital medicine', 'emergencies'],
 *   abstract: 'Resumen en español...',
 *   abstractEn: 'Abstract in English...',
 *   issueId: 1,           // id del número en issues.js
 *   doi: null,            // DOI cuando esté disponible
 *   pages: '1-12',
 *   receivedDate: '2025-06-01',
 *   acceptedDate: '2025-07-15',
 *   publishedDate: '2025-09-01',
 *   pdfUrl: '/pdfs/vol1-num1/titulo.pdf',
 * }
 */

export const articles = []

export const ARTICLE_TYPES = {
  original:  { label: 'Artículo Original',          maxWords: 4000, color: 'primary' },
  revision:  { label: 'Revisión',                   maxWords: 5000, color: 'secondary' },
  caso:      { label: 'Reporte de Caso',             maxWords: 2000, color: 'emerald' },
  serie:     { label: 'Serie de Casos',              maxWords: 3000, color: 'amber' },
  protocolo: { label: 'Protocolo / Guía Operativa',  maxWords: null,  color: 'violet' },
  especial:  { label: 'Artículo Especial',           maxWords: null,  color: 'teal' },
  carta:     { label: 'Carta al Editor',             maxWords: 800,   color: 'rose' },
}

export function getArticlesByIssue(issueId) {
  return articles.filter((a) => a.issueId === issueId)
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null
}
