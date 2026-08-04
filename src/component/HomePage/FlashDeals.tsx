"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, ShoppingBag, Clock } from "lucide-react";

interface FlashProduct {
  id: string;
  name: string;
  category: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  claimedPercentage: number;
  stockLeft: number;
  image: string;
}

export const FlashDeals = () => {
  const t = useTranslations("HomePage.FlashDeals");

  // Real-time Countdown Timer logic (Targeting end of current 24-hour window)
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    // Set target time 14 hours ahead from initial render for live counting
    const target = new Date();
    target.setHours(target.getHours() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  const flashProducts: FlashProduct[] = [
    {
      id: "flash-1",
      name: "ARCHIVAL LEATHER TRENCH",
      category: "OUTERWEAR",
      originalPrice: "$1,450",
      salePrice: "$895",
      discount: "-38% OFF",
      claimedPercentage: 84,
      stockLeft: 3,
      image:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "flash-2",
      name: "CHRONO VINTAGE TIMEPIECE",
      category: "ACCESSORIES",
      originalPrice: "$890",
      salePrice: "$490",
      discount: "-45% OFF",
      claimedPercentage: 92,
      stockLeft: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "flash-3",
      name: "ATELIER SUEDE RUNNER",
      category: "FOOTWEAR",
      originalPrice: "$620",
      salePrice: "$375",
      discount: "-40% OFF",
      claimedPercentage: 76,
      stockLeft: 5,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "flash-4",
      name: "MONOGRAM TRAVEL BAG",
      category: "LEATHER GOODS",
      originalPrice: "$1,120",
      salePrice: "$670",
      discount: "-40% OFF",
      claimedPercentage: 68,
      stockLeft: 7,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full py-24 bg-background overflow-hidden relative border-y border-border/50">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="w-11/12 mx-auto space-y-16 relative z-10">
        {/* Top Header Card Container */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-title border border-border p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl"
        >
          {/* Subtle Textured Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-3 bg-secondary/10 border border-secondary/30 px-4 py-1.5 backdrop-blur-md">
                <Flame size={14} className="text-secondary animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
                  {t("badge") || "LIMITED TIME DROP"}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-none">
                {t("titleMain") || "FLASH"}{" "}
                <span className="text-secondary italic font-serif font-normal">
                  {t("titleSub") || "SALE"}
                </span>
              </h2>

              <p className="text-gray-400 text-sm md:text-base font-light max-w-lg leading-relaxed">
                {t("desc") ||
                  "Get up to 40% off on signature archival pieces and premium technology."}
              </p>
            </div>

            {/* Right Countdown Timer */}
            <div className="flex items-center gap-3 sm:gap-6 self-center lg:self-auto">
              {[
                {
                  label: t("hours") || "HOURS",
                  value: formatNumber(timeLeft.hours),
                },
                {
                  label: t("mins") || "MINS",
                  value: formatNumber(timeLeft.minutes),
                },
                {
                  label: t("secs") || "SECS",
                  value: formatNumber(timeLeft.seconds),
                },
              ].map((unit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl group">
                    <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                      {unit.value}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-secondary/50 group-hover:bg-secondary transition-colors" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-secondary tracking-[0.25em] uppercase mt-3">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Flash Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative bg-surface border border-border flex flex-col justify-between overflow-hidden cursor-pointer hover:border-secondary/50 transition-all duration-500"
            >
              {/* Product Image Container */}
              <div className="relative h-[340px] w-full overflow-hidden bg-title/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-title via-transparent to-transparent opacity-80" />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 bg-secondary text-title px-3 py-1 text-xs font-extrabold tracking-wider uppercase">
                  {product.discount}
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-secondary mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-bold text-title uppercase tracking-wider group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="space-y-3 pt-2 border-t border-border/60">
                  {/* Pricing */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-white">
                        {product.salePrice}
                      </span>
                      <span className="text-xs font-medium text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {product.stockLeft} left
                    </span>
                  </div>

                  {/* Claim Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-title rounded-full overflow-hidden border border-border">
                      <div
                        className="h-full bg-secondary transition-all duration-1000"
                        style={{ width: `${product.claimedPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 tracking-wider">
                      <span>{product.claimedPercentage}% CLAIMED</span>
                      <span className="text-secondary flex items-center gap-1">
                        <Clock size={10} /> ENDS SOON
                      </span>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <button className="w-full mt-2 py-3 bg-title/80 hover:bg-secondary text-white hover:text-title border border-border hover:border-secondary font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 group/btn cursor-pointer">
                    <span>CLAIM DEAL</span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
