import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function getHomepageData() {
  const query = `*[_type == "homepage"][0] {
    heroTitle,
    heroDescription,
    heroImageDesktop,
    heroImageMobile
  }`;
  return client.fetch(query);
}

async function getFeaturedProducts() {
  const query = `*[_type == "product" && featured == true] | order(_createdAt desc) [0...8] {
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
  }`;
  return client.fetch(query);
}

async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) [0...4] {
    _id,
    name,
    slug,
    image
  }`;
  return client.fetch(query);
}

export default async function Home() {
  const [homepageData, featuredProducts, categories] = await Promise.all([
    getHomepageData(),
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      <section className="relative h-[90dvh] overflow-hidden">
        {/* Desktop slika */}
        {homepageData?.heroImageDesktop && (
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={urlFor(homepageData.heroImageDesktop)
                .width(1920)
                .height(700)
                .url()}
              alt={homepageData.heroTitle || "Hero"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Mobilna slika */}
        {homepageData?.heroImageMobile && (
          <div className="absolute inset-0 block md:hidden">
            <Image
              src={urlFor(homepageData.heroImageMobile).url()}
              alt={homepageData.heroTitle || "Hero"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        <div className="container relative mx-auto flex h-full px-4 items-end">
          <div className="mb-4 md:mb-12">
            <h1 className="mb-2 text-5xl font-bold text-white md:text-6xl drop-shadow-lg">
              {homepageData?.heroTitle || "Ženske Čarape"}
            </h1>
            {(homepageData?.heroDescription || !homepageData) && (
              <p className="mb-8 text-xl text-white drop-shadow-md">
                {homepageData?.heroDescription ||
                  "Otkrijte savršene čarape za svaku priliku. Širok izbor boja, veličina i stilova."}
              </p>
            )}
            <Link href="/proizvodi">
              <div className="group cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 120 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-16 w-36 md:w-48 text-white transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12h110m0 0l-8-8m8 8l-8 8"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
              Kupuj po kategorijama
            </h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/kategorija/${category.slug.current}`}
                  className="group relative overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {category.image ? (
                      <>
                        <Image
                          src={urlFor(category.image)
                            .width(400)
                            .height(300)
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
                    <div className="absolute inset-0 flex items-end justify-center p-6">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg transition-transform group-hover:scale-110">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-4xl font-bold text-gray-900">
                Istaknuti proizvodi
              </h2>
              <Link
                href="/proizvodi"
                className="text-lg text-red-500 hover:text-red-600"
              >
                Pogledaj sve →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-red-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Besplatna dostava za porudžbine preko 3000 RSD
          </h2>
          <p className="mb-8 text-xl">Brza i pouzdana dostava širom Srbije</p>
          <Link href="/proizvodi">
            <Button
              variant="outline"
              className="border-white bg-transparent px-8 py-6 text-lg text-white hover:bg-white hover:text-red-500"
            >
              Počni sa kupovinom
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Zašto izabrati nas?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Vrhunski kvalitet
              </h3>
              <p className="text-gray-600">
                Samo najkvalitetniji materijali i proveren kvalitet
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Brza dostava
              </h3>
              <p className="text-gray-600">
                Dostava u roku od 2-3 radna dana širom Srbije
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Podrška kupcima
              </h3>
              <p className="text-gray-600">
                Tu smo za vas svakog dana od 9h do 21h
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
