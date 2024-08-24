const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt="ok" className="cart-item__img" />
      <div className="cart-item__content">
        <span className="cart-item__brand">{item.brand}</span>
        <span className="cart-item__name">{item.name}</span>
        <span className="cart-item__price">${item.price * item.selectedQuantity}</span>
        <span className="cart-item__left-quantity">Còn lại: {item.quantity}</span>
        <div className="cart-item__quantity">
          <button className="cart-item__btn">-</button>
          <span> {item.selectedQuantity}</span>
          <button className="cart-item__btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
