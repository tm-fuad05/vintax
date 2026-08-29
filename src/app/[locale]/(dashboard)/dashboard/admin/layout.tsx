"use client";

import { useState } from "react";
import AdminSidebar from "@/component/dashboard/AdminSidebar";
import AdminHeader from "@/component/dashboard/AdminHeader";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <AdminHeader
        collapsed={collapsed}
        onMenuClick={() => setMobileOpen(true)}
      />
      <main
        className={`pt-24 pb-12 px-4 sm:px-6 min-h-screen transition-all duration-300 ml-0 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

