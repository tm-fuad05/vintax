import { ArrowRight, ShieldCheck, Truck, HelpCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function OrderSummary() {
  const t = await getTranslations("Cart.OrderSummary");
  return (
    <div className="w-full max-w-md">
      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h2 className="font-black text-xl text-slate-900 uppercase tracking-wide mb-6">
          {t("title")}
        </h2>

        {/* Promo Code Input */}
        <div className="mb-8">
          <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            {t("promo")}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 bg-[#F1F3F6] border-0 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            />
            <button className="bg-[#0B1220] hover:bg-slate-800 text-white font-semibold text-xs tracking-wide px-5 py-3 rounded-xl transition-all duration-200 active:scale-95">
              Apply
            </button>
          </div>
        </div>

        {/* Pricing List */}
        <div className="space-y-4 text-sm font-medium border-b border-slate-100 pb-6 mb-6">
          <div className="flex justify-between text-slate-400">
            <span>{t("sub-total")}</span>
            <span className="text-slate-800">$325.00</span>
          </div>
          <div className="flex justify-between text-[#10B981]">
            <span>{t("discount")}</span>
            <span>-$20.00</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{t("shipping")}</span>
            <span className="text-slate-800">$15.00</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{t("estimated-tax")}</span>
            <span className="text-slate-800">$24.50</span>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-baseline mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {t("total")}
          </span>
          <span className="text-[32px] font-black text-slate-900 tracking-tight">
            $344.50
          </span>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm tracking-wide py-4 px-6 rounded-2xl inline-flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_24px_rgba(37,99,235,0.3)] active:scale-[0.98] uppercase">
          {t("checkout")}
          <ArrowRight size={16} />
        </button>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-slate-50 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck size={16} className="text-slate-400" />
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
              Authentic
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Truck size={16} className="text-slate-400" />
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
              Global Ship
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck size={16} className="text-slate-400" />
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
              Secure
            </span>
          </div>
        </div>
      </div>

      {/* Help Link */}
      <div className="flex items-center justify-center gap-1.5 mt-6 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer transition">
        <HelpCircle size={14} />
        <span> {t("help")} </span>
      </div>
    </div>
  );
}
