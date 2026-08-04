"use client";

import { Search, RotateCcw, X } from "lucide-react";

interface ShopSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ShopSidebar = ({
  isMobileOpen = false,
  onCloseMobile,
}: ShopSidebarProps) => {
  const categories = [
    { name: "ALL PIECES", count: 10, active: true },
    { name: "STREETWEAR", count: 3, active: false },
    { name: "OUTERWEAR", count: 3, active: false },
    { name: "FOOTWEAR", count: 2, active: false },
    { name: "ACCESSORIES", count: 2, active: false },
    { name: "EYEWEAR", count: 1, active: false },
    { name: "TAILORED SUITS", count: 1, active: false },
  ];

  const priceRanges = [
    { label: "ALL PRICES", active: true },
    { label: "UNDER $300", active: false },
    { label: "$300 - $600", active: false },
    { label: "$600 - $1,000", active: false },
    { label: "$1,000+", active: false },
  ];

  const content = (
    <div className="space-y-8">
      {/* Sidebar Section Title */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-xs uppercase tracking-[0.25em] font-extrabold text-title">
          CATALOG FILTERS
        </h3>

        <button className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-secondary hover:underline cursor-pointer">
          <RotateCcw size={12} />
          <span>RESET ALL</span>
        </button>
      </div>

      {/* 1. Search Field */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
          SEARCH PIECES
        </label>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search by title, style..."
            className="w-full bg-surface border border-border py-3 pl-10 pr-9 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
          />
          <Search
            size={16}
            className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-secondary transition-colors"
          />
        </div>
      </div>

      {/* 2. Categories Filter */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
          CATEGORIES
        </label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                cat.active
                  ? "bg-title text-white border-l-4 border-secondary"
                  : "text-gray-600 hover:text-title hover:bg-surface"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 ${
                  cat.active
                    ? "bg-secondary text-title font-extrabold"
                    : "text-gray-400 bg-gray-100"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Filter */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
          PRICE RANGE
        </label>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              className={`w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                range.active
                  ? "bg-secondary/15 border-secondary text-title font-extrabold"
                  : "border-border text-gray-600 hover:border-title"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 flex-shrink-0 bg-surface border border-border p-6 shadow-sm self-start sticky top-28">
        {content}
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div
            className="relative z-10 w-4/5 max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            data-lenis-prevent
          >
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <h3 className="text-xs uppercase tracking-[0.25em] font-extrabold text-title">
                  FILTER ARCHIVE
                </h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-gray-500 hover:text-title cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-border mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3.5 bg-title text-white text-xs font-extrabold uppercase tracking-widest hover:bg-secondary hover:text-title transition-all"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
