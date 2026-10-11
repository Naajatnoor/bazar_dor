
"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FAFCFA] px-4 py-12">
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-6 flex size-32 items-center justify-center rounded-full bg-[#E8F5E9]">
          <span className="text-6xl" aria-hidden="true">
            🛒
          </span>

          <span className="absolute -right-1 -top-1 flex size-11 items-center justify-center rounded-full bg-[#05893E] text-xl font-bold text-white">
            ?
          </span>
        </div>

        {/* Error Code */}
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-[#05893E]">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-[#173D27] sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি পাওয়া যাচ্ছে না।
          পেজটি সরানো হয়ে থাকতে পারে অথবা লিংকটি ভুল হতে পারে।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#046F32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E]"
          >
            <span aria-hidden="true">⌂</span>
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D6E5D8] bg-white px-6 py-3 font-semibold text-[#05893E] transition hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E]"
          >
            ← আগের পেজে যান
          </button>
        </div>

        {/* Brand */}
        <div className="mt-10 border-t border-[#E1EAE2] pt-5">
          <Link
            href="/"
            className="font-bold text-[#05893E] hover:underline"
          >
            🛒 বাজার দর
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
      </div>
    </main>
  );
}

