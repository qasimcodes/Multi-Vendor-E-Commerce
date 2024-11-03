import { createSlice } from "@reduxjs/toolkit";

import { calculateSubtotal, updateLocalStorage } from '../../functions/cartFunc'

export const initialState = {
  loading: false,
  error: null,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  shipping: JSON.parse(localStorage.getItem("shipping")) ?? Number(299.99),
  subtotal: localStorage.getItem("cartItems") ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems"))) : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cartItems.find((item) => item.id === payload.id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) => (item.id === existingItem.id ? payload : item));
      } else {
        state.cartItems = [...state.cartItems, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cartItems);
      state.subtotal = Number(calculateSubtotal(state.cartItems));
    },

    cartItemRemoval: (state, { payload }) => {
      state.cartItems = [...state.cartItems].filter((item) => item.id !== payload);
      updateLocalStorage(state.cartItems); 
      state.subtotal = Number(calculateSubtotal(state.cartItems));
      state.loading = false;
      state.error = null;
    },

    setShippingCosts: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem("shipping", payload);
    },

    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shipping");
      localStorage.removeItem("subTotal");
      state.cartItems = [];
      state.shipping = Number(299.99);
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
  },
});


export const { setError, setLoading, cartItemAdd, cartItemRemoval, setShippingCosts, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;