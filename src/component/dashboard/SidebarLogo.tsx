import { Link } from "@/i18n/navigation";
import Logo from "../shared/logo";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarLogo({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  return (
    <div>
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10 relative">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <Logo isDark={true} />
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-full bg-secondary border border-secondary/40 text-title lg:flex items-center justify-center transition-colors absolute -right-3.5 top-1/2 -translate-y-1/2 shadow-lg cursor-pointer hidden"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </div>
  );
}
