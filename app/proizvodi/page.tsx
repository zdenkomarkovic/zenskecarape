import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductsWithFilter from "@/components/ProductsWithFilter";
import Link from "next/link";
import Image from "next/image";

async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    image
  }`;
  return sanityFetch({ query });
}

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images,
    priceRSD,
    priceEUR,
    colors[]->{ _id, name, hexCode },
    sizes[]->{ _id, name },
    denier->{ _id, value },
    isNew,
    inStock,
    comingSoon
  }`;
  return sanityFetch({ query });
}

async function getFilterOptions() {
  // Povlači boje iz Sanity-a
  const colorsQuery = `*[_type == "color"] | order(name asc) {
    _id,
    name,
    hexCode
  }`;

  // Povlači veličine iz Sanity-a
  const sizesQuery = `*[_type == "size"] | order(order asc) {
    _id,
    name
  }`;

  // Povlači debljine iz Sanity-a
  const deniersQuery = `*[_type == "denier"] | order(order asc) {
    _id,
    value
  }`;

  const [colors, sizes, deniers] = await Promise.all([
    sanityFetch({ query: colorsQuery }),
    sanityFetch({ query: sizesQuery }),
    sanityFetch({ query: deniersQuery }),
  ]);

  return {
    sizes,
    colors,
    deniers,
    productTypes: [],
    features: [],
  };
}

export default async function ProizvodiPage() {
  const [categories, rawProducts, filterOptions] = await Promise.all([
    getCategories(),
    getProducts(),
    getFilterOptions(),
  ]);

  // Proizvodi već dolaze u očekivanom formatu iz Sanity-a
  const products = rawProducts;

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
            Ženske čarape sve kategorije
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
