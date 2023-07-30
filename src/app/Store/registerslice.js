import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cart: JSON.parse(localStorage.getItem("cart_items")) || [],
   
    username: null, // Add username to the initial state
    uid: null, // Add uid to the initial state
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
      state.uid = null;
    },
    addToCart: (state, action) => {
      const product = action.payload;
    },
   
    removeItem: (state, action) => {
      const product = action.payload;
    }

  },
});

export const { login, logout, register,addToCart, removeItem  } =registerSlice.actions;

export default registerSlice.reducer;
