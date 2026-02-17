"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const ProductFeed = () => {
  const t = useTranslations("HomePage.ProductFeed");
  const [active, setActive] = useState(t("tabNew"));

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
            {t("title")} <span className="text-secondary">{t("subtitle")}</span>
          </h2>

          <div className="flex p-2 bg-primary/5 rounded-xl border border-primary/10 backdrop-blur-sm">
            {[t("tabNew"), t("tabBest")].map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-8 py-3 rounded-lg text-sm font-black transition-all ${
                  active === tab
                    ? "bg-primary text-white shadow-xl shadow-primary/20 "
                    : "text-paragraph hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] rounded-[2.5rem] bg-primary/5 border border-dashed border-primary/20 flex flex-col items-center justify-center group cursor-pointer hover:border-primary transition-colors"
            >
              <div className="text-primary/20 group-hover:text-primary/40 font-black text-xl uppercase tracking-widest">
                Product {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
