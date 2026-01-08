import { client } from "@/sanity/lib/client";
import ProductsWithFilter from "@/components/ProductsWithFilter";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COLOR_MAP,
  SIZE_MAP,
  mapColors,
  mapSizes,
  mapDenier,
} from "@/lib/constants";

async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image
  }`;
  return client.fetch(query, { slug });
}

async function getProductsByCategory(categoryId: string) {
  const query = `*[_type == "product" && category._ref == $categoryId] | order(_createdAt desc) {
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
  return client.fetch(query, { categoryId });
}

function getFilterOptions() {
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const rawProducts = await getProductsByCategory(category._id);
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Početna
          </Link>
          {" / "}
          <Link href="/proizvodi" className="hover:text-gray-900">
            Proizvodi
          </Link>
          {" / "}
          <span className="text-gray-900">{category.name}</span>
        </div>

        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        {products.length > 0 ? (
          <ProductsWithFilter
            initialProducts={products}
            filterOptions={filterOptions}
          />
        ) : (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">
              U ovoj kategoriji trenutno nema dostupnih proizvoda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
