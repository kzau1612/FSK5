import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  },
  reducers: {
    addCart: (state, action) => {
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
    increment: (state, action) => {
      state.cart.map((item) => {
        if (item._id === action.payload) {
          item.selectedQuantity += 1;
          item.quantity -= 1;
        }
      });

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrement: (state, action) => {
      state.cart.map((item) => {
        if (item._id === action.payload) {
          if (item.selectedQuantity === 1 && confirm("Bạn có muốn xóa sản phẩm này?") === true) {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
            return;
          } else if (item.selectedQuantity > 1) {
            item.selectedQuantity -= 1;
            item.quantity += 1;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    remove: (state, action) => {
      if (confirm("Bạn có muốn xóa sản phẩm này?") === true) {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        return;
      }
    },
    removeAll: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addCart, increment, decrement, remove, removeAll } = cartSlice.actions;
