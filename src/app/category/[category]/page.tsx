import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductSort from "../../components/ProductSort";

export const instant = false;

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number | string;
  change?: {
    pct: number;
    dir?: "up" | "down" | "flat";
  };
};

type PageProps = {
  params: Promise<{ category: string }>;
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

// Fetch categories
async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Categories API failed: ${res.status}`);
  }

  const json = await res.json();

  const categories = Array.isArray(json)
    ? json
    : json.categories ??
      json.data?.categories ??
      json.data;

  if (!Array.isArray(categories)) {
    throw new Error("Invalid categories API response");
  }

  return categories;
}

// Find selected category
async function getCategory(
  slug: string
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find(
      (item: Category) => item.slug === slug
    ) ?? null
  );
}

// Fetch products for the selected category
async function getProducts(
  slug: string
): Promise<Product[]> {
  const res = await fetch(
    `${API_URL}/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Products API failed: ${res.status}`);
  }

  const json = await res.json();

  const products = Array.isArray(json)
    ? json
    : json.products ??
      json.data?.products ??
      json.data;

  if (!Array.isArray(products)) {
    throw new Error("Invalid products API response");
  }

  return products;
}

// Loading skeleton
function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#FAFCFA] px-4 py-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-28 rounded-2xl bg-gray-200" />

        <div className="mb-5 flex justify-end">
          <div className="h-10 w-44 rounded-lg bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

// Page component
export default function CategoryPage({
  params,
}: PageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

// Resolve dynamic route params
async function CategoryPageContent({
  params,
}: PageProps) {
  const { category } = await params;

  return <CategoryContent category={category} />;
}

// Category and product content
async function CategoryContent({
  category,
}: {
  category: string;
}) {
  const [categoryData, products] = await Promise.all([
    getCategory(category),
    getProducts(category),
  ]);

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAFCFA] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Category Header */}
        <header className="mb-6 flex items-center gap-4 rounded-2xl border border-green-200 bg-[#F0FCF0] p-5">
          <span className="text-4xl" aria-hidden="true">
            {categoryData.icon || "🛒"}
          </span>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {categoryData.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {products.length.toLocaleString("bn-BD")}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </header>

        {/* Product Sorting and Grid */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-green-100 bg-white px-4 py-12 text-center">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              এই বিভাগে বর্তমানে কোনো পণ্যের তথ্য নেই।
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-medium text-white transition hover:bg-green-700"
            >
              হোম পেজে ফিরে যাও
            </Link>
          </div>
        ) : (
          <ProductSort
            products={products}
            categoryIcon={categoryData.icon}
          />
        )}

        {/* Back to Home */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 font-medium text-gray-700 transition hover:border-green-500 hover:text-[#05893E]"
          >
            ← হোম পেজে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  );
}
