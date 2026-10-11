import Link from "next/link";

type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number | string;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

async function getProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error("Products API failed:", res.status);
      return null;
    }

    const data = await res.json();

    const products: unknown = Array.isArray(data)
      ? data
      : data?.products ?? data?.data?.products ?? data?.data;

    if (!Array.isArray(products)) {
      console.error("Unexpected products API response:", data);
      return null;
    }

    return products as Product[];
  } catch (error) {
    console.error("Could not load products:", error);
    return null;
  }
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    piece: "টি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    gram: "গ্রাম",
    packet: "প্যাকেট",
  };

  return units[unit?.toLowerCase()] ?? unit;
}

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section
      id="sob-ponno"
      className="scroll-mt-24 bg-[#f0f5f0] px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-base-content sm:text-3xl">
          <span aria-hidden="true" className="text-green-600">
            ▦
          </span>
          সকল পণ্য
        </h2>
        <p className="text-base-content/60 pb-3">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        <p className="mb-5 text-sm text-base-content/60 sm:text-base">
  চাল, ডাল, তেল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয়
  পণ্যের আজকের বাজারদর এক নজরে দেখুন।
</p>

        {products === null ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
            <p className="text-lg font-semibold">
              পণ্যের তথ্য এখন লোড করা যাচ্ছে না।
            </p>
            <p className="mt-2 text-sm text-base-content/60">
              সার্ভারে সাময়িক সমস্যা হতে পারে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
          </div>
        ) : products.length === 0 ? (
          <p className="rounded-2xl bg-base-100 p-6 text-center text-base-content/60">
            বর্তমানে কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const direction = product.change?.dir ?? "flat";
              const percentage = Math.abs(
                Number(product.change?.pct ?? 0)
              );

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  aria-label={`${product.nameBn} এর বিস্তারিত দাম দেখুন`}
                  className="group rounded-3xl border border-[#dce5dc] bg-[#fbfdfb] p-5 transition duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f0f5f0] text-3xl">
                      { product.image || product.categoryIcon || "🛒"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-bold text-base-content transition group-hover:text-green-700">
                        {product.nameBn}
                      </h3>
                      <p className="mt-1 text-base text-base-content/60">
                        প্রতি {getUnit(product.unit)}
                      </p>
                    </div>
                  </div>

                  <p className="mb-3 text-sm text-base-content/60">
                    আজকের দাম
                  </p>

                  <div className="flex items-center justify-between gap-3">
                          <p className="text-right text-xl font-bold text-base-content sm:text-2xl">
                      {Number(product.today).toLocaleString("bn-BD")}
                      <span className="ml-1 text-sm font-normal">
                        টাকা/{getUnit(product.unit)}
                      </span>
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
                        direction === "up"
                          ? "bg-red-50 text-red-500"
                          : direction === "down"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span aria-hidden="true">
                        {direction === "up"
                          ? "▲"
                          : direction === "down"
                            ? "▼"
                            : "—"}
                      </span>
                      {percentage.toLocaleString("bn-BD")}%
                    </span>

              
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
