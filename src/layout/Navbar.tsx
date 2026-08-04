"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Moon, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BsHeartFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

import Logo from "../component/shared/logo";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("Navbar");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect whether scrolled past top threshold
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart direction tracking:
      // When at top (<= 30), always show transparent navbar
      if (currentScrollY <= 30) {
        setIsVisible(true);
      } else {
        // If scrolling UP: hide navbar (-translate-y-full)
        if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        } else {
          // If scrolling DOWN: show navbar with dark background
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("shop"), href: "/solutions" },
    { label: t("categories"), href: "/enterprise" },
    { label: t("community"), href: "/docs" },
  ];

  const toggleLang = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    document.documentElement.lang = nextLocale;
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  const transparentPaths = ["/"];
  const isTransparentPath = transparentPaths.includes(pathname);
  const isTransparent = isTransparentPath && !isScrolled;

  const hiddenPath = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ];
  const isHiddenNavbar = hiddenPath.includes(pathname);

  if (isHiddenNavbar) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isTransparent
          ? "bg-transparent border-transparent py-5"
          : "bg-title/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
      }`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* 1. Logo Section */}
        <div className="flex items-center gap-6">
          <Logo isDark={true} />

          {/* 2. Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs uppercase tracking-[0.2em] font-bold text-white/90 hover:text-secondary hover:bg-white/10 transition-all duration-300 rounded-full cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Right Actions Section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1">
            <button
              aria-label="Wishlist"
              className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
            >
              <BsHeartFill size={16} />
            </button>
            <Link
              href="/shopping-cart"
              className="relative p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
            >
              <span className="absolute top-1 right-1 bg-secondary text-title text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                5
              </span>
              <FaShoppingBag size={16} />
            </Link>
          </div>

          <div className="mx-2 h-5 w-px bg-white/20 hidden lg:block" />

          <div className="flex items-center gap-1">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 uppercase font-bold text-xs cursor-pointer transition-all"
            >
              <Globe size={15} />
              <span>{locale === "en" ? "BN" : "EN"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              aria-label="Toggle Theme"
              className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
            >
              <Moon size={15} />
            </button>
          </div>

          <div className="mx-2 h-5 w-px bg-white/20 hidden md:block" />

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="hidden sm:block">
                <button className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white/90 hover:text-secondary transition-all cursor-pointer">
                  {t("login") || "LOGIN"}
                </button>
              </Link>

              <Link href="/sign-up" className="hidden sm:block">
                <button className="bg-secondary text-title hover:bg-white hover:text-title px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg active:scale-95">
                  {t("getStarted") || "GET STARTED"}
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={async () => await authClient.signOut()}
              className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white/90 hover:text-red-400 transition-all cursor-pointer"
            >
              {t("logout") || "LOGOUT"}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden flex size-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-secondary hover:text-title transition-all">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
