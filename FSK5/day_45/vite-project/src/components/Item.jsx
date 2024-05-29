import { AppContext } from "../App";
import { useContext } from "react";

const Item = ({ product, index }) => {
  const { setCartItems } = useContext(AppContext);

  const addToCart = () => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);

      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1, totalQuantity: item.totalQuantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, totalQuantity: 1 }];
    });
  };
  return (
    <li className="item" key={index}>
      <img src={product.image} alt="image" className="item-img" />
      <h3 className="item-name">{product.name}</h3>
      <div className="row">
        <span className="item-price">{product.price}</span>
        <button className="item-btn" onClick={addToCart}>
          Add to cart!
        </button>
      </div>
    </li>
  );
};

export default Item;
