import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const change =
    product.change?.dir === "up"
      ? Math.abs(product.change.pct)
      : product.change?.dir === "down"
        ? -Math.abs(product.change.pct)
        : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl"
          >
            {product.categoryIcon}
          </span>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">
              {product.nameBn}
            </h3>

            <p className="text-xs text-base-content/60">
              প্রতি{" "}
              {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">
              আজকের দাম
            </p>

            <p className="text-xl font-bold">
              {Number(product.today).toLocaleString("bn-BD")}{" "}
              <span className="text-sm font-medium">
                টাকা
              </span>
            </p>
          </div>

          {product.change && (
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                product.change.dir === "up"
                  ? "bg-error/10 text-error"
                  : product.change.dir === "down"
                    ? "bg-success/10 text-success"
                    : "bg-base-200 text-base-content/60"
              }`}
              title="গতকালের তুলনায় দামের পরিবর্তন"
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}

              {Math.abs(change).toLocaleString("bn-BD")}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
