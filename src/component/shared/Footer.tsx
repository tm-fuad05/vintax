"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Command,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="relative mt-20 bg-background overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 size-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* 1. Brand & Newsletter Section (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src={"/logo/logo.png"}
                alt="Vintax"
                width={150}
                height={0}
              />
            </Link>

            <p className="text-paragraph text-lg max-w-sm leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-4">
              <h4 className="text-foreground font-bold uppercase tracking-widest text-sm">
                {t("newsletterTitle")}
              </h4>
              <div className="relative max-w-md group">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 pl-12 pr-32 focus:outline-none focus:border-primary transition-all text-foreground"
                />
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-paragraph/50"
                  size={18}
                />
                <button className="absolute right-0 inset-y-0 bg-primary hover:bg-secondary text-white px-6 rounded-xl rounded-l-none font-bold text-sm transition-all flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/20">
                  {t("subscribe")}
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-paragraph/60 text-xs">{t("newsletterDesc")}</p>
            </div>
          </div>

          {/* 2. Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-foreground font-black uppercase tracking-tighter text-xl">
              {t("shop")}
            </h4>
            <ul className="space-y-4">
              {["Laptops", "Smartphones", "Accessories", "New Arrivals"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-paragraph hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="size-1.5 rounded-full bg-primary/40 mr-0 group-hover:mr-3 transition-all opacity-0 group-hover:opacity-100" />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* 3. Company & Legal (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-foreground font-black uppercase tracking-tighter text-xl">
              {t("company")}
            </h4>
            <ul className="space-y-4">
              {[
                "About Us",
                "Privacy Policy",
                "Terms of Service",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-paragraph hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Social (3 Columns) */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-foreground font-black uppercase tracking-tighter text-xl">
              {t("support")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-paragraph">
                <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <MapPin size={18} />
                </div>
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-4 text-paragraph">
                <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <Phone size={18} />
                </div>
                <span className="text-sm">+880 1234-567890</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="size-11 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-90"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-paragraph font-medium">
          <p>© 2026 VINTAX. {t("rights")}</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 grayscale opacity-50">
              <span className="font-black text-lg italic">VISA</span>
              <span className="font-black text-lg italic">MasterCard</span>
              <span className="font-black text-lg italic">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
