import Item from "./Item";
import { AppContext } from "../App";
import { useContext } from "react";

const ListItem = () => {
  const { products } = useContext(AppContext);

  return (
    <ul className="list">
      {products.map((product, index) => (
        <Item key={product._id || index} product={product} index={index} />
      ))}
    </ul>
  );
};

export default ListItem;
