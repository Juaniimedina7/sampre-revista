import { slugifyTag } from '@/lib/tags'

export default function ArticleBody({ sections }) {
  if (!Array.isArray(sections) || sections.length === 0) return null

  return (
    <article className="prose prose-sm md:prose-base max-w-none">
      {sections.map((section, idx) => {
        const id = slugifyTag(section.heading || `seccion-${idx + 1}`)
        return (
          <section key={id} id={id} className="scroll-mt-24 mb-10">
            {section.heading && (
              <h2
                className="text-xl md:text-2xl font-bold text-journal-navy mb-4 mt-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {section.heading}
              </h2>
            )}
            <div
              className="text-gray-800 leading-relaxed space-y-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary-300 [&>blockquote]:pl-4 [&>blockquote]:text-gray-600 [&>blockquote]:italic [&_a]:text-primary-600 [&_a]:underline hover:[&_a]:text-primary-700"
              style={{ fontFamily: 'var(--font-body)' }}
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </section>
        )
      })}
    </article>
  )
}

export function ArticleTOC({ sections }) {
  if (!Array.isArray(sections) || sections.length === 0) return null
  return (
    <nav aria-label="Contenidos del artículo">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
        Contenidos
      </p>
      <ul className="space-y-1">
        {sections.map((section, idx) => {
          const id = slugifyTag(section.heading || `seccion-${idx + 1}`)
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block text-sm text-gray-600 hover:text-primary-600 py-1 transition-colors"
              >
                {section.heading || `Sección ${idx + 1}`}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
