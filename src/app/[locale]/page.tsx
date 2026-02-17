import Featured from "@/component/HomePage/Featured";
import { FlashDeals } from "@/component/HomePage/FlashDeals";
import Hero from "@/component/HomePage/Hero";
import { ProductFeed } from "@/component/HomePage/ProductFeed";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Home() {
  const t = await getTranslations("HomePage.HeroSection");
  return (
    <div
      className="flex flex-col gap-30
  "
    >
      <Hero />
      <Featured />
      <FlashDeals />
      <ProductFeed />
    </div>
  );
}
