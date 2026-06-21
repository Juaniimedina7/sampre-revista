@AGENTS.md

# RAMP — Revista Argentina de Medicina Prehospitalaria

Sitio web institucional de la revista científica de SAMPRE (Sociedad Argentina de Medicina Prehospitalaria). Sitio público, estático, sin login para usuarios finales en su estado actual.

- **Dominio producción:** https://ramp.sampre.com.ar (subdominio configurado en Ferozo/Vercel)
- **Repo:** https://github.com/Juaniimedina7/sampre-revista
- **Deploy:** Vercel (auto-deploy en `git push` a `main`)
- **Mantenedor único:** Juan (juani.medina@satori-ci.com)
- **Email institucional de la revista:** `revista-ramp@sampre.com.ar` (ojo: lleva guion entre "revista" y "ramp")
- **Email general SAMPRE:** sampreweb@gmail.com
- **Licencia de contenido:** CC BY-NC-SA 4.0
- **ISSN:** en trámite

## Contexto de SAMPRE

Asociación civil sin fines de lucro fundada el 4-nov-2019, con sede en Buenos Aires. Nuclea médicos, enfermeros, técnicos en emergencias, paramédicos, bomberos, fuerzas de seguridad y primeros respondientes. Sitio principal: https://sampre.com.ar (repo separado: `juaniimedina7/sampre-landing`). **60 socios actuales (2026).**

## Stack técnico

- **Framework:** Next.js 16.2.4 con App Router (archivos `.js`, no TypeScript)
- **React:** 19.2.4
- **Estilos:** Tailwind CSS 4 (NO v3)
- **Iconos:** `lucide-react` (versión nueva — ver quirks)
- **Fuentes:** Playfair Display (display/títulos), Lora (body), DM Sans (UI/nav), todas vía `next/font/google`
- **Analytics:** `@vercel/analytics`
- **Formularios:** FormSubmit (`formsubmit.co/revista-ramp@sampre.com.ar`) — sin backend propio
- **Sin DB, sin CMS, sin auth.** Contenido manejado por el dev editando data files + git push.

## Quirks críticos (NO trivialmente sabidos)

1. **Next.js 16 — params es Promise.** En cualquier dynamic route (`[slug]`, `[numero]`) hay que `await params`:
   ```js
   export default async function Page({ params }) {
     const { slug } = await params  // OBLIGATORIO
   }
   ```
   Lo mismo en `generateMetadata`. Si no, se rompe en runtime con `sync-dynamic-apis` error.

2. **Tailwind v4 — colores en CSS, no en config.** Los tokens se definen en `@theme {}` dentro de `app/globals.css`, NO en `tailwind.config.js` (ese archivo no existe). Para agregar un color, editás `globals.css`:
   ```css
   @theme {
     --color-primary-600: #0284c7;
     --color-journal-navy: #0f2240;
   }
   ```

3. **lucide-react nueva versión NO tiene iconos de redes sociales.** No existen `Facebook`, `Instagram`, `Youtube`. Si los necesitás, usá SVG inline (ver `components/Footer.js` con `IconInstagram/Facebook/Youtube` definidos arriba del export).

4. **Workspace root warning.** Hay un `package.json` en `/Users/juanimedina7/` (carpeta home del usuario) que confunde a Turbopack. Por eso `next.config.mjs` setea explícitamente:
   ```js
   turbopack: { root: __dirname }
   ```
   No lo borres.

5. **Tipografías inline.** No usar `font-display`/`font-body` clases de Tailwind (no existen como utility en v4 acá). Se usan inline:
   ```jsx
   <h1 style={{ fontFamily: 'var(--font-display)' }}>...</h1>
   ```

## Design system

### Paleta (definida en `app/globals.css` con `@theme`)
- **primary** (sky/azul claro SAMPRE): 50, 100, 300, 400, 500, **600=#0284c7**, **700=#0369a1**, 800, 900
- **secondary** (azul más profundo): 600=#2563eb, 700=#1d4ed8
- **journal-navy** = `#0f2240` (color institucional/títulos)
- **journal-navy-light** (variante con gradient hacia)
- **journal-cream** = `#faf8f4` (fondo papel)
- **journal-gold** = `#9a7a3a` (acento dorado/separadores)
- **journal-gold-light** (versión clara)

### Tipografías (variables CSS)
- `var(--font-display)` → Playfair Display (serif elegante — títulos H1/H2)
- `var(--font-body)` → Lora (serif lectura — texto largo de artículos)
- `var(--font-sans)` → DM Sans (sans neutra — UI, nav, labels)

Aplicar **inline** en el elemento, no como utility Tailwind.

### Tono visual
"Contemporary Academic Journal" — combinación de gravitas (Playfair, navy) con frescura SAMPRE (sky blue). Cards con bordes finos `border-gray-200`, sombras suaves al hover, generoso uso de `journal-cream` para zonas hero.

## Estructura de archivos

```
app/
  layout.js                              # Root layout + metadata SEO global + fonts
  page.js                                # Home — hero compacto + feature destacado + grid + sidebar "recientes/temas"
  globals.css                            # Design system Tailwind v4 (@theme)
  favicon.ico
  opengraph-image.js                     # OG image dinámica 1200x630 (gradient navy/sky)
  sitemap.js                             # Sitemap dinámico (estáticos + ediciones + artículos + temas)
  robots.js                              # robots.txt con sitemap declarado
  articulos/
    page.js                              # Server Component — soporta ?q=, ?tipo=, ?anio=
    ArticulosSearch.js                   # Client Component (buscador con filtros + tiempo de lectura + tags clicables)
    [slug]/page.js                       # Artículo individual: cuerpo HTML opcional, share, citar, relacionados, TOC, JSON-LD
    _components/
      ShareButtons.js                    # Share: X/LinkedIn/Facebook/Telegram/WhatsApp/Email/CopiarLink
      CiteButton.js                      # Modal de cita en Vancouver/APA/BibTeX/RIS (copiar + descargar)
      ArticleBody.js                     # Render del cuerpo en HTML por secciones + ArticleTOC sidebar
  temas/
    [tag]/page.js                        # Listado de artículos por palabra clave (tags clicables)
  ediciones/
    page.js                              # Archivo agrupado por año
    [numero]/page.js                     # Edición individual con TOC
  comite-editorial/page.js               # Editor jefe + Comité Editorial + Científico + Revisores Internacionales
  contacto/
    page.js                              # Server Component (metadata)
    ContactoForm.js                      # Form FormSubmit (envío de manuscritos)
  instrucciones-para-autores/page.js     # Guía completa autores (sticky TOC)
  politica-editorial/page.js             # Acceso abierto, peer review, ética, CC BY-NC-SA
components/
  Header.js                              # 3 layers (top bar ISSN + masthead + nav) + buscador global + mobile hamburger
  Footer.js                              # 4 columnas + redes sociales (SVG inline)
data/
  articles.js                            # Array `articles` + `ARTICLE_TYPES` const (7 tipos)
  issues.js                              # Array `issues` + helpers
lib/
  readingTime.js                         # Cálculo de tiempo de lectura (~220 ppm, fallback por páginas)
  tags.js                                # slugifyTag, getAllTags, getArticlesByTag, getTagLabel
  citations.js                           # citeVancouver/APA/BibTeX/RIS
hooks/
  useInView.js                           # IntersectionObserver hook
public/
  images/logos/logo-sampre.PNG
  pdfs/vol1-num1/                        # PDFs del Vol.1 N.°1 (4 artículos)
articulos/                               # CARPETA LOCAL — PDFs originales del autor (gitignored)
info-claude/                             # Docs internos SAMPRE + benchmark JEMS (gitignored)
```

## Tipos de artículos (`ARTICLE_TYPES` en `data/articles.js`)

```js
{
  original:  'Artículo Original'           (4000 palabras max)
  revision:  'Revisión'                    (5000)
  caso:      'Reporte de Caso'             (2000)
  serie:     'Serie de Casos'              (3000)
  protocolo: 'Protocolo / Guía Operativa'  (sin límite)
  especial:  'Artículo Especial'           (sin límite)
  carta:     'Carta al Editor'             (800)
}
```

## Comité Editorial — período 2026-2028

- **Editor en Jefe:** Lucas Henkel (ojo: NO "Henckel" con C — error histórico ya corregido)
- **Comité Editorial:** William Medina (Presidente SAMPRE), Norma Raúl, Silvio Aguilera, Gabriel Sosa (Vicepresidente)
- **Comité Científico:** Diego Pizzini, Rodrigo García Marte, Kevin Bleuer, Carolina Pereyra Girardi
- **Revisores Internacionales:** Luis Eduardo Vargas Téllez (Colombia), Carlos Malpica Coronado (Perú)

Datos completos con bios en `app/comite-editorial/page.js`.

## SEO (estado: completo)

- Metadata por página (canonical, OG, Twitter) en cada `page.js`
- JSON-LD `Periodical` + `WebSite` en home (con SearchAction)
- JSON-LD `ScholarlyArticle` en cada artículo (con autores, ORCID, license, isPartOf → PublicationIssue → Volume → Periodical)
- `app/sitemap.js` lee `data/articles.js` y `data/issues.js` dinámicamente
- `app/robots.js` declara el sitemap
- `app/opengraph-image.js` genera OG image 1200x630 con branding RAMP
- `viewport.themeColor` = `#0f2240` (journal-navy)
- `metadataBase` = `https://ramp.sampre.com.ar`

Si agregás página nueva: incluir `metadata` con `title`, `description`, `alternates.canonical`, `openGraph`. Para Server Components siempre. Para Client Components, separar en `page.js` (server con metadata) + `XxxClient.js` (con `'use client'`).

## Cómo agregar un artículo nuevo

1. Subir el PDF a `public/pdfs/vol1-num1/slug-del-articulo.pdf`
2. En `data/articles.js`, agregar objeto al array `articles`:
   ```js
   {
     slug: 'slug-del-articulo',           // URL-safe, sin acentos
     title: 'Título completo',
     titleEn: 'English title',            // opcional
     type: 'original',                    // ver ARTICLE_TYPES
     authors: [
       { name: 'Dr. Apellido', affiliation: '...', orcid: null, isCorresponding: true }
     ],
     keywords: ['...', '...'],
     keywordsEn: ['...'],
     abstract: '...',
     abstractEn: '...',                   // opcional
     issueId: 1,                          // referencia a issues.js
     pages: '1-14',
     receivedDate: '2026-01-15',
     acceptedDate: '2026-03-08',
     publishedDate: '2026-05-01',
     pdfUrl: '/pdfs/vol1-num1/slug.pdf',
     heroImage: null,                     // opcional, URL absoluta o /path
     videoUrl: null,                      // opcional, embed de YouTube
   }
   ```
3. `git push` → Vercel redespliega automático → el artículo aparece en `/articulos`, `/articulos/slug`, sitemap, JSON-LD, etc.

## Cómo agregar una edición

En `data/issues.js`, agregar objeto al array `issues`:
```js
{
  id: 1,
  volume: 1,
  number: 1,
  year: 2026,
  month: 'Mayo',
  title: 'Número Inaugural',
  description: '...',
  coverImage: '/images/covers/vol1-num1.jpg',  // o null
  articleSlugs: ['slug-1', 'slug-2'],
  pdfUrl: null,                                 // opcional, PDF completo del número
}
```

## Vol. 1, N.° 1 — Mayo 2026 (Número Inaugural)

Los 4 artículos del número inaugural ya fueron migrados desde `articulos/` (carpeta original, gitignored) a `public/pdfs/vol1-num1/` y registrados en `data/articles.js` con metadata extraída de los PDFs:

1. **`aplicabilidad-ssc-2026-shock-septico-pediatrico`** (Revisión) — Norma B. Raúl + Adriana Bordogna. UNAJ / Hospital El Cruce / SAMPRE / SATI.
2. **`modelo-predictivo-15k-adizero-2026`** (Original) — Diego Pizzini + Agustín Astorga + Lucas Villoria. EMERTEAM / SAMPRE / UNTREF.
3. **`rutas-en-riesgo-estado-camino-emergencia`** (Especial) — Gabriel Sosa Hidalgo. UNAJ / Vicepresidente SAMPRE.
4. **`sistemas-eph-argentina-historia-organizacion-desafios`** (Revisión) — William A. Medina. Presidente SAMPRE / SEL / UNAJ.

Pendientes para este número:
- Fechas reales de recepción/aceptación/publicación (los valores actuales son estimaciones; reemplazar cuando estén las definitivas).
- DOI cuando estén asignados.
- Imagen de portada para el número (`coverImage` en `issues.js` está en `null`; cuando exista, copiar a `public/images/covers/vol1-num1.jpg` y referenciar).
- `abstractEn` del artículo de Pizzini (no estaba en el PDF original).
- Verificación de páginas asignadas a cada artículo (estimadas por largo del PDF).

## Referencia de UX — Benchmark JEMS vs RAMP (implementado)

El documento de benchmark vive en `info-claude/benchmark-jems-vs-ramp (1).md` (gitignored) y compara JEMS (modelo que le gusta a SAMPRE) con RAMP. Sus 7 prioridades ya fueron implementadas:

1. ✅ **Home con contenido inmediato** — hero compacto + feature destacado + grid + sidebar "recientes/temas"
2. ✅ **Tiempo de lectura** — `lib/readingTime.js` calcula desde `sections` (si hay HTML), o estima por páginas (500 palabras/página académica). Mostrado en tarjetas y cabecera de artículo.
3. ✅ **Tags clicables** — `/temas/[tag]` con `generateStaticParams`; tags en cards y artículo individual lincan ahí. Sidebar de "Temas" en home.
4. ✅ **Cuerpo del artículo en HTML** — campo opcional `sections: [{ heading, body }]` en `data/articles.js`. `ArticleBody.js` renderiza secciones; `ArticleTOC` muestra el índice en sidebar sticky. Si no hay `sections`, fallback al PDF.
5. ✅ **Compartir + Citar** — `ShareButtons.js` (X/LinkedIn/Facebook/Telegram/WhatsApp/Email/CopyLink); `CiteButton.js` modal con Vancouver/APA/BibTeX/RIS (copiar + descargar).
6. ✅ **Buscador global** — input en el Header (desktop + drawer mobile) que linkea a `/articulos?q=…`. La página `/articulos` lee `searchParams.q`, `tipo`, `anio` y los aplica como filtros iniciales.
7. ✅ **Fortalezas académicas conservadas:** abstract IMRyD, keywords bilingües, afiliaciones, fechas, licencia CC BY-NC-SA 4.0, filtros por tipo/año, comité multinivel, instrucciones/política detalladas, JSON-LD ScholarlyArticle.

### Cómo agregar el cuerpo HTML a un artículo

En `data/articles.js`, agregar campo `sections` al artículo:
```js
sections: [
  { heading: 'Introducción', body: '<p>Texto en HTML...</p><p>Más texto.</p>' },
  { heading: 'Métodos',      body: '<p>...</p>' },
  { heading: 'Resultados',   body: '<p>...</p><ul><li>punto</li></ul>' },
  { heading: 'Conclusiones', body: '<p>...</p>' },
  { heading: 'Referencias',  body: '<ol><li>...</li></ol>' },
],
```
El sistema:
- Renderiza cada sección con `dangerouslySetInnerHTML` (asume HTML confiable porque vos lo escribís)
- Genera anchors automáticamente (`#introduccion`, `#metodos`, etc.)
- Muestra TOC clicable en sidebar sticky
- Recalcula el tiempo de lectura desde el contenido HTML
- El PDF sigue disponible como descarga complementaria

## Decisiones del proyecto / contexto histórico

- **100% público** — los artículos no requieren login por ahora. SAMPRE pidió "opción de artículos solo para socios" — quedó **en pausa**. Opciones evaluadas: HMAC tokens stateless, lista JSON en env var, o DB+login real (Neon + Next.js Auth + Django Admin local). Sin decisión final.
- **Periodicidad cuatrimestral** — ~4 artículos cada ~4 meses
- **Sin OJS (Open Journal Systems)** — requiere PHP+MySQL, incompatible con Vercel free tier
- **Sin CMS** — el dev edita los data files directamente
- **Demo Keystatic** — existió un proof of concept en `demo/sampre-revista/` con Keystatic CMS, fue removido. Ya no está en el repo.

## Comandos comunes

- `npm run dev` — dev server (default port 3000)
- `npm run build` — build de producción
- Deploy: `git push origin main` (Vercel hace el resto)

## ⚠️ Cuidados al correr el dev server

La máquina del usuario tiene RAM limitada y se calienta cuando hay procesos paralelos. **Regla:** un solo proceso a la vez. No levantar varios dev servers (ej. demo y main simultáneos). Matar cualquier server con `pkill -9 -f "next dev"` antes de empezar otra cosa.

## Convenciones de código

- **No comentarios obvios** (los identificadores hablan solos)
- **No documentación nueva** salvo pedido explícito
- **Sin emojis** salvo pedido explícito
- **Edits mínimos** — no refactors gratuitos ni features anticipados
- Mantener el patrón Server Component + Client Component para páginas que necesitan metadata + interactividad

## Cosas que NO hacer

- No agregar `tailwind.config.js` (Tailwind v4 no lo usa)
- No usar `lucide-react`'s Facebook/Instagram/Youtube — no existen, usar los SVG inline de `Footer.js`
- No acceder a `params.slug` o `params.numero` sin `await params` primero
- No commitear `info-claude/`, `articulos/`, `demo/`, `.env*`, `node_modules/` (todos en `.gitignore`)
- No crear archivos en `.md` "informativos" salvo que el usuario lo pida
