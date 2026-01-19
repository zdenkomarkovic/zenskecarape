import { sanityFetch } from "@/sanity/lib/client";
import ProductsWithFilter from "@/components/ProductsWithFilter";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image
  }`;
  return sanityFetch({ query, params: { slug } });
}

async function getProductsByCategory(categoryId: string) {
  const query = `*[_type == "product" && category._ref == $categoryId] | order(_createdAt desc) {
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
  return sanityFetch({ query, params: { categoryId } });
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

  const [rawProducts, filterOptions] = await Promise.all([
    getProductsByCategory(category._id),
    getFilterOptions(),
  ]);

  // Proizvodi već dolaze u očekivanom formatu iz Sanity-a
  const products = rawProducts;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Početna
          </Link>
          {" / "}
          <Link href="/proizvodi" className="hover:text-gray-900">
            Ženske čarape
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
