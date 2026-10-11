import Image from "next/image";
import Link from "next/link";
import img from "../../assets/bazar-hero.png";
import BengaliDate from "./BengaliDate";

const BannerPage = () => {
  return (
    <section className="hero rounded-3xl border border-base-300 bg-base-100">
      <div className="hero-content w-full flex-col items-start gap-6 py-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          
       <div
  className="mb-2 inline-flex rounded-full border border-[#05893E] bg-[#05893E]/20  px-3 py-1 text-sm font-medium text-[#05893E]"
>
  < BengaliDate />
</div>

          

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-5 flex flex-wrap gap-2 ">
            <Link href="#sob-ponno" className="btn text-white rounded-[13px] bg-[#05893E]">
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        <Image
          src={img}
          alt="তাজা বাজারের ঝুড়ি"
          width={360}
          height={288}
          priority
          className="h-auto w-full max-w-xs shrink-0 sm:max-w-sm"
        />
      </div>
    </section>
  );
};

export default BannerPage;