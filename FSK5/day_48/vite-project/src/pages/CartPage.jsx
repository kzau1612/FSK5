import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { removeAll } from "../store/cartSlice";
import "../assets/scss/Cart.scss";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (confirm("Bạn có muốn thanh toán?")) dispatch(removeAll());
  };

  return (
    <div className="cart-page">
      <button className="back__btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      {cartItems.length !== 0 ? (
        <>
          <span className="total-price">Total Price: ${totalPrice}</span>
          <button onClick={handleSubmit} className="payment__btn">
            Thanh Toán
          </button>
        </>
      ) : (
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
      )}
    </div>
  );
};

export default CartPage;
