"use client";

import { useState } from "react";
import { Grid3X3, LayoutGrid, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { ShopCard, ShopProduct } from "./ShopCard";

interface ProductGridProps {
  products: ShopProduct[];
  totalProductsCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  onAddToCart?: (product: ShopProduct) => void;
}

export const ProductGrid = ({
  products,
  totalProductsCount,
  sortBy,
  onSortChange,
  onResetFilters,
  onAddToCart,
}: ProductGridProps) => {
  const [gridColumns, setGridColumns] = useState<3 | 4>(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex-1 space-y-8">
      {/* Top Controls Toolbar Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border p-4 shadow-sm">
        {/* Results Counter */}
        <div className="text-xs uppercase tracking-widest font-extrabold text-title">
          SHOWING{" "}
          <span className="text-secondary font-mono">
            {currentProducts.length}
          </span>{" "}
          OF <span className="font-mono">{products.length}</span> PIECES
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
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-white border border-border px-3 py-2 text-xs font-bold text-title uppercase tracking-wider focus:outline-none focus:border-secondary cursor-pointer"
            >
              <option value="newest">NEWEST ARRIVALS</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="rating">HIGHEST RATED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            gridColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-8`}
        >
          {currentProducts.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface border border-border p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-title/5 border border-border flex items-center justify-center mx-auto text-gray-400">
            <SlidersHorizontal size={24} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
              NO MATCH FOUND
            </span>
            <h3 className="text-2xl font-extrabold uppercase text-title">
              NO ARCHIVAL PIECES MATCH YOUR CRITERIA
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Try adjusting your category, price range, or search terms to
              discover items from the collection.
            </p>
          </div>

          <button
            onClick={onResetFilters}
            className="px-8 py-3.5 bg-title text-white text-xs font-extrabold uppercase tracking-widest hover:bg-secondary hover:text-title transition-all cursor-pointer"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="flex items-center gap-2 px-5 py-3 border border-border bg-surface text-xs font-bold uppercase tracking-wider text-title hover:border-secondary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>PREVIOUS</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-xs font-extrabold border transition-all cursor-pointer ${
                    isActive
                      ? "bg-title text-white border-title shadow-md"
                      : "bg-surface border-border text-gray-600 hover:border-secondary"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="flex items-center gap-2 px-5 py-3 border border-border bg-surface text-xs font-bold uppercase tracking-wider text-title hover:border-secondary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
