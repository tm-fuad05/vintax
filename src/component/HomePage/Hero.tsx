"use client";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("HomePage.Hero");
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between items-center w-11/12 mx-auto py-20">
      {/* Content */}
      <div className="flex flex-col gap-6">
        <h1 className="text-8xl text-title font-black uppercase">
          {t("titleTop")}{" "}
          <span className="text-primary">{t("titleMiddle")}</span>{" "}
          {t("titleBottom")}
        </h1>
        <p className="w-11/12 leading-relaxed text-paragraph text-xl font-medium">
          {t("description")}
        </p>
        {/* Button */}
        <div className="flex gap-5">
          <button className="bg-primary px-10 py-6 rounded-[25px] font-medium text-white text-xl hover:bg-primary/80 cursor-pointer duration-200 shadow-[0_0_4px_var(--primary)] uppercase">
            {t("ctaPrimary")}
          </button>
          <button className="bg-white border-2 border-gray-200 px-10 py-4 rounded-[25px] font-medium text-title text-xl hover:opacity-50 cursor-pointer duration-200 uppercase">
            {t("ctaSecondary")}
          </button>
        </div>
      </div>
      {/* Image */}
      <div className="relative w-full h-200">
        <div className="absolute z-20 right-10 bottom-10 rounded-2xl backdrop-blur-lg border- bg-white/10 border border-gray-300/60 px-6 py-4 space-y-2">
          <p className="uppercase text-white">New Drop</p>
          <p className="capitalize text-white font-bold text-xl">
            azure oversize tee
          </p>
        </div>
        <img
          src={"/heromodel.jpg"}
          alt="Model"
          className="w-full h-full object-top object-cover rounded-3xl"
        />
      </div>
    </div>
  );
}
