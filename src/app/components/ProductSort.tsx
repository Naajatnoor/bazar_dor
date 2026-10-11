
"use client";

import { useState } from "react";
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
    pct: number;
    dir?: "up" | "down" | "flat";
  };
};

type ProductSortProps = {
  products: Product[];
  categoryIcon: string;
};

// বাংলা সংখ্যা ও কমা থেকে সঠিক দাম বের করবে
function parsePrice(value: number | string): number {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) =>
      String(banglaDigits.indexOf(digit))
    )
    .replace(/[,\u09F7]/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(normalized) || 0;
}

export default function ProductSort({
  products,
  categoryIcon,
}: ProductSortProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parsePrice(a.today);
    const priceB = parsePrice(b.today);

    if (sort === "low") {
      return priceA - priceB;
    }

    if (sort === "high") {
      return priceB - priceA;
    }

    return 0;
  });

  return (
    <>
      {/* Sort option */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* সব পণ্য sort হয়ে এখানে দেখাবে */}
      <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="rounded-2xl border border-green-100 bg-[#F0FCF0] p-4 transition hover:border-green-500 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-2xl">
                {product.image ||
                  product.categoryIcon ||
                  categoryIcon ||
                  "🛒"}
              </span>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>

            <div className="my-4 border-t border-green-100" />

            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {parsePrice(product.today).toLocaleString("bn-BD")} টাকা
            </p>

            {product.change && (
              <p className="mt-2 text-sm text-gray-500">
                দাম পরিবর্তন:{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </p>
            )}

            <p className="mt-4 text-sm font-medium text-[#05893E]">
              বিস্তারিত দেখুন →
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
