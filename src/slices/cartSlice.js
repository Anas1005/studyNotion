// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { type } from '@testing-library/user-event/dist/type';

const initialState = {
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  totalSum: localStorage.getItem('totalSum') ? parseFloat(localStorage.getItem('totalSum')) : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a course to the cart
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      console.log("Price:",typeof(action.payload.price),action.payload.price)
      state.totalSum += Number(action.payload.price);
      updateLocalStorage(state); // Update local storage
    },
    
    // Remove a course from the cart
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(course => course._id === action.payload);
      if (index !== -1) {
        state.totalSum -= Number(state.cart[index].price);
        state.cart.splice(index, 1);
        updateLocalStorage(state); // Update local storage
      }
    },
    
    // Clear the entire cart
    clearCart: state => {
      state.cart = [];
      state.totalSum = 0;
      updateLocalStorage(state); // Update local storage
    },
  },
});

const updateLocalStorage = state => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('totalSum', state.totalSum.toString());
};

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
