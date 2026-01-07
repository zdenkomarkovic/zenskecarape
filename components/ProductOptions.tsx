'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus } from 'lucide-react'

interface Color {
  _id: string
  name: string
  hexCode: string
}

interface Size {
  _id: string
  name: string
}

interface ProductOptionsProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    images: any[]
    priceRSD?: number
    priceEUR?: number
    colors?: Color[]
    sizes?: Size[]
    inStock?: boolean
    comingSoon?: boolean
  }
}

export default function ProductOptions({ product }: ProductOptionsProps) {
  const { addToCart } = useCart()

  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors?.[0] || null
  )
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.sizes?.[0] || null
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Get first image URL
    const imageUrl = product.images?.[0] || null

    addToCart({
      productId: product._id,
      name: product.name,
      slug: product.slug.current,
      image: imageUrl,
      priceRSD: product.priceRSD,
      priceEUR: product.priceEUR,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
      quantity,
    })

    setIsAdding(false)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  if (product.comingSoon) {
    return (
      <button
        disabled
        className="w-full rounded-lg bg-gray-400 px-8 py-4 text-lg font-semibold text-white"
      >
        Uskoro dostupno
      </button>
    )
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full rounded-lg bg-gray-400 px-8 py-4 text-lg font-semibold text-white"
      >
        Nema na lageru
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Izaberite boju
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color._id}
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 transition-all ${
                  selectedColor?._id === color._id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div
                  className="h-6 w-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hexCode }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Izaberite veličinu
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size._id}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg border-2 px-6 py-3 text-sm font-medium transition-all ${
                  selectedSize?._id === size._id
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Količina</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={decrementQuantity}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center text-lg font-semibold">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 hover:border-gray-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full rounded-lg bg-red-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-red-600 disabled:bg-gray-400"
      >
        {isAdding ? 'Dodavanje...' : 'Dodaj u korpu'}
      </Button>
    </div>
  )
}
