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

export const issues = [
  {
    id: 1,
    volume: 1,
    number: 1,
    year: 2026,
    month: 'Mayo',
    title: 'Número Inaugural',
    description: 'Primer número de la Revista Argentina de Medicina Prehospitalaria. Incluye una revisión crítica sobre la aplicación prehospitalaria de la Surviving Sepsis Campaign 2026 en shock séptico pediátrico, un artículo original sobre modelo predictivo de demanda asistencial en carreras de calle, un artículo especial sobre seguridad vial y trauma, y una revisión sobre la historia y organización de los sistemas de emergencias prehospitalarias en Argentina.',
    coverImage: null,
    articleSlugs: [
      'aplicabilidad-ssc-2026-shock-septico-pediatrico',
      'modelo-predictivo-15k-adizero-2026',
      'rutas-en-riesgo-estado-camino-emergencia',
      'sistemas-eph-argentina-historia-organizacion-desafios',
    ],
    pdfUrl: null,
  },
]

export function getIssueLabel(issue) {
  return `Vol. ${issue.volume}, N.° ${issue.number} — ${issue.month} ${issue.year}`
}
