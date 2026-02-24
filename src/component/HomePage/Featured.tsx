"use client";
import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Featured() {
  const t = useTranslations("HomePage.Categories");

  const categories = [
    {
      id: "men",
      name: t("men"),
      img: "/featured/men.jpg",
    },
    {
      id: "women",
      name: t("women"),
      img: "/featured/women.jpg",
    },
    {
      id: "sneakers",
      name: t("sneakers"),
      img: "/featured/sneakers.jpg",
    },
    {
      id: "accessories",
      name: t("accessories"),
      img: "/featured/accessories.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-11/12 mx-auto">
        <div className="flex max-sm:flex-col justify-between items-center max-sm:items-start gap-5 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase">
            {t("title")} <span className="text-primary">{t("subtitle")}</span>
          </h2>
          <button className="text-xl lg:text-2xl font-semibold flex gap-2 items-center group pr-4 text-primary">
            View All{" "}
            <span>
              {" "}
              <MoveRight className="group-hover:translate-x-2 duration-200" />{" "}
            </span>{" "}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={
                "group relative p-10 rounded-[2.5rem] border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all overflow-hidden cursor-pointer h-100"
              }
            >
              {/* Bg Image */}
              <div
                style={{
                  backgroundImage: `url(${cat.img})`,
                }}
                className="absolute z-0 inset-0 group-hover:scale-120 group-active:scale-120 duration-300 bg-cover bg-top"
              />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 to-transparent" />
              <div className="absolute z-10 bottom-8 text-white">
                <h3 className="text-2xl font-bold ">{cat.name}</h3>
                <p className="text-white/60 text-sm mt-1">
                  100+ {t("itemCount")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
