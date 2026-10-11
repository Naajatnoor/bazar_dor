import Link from "next/link";

type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

async function getRisingProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rising products");
  }

  const data = await res.json();

  
  const products: Product[] = Array.isArray(data)
    ? data
    : data.products ?? data.data ?? [];

  return products
    .filter(
      (product) =>
        product.change?.dir === "up" &&
        Number.isFinite(Number(product.change.pct))
    )
    .sort(
      (a, b) =>
        Number(b.change!.pct) - Number(a.change!.pct)
    )
    .slice(0, 6);
}

export default async function PriceRising() {
  const products = await getRisingProducts();

  return (
    <section className="bg-[#f0f5f0] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-base-content sm:text-3xl">
          <span className="text-red-500" aria-hidden="true">
            ▲
          </span>
          আজ দাম বেড়েছে
        </h2>

        {products.length === 0 ? (
          <p className="rounded-2xl bg-base-100 p-6 text-center text-base-content/60">
            বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group rounded-3xl border border-[#dce5dc] bg-[#fbfdfb] p-5 transition duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="grid size-[72px] shrink-0 place-items-center rounded-2xl bg-[#f0f5f0] text-3xl">
                    {product.categoryIcon || product.image || "🛒"}
                  </span>

                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold text-base-content">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-base text-base-content/60">
                      প্রতি {product.unit === "kg"
                        ? "কেজি"
                        : product.unit}
                    </p>
                  </div>
                </div>

               
                <p className="mb-1 text-base text-base-content/60">
                  আজকের দাম
                </p>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-2xl font-bold text-base-content">
                    {Number(product.today).toLocaleString("bn-BD")}
                    <span className="ml-2 text-lg font-normal">
                      টাকা
                    </span>
                  </p>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-3 py-2 text-sm font-semibold text-red-600">
                    ▲
                    {Math.abs(Number(product.change!.pct))
                      .toLocaleString("bn-BD")}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
