"use client";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Moon, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BsHeartFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { SignedOut } from "@clerk/nextjs";

import Logo from "./logo";

const Navbar = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("Navbar");

  const navLinks = [
    { label: t("home"), href: "/platform" },
    { label: t("shop"), href: "/solutions" },
    { label: t("categories"), href: "/enterprise" },
    { label: t("community"), href: "/docs" },
  ];

  const toggleLang = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    document.documentElement.lang = nextLocale;
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };
  if (pathname === "/sign-up" || pathname === "/sign-in") return null;

  return (
    <nav className="fixed z-50 w-full bg-white border-b border-gray-200">
      {/* Container: Glassmorphism with Primary Tint */}
      <div className="relative w-11/12 mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* 1. Logo Section */}
            <Logo />

            {/* 2. Navigation - Matching Hero Accent */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-5 py-2 text-sm font-bold text-paragraph transition-all duration-300 rounded-full hover:text-primary hover:bg-primary/5 active:scale-95"
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Right Actions Section */}
          <div className="flex items-center gap-2 ">
            <div className="lg:flex items-center gap-1 hidden">
              <button className="flex p-2 items-center justify-center rounded-full text-paragraph transition-all hover:bg-primary/10 hover:text-primary uppercase font-bold text-xs cursor-pointer">
                <BsHeartFill size={18} />
              </button>
              <button className=" relative flex p-2 items-center justify-center  rounded-full text-paragraph transition-all hover:bg-primary/10 hover:text-primary uppercase font-bold text-xs cursor-pointer">
                <p className="absolute top-1 right-0 bg-primary w-4 h-4 rounded-full text-white flex items-center justify-center">
                  5
                </p>
                <FaShoppingBag size={18} />
              </button>
            </div>
            <div className="mx-2 h-6 w-px bg-primary/10 hidden lg:block" />
            <div className="flex items-center gap-1">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="flex p-2 items-center justify-center gap-1.5 rounded-full text-paragraph transition-all hover:bg-primary/10 hover:text-primary uppercase font-bold text-xs cursor-pointer"
              >
                <Globe size={16} />
                <span>{locale === "en" ? "bn" : "en"}</span>
              </button>

              {/* Theme Toggle */}
              <button className="flex p-2 items-center justify-center rounded-full text-paragraph transition-all hover:bg-primary/10 hover:text-primary cursor-pointer">
                <Moon size={16} />
              </button>
            </div>

            <div className="mx-2 h-6 w-px bg-primary/10 hidden md:block" />

            {/* Auth Buttons - Matching Hero Style */}
            <SignedOut>
              {" "}
              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="hidden sm:block">
                  <button className="px-4 py-2 text-sm font-bold text-foreground transition-all hover:text-primary">
                    {t("login")}
                  </button>
                </Link>

                <Link href="/sign-up" className="hidden sm:block">
                  <button className="relative group overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-black text-white transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95">
                    <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                      {t("getStarted")}
                    </span>
                  </button>
                </Link>
              </div>
            </SignedOut>

            {/* Mobile Menu */}
            <button className="lg:hidden flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/10">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
