import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductImageGallery from '@/components/ProductImageGallery'
import ProductOptions from '@/components/ProductOptions'
import CareInstructionsDisplay from '@/components/CareInstructionsDisplay'
import { mapColors, mapSizes, mapDenier } from '@/lib/constants'

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    images,
    description,
    priceRSD,
    priceEUR,
    category->{
      _id,
      name,
      slug
    },
    subcategory->{
      _id,
      name,
      slug
    },
    colors,
    sizes,
    denier,
    composition,
    careInstructions,
    isNew,
    inStock,
    comingSoon
  }`
  return client.fetch(query, { slug })
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  const query = `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...4] {
    _id,
    name,
    slug,
    images,
    priceRSD,
    priceEUR,
    colors,
    isNew,
    inStock,
    comingSoon
  }`
  return client.fetch(query, { categoryId, currentProductId })
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rawProduct = await getProduct(slug)

  if (!rawProduct) {
    notFound()
  }

  // Transformiše colors, sizes i denier u očekivani format
  const product = {
    ...rawProduct,
    colors: mapColors(rawProduct.colors),
    sizes: mapSizes(rawProduct.sizes),
    denier: mapDenier(rawProduct.denier),
  }

  const relatedProducts = product.category?._id
    ? await getRelatedProducts(product.category._id, product._id)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Početna
          </Link>
          {product.category && (
            <>
              {' / '}
              <Link
                href={`/kategorija/${product.category.slug.current}`}
                className="hover:text-gray-900"
              >
                {product.category.name}
              </Link>
            </>
          )}
          {' / '}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.images} productName={product.name} />

          <div className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
            {product.isNew && (
              <span className="mb-4 inline-block rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                NOVO
              </span>
            )}

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {(product.priceRSD || product.priceEUR) && (
              <div className="mb-6">
                {product.priceRSD && (
                  <span className="text-3xl font-bold text-gray-900">
                    {product.priceRSD} RSD
                  </span>
                )}
                {product.priceEUR && (
                  <span className="ml-4 text-2xl text-gray-600">
                    {product.priceEUR} EUR
                  </span>
                )}
              </div>
            )}

            {product.description && (
              <div className="mb-6">
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            <div className="mb-6 space-y-6">

              {product.denier && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Denier</h3>
                  <p className="text-gray-600">{product.denier.value}</p>
                </div>
              )}

              {product.composition && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    Sastav materijala
                  </h3>
                  <p className="whitespace-pre-line text-gray-600">
                    {product.composition}
                  </p>
                </div>
              )}

              <CareInstructionsDisplay instructions={product.careInstructions || []} />
            </div>

            <ProductOptions product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Slični proizvodi
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct: any) => (
                <Link
                  key={relatedProduct._id}
                  href={`/proizvodi/${relatedProduct.slug.current}`}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={
                        relatedProduct.images?.[0]
                          ? urlFor(relatedProduct.images[0]).width(400).height(500).url()
                          : '/placeholder.jpg'
                      }
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-900 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.priceRSD || relatedProduct.priceEUR ? (
                      <>
                        {relatedProduct.priceRSD && (
                          <span className="text-lg font-bold text-gray-900">
                            {relatedProduct.priceRSD} RSD
                          </span>
                        )}
                        {relatedProduct.priceEUR && (
                          <span className="ml-2 text-sm text-gray-600">
                            {relatedProduct.priceEUR} EUR
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">Kontaktiraj za cenu</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
