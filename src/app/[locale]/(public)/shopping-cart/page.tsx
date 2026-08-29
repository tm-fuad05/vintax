import CartItems from "./components/CartItems";
import OrderSummary from "./components/OrderSummary";

export default function ShoppingCart() {
  return (
    <div className="w-full min-h-screen bg-background pt-36 pb-28">
      <div className="w-11/12 mx-auto space-y-12">
        {/* Header & Stepper */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-secondary" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
                CHECKOUT PROCESS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-title uppercase">
              YOUR{" "}
              <span className="text-secondary italic font-serif font-normal">
                BAG
              </span>
            </h1>
          </div>

          {/* Checkout Steps Bar */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] uppercase tracking-[0.2em] font-mono">
            <span className="text-secondary font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-secondary text-title font-black flex items-center justify-center text-[10px]">
                01
              </span>
              BAG
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-border" />
            <span className="text-gray-400 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-surface border border-border text-gray-400 font-bold flex items-center justify-center text-[10px]">
                02
              </span>
              CHECKOUT
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-border" />
            <span className="text-gray-400 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-surface border border-border text-gray-400 font-bold flex items-center justify-center text-[10px]">
                03
              </span>
              CONFIRMATION
            </span>
          </div>
        </div>

        {/* Main Cart Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <section className="lg:col-span-7">
            <CartItems />
          </section>
          <section className="lg:col-span-5 lg:sticky lg:top-32">
            <OrderSummary />
          </section>
        </div>
      </div>
    </div>
  );
}
