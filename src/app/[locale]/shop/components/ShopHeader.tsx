"use client";

import { useTranslations } from "next-intl";
import { SlidersHorizontal, Grid3X3 } from "lucide-react";

interface ShopHeaderProps {
  totalItems: number;
  activeCategory: string;
  onToggleMobileFilter: () => void;
}

export const ShopHeader = ({
  totalItems,
  activeCategory,
  onToggleMobileFilter,
}: ShopHeaderProps) => {
  const t = useTranslations("Shop");

  return (
    <div className="w-full bg-title text-white py-35 px-6 lg:px-12 relative overflow-hidden border-b border-border">
      {/* Textured Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 w-11/12 mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-secondary/40 bg-secondary/10 px-3 py-1 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
              HAUTE COUTURE CATALOG
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            ARCHIVAL{" "}
            <span className="text-secondary italic font-serif font-normal">
              COLLECTION
            </span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            Explore Vintax's curated archive of luxury streetwear, outerwear,
            bespoke tailoring, and haute couture accessories.
          </p>
        </div>

        {/* Right Info & Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-white/5 border border-white/10 px-5 py-3 text-left">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] block">
              CURRENT CATEGORY
            </span>
            <span className="text-sm font-extrabold uppercase text-white">
              {activeCategory} ({totalItems})
            </span>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={onToggleMobileFilter}
            className="lg:hidden flex items-center justify-center gap-2.5 bg-secondary text-title px-6 py-3 text-xs uppercase font-black tracking-widest hover:bg-white transition-all cursor-pointer shadow-lg"
          >
            <SlidersHorizontal size={16} />
            <span>FILTERS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
