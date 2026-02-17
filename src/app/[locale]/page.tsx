import Featured from "@/component/HomePage/Featured";
import { FlashDeals } from "@/component/HomePage/FlashDeals";
import Hero from "@/component/HomePage/Hero";
import { ProductFeed } from "@/component/HomePage/ProductFeed";

export default async function Home() {
  return (
    <div
      className="flex flex-col gap-60
  "
    >
      <Hero />
      <Featured />
      <FlashDeals />
      <ProductFeed />
    </div>
  );
}
