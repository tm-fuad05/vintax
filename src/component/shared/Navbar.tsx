"use client";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Moon, Menu, Command } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const Navbar = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const navLinks = [
    { label: t("Platform"), href: "/platform" },
    { label: t("Solutions"), href: "/solutions" },
    { label: t("Enterprise"), href: "/enterprise" },
    { label: t("Docs"), href: "/docs" },
  ];

  const toggleLang = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    document.documentElement.lang = nextLocale;
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  return (
    <nav className="fixed z-50 top-6 inset-x-0 mx-auto w-11/12 md:w-10/12">
      {/* Container: Glassmorphism with Primary Tint */}
      <div className="relative rounded-2xl border border-primary/20 bg-background/80 px-4 py-3 backdrop-blur-xl shadow-[0_8px_30px_rgba(37,99,235,0.1)]">
        <div className="flex items-center justify-between">
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-2 group px-2">
            <Image src={"/logo/logo.png"} alt="Vintax" width={100} height={0} />
          </Link>

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

          {/* 3. Right Actions Section */}
          <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block">
                <button className="px-4 py-2 text-sm font-bold text-foreground transition-all hover:text-primary">
                  Log In
                </button>
              </Link>

              <Link href="/signup" className="hidden sm:block">
                <button className="relative group overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-black text-white transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                  </span>
                </button>
              </Link>
            </div>

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
