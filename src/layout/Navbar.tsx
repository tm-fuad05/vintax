"use client";

import { useState, useEffect, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Globe,
  Moon,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Package,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BsHeartFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

import Logo from "../component/shared/logo";
import SmallLoader from "@/component/shared/SmallLoader";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const t = useTranslations("Navbar");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: t("shop"), href: "/shop" },
    { label: t("categories"), href: "/enterprise" },
    { label: t("community"), href: "/docs" },
  ];

  const toggleLang = () => {
    const nextLocale = locale === "en" ? "bn" : "en";
    document.documentElement.lang = nextLocale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const transparentPaths = ["/", "/shop"];
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          isTransparent
            ? "bg-transparent border-transparent py-5"
            : "bg-title/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
        }`}
      >
        <div className="w-11/12 mx-auto flex items-center justify-between">
          {/* 1. Logo Section */}
          <div className="flex items-center gap-6 scale-90 sm:scale-100 origin-left">
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

            {/* Desktop Language Switcher & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-1">
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

            {/* Auth / User Profile Avatar Section */}
            {isPending ? (
              <div className="px-3 py-1.5 flex items-center justify-center">
                <SmallLoader size={18} color="text-secondary" />
              </div>
            ) : !user ? (
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
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all cursor-pointer group"
                  aria-label="User menu"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-9 h-9 rounded-full object-cover border-2 border-secondary group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-secondary text-title font-extrabold flex items-center justify-center text-xs uppercase border border-secondary shadow-md group-hover:scale-105 transition-transform">
                      {user.name
                        ? user.name.charAt(0)
                        : user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <ChevronDown
                    size={14}
                    className={`text-white/80 transition-transform duration-300 ${
                      userMenuOpen ? "rotate-180 text-secondary" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-title border border-white/10 shadow-2xl py-2 z-50 backdrop-blur-xl">
                    {/* User Meta */}
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-extrabold uppercase text-white truncate">
                        {user.name || "ATELIER MEMBER"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:bg-white/10 hover:text-secondary transition-all"
                      >
                        <UserIcon size={14} className="text-secondary" />
                        <span>PROFILE</span>
                      </Link>

                      <Link
                        href="/shopping-cart"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:bg-white/10 hover:text-secondary transition-all"
                      >
                        <Package size={14} className="text-secondary" />
                        <span>MY ORDERS</span>
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-white/10 pt-1">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false);
                          await authClient.signOut();
                          router.push("/");
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-white/10 transition-all cursor-pointer text-left"
                      >
                        <LogOut size={14} />
                        <span>LOG OUT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="lg:hidden flex size-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-secondary hover:text-title transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 w-4/5 max-w-sm h-full bg-title border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-lenis-prevent
      >
        <div className="space-y-8">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Logo isDark={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-secondary cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-secondary uppercase tracking-[0.25em] mb-3">
              NAVIGATION
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm font-extrabold uppercase tracking-widest text-white hover:text-secondary border-b border-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Quick Actions (Wishlist & Bag) */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold text-secondary uppercase tracking-[0.25em]">
              QUICK ACTIONS
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/shopping-cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-3 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-secondary hover:text-title transition-all"
              >
                <FaShoppingBag size={14} />
                <span>BAG (5)</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-3 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-secondary hover:text-title transition-all cursor-pointer"
              >
                <BsHeartFill size={14} />
                <span>WISHLIST</span>
              </button>
            </div>
          </div>

          {/* User / Auth Section in Mobile Drawer */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold text-secondary uppercase tracking-[0.25em]">
              ATELIER MEMBER
            </p>
            {!user ? (
              <div className="space-y-3">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  {t("login") || "SIGN IN"}
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 bg-secondary text-title font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                >
                  {t("getStarted") || "CREATE ACCOUNT"}
                </Link>
              </div>
            ) : (
              <div className="space-y-3 bg-white/5 p-4 border border-white/10">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-secondary"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary text-title font-black flex items-center justify-center text-xs uppercase">
                      {user.name
                        ? user.name.charAt(0)
                        : user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-extrabold text-white uppercase truncate">
                      {user.name || "ATELIER MEMBER"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-white/90 hover:text-secondary py-2"
                  >
                    <UserIcon size={14} className="text-secondary" />
                    <span>PROFILE</span>
                  </Link>
                  <Link
                    href="/shopping-cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-white/90 hover:text-secondary py-2"
                  >
                    <Package size={14} className="text-secondary" />
                    <span>MY ORDERS</span>
                  </Link>
                  <button
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await authClient.signOut();
                      router.push("/");
                    }}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-red-400 hover:text-red-300 py-2 cursor-pointer w-full text-left"
                  >
                    <LogOut size={14} />
                    <span>LOG OUT</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] text-gray-400 font-mono">
            © 2026 VINTAX ARCHIVE • HAUTE COUTURE
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
