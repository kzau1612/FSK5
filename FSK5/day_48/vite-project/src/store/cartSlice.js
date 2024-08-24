import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  },
  reducers: {
    addCart: (state, action) => {
      // console.log(action.payload);
      const item = state.cart.some((item) => item._id === action.payload._id);
      if (!item) {
        state.cart.push({ ...action.payload, selectedQuantity: 1, quantity: action.payload.quantity - 1 });
      } else {
        state.cart.map((item) => {
          if (item._id === action.payload._id) {
            item.selectedQuantity += 1;
            item.quantity -= 1;
          }
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addCart } = cartSlice.actions;
