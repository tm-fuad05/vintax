"use client";

import { useState } from "react";
import { Grid3X3, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { ShopCard, ShopProduct } from "./ShopCard";

interface ProductGridProps {
  products: ShopProduct[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);

  return (
    <div className="flex-1 space-y-8">
      {/* Top Controls Toolbar Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border p-4 shadow-sm">
        {/* Results Counter */}
        <div className="text-xs uppercase tracking-widest font-extrabold text-title">
          SHOWING <span className="text-secondary font-mono">{products.length}</span> OF{" "}
          <span className="font-mono">{products.length}</span> PIECES
        </div>

        {/* Right Actions: View Mode & Sort Dropdown */}
        <div className="flex items-center gap-4">
          {/* Grid Layout Toggle */}
          <div className="hidden md:flex items-center gap-1 border border-border p-1 bg-white">
            <button
              onClick={() => setGridColumns(3)}
              aria-label="3 Columns View"
              className={`p-1.5 transition-all cursor-pointer ${
                gridColumns === 3
                  ? "bg-title text-white"
                  : "text-gray-400 hover:text-title"
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              aria-label="4 Columns View"
              className={`p-1.5 transition-all cursor-pointer ${
                gridColumns === 4
                  ? "bg-title text-white"
                  : "text-gray-400 hover:text-title"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 hidden sm:inline">
              SORT BY:
            </span>
            <select className="bg-white border border-border px-3 py-2 text-xs font-bold text-title uppercase tracking-wider focus:outline-none focus:border-secondary cursor-pointer">
              <option value="newest">NEWEST ARRIVALS</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="rating">HIGHEST RATED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          gridColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-8`}
      >
        {products.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t border-border pt-8">
        <button className="flex items-center gap-2 px-5 py-3 border border-border bg-surface text-xs font-bold uppercase tracking-wider text-title hover:border-secondary transition-all cursor-pointer">
          <ChevronLeft size={16} />
          <span>PREVIOUS</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 text-xs font-extrabold border bg-title text-white border-title shadow-md cursor-pointer">
            1
          </button>
          <button className="w-10 h-10 text-xs font-extrabold border bg-surface border-border text-gray-600 hover:border-secondary cursor-pointer">
            2
          </button>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 border border-border bg-surface text-xs font-bold uppercase tracking-wider text-title hover:border-secondary transition-all cursor-pointer">
          <span>NEXT</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
