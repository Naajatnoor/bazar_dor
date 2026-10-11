import CategoryLinks from "./CategoryLinks";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
//  "https://openapi.programming-hero.com/api/bazardor/categories",
 "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Categories API failed:", res.status);
    return [];
  }

  return res.json();
};

const CategoryNav = async () => {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return <CategoryLinks categories={categories} />;
};

export default CategoryNav;



