import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, remove } from "../store/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment(item._id));
  };

  const handleDecrement = () => {
    dispatch(decrement(item._id));
  };

  const handleRemove = () => {
    dispatch(remove(item._id));
  };
  return (
    <div className="cart-item">
      <img src={item.image} alt="ok" className="cart-item__img" />
      <div className="cart-item__content">
        <span className="cart-item__brand">{item.brand}</span>
        <span className="cart-item__name">{item.name}</span>
        <span className="cart-item__price">${item.price}</span>
        <span className="cart-item__left-quantity">Còn lại: {item.quantity}</span>
        <div className="cart-item__bottom">
          <div className="cart-item__bottom-left">
            <button className="cart-item__btn" onClick={handleDecrement}>
              -
            </button>
            <span> {item.selectedQuantity}</span>
            <button className="cart-item__btn" onClick={handleIncrement}>
              +
            </button>
          </div>
          <div className="cart-item__bottom-right">
            <span className="cart-item__total-price">${item.price * item.selectedQuantity}</span>
            <button className="cart-item__remove" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
