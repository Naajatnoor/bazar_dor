
import Link from "next/link";

const Footer = () => {
  const year = 2026;

  return (
    <footer className="border-t border-green-100 bg-[#f7fcf7] text-gray-700">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-xl font-bold text-gray-800"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#05893E] text-2xl text-white shadow-sm">
                🛒
              </span>
              <span>বাজার দর</span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-600">
              প্রয়োজনীয় পণ্যের দাম এক নজরে। নিত্যপ্রয়োজনীয়
              পণ্যের বাজারদর সহজেই জানুন আমাদের ওয়েবসাইটে।
            </p>

            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#05893E] transition hover:text-green-800"
            >
              বাজার দর দেখুন <span>→</span>
            </Link>
          </div>

       
          <div>
            <h3 className="mb-4 font-bold text-gray-800">
              দ্রুত লিংক
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#05893E]"
                >
                  হোম
                </Link>
              </li>

            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="mb-4 font-bold text-gray-800">
              জনপ্রিয় পণ্যের বিভাগ
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/category/chal"
                  className="transition hover:text-[#05893E]"
                >
                  🍚 চাল
                </Link>
              </li>

              <li>
                <Link
                  href="/category/dal"
                  className="transition hover:text-[#05893E]"
                >
                  🫘 ডাল
                </Link>
              </li>

              <li>
                <Link
                  href="/category/tel"
                  className="transition hover:text-[#05893E]"
                >
                  🫗 তেল
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sobji"
                  className="transition hover:text-[#05893E]"
                >
                  🥬 সবজি
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="mb-4 font-bold text-gray-800">
              দাম সম্পর্কে
            </h3>

            <p className="text-sm leading-7 text-gray-600">
              প্রদর্শিত দাম বাজার পরিস্থিতি ও স্থানভেদে
              পরিবর্তিত হতে পারে। কেনাকাটার আগে স্থানীয়
              বাজারে দাম যাচাই করে নিন।
            </p>

            <div className="mt-4 rounded-xl border border-green-100 bg-white p-3">
              <p className="text-xs leading-6 text-gray-500">
                <span className="font-semibold text-[#05893E]">
                  আমাদের লক্ষ্য:
                </span>{" "}
                বাজারদরের তথ্য সহজভাবে সবার কাছে পৌঁছে দেওয়া।
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-green-200" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs leading-6 text-gray-500 sm:text-sm md:flex-row md:text-left">
       <p>© {year} Bazar-Dor. All rights reserved.</p>

          <Link
            href="/contact"
            className="transition hover:text-[#05893E]"
          >
            বাংলাদেশের বাজারদরের তথ্য সহজভাবে আপনার কাছে।
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
