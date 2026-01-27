import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    images: any[]
    priceRSD?: number
    priceEUR?: number
    colors?: any[]
    isNew?: boolean
    inStock?: boolean
    comingSoon?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(500).url()
    : '/placeholder.jpg'

  // Generate SEO-optimized alt text
  const colors = product.colors?.map((c: any) => c.name).join(", ") || "";
  const altText = `${product.name}${colors ? ` - ${colors}` : ""} - Ženske čarape`;

  return (
    <Link href={`/proizvodi/${product.slug.current}`} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              NOVO
            </span>
          )}
          {product.comingSoon && (
            <span className="absolute left-2 top-2 rounded bg-gray-500 px-2 py-1 text-xs font-semibold text-white">
              USKORO
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-2 flex gap-1">
              {product.colors.slice(0, 4).map((color: any) => (
                color?.hexCode && (
                  <div
                    key={color._id}
                    className="h-5 w-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                )
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between">
            {product.priceRSD || product.priceEUR ? (
              <div className="flex flex-col">
                {product.priceRSD && (
                  <span className="text-lg font-bold text-gray-900">
                    {product.priceRSD} RSD
                  </span>
                )}
                {product.priceEUR && (
                  <span className="text-sm text-gray-600">
                    {product.priceEUR} EUR
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-gray-500">Kontaktiraj za cenu</span>
            )}
            {!product.inStock && !product.comingSoon && (
              <span className="text-xs text-red-500">Nema na lageru</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
