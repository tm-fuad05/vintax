"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShoppingBag,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  rating: number;
  image: string;
  tabType: string;
}

export default function ProductFeed() {
  const t = useTranslations("HomePage.ProductFeed");
  const tabNew = t("tabNew") || "NEW ARRIVALS";
  const tabBest = t("tabBest") || "BEST SELLERS";
  const tabExclusive = "EXCLUSIVE DROPS";

  const [activeTab, setActiveTab] = useState(tabNew);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const products: Product[] = [
    {
      id: "pf-1",
      name: "OVERSIZED ARCHIVAL HOODIE",
      category: "STREETWEAR",
      price: "$380",
      originalPrice: "$450",
      badge: "BEST SELLER",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-2",
      name: "TAILORED WOOL TRENCH",
      category: "OUTERWEAR",
      price: "$1,250",
      badge: "BEST SELLER",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-3",
      name: "ATELIER LEATHER CHELSEA",
      category: "FOOTWEAR",
      price: "$640",
      originalPrice: "$780",
      badge: "BEST SELLER",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-4",
      name: "SIGNATURE MONOGRAM TOTE",
      category: "LEATHER GOODS",
      price: "$890",
      badge: "BEST SELLER",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-5",
      name: "MINIMAL SUEDE LOW-TOP",
      category: "FOOTWEAR",
      price: "$490",
      badge: "BEST SELLER",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-6",
      name: "CHRONO VINTAGE TIMEPIECE",
      category: "ACCESSORIES",
      price: "$950",
      originalPrice: "$1,200",
      badge: "BEST SELLER",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-7",
      name: "STRUCTURED DENIM JACKET",
      category: "OUTERWEAR",
      price: "$520",
      badge: "BEST SELLER",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
    {
      id: "pf-8",
      name: "SCULPTURAL ACETATE SHADES",
      category: "EYEWEAR",
      price: "$310",
      badge: "BEST SELLER",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
      tabType: tabNew,
    },
  ];

  const filteredProducts = products.filter((p) => p.tabType === activeTab);
  const displayedProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section className="w-full py-28 bg-background relative overflow-hidden">
      <div className="w-11/12 mx-auto space-y-16">
        {/* Header & Tabs Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border pb-8"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
                CURATED FEED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-title uppercase">
              {t("title") || "OUR"}{" "}
              <span className="text-secondary italic font-serif font-normal">
                {t("subtitle") || "PICKS"}
              </span>
            </h2>
          </div>

          {/* Minimalist Tab Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface border border-border">
            {[tabNew, tabBest, tabExclusive].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-xs font-extrabold tracking-widest uppercase transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? "text-title bg-secondary shadow-md"
                      : "text-paragraph hover:text-title hover:bg-black/5"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Product Auto Slider Container */}
        <div className="w-11/12 mx-auto relative group/carousel">
          {/* Side Navigation Arrow Buttons (Left & Right) */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous Slide"
            className="product-feed-next absolute -left-15 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full transition-all duration-300 shadow-2xl cursor-pointer active:scale-90 flex items-center justify-center"
          >
            <ChevronLeft size={50} className="text-secondary" />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next Slide"
            className="product-feed-next absolute -right-15 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full transition-all duration-300 shadow-2xl cursor-pointer active:scale-90 flex items-center justify-center"
          >
            <ChevronRight size={50} className="text-secondary" />
          </button>

          <Swiper
            key={activeTab}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            onSlideChange={(swiper) => {}}
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{
              prevEl: ".product-feed-prev",
              nextEl: ".product-feed-next",
            }}
            spaceBetween={24}
            slidesPerView={4}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={displayedProducts.length > 4}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 28 },
            }}
            className="w-full !pb-12"
          >
            {displayedProducts.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <div className="group relative bg-surface border border-border flex flex-col justify-between overflow-hidden cursor-pointer hover:border-secondary/50 transition-all duration-500 shadow-sm hover:shadow-xl h-full">
                  {/* Product Image Box */}
                  <div className="relative h-[300px] w-full overflow-hidden bg-title/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-title/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-title/90 border border-white/20 text-white px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase backdrop-blur-md">
                        {product.badge}
                      </div>
                    )}
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      aria-label="Add to Wishlist"
                      className={`absolute top-4 right-4 z-10 w-9 h-9 border backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        wishlist[product.id]
                          ? "bg-secondary border-secondary text-title"
                          : "bg-title/40 border-white/20 text-white hover:bg-secondary hover:border-secondary hover:text-title"
                      }`}
                    >
                      <Heart
                        size={15}
                        fill={wishlist[product.id] ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-secondary">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500">
                          <Star
                            size={12}
                            className="text-secondary fill-secondary"
                          />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-title uppercase tracking-wider group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-title">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>

                        <span className="text-xs uppercase tracking-widest text-secondary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                          VIEW <ArrowUpRight size={12} />
                        </span>
                      </div>

                      {/* Permanent Fixed ADD TO BAG Button */}
                      <button className="w-full py-3 bg-title hover:bg-secondary text-white hover:text-title font-extrabold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border border-title hover:border-secondary">
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-8"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-title text-white font-extrabold text-xs uppercase tracking-[0.25em] border border-title hover:bg-secondary hover:text-title hover:border-secondary transition-all duration-300 shadow-xl cursor-pointer group"
          >
            <span>EXPLORE FULL ARCHIVE</span>
            <ArrowUpRight
              size={16}
              className="text-secondary group-hover:text-title group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
