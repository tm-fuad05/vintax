"use client";

import { Bell, Heart, Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function UserHeader({
  collapsed,
  onMenuClick,
}: {
  collapsed: boolean;
  onMenuClick?: () => void;
}) {
  return (
    <header
      className={`fixed top-0 right-0 z-30 h-20 bg-background/80 backdrop-blur-md border-b border-border/60 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 left-0 ${
        collapsed ? "lg:left-20" : "lg:left-64"
      }`}
    >
      {/* Left Menu & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg bg-surface border border-border/60 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <h2 className="text-xs sm:text-sm font-bold text-foreground font-mono uppercase tracking-wider">
          Client Portal
        </h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Wishlist */}
        <Link
          href="/dashboard/user/wishlist"
          className="p-2.5 rounded-full bg-surface border border-border/60 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
          title="Wishlist"
        >
          <Heart size={18} />
        </Link>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-full bg-surface border border-border/60 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-border/60">
          <div className="w-9 h-9 rounded-full bg-secondary text-title flex items-center justify-center font-bold text-xs shadow-sm">
            US
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-bold text-foreground leading-tight">Customer Account</h4>
            <p className="text-[10px] font-mono text-muted-foreground">Premium Client</p>
          </div>
        </div>
      </div>
    </header>
  );
}

