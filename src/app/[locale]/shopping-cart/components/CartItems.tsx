"use client";

import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  series: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartItems() {
  const t = useTranslations("Cart.CartItems");

  const items: CartItem[] = [
    {
      id: "1",
      name: "ARCHIVAL LEATHER TRENCH",
      series: "Haute Couture Core Collection",
      size: "XL",
      color: "Obsidian Black",
      price: 895.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "OVERSIZED HEAVYWEIGHT HOODIE",
      series: "480GSM Vintage Cotton Series",
      size: "L",
      color: "Acid Washed Charcoal",
      price: 380.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "ATELIER SUEDE RUNNER",
      series: "Handcrafted Footwear Archive",
      size: "42 EU",
      color: "Warm Taupe",
      price: 375.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-title uppercase tracking-wider">
          {t("title") || "YOUR SELECTION"}
        </h2>
        <span className="text-xs font-mono font-bold text-secondary tracking-widest uppercase">
          {items.length} ITEMS
        </span>
      </div>

      {/* Cart List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-surface border border-border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-secondary/50 transition-all duration-300 shadow-sm"
          >
            {/* Product Image Box */}
            <div className="relative w-full sm:w-36 h-44 bg-title/10 overflow-hidden flex-shrink-0 border border-border">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details & Actions */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-title uppercase tracking-wider group-hover:text-secondary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    {item.series}
                  </p>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono">
                    <span className="text-gray-400">
                      SIZE:{" "}
                      <strong className="text-title font-semibold">
                        {item.size}
                      </strong>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400">
                      COLOR:{" "}
                      <strong className="text-title font-semibold">
                        {item.color}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Price */}
                <span className="font-black text-lg sm:text-xl text-title font-mono">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Bottom Bar: Quantity & Remove */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                {/* Quantity Counter */}
                <div className="flex items-center border border-border bg-background">
                  <button
                    aria-label="Decrease quantity"
                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-title hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono text-title">
                    {item.quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-title hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Remove Button */}
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase hover:text-red-500 transition-colors duration-300 cursor-pointer">
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
