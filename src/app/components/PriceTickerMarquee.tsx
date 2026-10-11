import Link from "next/link";

type Product = {
  id?: string | number;
  categoryIcon?: string;
  slug: string;
  nameBn: string;
  today: number | string;
  unit: string;
  priceToday?: string;
  change?: {
    pct: number;
    dir?: "up" | "down" | "flat";
  };
};

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch ticker products:", res.status);
    return [];
  }

  const data = await res.json();

  return Array.isArray(data)
    ? data
    : data.products ?? data.data?.products ?? data.data ?? [];
};

const PriceTicker = async () => {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("PriceTicker error:", error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div
      className="ticker w-full overflow-hidden border-y border-base-300 bg-base-100 text-base-content"
      role="region"
      aria-label="আজকের পণ্যের দাম পরিবর্তনের তালিকা"
    >
      <div className="ticker-track flex w-max animate-marquee">
        {/* First list */}
        <ul className="flex shrink-0 items-center">
          {products.map((product, index) => (
            <li
              key={`first-${product.id ?? product.slug ?? index}`}
              className="border-e border-base-200 text-sm"
            >
              <Link
                href={`/product/${product.slug}`}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2 transition-colors hover:bg-base-200"
                aria-label={`${product.nameBn}, ${product.today} টাকা প্রতি ${product.unit}, বিস্তারিত দেখুন`}
              >
                <span aria-hidden="true" className="text-base">
                  {product.categoryIcon ?? "🛒"}
                </span>

                <span className="font-medium">
                  {product.nameBn}
                </span>

                <span className="text-base-content/70">
                  {Number(product.today).toLocaleString("bn-BD")} টাকা/
                  {product.unit}
                </span>

                <span
                  className={`font-semibold ${
                    (product.change?.pct ?? 0) > 0
                      ? "text-red-600"
                      : (product.change?.pct ?? 0) < 0
                        ? "text-green-600"
                        : "text-base-content/60"
                  }`}
                >
                  {(product.change?.pct ?? 0) > 0
                    ? `▲ ${product.change!.pct}%`
                    : (product.change?.pct ?? 0) < 0
                      ? `▼ ${Math.abs(product.change!.pct)}%`
                      : "— 0%"}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Duplicate list for seamless scrolling */}
        <ul className="flex shrink-0 items-center" aria-hidden="true">
          {products.map((product, index) => (
            <li
              key={`second-${product.id ?? product.slug ?? index}`}
              className="border-e border-base-200 text-sm"
            >
              <Link
                href={`/product/${product.slug}`}
                tabIndex={-1}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2 transition-colors hover:bg-base-200"
              >
                <span className="text-base">
                  {product.categoryIcon ?? "🛒"}
                </span>

                <span className="font-medium">
                  {product.nameBn}
                </span>

                <span className="text-base-content/70">
                  {Number(product.today).toLocaleString("bn-BD")} টাকা/
                  {product.unit}
                </span>

                <span
                  className={`font-semibold ${
                    (product.change?.pct ?? 0) > 0
                      ? "text-red-600"
                      : (product.change?.pct ?? 0) < 0
                        ? "text-green-600"
                        : "text-base-content/60"
                  }`}
                >
                  {(product.change?.pct ?? 0) > 0
                    ? `▲ ${product.change!.pct}%`
                    : (product.change?.pct ?? 0) < 0
                      ? `▼ ${Math.abs(product.change!.pct)}%`
                      : "— 0%"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PriceTicker;

