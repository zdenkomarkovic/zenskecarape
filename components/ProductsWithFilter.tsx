"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsWithFilterProps {
  initialProducts: any[];
  filterOptions: {
    sizes: any[];
    colors: any[];
    deniers: any[];
    productTypes: any[];
    features: any[];
  };
}

const PRODUCTS_PER_PAGE = 12;

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
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    // Reset na prvu stranicu kada se promene filteri
    setCurrentPage(1);

    return initialProducts.filter((product) => {
      if (filters.sizes.length > 0) {
        const productSizeIds = product.sizes?.map((s: any) => s._id) || [];
        if (!filters.sizes.some((sizeId) => productSizeIds.includes(sizeId))) {
          return false;
        }
      }

      if (filters.colors.length > 0) {
        const productColorIds = product.colors?.map((c: any) => c._id) || [];
        if (
          !filters.colors.some((colorId) => productColorIds.includes(colorId))
        ) {
          return false;
        }
      }

      if (filters.deniers.length > 0) {
        if (!product.denier || !filters.deniers.includes(product.denier._id)) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full lg:w-64">
        <ProductFilter filters={filterOptions} onFilterChange={setFilters} />
      </aside>

      <div className="flex-1">
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Prikaži samo 5 stranica oko trenutne stranice
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => handlePageChange(page)}
                            className={`h-10 w-10 ${
                              currentPage === page
                                ? "bg-primary text-white hover:bg-primary/90"
                                : ""
                            }`}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span
                            key={page}
                            className="flex h-10 w-10 items-center justify-center"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">
              Nema proizvoda koji odgovaraju izabranim filterima.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
