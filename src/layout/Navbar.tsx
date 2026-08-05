"use client";

import { useState, useEffect, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Package,
  Search,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BsHeartFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

import Logo from "../component/shared/logo";
import SmallLoader from "@/component/shared/SmallLoader";
import { authClient } from "@/lib/auth-client";
import MobileLogo from "@/component/shared/MobileLogo";

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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(
    null,
  );
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY <= 30) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const categoryMenus = [
    {
      id: "men",
      label: "MEN",
      subTitle: "Archival Tailoring & Menswear",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      items: [
        { name: "Shirts", href: "/shop?cat=men-shirts" },
        { name: "Pants & Trousers", href: "/shop?cat=men-pants" },
        { name: "Traditional Panjabi", href: "/shop?cat=men-panjabi" },
        { name: "Outerwear & Trench", href: "/shop?cat=men-outerwear" },
        { name: "Leather Shoes", href: "/shop?cat=men-shoes" },
        { name: "Bespoke Suits", href: "/shop?cat=men-suits" },
      ],
    },
    {
      id: "women",
      label: "WOMEN",
      subTitle: "Haute Couture & Heritage Attire",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      items: [
        { name: "Three Piece", href: "/shop?cat=women-three-piece" },
        { name: "Designer Saree", href: "/shop?cat=women-saree" },
        { name: "Salwar Kameez", href: "/shop?cat=women-salwar-kameez" },
        { name: "Gowns & Dresses", href: "/shop?cat=women-gowns" },
        { name: "Heels & Footwear", href: "/shop?cat=women-shoes" },
        { name: "Luxury Handbags", href: "/shop?cat=women-bags" },
      ],
    },
    {
      id: "sneakers",
      label: "SNEAKERS",
      subTitle: "Street Identity Footwear",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      items: [
        { name: "Men's Sneakers", href: "/shop?cat=sneakers-men" },
        { name: "Women's Sneakers", href: "/shop?cat=sneakers-women" },
        { name: "Archival Low-Tops", href: "/shop?cat=sneakers-low-top" },
        { name: "High-Top Silhouettes", href: "/shop?cat=sneakers-high-top" },
        { name: "Limited Edition Drops", href: "/shop?cat=sneakers-limited" },
      ],
    },
    {
      id: "accessories",
      label: "ACCESSORIES",
      subTitle: "Statement Atelier Goods",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      items: [
        { name: "Chrono Timepieces", href: "/shop?cat=acc-watches" },
        { name: "Sculptural Eyewear", href: "/shop?cat=acc-eyewear" },
        { name: "Leather Wallets & Belts", href: "/shop?cat=acc-leather" },
        { name: "Jewelry & Rings", href: "/shop?cat=acc-jewelry" },
        { name: "Haute Fragrances", href: "/shop?cat=acc-fragrance" },
      ],
    },
  ];

  const isShoppingCartPage = pathname === "/shopping-cart";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          isTransparent
            ? "bg-transparent border-transparent py-2.5"
            : "bg-title/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5"
        }`}
      >
        <div className="w-11/12 mx-auto">
          {/* ========================================================================= */}
          {/* 1. SCROLLED STATE NAVBAR (Compact Bar: Logo + Category Links + Quick Icons) */}
          {/* ========================================================================= */}
          {isScrolled ? (
            <div className="flex items-center justify-between gap-6 animate-in fade-in duration-300">
              {/* Left Logo */}
              <div className="scale-90 sm:scale-100 origin-left flex-shrink-0">
                <div className="block sm:hidden">
                  <MobileLogo />
                </div>
                <div className="hidden sm:block">
                  <Logo isDark={true} />
                </div>
              </div>

              {/* Center Category Links with Hover Mega-Menus */}
              <div className="hidden lg:flex items-center gap-10">
                {categoryMenus.map((cat) => {
                  const isHovered = activeHoverCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onMouseEnter={() => setActiveHoverCategory(cat.id)}
                      onMouseLeave={() => setActiveHoverCategory(null)}
                      className="relative py-1 cursor-pointer group"
                    >
                      <Link
                        href={`/shop?cat=${cat.id}`}
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-white/90 group-hover:text-secondary transition-colors duration-300"
                      >
                        <span>{cat.label}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${
                            isHovered
                              ? "rotate-180 text-secondary"
                              : "text-white/50"
                          }`}
                        />
                      </Link>

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                          isHovered ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />

                      {/* Mega Menu Dropdown */}
                      {isHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-title/95 backdrop-blur-2xl border border-secondary/30 p-6 shadow-2xl z-50 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="col-span-7 space-y-3">
                            <div className="border-b border-white/10 pb-2">
                              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary flex items-center gap-1.5">
                                <Sparkles size={12} />
                                {cat.subTitle}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="group/sub flex items-center justify-between p-2 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
                                >
                                  <span className="text-xs font-bold text-gray-200 group-hover/sub:text-secondary uppercase tracking-wider transition-colors">
                                    {sub.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-5 relative h-48 rounded-sm overflow-hidden border border-white/10 group/img">
                            <img
                              src={cat.image}
                              alt={cat.label}
                              className="w-full h-full object-cover filter brightness-90 group-hover/img:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-title via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-secondary block">
                                EXPLORE COLLECTION
                              </span>
                              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                                VINTAX {cat.label} ARCHIVE
                              </h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Far Right Quick Action Icons (Search, Wishlist, Cart, User Avatar) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  {/* Search Icon */}
                  <button
                    onClick={() => setShowSearchModal((prev) => !prev)}
                    aria-label="Search"
                    className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <Search size={18} />
                  </button>

                  {/* Wishlist Icon */}
                  <button
                    aria-label="Wishlist"
                    className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <BsHeartFill size={16} />
                  </button>

                  {/* Shopping Bag Icon */}
                  <Link
                    href="/shopping-cart"
                    className={`relative p-2.5 rounded-full hover:text-secondary hover:bg-white/10 transition-all cursor-pointer ${
                      isShoppingCartPage
                        ? "text-secondary bg-white/10"
                        : "text-white/90"
                    }`}
                  >
                    <span className="absolute top-1 right-1 bg-secondary text-title text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                      5
                    </span>
                    <FaShoppingBag size={16} />
                  </Link>
                </div>

                {/* User Avatar / Login Icon */}
                {isPending ? (
                  <SmallLoader size={18} color="text-secondary" />
                ) : user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/10 transition-all cursor-pointer group"
                      aria-label="User menu"
                    >
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-7 h-7 lg:w-10 lg:h-10 rounded-full object-cover border border-secondary group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-secondary text-title font-extrabold flex items-center justify-center text-xs uppercase border border-secondary shadow-md group-hover:scale-105 transition-transform">
                          {user.name ? user.name.charAt(0) : "U"}
                        </div>
                      )}
                      <ChevronDown
                        size={14}
                        className={`text-white/80 transition-transform duration-300 ${
                          userMenuOpen ? "rotate-180 text-secondary" : ""
                        }`}
                      />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-title border border-white/10 shadow-2xl py-2 z-50 backdrop-blur-xl">
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-xs font-extrabold uppercase text-white truncate">
                            {user.name || "ATELIER MEMBER"}
                          </p>
                          <p className="text-[10px] text-gray-400 font-mono truncate">
                            {user.email}
                          </p>
                        </div>

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
                ) : (
                  <Link href="/sign-in" aria-label="Sign in">
                    <button
                      className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
                      aria-label="Sign in"
                    >
                      <UserIcon size={18} />
                    </button>
                  </Link>
                )}

                {/* Mobile Drawer Toggle */}
                <button
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label="Toggle mobile menu"
                  className="lg:hidden flex size-9 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-secondary hover:text-title transition-all cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* 2. TOP OF PAGE NAVBAR (Full 2-Tier Header: Top Bar + Category Bar) */
            /* ========================================================================= */
            <div className="space-y-0 lg:space-y-3 animate-in fade-in duration-300">
              {/* Top Tier: Logo, Search Bar, Actions, Auth */}
              <div className="flex items-center justify-between gap-6">
                <div className="scale-90 sm:scale-100 origin-left">
                  <div className="block sm:hidden">
                    <MobileLogo />
                  </div>
                  <div className="hidden sm:block">
                    <Logo isDark={true} />
                  </div>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
                  <input
                    type="text"
                    placeholder="Search archive, products, categories..."
                    className="w-full bg-surface border border-white/20 py-2.5 pl-10 pr-4 rounded-full text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 shadow-inner transition-all duration-300"
                  />
                  <Search
                    size={15}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary group-focus-within:text-secondary transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1">
                    {/* Search Icon for Mobile/All screens */}
                    <button
                      onClick={() => setShowSearchModal((prev) => !prev)}
                      aria-label="Search"
                      className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer md:hidden"
                    >
                      <Search size={18} />
                    </button>

                    <button
                      aria-label="Wishlist"
                      className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <BsHeartFill size={16} />
                    </button>

                    <Link
                      href="/shopping-cart"
                      className={`relative p-2.5 rounded-full hover:text-secondary hover:bg-white/10 transition-all cursor-pointer ${
                        isShoppingCartPage
                          ? "text-secondary bg-white/10"
                          : "text-white/90"
                      }`}
                    >
                      <span className="absolute top-1 right-1 bg-secondary text-title text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                        5
                      </span>
                      <FaShoppingBag size={16} />
                    </Link>
                  </div>

                  <div className="mx-1 h-5 w-px bg-white/20 hidden lg:block" />

                  <button
                    onClick={toggleLang}
                    className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 uppercase font-bold text-xs cursor-pointer transition-all"
                  >
                    <Globe size={15} />
                    <span>{locale === "en" ? "BN" : "EN"}</span>
                  </button>

                  <div className="mx-1 h-5 w-px bg-white/20 hidden md:block" />

                  {isPending ? (
                    <div className="px-3 py-1.5 flex items-center justify-center">
                      <SmallLoader size={18} color="text-secondary" />
                    </div>
                  ) : !user ? (
                    <div className="flex items-center gap-2">
                      <Link href="/sign-in">
                        <button
                          className="p-2.5 rounded-full text-white/90 hover:text-secondary hover:bg-white/10 transition-all cursor-pointer sm:hidden"
                          aria-label="Sign in"
                        >
                          <UserIcon size={18} />
                        </button>
                        <button className="hidden sm:block px-3 py-2 text-xs font-extrabold uppercase tracking-widest text-white/90 hover:text-secondary transition-all cursor-pointer">
                          {t("login") || "LOGIN"}
                        </button>
                      </Link>

                      <Link href="/sign-up" className="hidden sm:block">
                        <button className="bg-secondary text-title hover:bg-white hover:text-title px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg active:scale-95">
                          {t("getStarted") || "GET STARTED"}
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all cursor-pointer group"
                        aria-label="User menu"
                      >
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-7 h-7 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-secondary group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-secondary text-title font-extrabold flex items-center justify-center text-xs uppercase border border-secondary shadow-md group-hover:scale-105 transition-transform">
                            {user.name ? user.name.charAt(0) : "U"}
                          </div>
                        )}
                        <ChevronDown
                          size={14}
                          className={`text-white/80 transition-transform duration-300 ${
                            userMenuOpen ? "rotate-180 text-secondary" : ""
                          }`}
                        />
                      </button>

                      {userMenuOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-title border border-white/10 shadow-2xl py-2 z-50 backdrop-blur-xl">
                          <div className="px-4 py-2 border-b border-white/10">
                            <p className="text-xs font-extrabold uppercase text-white truncate">
                              {user.name || "ATELIER MEMBER"}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono truncate">
                              {user.email}
                            </p>
                          </div>

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

                  <button
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle mobile menu"
                    className="lg:hidden flex size-9 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-secondary hover:text-title transition-all cursor-pointer"
                  >
                    {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </button>
                </div>
              </div>

              {/* Bottom Tier: Category Links Bar (Desktop Only) */}
              <div className="hidden lg:flex items-center justify-center gap-10 border-t border-white/10 pt-2.5">
                {categoryMenus.map((cat) => {
                  const isHovered = activeHoverCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onMouseEnter={() => setActiveHoverCategory(cat.id)}
                      onMouseLeave={() => setActiveHoverCategory(null)}
                      className="relative py-1 cursor-pointer group"
                    >
                      <Link
                        href={`/shop?cat=${cat.id}`}
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-white/90 group-hover:text-secondary transition-colors duration-300"
                      >
                        <span>{cat.label}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${
                            isHovered
                              ? "rotate-180 text-secondary"
                              : "text-white/50"
                          }`}
                        />
                      </Link>

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                          isHovered ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                      />

                      {/* Mega Menu Dropdown */}
                      {isHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-title/95 backdrop-blur-2xl border border-secondary/30 p-6 shadow-2xl z-50 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="col-span-7 space-y-3">
                            <div className="border-b border-white/10 pb-2">
                              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary flex items-center gap-1.5">
                                <Sparkles size={12} />
                                {cat.subTitle}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="group/sub flex items-center justify-between p-2 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
                                >
                                  <span className="text-xs font-bold text-gray-200 group-hover/sub:text-secondary uppercase tracking-wider transition-colors">
                                    {sub.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-5 relative h-48 rounded-sm overflow-hidden border border-white/10 group/img">
                            <img
                              src={cat.image}
                              alt={cat.label}
                              className="w-full h-full object-cover filter brightness-90 group-hover/img:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-title via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-secondary block">
                                EXPLORE COLLECTION
                              </span>
                              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                                VINTAX {cat.label} ARCHIVE
                              </h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Luxury Quick Search Bar Modal Overlay */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-title/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-300">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setShowSearchModal(false)}
          />

          {/* Search Box Window */}
          <div className="relative z-10 w-full max-w-2xl bg-title border border-secondary/50 p-6 shadow-2xl space-y-4 rounded-sm animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-secondary" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-secondary">
                  ARCHIVAL SEARCH
                </span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Type to search archive, products, categories..."
                className="w-full bg-surface border border-secondary/40 py-3.5 pl-11 pr-10 text-sm text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary font-medium tracking-wide shadow-inner"
              />
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
        </div>
      )}

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
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <MobileLogo />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-secondary cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar in Mobile Drawer */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-surface border border-white/15 py-2.5 pl-9 pr-4 text-xs text-title placeholder:text-title/40 focus:outline-none focus:border-secondary"
            />
            <Search
              size={14}
              className="absolute top-1/2 -translate-y-1/2 left-3 text-secondary"
            />
          </div>

          {/* Mobile Category Navigation Accordion */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold text-secondary uppercase tracking-[0.25em]">
              CATEGORIES
            </p>
            <div className="space-y-2">
              {categoryMenus.map((cat) => {
                const isExpanded = expandedMobileCategory === cat.id;
                return (
                  <div key={cat.id} className="border-b border-white/10 pb-2">
                    <button
                      onClick={() =>
                        setExpandedMobileCategory(isExpanded ? null : cat.id)
                      }
                      className="w-full flex items-center justify-between py-2 text-xs font-black uppercase tracking-widest text-white hover:text-secondary cursor-pointer"
                    >
                      <span>{cat.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isExpanded
                            ? "rotate-180 text-secondary"
                            : "text-white/50"
                        }`}
                      />
                    </button>

                    {/* Accordion Sub-links */}
                    {isExpanded && (
                      <div className="flex flex-col space-y-1.5 py-3 pl-4">
                        {cat.items.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-3 text-xs font-bold text-white/80 hover:text-secondary uppercase tracking-wider transition-colors duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User / Auth Section in Mobile Drawer */}
          {user && (
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-semibold text-secondary uppercase tracking-[0.25em]">
                ATELIER MEMBER
              </p>
              <div className="space-y-3 bg-white/5 p-4 border border-white/10">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-5 h-5 rounded-full object-cover border-2 border-secondary"
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
                    className="flex items-center gap-2 text-xs font-bold uppercase text-white/90 hover:text-secondary py-1.5"
                  >
                    <UserIcon size={14} className="text-secondary" />
                    <span>PROFILE</span>
                  </Link>
                  <Link
                    href="/shopping-cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-white/90 hover:text-secondary py-1.5"
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
                    className="flex items-center gap-2 text-xs font-bold uppercase text-red-400 hover:text-red-300 py-1.5 cursor-pointer w-full text-left"
                  >
                    <LogOut size={14} />
                    <span>LOG OUT</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Drawer Footer */}
        </div>
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-gray-400 font-mono">
            © 2026 VINTAX ARCHIVE • HAUTE COUTURE
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
