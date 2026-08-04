"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import Logo from "../component/shared/logo";

const Footer = () => {
  const pathname = usePathname();
  const t = useTranslations("Footer");

  const hiddenPath = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ];
  const isHiddenFooter = hiddenPath.some((p) => p === pathname);

  if (isHiddenFooter) return null;

  const collections = [
    "Men's Couture",
    "Women's Collection",
    "Footwear Archive",
    "Luxury Accessories",
    "Seasonal Drops",
  ];

  const brandLinks = [
    "Our Heritage",
    "Archival Care",
    "Sustainability",
    "Runway & Press",
    "Privacy Policy",
  ];

  return (
    <footer className="relative w-full bg-title text-white border-t border-border overflow-hidden">
      {/* Subtle Ambient Light Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="w-11/12  mx-auto pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-border/60">
          {/* 1. Brand & Newsletter Column (5 Columns) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <Link href="/" className="inline-block group">
              <Logo isDark={true} />
            </Link>

            <p className="text-white/90 text-sm leading-relaxed max-w-md font-light">
              {t("description") ||
                "Crafting the future of luxury streetwear and archival couture. Timeless silhouettes, handcrafted with precision."}
            </p>

            {/* Newsletter Container */}
            <div className="space-y-4 pt-2">
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-secondary" />
                <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                  {t("newsletterTitle") || "JOIN THE VINTAX INSIDER"}
                </h4>
              </div>

              <div className="relative max-w-md">
                <div className="relative flex items-center bg-white/10 border border-white/20 focus-within:border-secondary transition-colors duration-300">
                  <Mail className="absolute left-4 text-secondary" size={18} />
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent py-4 pl-12 pr-36 text-xs text-white placeholder:text-white/50 font-mono tracking-wider focus:outline-none"
                  />
                  <button className="absolute right-1.5 inset-y-1.5 px-5 bg-secondary text-title hover:bg-white hover:text-title transition-colors duration-300 font-extrabold text-[11px] uppercase tracking-widest flex items-center gap-1.5 cursor-pointer">
                    <span>{t("subscribe") || "JOIN"}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              <p className="text-white/70 text-[11px] font-mono">
                {t("newsletterDesc") ||
                  "Receive private drop invitations and seasonal lookbook previews."}
              </p>
            </div>
          </motion.div>

          {/* 2. Collections Column (2 Columns) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-white">
              {t("shop") || "COLLECTIONS"}
            </h4>
            <ul className="space-y-3.5">
              {collections.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-xs text-white/90 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-[1px] bg-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Heritage & Brand Column (2 Columns) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-white">
              {t("company") || "ATELIER"}
            </h4>
            <ul className="space-y-3.5">
              {brandLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-xs text-white/90 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-[1px] bg-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. Support & Concierge Column (3 Columns) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            <h4 className="text-xs font-extrabold uppercase tracking-[0.25em] text-white">
              {t("support") || "CONCIERGE"}
            </h4>

            <div className="space-y-3 text-xs text-white/90 font-light">
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-secondary flex-shrink-0" />
                <span>Atelier: Dhaka • Paris • Tokyo</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-secondary flex-shrink-0" />
                <span>VIP Concierge: +880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={15} className="text-secondary flex-shrink-0" />
                <span>Worldwide Express Shipping</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80 mb-3">
                FOLLOW ARCHIVE
              </p>
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Youtube, label: "Youtube" },
                ].map(({ Icon, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-title hover:bg-secondary hover:border-secondary transition-all duration-300 active:scale-95"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright & Payment Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/80 font-mono">
          <p>© 2026 VINTAX ATELIER. {t("rights") || "ALL RIGHTS RESERVED."}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[11px] font-bold text-white/90 tracking-widest uppercase">
              <span className="hover:text-secondary transition-colors">
                VISA
              </span>
              <span>•</span>
              <span className="hover:text-secondary transition-colors">
                MASTERCARD
              </span>
              <span>•</span>
              <span className="hover:text-secondary transition-colors">
                AMEX
              </span>
              <span>•</span>
              <span className="hover:text-secondary transition-colors">
                APPLE PAY
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
