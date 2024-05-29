import { AppContext } from "../App";
import { useContext, useState, useEffect } from "react";

const Cart = () => {
  const { cartItems } = useContext(AppContext);

  return (
    <table className="cart">
      <thead>
        <tr>
          <th className="cart-title">Tên sản phẩm</th>
          <th className="cart-title">Số lượng</th>
          <th className="cart-title">Còn lại</th>
          <th className="cart-title">Tổng tiền</th>
        </tr>
      </thead>

      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td className="cart-item__name">{item.name}</td>
            <td>{item.totalQuantity}</td>
            <td>{item.quantity}</td>
            <td>{item.totalQuantity * item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cart;
