/**
 * Ediciones de la RAMP
 * Para agregar un nuevo número, descomentá la estructura y completá los datos.
 *
 * Estructura de cada edición:
 * {
 *   id: 1,
 *   volume: 1,           // Volumen
 *   number: 1,           // Número dentro del volumen
 *   year: 2025,
 *   month: 'Septiembre', // Mes de publicación
 *   title: 'Número Inaugural',
 *   description: '...',
 *   coverImage: '/images/covers/vol1-num1.jpg',
 *   articleSlugs: [],    // slugs de los artículos incluidos
 *   pdfUrl: null,        // URL al PDF completo del número (opcional)
 * }
 */

export const issues = []

export function getIssueLabel(issue) {
  return `Vol. ${issue.volume}, N.° ${issue.number} — ${issue.month} ${issue.year}`
}
