import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import "../assets/scss/Cart.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartPage;
