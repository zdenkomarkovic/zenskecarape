'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'

interface ProductsWithFilterProps {
  initialProducts: any[]
  filterOptions: {
    sizes: any[]
    colors: any[]
    deniers: any[]
    productTypes: any[]
    features: any[]
  }
}

export default function ProductsWithFilter({
  initialProducts,
  filterOptions,
}: ProductsWithFilterProps) {
  const [filters, setFilters] = useState({
    sizes: [] as string[],
    colors: [] as string[],
    deniers: [] as string[],
    productTypes: [] as string[],
    features: [] as string[],
  })

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (filters.sizes.length > 0) {
        const productSizeIds = product.sizes?.map((s: any) => s._id) || []
        if (!filters.sizes.some((sizeId) => productSizeIds.includes(sizeId))) {
          return false
        }
      }

      if (filters.colors.length > 0) {
        const productColorIds = product.colors?.map((c: any) => c._id) || []
        if (!filters.colors.some((colorId) => productColorIds.includes(colorId))) {
          return false
        }
      }

      if (filters.deniers.length > 0) {
        if (!product.denier || !filters.deniers.includes(product.denier._id)) {
          return false
        }
      }

      return true
    })
  }, [initialProducts, filters])

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full lg:w-64">
        <ProductFilter filters={filterOptions} onFilterChange={setFilters} />
      </aside>

      <div className="flex-1">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Prikazano {filteredProducts.length} od {initialProducts.length} proizvoda
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">
              Nema proizvoda koji odgovaraju izabranim filterima.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
