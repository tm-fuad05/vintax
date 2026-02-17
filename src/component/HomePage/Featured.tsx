"use client";
import { useTranslations } from "next-intl";
import { Laptop, Smartphone, Headphones, Watch } from "lucide-react";

export default function Featured() {
  const t = useTranslations("HomePage.Categories");

  const categories = [
    { id: "laptop", name: t("laptop"), icon: <Laptop size={32} /> },
    { id: "phone", name: t("phone"), icon: <Smartphone size={32} /> },
    { id: "audio", name: t("audio"), icon: <Headphones size={32} /> },
    { id: "gadgets", name: t("gadgets"), icon: <Watch size={32} /> },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-16 tracking-tighter uppercase">
          {t("title")} <span className="text-primary">{t("subtitle")}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative p-10 rounded-[2.5rem] border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all overflow-hidden cursor-pointer"
            >
              <div className="relative z-10">
                <div className="size-14 rounded-2xl bg-background flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/10 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-paragraph text-sm mt-1">
                  100+ {t("itemCount")}
                </p>
              </div>
              <div className="absolute -right-6 -bottom-6 text-primary/5 group-hover:text-primary/10 transition-colors">
                {cat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
