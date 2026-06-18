const WORDS_PER_MINUTE = 220
const WORDS_PER_PAGE_ACADEMIC = 200

function countWords(str) {
  if (!str) return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

function pagesFromRange(range) {
  if (!range) return null
  const match = String(range).match(/^(\d+)\s*[–-]\s*(\d+)$/)
  if (match) return Math.max(1, parseInt(match[2], 10) - parseInt(match[1], 10) + 1)
  const single = String(range).match(/^(\d+)$/)
  if (single) return parseInt(single[1], 10)
  return null
}

export function getReadingTimeMinutes(article) {
  if (!article) return null

  let wordCount = 0
  if (article.content) wordCount += countWords(article.content)
  if (Array.isArray(article.sections)) {
    wordCount += article.sections.reduce((sum, s) => sum + countWords(s.body), 0)
  }

  if (!wordCount) {
    const pages = pagesFromRange(article.pages)
    if (pages) wordCount = pages * WORDS_PER_PAGE_ACADEMIC
  }

  if (!wordCount && article.abstract) {
    wordCount = countWords(article.abstract) * 6
  }

  if (!wordCount) return null
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

export function formatReadingTime(minutes) {
  if (!minutes) return null
  return `${minutes} min de lectura`
}
