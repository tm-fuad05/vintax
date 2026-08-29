"use client";

import { Bell, Search, ShieldCheck, Menu } from "lucide-react";

export default function AdminHeader({
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
      <div className="flex items-center gap-3">
        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg bg-surface border border-border/60 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        {/* Left Search Bar */}
        <div className="relative w-44 sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-surface border border-border/80 rounded-full py-2 pl-10 pr-4 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick System Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[11px] font-mono">
          <ShieldCheck size={14} />
          <span>System Live</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-full bg-surface border border-border/60 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-border/60">
          <div className="w-9 h-9 rounded-full bg-title text-secondary flex items-center justify-center font-bold text-xs border border-secondary/40 shadow-sm">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-xs font-bold text-foreground leading-tight">Admin User</h4>
            <p className="text-[10px] font-mono text-muted-foreground">Super Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

