import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// import { notFound } from "next/navigation";
export const instant = false;
type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
};

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor";

function formatPrice(price: number) {
  return Number(price ?? 0).toLocaleString("bn-BD");
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    piece: "টি",
    liter: "লিটার",
    dozen: "ডজন",
  };

  return units[unit] ?? unit;
}

async function getProduct(
  slug: string
): Promise<Product | null> {
  const listRes = await fetch(`${API_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!listRes.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি");
  }

  const listData = await listRes.json();

  const products: Product[] = Array.isArray(listData)
    ? listData
    : listData.products ?? listData.data ?? [];

  const matchedProduct = products.find(
    (item) => item.slug === slug
  );

  if (!matchedProduct) {
    return null;
  }

  let details: Partial<Product> = {};

  const detailRes = await fetch(
    `${API_URL}/products/${matchedProduct.id}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (detailRes.ok) {
    const detailData = await detailRes.json();

    details =
      detailData.product ??
      detailData.data ??
      detailData;
  }

  return {
    ...matchedProduct,
    ...details,

    
    categoryIcon:
      matchedProduct.categoryIcon ||
      details.categoryIcon ||
      "🛒",

    image:
      matchedProduct.image ||
      details.image,

    change:
      details.change ?? matchedProduct.change,

    markets:
      details.markets ?? matchedProduct.markets ?? [],
  } as Product;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
   notFound();
  }

  const markets = product.markets ?? [];

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : product.today;

  const difference =
    Number(product.today ?? 0) -
    Number(product.yesterday ?? 0);

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changePercent = Math.abs(
    Number(product.change?.pct ?? 0)
  );

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-base-content sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn || "পণ্যের বিভাগ"}
          </Link>

          <span>/</span>

          <span className="font-medium text-base-content">
            {product.nameBn}
          </span>
        </nav>

        {/* Product header */}
        <section className="rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              {/* Product icon / image */}
             <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f0f5f0] text-4xl sm:size-20">
  <span>
    {product.image || product.categoryIcon || "🛒"}
  </span>
</div>

              <div>
                <p className="mb-1 text-sm text-base-content/60">
                  {product.categoryNameBn || "সকল পণ্য"}
                </p>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-base-content/60">
                  প্রতি {getUnit(product.unit)} হিসেবে দাম
                </p>
              </div>
            </div>

            <div className="min-w-40 rounded-2xl bg-[#f0f5f0] p-4 sm:text-right">
              <p className="text-sm text-base-content/60">
                আজকের বাজারদর
              </p>

              <p className="text-3xl font-bold">
                {formatPrice(product.today)}
              </p>

              <p className="text-sm text-base-content/60">
                টাকা / {getUnit(product.unit)}
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-green-700"
                      : "text-base-content/60"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {changePercent.toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#f0f5f0] p-4 text-sm">
            <p className="font-semibold">
              {isUp
                ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                : isDown
                  ? "গতকালের তুলনায় আজ দাম কমেছে"
                  : "গতকালের তুলনায় আজ দামে পরিবর্তন নেই"}
            </p>

            {difference !== 0 && (
              <p className="mt-1 text-base-content/70">
                {Math.abs(difference).toLocaleString("bn-BD")} টাকা{" "}
                {difference > 0 ? "বেড়েছে" : "কমেছে"} প্রতি{" "}
                {getUnit(product.unit)}।
              </p>
            )}
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5">
          <h2 className="mb-4 text-xl font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-base-content/60">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-green-700">
                {formatPrice(lowestPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-base-content/60">
                সর্বাধিক দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-red-500">
                {formatPrice(highestPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5dc] p-4">
              <p className="text-sm text-base-content/60">
                গড় দাম (আনুমানিক)
              </p>
              <p className="mt-2 text-2xl font-bold">
                {formatPrice(Math.round(averagePrice))} টাকা
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-base-content/50">
            বাজারের সর্বনিম্ন ও সর্বাধিক দামের ভিত্তিতে গড় দাম
            আনুমানিক হিসাব করা হয়েছে।
          </p>
        </section>

        {/* Price history */}
        <section className="rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5">
          <h2 className="mb-4 text-xl font-bold">
            দামের পরিবর্তন
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "আজকের দাম", price: product.today },
              { label: "গতকালের দাম", price: product.yesterday },
              { label: "গত সপ্তাহের দাম", price: product.lastWeek },
              { label: "গত মাসের দাম", price: product.lastMonth },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-[#f0f5f0] p-4"
              >
                <p className="text-sm text-base-content/60">
                  {item.label}
                </p>

                <p className="mt-2 text-xl font-bold">
                  {formatPrice(item.price)} টাকা
                </p>

                <p className="text-xs text-base-content/50">
                  প্রতি {getUnit(product.unit)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market-wise prices */}
        <section className="rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5">
          <h2 className="mb-4 text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="py-5 text-center text-base-content/60">
              বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#dce5dc]">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-[#f0f5f0]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                      বাজার
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      বিভাগ
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#e3eae3] even:bg-[#f0f5f0]/60"
                    >
                      <td className="px-4 py-3 font-medium">
                        {market.market}
                      </td>
                      <td className="px-4 py-3">
                        {market.division}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatPrice(
                          Math.round((market.min + market.max) / 2)
                        )} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-3 text-xs text-base-content/50">
            বাজারের গড় দাম সর্বনিম্ন ও সর্বাধিক দামের মধ্যবর্তী
            মান থেকে আনুমানিক হিসাব করা হয়েছে।
          </p>
        </section>

        {/* Back to category */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce5dc] bg-[#fbfdfb] px-5 py-3 font-semibold transition hover:border-green-600 hover:text-green-700"
          >
            ← {product.categoryIcon} সব {product.categoryNameBn} 
          </Link>

        </div>
      </div>
    </main>
  );
}

