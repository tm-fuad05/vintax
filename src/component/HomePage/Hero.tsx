"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-15 overflow-hidden bg-background">
      {/* 1. ডাইনামিক ব্যাকগ্রাউন্ড (Animated Gradient Mesh) */}
      <div className="absolute inset-0 z-0">
        {/* উপরের বড় ব্লু গ্লো */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px] animate-pulse" />
        {/* নিচের বড় ইন্ডিগো গ্লো */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px]" />
        {/* হালকা গ্রিড লাইন (Optional tech feel) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* ২. ব্যাজ - একটু বড় এবং গ্লসি */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8 backdrop-blur-md">
            <Sparkles size={16} className="animate-bounce" />
            <span className="uppercase tracking-[0.2em]">
              Next-Gen Technology
            </span>
          </div>

          {/* ৩. দানবীয় টাইটেল (Mega H1) */}
          <h1 className="max-w-5xl font-black tracking-tighter space-y-2 mb-8">
            <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl uppercase">
              {t("titlePart1")}
            </span>
            <span className="block text-4xl md:text-5xl lg:text-7xl pt-2 uppercase bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-text bg-clip-text text-transparent">
              {t("titlePart2")}
            </span>
          </h1>

          {/* ৪. প্যারাগ্রাফ - একটু বড় ও রিড্যাবল */}
          <p className="max-w-2xl text-paragraph text-lg md:text-xl mb-12 leading-relaxed opacity-90">
            {t("description")}
          </p>

          {/* ৫. সিটিএ বাটনস - বড় এবং প্রিমিয়াম */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="group relative px-10 py-5 bg-primary text-white font-black rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transition-all group-hover:hue-rotate-15" />
              <span className="relative flex items-center gap-3 text-lg uppercase tracking-wider">
                {t("ctaPrimary")}
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </span>
            </button>

            <button className="px-10 py-5 bg-transparent border-2 border-primary/30 text-foreground font-black rounded-full transition-all hover:bg-primary/5 hover:border-primary text-lg uppercase tracking-wider">
              {t("ctaSecondary")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
