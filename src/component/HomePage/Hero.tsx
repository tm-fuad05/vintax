"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  tag: string;
  titleTop: string;
  titleMiddle: string;
  titleBottom: string;
  subtitle: string;
  image: string;
}

export default function Hero() {
  const t = useTranslations("HomePage.Hero");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      tag: "SPRING / SUMMER 2026",
      titleTop: t("titleTop") || "THE LUXURY",
      titleMiddle: t("titleMiddle") || "ARCHIVE",
      titleBottom: t("titleBottom") || "COLLECTION",
      subtitle:
        "Experience unprecedented elegance with handcrafted signature silhouettes.",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "EXCLUSIVE RUNWAY",
      titleTop: "TIMELESS",
      titleMiddle: "MINIMALISM",
      titleBottom: "STATEMENT",
      subtitle:
        "Clean cuts and neutral palettes designed for subtle royal aesthetics.",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "LIMITED EDITION",
      titleTop: "HERITAGE",
      titleMiddle: "ROYAL",
      titleBottom: "COUTURE",
      subtitle:
        "Bespoke tailoring and sustainable luxury fabrics for the modern connoisseur.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    },
  ];

  // Continuous Autoplay timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full min-h-screen bg-title overflow-hidden">
      {/* Background Image Carousel with Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.titleTop}
            className="w-full h-full object-cover object-top filter brightness-[0.55] contrast-[1.05] scale-105 transition-transform duration-[8000ms]"
          />
          {/* Luxury Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-title via-title/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-title/90 via-title/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Text Content Container */}
      <div className="relative z-10 w-11/12  mx-auto h-full flex flex-col justify-between pt-32 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl space-y-6 my-auto"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-10 bg-secondary" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-secondary">
                {currentSlide.tag}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              {currentSlide.titleTop}{" "}
              <span className="text-secondary italic font-serif font-normal">
                {currentSlide.titleMiddle}
              </span>{" "}
              <br />
              {currentSlide.titleBottom}
            </h1>

            {/* Description Paragraph */}
            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light max-w-xl leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Sharp Edged Box Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button className="bg-secondary text-title px-9 py-4 font-semibold text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-title transition-all duration-300 cursor-pointer border border-secondary">
                {t("ctaPrimary") || "SHOP COLLECTION"}
              </button>
              <button className="bg-transparent text-white px-9 py-4 font-semibold text-sm tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all duration-300 border border-white/40 cursor-pointer backdrop-blur-sm">
                {t("ctaSecondary") || "EXPLORE LOOKBOOK"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Bar */}
        <div className="w-full flex items-center justify-between pointer-events-auto pt-6">
          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-[3px] transition-all duration-500 cursor-pointer ${
                  currentIndex === index
                    ? "w-14 bg-secondary"
                    : "w-8 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Previous & Next Control Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-11 h-11 border border-white/20 bg-title/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-title transition-all duration-300 cursor-pointer active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-11 h-11 border border-white/20 bg-title/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-title transition-all duration-300 cursor-pointer active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
