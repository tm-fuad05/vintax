"use client";
import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";

export const FlashDeals = () => {
  const t = useTranslations("HomePage.FlashDeals");

  return (
    <section>
      <div>
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary p-10 md:p-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md mb-6">
                <Zap size={14} fill="white" /> {t("badge")}
              </span>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] uppercase mb-6">
                {t("titleMain")} <br />{" "}
                <span className="opacity-50">{t("titleSub")}</span>
              </h2>
              <p className="text-white/80 text-lg font-medium">{t("desc")}</p>
            </div>

            <div className="flex gap-4 md:gap-8">
              {["hours", "mins", "secs"].map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="size-20 md:size-28 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl md:text-5xl font-black text-white shadow-2xl">
                    00
                  </div>
                  <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase mt-4 tracking-[0.2em]">
                    {t(unit)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
