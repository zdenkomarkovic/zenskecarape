import { client } from '@/sanity/lib/client'
import ProductsWithFilter from '@/components/ProductsWithFilter'
import Link from 'next/link'
import { COLOR_MAP, SIZE_MAP, mapColors, mapSizes, mapDenier } from '@/lib/constants'

async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    image
  }`
  return client.fetch(query)
}

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images,
    priceRSD,
    priceEUR,
    colors,
    sizes,
    denier,
    isNew,
    inStock,
    comingSoon
  }`
  return client.fetch(query)
}

function getFilterOptions() {
  // Konvertuje COLOR_MAP i SIZE_MAP u array format
  const colors = Object.values(COLOR_MAP)
  const sizes = Object.values(SIZE_MAP)
  const deniers = [
    { _id: '8', value: '8 Den' },
    { _id: '10', value: '10 Den' },
    { _id: '15', value: '15 Den' },
    { _id: '20', value: '20 Den' },
    { _id: '30', value: '30 Den' },
    { _id: '40', value: '40 Den' },
    { _id: '50', value: '50 Den' },
    { _id: '60', value: '60 Den' },
    { _id: '70', value: '70 Den' },
    { _id: '80', value: '80 Den' },
    { _id: '100', value: '100 Den' },
    { _id: '120', value: '120 Den' },
  ]

  return {
    sizes,
    colors,
    deniers,
    productTypes: [],
    features: [],
  }
}

export default async function ProizvodiPage() {
  const [categories, rawProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ])

  const filterOptions = getFilterOptions()

  // Mapira colors, sizes i denier na očekivani format
  const products = rawProducts.map((product: any) => ({
    ...product,
    colors: mapColors(product.colors),
    sizes: mapSizes(product.sizes),
    denier: mapDenier(product.denier),
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Ženske Čarape
          </h1>
          <p className="text-gray-600">
            Pronađite savršene čarape za svaku priliku
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Kategorije
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/kategorija/${category.slug.current}`}
                  className="group relative overflow-hidden rounded-lg bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-red-500">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Svi proizvodi</h2>
        </div>

        {products.length > 0 ? (
          <ProductsWithFilter
            initialProducts={products}
            filterOptions={filterOptions}
          />
        ) : (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">
              Trenutno nema dostupnih proizvoda.
              <br />
              Dodajte proizvode preko Sanity Studio na{' '}
              <Link href="/studio" className="text-red-500 hover:underline">
                /studio
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
