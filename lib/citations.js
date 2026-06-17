const JOURNAL_NAME = 'Revista Argentina de Medicina Prehospitalaria'
const JOURNAL_ABBREV = 'Rev Arg Med Prehosp'

function formatAuthorName(name) {
  const parts = name
    .replace(/^(Dr\.|Dra\.|Mg\.|Lic\.|TEM)\s+/i, '')
    .trim()
    .split(/\s+/)
  if (parts.length < 2) return name
  const last = parts[parts.length - 1]
  const initials = parts.slice(0, -1).map((p) => `${p.charAt(0)}.`).join(' ')
  return `${last}, ${initials}`
}

function authorsVancouver(authors) {
  return authors.map((a) => formatAuthorName(a.name)).join(', ')
}

function authorsAPA(authors) {
  return authors.map((a) => formatAuthorName(a.name)).join(', ')
}

function getYear(article) {
  if (article.publishedDate) return article.publishedDate.slice(0, 4)
  return new Date().getFullYear()
}

export function citeVancouver(article, issue) {
  const year = getYear(article)
  const vol = issue?.volume
  const num = issue?.number
  const pages = article.pages || ''
  const url = `https://revista.sampre.com.ar/articulos/${article.slug}`
  return `${authorsVancouver(article.authors)}. ${article.title}. ${JOURNAL_ABBREV}. ${year};${vol}(${num}):${pages}. Disponible en: ${url}`
}

export function citeAPA(article, issue) {
  const year = getYear(article)
  const vol = issue?.volume
  const num = issue?.number
  const pages = article.pages || ''
  const url = `https://revista.sampre.com.ar/articulos/${article.slug}`
  return `${authorsAPA(article.authors)} (${year}). ${article.title}. ${JOURNAL_NAME}, ${vol}(${num}), ${pages}. ${url}`
}

export function citeBibTeX(article, issue) {
  const year = getYear(article)
  const key = article.slug.replace(/-/g, '_')
  const authors = article.authors.map((a) => a.name).join(' and ')
  const url = `https://revista.sampre.com.ar/articulos/${article.slug}`
  return `@article{${key},
  author    = {${authors}},
  title     = {${article.title}},
  journal   = {${JOURNAL_NAME}},
  year      = {${year}},
  volume    = {${issue?.volume ?? ''}},
  number    = {${issue?.number ?? ''}},
  pages     = {${article.pages ?? ''}},
  url       = {${url}},
  language  = {Spanish}
}`
}

export function citeRIS(article, issue) {
  const year = getYear(article)
  const url = `https://revista.sampre.com.ar/articulos/${article.slug}`
  const authorLines = article.authors.map((a) => `AU  - ${a.name}`).join('\n')
  const kwLines = (article.keywords || []).map((kw) => `KW  - ${kw}`).join('\n')
  return `TY  - JOUR
${authorLines}
TI  - ${article.title}
T2  - ${JOURNAL_NAME}
PY  - ${year}
VL  - ${issue?.volume ?? ''}
IS  - ${issue?.number ?? ''}
SP  - ${article.pages ?? ''}
UR  - ${url}
LA  - es
${kwLines}
ER  -`
}
