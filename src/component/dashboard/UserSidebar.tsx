"use client";

import { useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  HelpCircle,
  LogOut,
  Shield,
  X,
} from "lucide-react";
import SidebarLogo from "./SidebarLogo";

const userNavItems = [
  { name: "My Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/user/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
  { name: "Address Book", href: "/dashboard/user/addresses", icon: MapPin },
  { name: "Account Profile", href: "/dashboard/user/profile", icon: User },
  { name: "Help & Support", href: "/dashboard/user/support", icon: HelpCircle },
];

export default function UserSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      {/* Mobile & Tablet Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-title text-white border-r border-white/10 transition-all duration-300 flex flex-col justify-between
          ${/* Desktop Behavior */ ""}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${/* Mobile & Tablet Drawer Behavior */ ""}
          w-64 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header / Logo */}
          <div className="relative">
            <SidebarLogo collapsed={collapsed} setCollapsed={setCollapsed} />
            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Member Badge */}
          <div
            className={`px-5 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between ${collapsed ? "lg:hidden" : ""}`}
          >
            <span className="text-[10px] font-mono tracking-widest text-secondary uppercase font-bold">
              VIP Atelier Member
            </span>
            <Shield size={14} className="text-secondary" />
          </div>

          {/* Links (Scrollable Area) */}

          <nav data-lenis-prevent className="p-3 space-y-1.5 overflow-y-auto">
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/user" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-xs font-mono tracking-wide transition-all duration-200 group ${
                    isActive
                      ? "bg-secondary text-title font-bold shadow-md"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-title" : "text-secondary"
                    }`}
                  />
                  <span className={`${collapsed ? "lg:hidden" : "block"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Logout / Back to Shop */}
          <div className="p-3 border-t border-white/10 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors w-full"
              title={collapsed ? "Back to Shop" : undefined}
            >
              <LogOut size={18} className="flex-shrink-0 text-secondary" />
              <span className={`${collapsed ? "lg:hidden" : "block"}`}>
                Back to Store
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
