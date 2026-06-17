import { articles } from '@/data/articles'
import { issues } from '@/data/issues'
import { getAllTags } from '@/lib/tags'

const SITE_URL = 'https://revista.sampre.com.ar'

export default function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { url: '/',                         priority: 1.0, changeFrequency: 'weekly'  },
    { url: '/ediciones',                priority: 0.9, changeFrequency: 'monthly' },
    { url: '/articulos',                priority: 0.9, changeFrequency: 'weekly'  },
    { url: '/comite-editorial',         priority: 0.6, changeFrequency: 'yearly'  },
    { url: '/instrucciones-para-autores', priority: 0.7, changeFrequency: 'yearly' },
    { url: '/politica-editorial',       priority: 0.6, changeFrequency: 'yearly'  },
    { url: '/contacto',                 priority: 0.5, changeFrequency: 'yearly'  },
  ].map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const issueRoutes = issues.map((issue) => ({
    url: `${SITE_URL}/ediciones/${issue.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/articulos/${article.slug}`,
    lastModified: article.publishedDate ? new Date(article.publishedDate) : now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const tagRoutes = getAllTags().map((t) => ({
    url: `${SITE_URL}/temas/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...issueRoutes, ...articleRoutes, ...tagRoutes]
}
