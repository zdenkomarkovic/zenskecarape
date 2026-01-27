import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductOptions from "@/components/ProductOptions";
import CareInstructionsDisplay from "@/components/CareInstructionsDisplay";
import type { Metadata } from "next";

const SITE_URL = "https://zenskecarapebg.rs";

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
    colors[]->{ _id, name, hexCode },
    sizes[]->{ _id, name },
    denier->{ _id, value },
    composition,
    careInstructions,
    isNew,
    inStock,
    comingSoon
  }`;
  return sanityFetch({ query, params: { slug } });
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    };
  }

  const colors = product.colors?.map((c: any) => c.name).join(", ") || "";
  const denier = product.denier?.value || "";
  const category = product.category?.name || "Ženske čarape";

  const title = `${product.name} | ${category} | Kupovina Online`;
  const description = `Kupite ${product.name}${denier ? ` - ${denier}` : ""}${colors ? ` - Dostupne boje: ${colors}` : ""}. ${product.priceRSD ? `Cena ${product.priceRSD} RSD` : ""}${product.priceEUR ? ` (${product.priceEUR} EUR)` : ""}. Brza dostava u Srbiji ✓ Besplatna dostava preko 3000 RSD.`;

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).url()
    : `${SITE_URL}/hero.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/proizvodi/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/proizvodi/${slug}`,
      siteName: "Ženske Čarape Bg",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "sr_RS",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  const query = `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...4] {
    _id,
    name,
    slug,
    images,
    priceRSD,
    priceEUR,
    colors[]->{ _id, name, hexCode },
    isNew,
    inStock,
    comingSoon
  }`;
  return sanityFetch({ query, params: { categoryId, currentProductId } });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category?._id
    ? await getRelatedProducts(product.category._id, product._id)
    : [];

  // Generate JSON-LD structured data
  const productImageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(800).height(800).url()
    : `${SITE_URL}/hero.jpg`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `Kvalitetne ${product.name}`,
    image: product.images?.map((img: any) =>
      urlFor(img).width(800).height(800).url()
    ) || [productImageUrl],
    sku: product._id,
    offers: {
      "@type": "Offer",
      price: product.priceRSD || product.priceEUR || 0,
      priceCurrency: product.priceRSD ? "RSD" : "EUR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : product.comingSoon
          ? "https://schema.org/PreOrder"
          : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/proizvodi/${slug}`,
      seller: {
        "@type": "Organization",
        name: "Ženske Čarape Bg",
      },
    },
    brand: {
      "@type": "Brand",
      name: "Ženske Čarape Bg",
    },
    ...(product.category && {
      category: product.category.name,
    }),
  };

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Početna",
        item: SITE_URL,
      },
      ...(product.category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.category.name,
              item: `${SITE_URL}/kategorija/${product.category.slug.current}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: `${SITE_URL}/proizvodi/${slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: product.name,
              item: `${SITE_URL}/proizvodi/${slug}`,
            },
          ]),
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Početna
            </Link>
            {product.category && (
              <>
                {" / "}
                <Link
                  href={`/kategorija/${product.category.slug.current}`}
                  className="hover:text-gray-900"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            {" / "}
            <span className="text-gray-900">{product.name}</span>
          </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            colors={product.colors}
            denier={product.denier}
          />

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
                  <h3 className="text-sm font-semibold text-gray-900">
                    Denier
                  </h3>
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

              <CareInstructionsDisplay
                instructions={product.careInstructions || []}
              />
            </div>

            <ProductOptions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
