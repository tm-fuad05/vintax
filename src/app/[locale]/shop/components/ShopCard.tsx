"use client";

import { useState } from "react";
import { ArrowUpRight, ShoppingBag, Heart, Star } from "lucide-react";

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  image: string;
  size: string;
  color: string;
  dateAdded: string;
}

interface ShopCardProps {
  product: ShopProduct;
  onAddToCart?: (product: ShopProduct) => void;
}

export const ShopCard = ({ product, onAddToCart }: ShopCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  return (
    <div className="group relative bg-surface border border-border flex flex-col justify-between overflow-hidden cursor-pointer hover:border-secondary/60 transition-all duration-500 shadow-sm hover:shadow-xl">
      {/* Product Image Container */}
      <div className="relative h-[320px] w-full overflow-hidden bg-title/10">
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
          onClick={toggleWishlist}
          aria-label="Add to Wishlist"
          className={`absolute top-4 right-4 z-10 w-9 h-9 border backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? "bg-secondary border-secondary text-title"
              : "bg-title/40 border-white/20 text-white hover:bg-secondary hover:border-secondary hover:text-title"
          }`}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-secondary">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500">
              <Star size={12} className="text-secondary fill-secondary" />
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
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-mono">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <span className="text-xs uppercase tracking-widest text-secondary font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              DETAILS <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Sharp ADD TO BAG Button */}
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-full py-3 bg-title hover:bg-secondary text-white hover:text-title font-extrabold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer border border-title hover:border-secondary shadow-sm active:scale-[0.99]"
          >
            <ShoppingBag size={14} />
            <span>ADD TO BAG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
