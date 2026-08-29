"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Heart,
  Award,
  Clock,
  ChevronRight,
  Package,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const userStats = [
  {
    title: "Total Orders",
    value: "12 Orders",
    icon: ShoppingBag,
    desc: "Lifetime purchases",
  },
  {
    title: "In Transit",
    value: "1 Package",
    icon: Truck,
    desc: "Estimated delivery tomorrow",
  },
  {
    title: "Saved Wishlist",
    value: "8 Items",
    icon: Heart,
    desc: "Saved for later",
  },
  {
    title: "Atelier Points",
    value: "2,450 PTS",
    icon: Award,
    desc: "Tier: Gold Member",
  },
];

const activeOrder = {
  id: "#ORD-9482",
  item: "Velvet Couture Jacket - Midnight Black",
  size: "L",
  date: "August 28, 2026",
  estimatedDelivery: "August 30, 2026",
  status: "Shipped",
  steps: [
    { label: "Order Placed", done: true },
    { label: "Processing", done: true },
    { label: "Shipped", done: true },
    { label: "Out for Delivery", done: false },
    { label: "Delivered", done: false },
  ],
};

const recentHistory = [
  {
    id: "#ORD-9120",
    date: "July 14, 2026",
    price: "৳ 32,000",
    status: "Delivered",
    items: "Leather Handbag, Silk Scarf",
  },
  {
    id: "#ORD-8840",
    date: "May 02, 2026",
    price: "৳ 12,400",
    status: "Delivered",
    items: "Archival Sneakers",
  },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-title text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl border border-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary font-bold">
            Client Atelier Overview
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Hello, Welcome Back ✨
          </h1>
          <p className="text-xs text-white/70 font-mono">
            Track your ongoing shipments, review past orders and manage your account details.
          </p>
        </div>
        <div className="relative z-10">
          <Link
            href="/"
            className="px-5 py-2.5 bg-secondary text-title font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors duration-200 inline-block"
          >
            Explore Collections
          </Link>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {userStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-surface border border-border/70 p-5 rounded-xl space-y-3 shadow-sm hover:border-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Shipment Tracker & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Order Tracker (2 Cols) */}
        <div className="lg:col-span-2 bg-surface border border-border/70 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">
                Active Order Tracking
              </span>
              <h2 className="text-base font-bold text-foreground">{activeOrder.id}</h2>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 rounded-full text-xs font-mono font-bold">
              {activeOrder.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-background border border-border/60">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-foreground">{activeOrder.item}</h4>
              <p className="text-[11px] font-mono text-muted-foreground">
                Size: {activeOrder.size} • Ordered on {activeOrder.date}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-muted-foreground block">
                Estimated Delivery
              </span>
              <span className="text-xs font-bold font-mono text-secondary">
                {activeOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Shipment Progress
            </h4>
            <div className="grid grid-cols-5 gap-2 text-center relative">
              {activeOrder.steps.map((step, i) => (
                <div key={step.label} className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step.done
                        ? "bg-secondary text-title font-bold shadow"
                        : "bg-background border border-border text-muted-foreground"
                    }`}
                  >
                    {step.done ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <span className="text-[10px] font-mono text-foreground leading-tight">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Past Orders (1 Col) */}
        <div className="bg-surface border border-border/70 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-border/60 pb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Order History</h2>
            <Link
              href="/dashboard/user/orders"
              className="text-xs font-mono font-bold text-secondary hover:underline flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentHistory.map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-xl bg-background border border-border/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-foreground">
                    {order.id}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{order.items}</p>
                <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-border/30 text-muted-foreground">
                  <span>{order.date}</span>
                  <span className="font-bold text-foreground">{order.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
