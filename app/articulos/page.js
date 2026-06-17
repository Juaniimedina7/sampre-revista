import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticulosSearch from './ArticulosSearch'

export const metadata = {
  title: 'Artículos',
  description:
    'Buscador de artículos científicos publicados en la Revista Argentina de Medicina Prehospitalaria (RAMP). Filtros por tipo, año y palabras clave.',
  alternates: { canonical: '/articulos' },
  openGraph: {
    url: '/articulos',
    title: 'Artículos | RAMP',
    description: 'Buscador de artículos científicos publicados en la RAMP.',
  },
}

export default async function ArticulosPage({ searchParams }) {
  const params = await searchParams
  const initialQuery = typeof params?.q === 'string' ? params.q : ''
  const initialType  = typeof params?.tipo === 'string' ? params.tipo : 'all'
  const initialYear  = typeof params?.anio === 'string' ? params.anio : 'all'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ArticulosSearch
          initialQuery={initialQuery}
          initialType={initialType}
          initialYear={initialYear}
        />
      </main>
      <Footer />
    </div>
  )
}
