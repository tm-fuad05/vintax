"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Truck, Lock, HelpCircle } from "lucide-react";

export default function OrderSummary() {
  const t = useTranslations("Cart.OrderSummary");
  const [promo, setPromo] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promo.trim().length > 0) {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Luxury Dark Summary Card */}
      <div className="bg-title text-white border border-border p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-extrabold text-lg uppercase tracking-[0.2em] text-white">
              {t("title") || "ORDER SUMMARY"}
            </h2>
            <span className="text-xs font-mono text-secondary font-bold">
              CAD / USD
            </span>
          </div>

          {/* Promo Code Input */}
          <div className="space-y-2">
            <label className="block text-[10px] font-semibold tracking-[0.25em] text-secondary uppercase">
              {t("promo") || "PROMO CODE / GIFT VOUCHER"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="ENTER CODE"
                className="flex-1 bg-surface border border-white/20 px-4 py-3 text-xs text-black placeholder:text-black/40 font-mono tracking-wider focus:outline-none focus:border-secondary transition-colors"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-secondary text-title hover:bg-white hover:text-title font-extrabold text-xs uppercase tracking-widest px-5 py-3 transition-colors duration-300 cursor-pointer"
              >
                APPLY
              </button>
            </div>
            {discountApplied && (
              <p className="text-[11px] text-secondary font-mono">
                ✓ PROMO CODE APPLIED (-$50.00)
              </p>
            )}
          </div>

          {/* Pricing Breakdown List */}
          <div className="space-y-3.5 text-xs font-mono border-t border-b border-white/10 py-5">
            <div className="flex justify-between text-gray-400">
              <span>{t("sub-total") || "SUBTOTAL"}</span>
              <span className="text-white font-semibold">$1,650.00</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between text-secondary">
                <span>{t("discount") || "DISCOUNT"}</span>
                <span>-$50.00</span>
              </div>
            )}

            <div className="flex justify-between text-gray-400">
              <span>{t("shipping") || "EXPRESS SHIPPING"}</span>
              <span className="text-white font-semibold">$25.00</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>{t("estimated-tax") || "ESTIMATED TAX"}</span>
              <span className="text-white font-semibold">$45.00</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-baseline pt-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                {t("total") || "TOTAL"}
              </span>
              <p className="text-[10px] text-gray-400 font-mono">
                TAX & DUTIES INCLUDED
              </p>
            </div>
            <span className="text-3xl font-black text-white tracking-tight font-mono">
              ${discountApplied ? "1,670.00" : "1,720.00"}
            </span>
          </div>

          {/* Checkout CTA Button */}
          <button className="w-full py-4 bg-secondary text-title hover:bg-white hover:text-title font-extrabold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-xl group/btn border border-secondary">
            <span>{t("checkout") || "PROCEED TO CHECKOUT"}</span>
            <ArrowRight
              size={15}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </button>

          {/* Trust Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck size={16} className="text-secondary" />
              <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                AUTHENTIC
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={16} className="text-secondary" />
              <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                EXPRESS SHIP
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Lock size={16} className="text-secondary" />
              <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                ENCRYPTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Concierge Help Line */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-mono hover:text-title cursor-pointer transition-colors duration-300">
        <HelpCircle size={14} className="text-secondary" />
        <span>{t("help") || "Need help with your atelier order?"}</span>
      </div>
    </div>
  );
}
