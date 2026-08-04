"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  img: string;
}

export default function Featured() {
  const t = useTranslations("HomePage.Categories");

  const categories: CategoryItem[] = [
    {
      id: "men",
      name: t("men") || "MEN'S COUTURE",
      count: `120+ ${t("itemCount") || "ITEMS"}`,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "women",
      name: t("women") || "WOMEN'S COLLECTION",
      count: `150+ ${t("itemCount") || "ITEMS"}`,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "sneakers",
      name: t("sneakers") || "FOOTWEAR ARCHIVE",
      count: `85+ ${t("itemCount") || "ITEMS"}`,
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "accessories",
      name: t("accessories") || "LUXURY ACCESSORIES",
      count: `95+ ${t("itemCount") || "ITEMS"}`,
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full py-28 bg-background">
      <div className="w-11/12  mx-auto space-y-16">
        {/* Header Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-border pb-8"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
                CURATED SELECTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-title uppercase">
              {t("title") || "FEATURED"}{" "}
              <span className="text-secondary italic font-serif font-normal">
                {t("subtitle") || "CATEGORIES"}
              </span>
            </h2>
          </div>

          {/* Sharp Edged View All Link */}
          <button className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-title hover:text-secondary transition-colors duration-300 group cursor-pointer pb-1">
            VIEW ALL COLLECTIONS
            <ArrowUpRight
              size={16}
              className="text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </motion.div>

        {/* Categories Grid - Minimalist Sharp Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-[480px] w-full overflow-hidden bg-surface border border-border cursor-pointer"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Luxury Neutral Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-title/90 via-title/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Minimal Card Header Info */}
              <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
                <span className="text-[11px] tracking-[0.2em] font-mono text-white/70">
                  0{index + 1}
                </span>
                <span className="w-8 h-8 bg-title/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-secondary group-hover:border-secondary group-hover:text-title transition-all duration-300">
                  <ArrowUpRight size={14} />
                </span>
              </div>

              {/* Minimal Card Bottom Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-secondary">
                  {cat.count}
                </p>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-secondary transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
