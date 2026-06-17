import { articles } from '@/data/articles'

export function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAllTags() {
  const map = new Map()
  for (const article of articles) {
    for (const kw of article.keywords || []) {
      const slug = slugifyTag(kw)
      if (!map.has(slug)) map.set(slug, { slug, label: kw, count: 0 })
      map.get(slug).count++
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}

export function getArticlesByTag(tagSlug) {
  return articles.filter((a) =>
    (a.keywords || []).some((kw) => slugifyTag(kw) === tagSlug)
  )
}

export function getTagLabel(tagSlug) {
  for (const article of articles) {
    for (const kw of article.keywords || []) {
      if (slugifyTag(kw) === tagSlug) return kw
    }
  }
  return null
}
