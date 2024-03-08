import Cart from "../components/Cart/Cart";
import OrderForm from "../components/OrderForm/OrderForm";

const ShoppingCart = () => {
  return (
    <main>
      <section>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <OrderForm />
          <Cart />
        </div>
      </section>
    </main>
  );
};

export default ShoppingCart;
