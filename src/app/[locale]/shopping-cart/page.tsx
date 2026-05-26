import CartItems from "./components/CartItems";
import OrderSummary from "./components/OrderSummary";

export default function ShoppingCart() {
  return (
    <div className="grid grid-cols-5 justify-center gap-16  pt-40 w-11/12 mx-auto">
      <section className="col-span-3">
        <CartItems />
      </section>
      <section className="col-span-2">
        <OrderSummary />
      </section>
    </div>
  );
}
