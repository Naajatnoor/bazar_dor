
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FAFCFA] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Category Header Skeleton */}
        <div className="mb-6 flex animate-pulse items-center gap-4 rounded-2xl border border-green-100 bg-[#F0FCF0] p-5">
          <div className="size-14 shrink-0 rounded-xl bg-green-100" />

          <div className="flex-1 space-y-3">
            <div className="h-7 w-40 rounded-md bg-green-100 sm:w-56" />
            <div className="h-4 w-52 max-w-full rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Sorting Skeleton */}
        <div className="mb-5 flex animate-pulse items-center justify-between gap-3">
          <div className="h-4 w-36 rounded-md bg-gray-200" />
          <div className="h-10 w-40 rounded-lg border border-green-100 bg-white" />
        </div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-green-100 bg-[#F0FCF0] p-4"
            >
              {/* Product Name */}
              <div className="flex items-center gap-3">
                <div className="size-12 shrink-0 rounded-xl bg-green-100" />

                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 rounded-md bg-gray-200" />
                  <div className="h-3 w-1/2 rounded-md bg-gray-200" />
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-green-100" />

              {/* Price and Change */}
              <div className="flex items-end justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded-md bg-gray-200" />
                  <div className="h-7 w-28 rounded-md bg-green-100" />
                </div>

                <div className="h-7 w-16 rounded-full bg-green-100" />
              </div>

              {/* Details Link */}
              <div className="mt-5 flex items-center justify-between">
                <div className="h-4 w-24 rounded-md bg-green-100" />
                <div className="h-4 w-5 rounded-md bg-green-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Back Button Skeleton */}
        <div className="mt-8 animate-pulse">
          <div className="h-12 w-48 rounded-xl border border-green-100 bg-white" />
        </div>
      </div>
    </main>
  );
}
