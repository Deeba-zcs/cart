import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cart: JSON.parse(localStorage.getItem("cart_items")) || [],
    uid: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      console.log("signin", state.currentUser);
      state.isLoggedIn = true;
      state.username = action.payload;
      state.uid = action.payload.id; 
    },
    
    register: (state, action) => {
      state.currentUser=(action.payload);
      state.isLoggedIn = true;
      state.username = action.payload;
      state.uid = action.payload.id; 
    },
    logout: (state) => {
      state.currentUser = [];
      state.isLoggedIn = false;
      state.username = null;
    },
    addToCart: (state, action) => {
      
      state.cart.push(action.payload);

      localStorage.setItem(state.uid, JSON.stringify(state.cart));  // Save cart items to Local Storage with the username as the key
    },
   increaseQuantity: (state, action) => {
      const productId = action.payload.id;
      if (state.cart[productId]) {
        state.cart[productId].quantity += 1;
        localStorage.setItem("cart_items", JSON.stringify(state.cart));
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload.id;
      if (state.cart[productId] && state.cart[productId].quantity > 0) {
        state.cart[productId].quantity -= 1;
        localStorage.setItem("cart_items", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload.id;
      if (state.cart[productId]) {
        delete state.cart[productId];
        localStorage.setItem("cart_items", JSON.stringify(state.cart));
      }
    },
  },
});

export const { login, logout, register,addToCart  } =registerSlice.actions;

export default registerSlice.reducer;
