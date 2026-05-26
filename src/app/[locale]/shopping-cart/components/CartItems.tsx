import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface CartItem {
  id: string;
  name: string;
  series: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "VINTAX OVERSIZED HOODIE",
    series: "Limited Edition Core Series",
    size: "XL",
    color: "Acid Wash",
    price: 120.0,
    quantity: 1,
    image: "/hoodie.jpg", // আপনার ইমেজের পাথ দিন
  },
  {
    id: "2",
    name: "GRAPHITE TEE",
    series: "280GSM Heavyweight Cotton",
    size: "M",
    color: "Graphite",
    price: 55.0,
    quantity: 1,
    image: "/tee.jpg",
  },
  {
    id: "3",
    name: "STREET CARGO PANTS",
    series: "Multi-pocket Utility Series",
    size: "32",
    color: "Olive",
    price: 95.0,
    quantity: 1,
    image: "/pants.jpg",
  },
];

export default async function CartItems() {
  const t = await getTranslations("Cart.CartItems");
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center pb-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase">
          {t("title")}
        </h2>
        <h5 className="text-gray-500 font-medium">
          {t("items-length", { count: cartItems.length })}{" "}
        </h5>
      </div>
      <div className="h-px w-full bg-gray-300 mb-5" />
      <div className="w-full space-y-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start gap-6 border-b border-slate-100 pb-8 last:border-0"
          >
            {/* Product Image */}
            <div className="relative bg-[#F8F9FA] rounded-2xl p-4 w-full sm:w-40 h-48 flex items-center justify-center overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={140}
                className="object-contain mix-blend-multiply mix-blend-darken"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between h-full w-full py-1">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5">{item.series}</p>

                  {/* Specs */}
                  <div className="flex gap-4 mt-4 text-sm">
                    <p className="text-slate-400">
                      Size:{" "}
                      <span className="font-semibold text-slate-800">
                        {item.size}
                      </span>
                    </p>
                    <p className="text-slate-400">
                      Color:{" "}
                      <span className="font-semibold text-slate-800">
                        {item.color}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Price */}
                <span className="font-bold text-xl text-slate-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Actions (Quantity & Remove) */}
              <div className="flex justify-between items-center mt-8 w-full">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between border border-slate-200 rounded-full px-3 py-1.5 w-24 bg-white shadow-sm">
                  <button className="text-slate-400 hover:text-slate-800 transition">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.quantity}
                  </span>
                  <button className="text-slate-400 hover:text-slate-800 transition">
                    <Plus size={14} />
                  </button>
                </div>

                {/* Remove Button */}
                <button className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase hover:text-red-500 transition-colors">
                  <Trash2
                    size={14}
                    className="text-slate-300 hover:text-red-400"
                  />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
