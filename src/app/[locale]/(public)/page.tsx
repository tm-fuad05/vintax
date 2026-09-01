import Featured from "@/component/HomePage/Featured";
import FlashDeals from "@/component/HomePage/FlashDeals";
import Hero from "@/component/HomePage/Hero";
import ProductFeed from "@/component/HomePage/ProductFeed";
import { getCategories } from "@/db/category.db";

export default async function Home() {
  const categories = await getCategories();
  console.log(categories);

  return (
    <div className="flex flex-col gap-30">
      <Hero />
      <Featured categoryData={categories} />
      <div>
        <FlashDeals />
        <ProductFeed />
      </div>
    </div>
  );
}
