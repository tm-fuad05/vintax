"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PackageCheck,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const stats = [
  {
    title: "Total Revenue",
    value: "৳ 1,482,900",
    change: "+14.2%",
    isPositive: true,
    icon: DollarSign,
    desc: "vs last month",
  },
  {
    title: "Total Orders",
    value: "384",
    change: "+8.7%",
    isPositive: true,
    icon: ShoppingBag,
    desc: "vs last month",
  },
  {
    title: "Active Customers",
    value: "1,240",
    change: "+22.4%",
    isPositive: true,
    icon: Users,
    desc: "vs last month",
  },
  {
    title: "Conversion Rate",
    value: "3.48%",
    change: "-0.5%",
    isPositive: false,
    icon: TrendingUp,
    desc: "vs last month",
  },
];

const recentOrders = [
  {
    id: "#ORD-9482",
    customer: "Tanvir Rahman",
    date: "2026-08-29",
    amount: "৳ 18,500",
    status: "Processing",
    items: "Velvet Couture Jacket x1",
  },
  {
    id: "#ORD-9481",
    customer: "Nafisa Anjum",
    date: "2026-08-29",
    amount: "৳ 32,000",
    status: "Delivered",
    items: "Leather Handbag x1, Silk Scarf x2",
  },
  {
    id: "#ORD-9480",
    customer: "Sabbir Hossain",
    date: "2026-08-28",
    amount: "৳ 12,400",
    status: "Delivered",
    items: "Archival Sneakers x1",
  },
  {
    id: "#ORD-9479",
    customer: "Farhana Islam",
    date: "2026-08-28",
    amount: "৳ 7,800",
    status: "Pending",
    items: "Vintax Noir T-Shirt x2",
  },
];

const topProducts = [
  { name: "Vintax Archival Leather Jacket", sales: 142, revenue: "৳ 497,000" },
  { name: "Luxury Monogram Crossbody", sales: 98, revenue: "৳ 313,600" },
  { name: "Atelier Handcrafted Sneakers", sales: 86, revenue: "৳ 215,000" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-title text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl border border-secondary/20">
        <div className="absolute right-0 top-0 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary font-bold">
            Atelier Control Center
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, Admin 👋
          </h1>
          <p className="text-xs text-white/70 font-mono">
            Here is your sales performance & store overview for today.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-secondary text-title font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors duration-200"
          >
            Visit Live Store
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
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
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span
                    className={`flex items-center font-bold ${
                      stat.isPositive ? "text-emerald-600" : "text-rose-500"
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.desc}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders (2 Cols) */}
        <div className="lg:col-span-2 bg-surface border border-border/70 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Recent Orders</h2>
              <p className="text-xs font-mono text-muted-foreground">
                Latest customer purchases requiring management
              </p>
            </div>
            <button className="text-xs font-mono font-bold text-secondary hover:underline flex items-center gap-1">
              View All <ExternalLink size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-background/50 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-foreground">{order.id}</td>
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-foreground">{order.customer}</div>
                      <div className="text-[10px] text-muted-foreground">{order.items}</div>
                    </td>
                    <td className="py-3.5 px-2 font-bold text-foreground">{order.amount}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === "Delivered"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                            : order.status === "Processing"
                            ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                            : "bg-blue-500/10 text-blue-600 border border-blue-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Products (1 Col) */}
        <div className="bg-surface border border-border/70 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-base font-bold text-foreground">Top Products</h2>
            <p className="text-xs font-mono text-muted-foreground">Highest revenue items this month</p>
          </div>

          <div className="space-y-4">
            {topProducts.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-secondary uppercase">
                    Rank #{index + 1}
                  </span>
                  <h4 className="text-xs font-bold text-foreground leading-tight line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-mono text-muted-foreground">
                    {item.sales} units sold
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-foreground">{item.revenue}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button className="w-full py-2.5 bg-title text-white hover:bg-secondary hover:text-title text-xs font-bold uppercase tracking-wider rounded-lg transition-colors font-mono">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
