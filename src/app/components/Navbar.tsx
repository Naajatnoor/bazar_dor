import Link from "next/link";
import BengaliDate from "./BengaliDate";
import CategoryNav from "./NavCategories";
import PriceTicker from "./PriceTickerMarquee";
import { Suspense } from "react";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div>
      {/* Main Navbar */}
      <div className="navbar flex items-center justify-between border-2 border-[#F0F5F0] bg-[#FAFCFA] px-4 sm:px-6 lg:px-10">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="flex size-10 items-center justify-center rounded-lg bg-[#05893E] text-xl"
          >
            🛒
          </Link>

          <div className="flex flex-col">
            <Link href="/" className="font-bold text-base-content">
              বাজার দর
            </Link>

            <Link
              href="/"
              className="text-sm text-gray-500"
            >
              <BengaliDate />
            </Link>
          </div>
        </div>

        
        <UserInfo/>
       
      </div>

  
      <div className="border-2 border-[#F0FCF0]">
        <Suspense
          fallback={
            <div className="h-10 w-full animate-pulse bg-[#05893E]" />
          }
        >
          <CategoryNav />
          <PriceTicker />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
