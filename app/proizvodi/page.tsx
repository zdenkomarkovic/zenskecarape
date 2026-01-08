import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductsWithFilter from "@/components/ProductsWithFilter";
import Link from "next/link";
import Image from "next/image";
import {
  COLOR_MAP,
  SIZE_MAP,
  mapColors,
  mapSizes,
  mapDenier,
} from "@/lib/constants";

async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    image
  }`;
  return client.fetch(query);
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
  }`;
  return client.fetch(query);
}

function getFilterOptions() {
  // Konvertuje COLOR_MAP i SIZE_MAP u array format
  const colors = Object.values(COLOR_MAP);
  const sizes = Object.values(SIZE_MAP);
  const deniers = [
    { _id: "8", value: "8 Den" },
    { _id: "10", value: "10 Den" },
    { _id: "15", value: "15 Den" },
    { _id: "20", value: "20 Den" },
    { _id: "30", value: "30 Den" },
    { _id: "40", value: "40 Den" },
    { _id: "50", value: "50 Den" },
    { _id: "60", value: "60 Den" },
    { _id: "70", value: "70 Den" },
    { _id: "80", value: "80 Den" },
    { _id: "100", value: "100 Den" },
    { _id: "120", value: "120 Den" },
  ];

  return {
    sizes,
    colors,
    deniers,
    productTypes: [],
    features: [],
  };
}

export default async function ProizvodiPage() {
  const [categories, rawProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const filterOptions = getFilterOptions();

  // Mapira colors, sizes i denier na očekivani format
  const products = rawProducts.map((product: any) => ({
    ...product,
    colors: mapColors(product.colors),
    sizes: mapSizes(product.sizes),
    denier: mapDenier(product.denier),
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
              <div
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory touch-pan-x overscroll-x-contain scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {categories.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/kategorija/${category.slug.current}`}
                    className="group relative flex-shrink-0 w-32 md:w-48 overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-xl snap-start"
                  >
                    <div className="relative aspect-[9/16] overflow-hidden">
                      {category.image ? (
                        <>
                          <Image
                            src={urlFor(category.image)
                              .width(400)
                              .height(700)
                              .url()}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-red-100 to-red-200" />
                      )}
                      <div className="absolute inset-0 flex items-end justify-center p-4">
                        <h3 className="text-lg font-bold text-white drop-shadow-lg transition-transform group-hover:scale-110 text-center">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Svi proizvodi
          </h2>
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
              Dodajte proizvode preko Sanity Studio na{" "}
              <Link href="/studio" className="text-red-500 hover:underline">
                /studio
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
