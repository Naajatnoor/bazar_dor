"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

type CategoryLinksProps = {
  categories: Category[];
};

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="bg-[#FAFCFA]  border-base-100">
      <ul className="flex gap-2 overflow-x-auto px-4 py-2 sm:gap-3 lg:gap-4 lg:px-10">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <li key={category.id}  className="text-[15px] ">
              <Link
                href={`/category/${category.slug}`}
                className={`block whitespace-nowrap rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-[#05893E] text-white "
                    : "hover:bg-gray-100"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryLinks;