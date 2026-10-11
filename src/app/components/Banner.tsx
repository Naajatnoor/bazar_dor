// import Image from "next/image";
// import Link from "next/link";
// import img from "../../assets/bazar-hero.png";
// import BengaliDate from "./BengaliDate";

// const BannerPage = () => {
//   return (
//     <section className="hero rounded-3xl border border-base-300 bg-base-100">
//       <div className="hero-content w-full flex-col items-start gap-6 py-10 lg:flex-row lg:justify-between">
//         <div className="max-w-xl">
          
//        <div
//   className="mb-2 inline-flex rounded-full border border-[#05893E] bg-[#05893E]/20  px-3 py-1 text-sm font-medium text-[#05893E]"
// >
//   < BengaliDate />
// </div>

          

//           <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
//             আজকের বাজারের দাম এক নজরে
//           </h1>

//           <p className="mt-3 text-base-content/70">
//             চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
//             বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
//             দামের পরিবর্তন এক জায়গায়।
//           </p>

//           <div className="mt-5 flex flex-wrap gap-2 ">
//             <Link href="#sob-ponno" className="btn text-white rounded-[13px] bg-[#05893E]">
//               সব পণ্য দেখুন
//             </Link>
//           </div>
//         </div>

//         <Image
//           src={img}
//           alt="তাজা বাজারের ঝুড়ি"
//           width={360}
//           height={288}
//           priority
//           className="h-auto w-full max-w-xs shrink-0 sm:max-w-sm"
//         />
//       </div>
//     </section>
//   );
// };

// export default BannerPage;


import Image from "next/image";
import Link from "next/link";
import img from "../../assets/bazar-hero.png";
import BengaliDate from "./BengaliDate";

const BannerPage = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#DCEFE2] bg-gradient-to-br from-white via-[#F4FBF6] to-[#E5F6EA] shadow-sm">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#05893E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#A7E8BC]/20 blur-3xl" />

      <div className="relative flex w-full flex-col items-center justify-between gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:gap-10 lg:px-12 lg:py-14">

        {/* Left Content */}
        <div className="w-full max-w-2xl flex-1">

          {/* Date Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B8E4C7] bg-[#05893E]/20 px-4 py-2 text-sm font-medium text-[#05893E] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#05893E]" />
            <BengaliDate />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-snug tracking-tight text-[#163D28] sm:text-4xl lg:text-5xl lg:leading-tight">
            আজকের বাজারের দাম
            <br className="hidden sm:block" />
            <span className="text-[#05893E]">
              {" "}এক নজরে
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
            প্রতিদিনের বাজারদর জানুন সহজেই। বাজারভিত্তিক
            গড় দাম, সর্বনিম্ন-সর্বাধিক মূল্য এবং দামের
            পরিবর্তন দেখুন এক জায়গায়।
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#sob-ponno"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#05893E] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#05893E]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#047532] hover:shadow-xl"
            >
              সব পণ্য দেখুন
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            
          </div>

          {/* Small Highlights */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDF5E5] text-xs text-[#05893E]">
                ✓
              </span>
              সহজে দাম দেখুন
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DDF5E5] text-xs text-[#05893E]">
                ✓
              </span>
              পণ্যভিত্তিক তথ্য
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex w-full flex-1 items-center justify-center lg:justify-end">
          <div className="absolute h-64 w-64 rounded-full bg-[#BCEBCB]/50 blur-2xl sm:h-80 sm:w-80" />

          <div className="relative w-full max-w-[440px] transition-transform duration-500 hover:scale-[1.03]">
            <Image
              src={img}
              alt="তাজা বাজারের ঝুড়ি"
              width={500}
              height={400}
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 440px"
              className="h-auto w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default BannerPage;
