import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cart: JSON.parse(localStorage.getItem("cartState")) || [],
    subitem: 0,
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
      state.currentUser = action.payload;
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
      console.log("firstquantity", product.quantity);
      state.subitem -= product.quantity;
      localStorage.setItem("cartState", JSON.stringify(state.cart));
    },
    updateQuantity: (state, action) => {
      const { id, quantity, subitem } = action.payload;
      console.log("id,quatity,subitem", id, quantity, subitem);

      state.subitem = subitem; // Update the subitem in the state

      localStorage.setItem("cartState", JSON.stringify(state.cart));
    },
  },
});

export const {
  login,
  logout,
  register,
  addToCart,
  removeItem,
  updateQuantity,
} = registerSlice.actions;

export default registerSlice.reducer;
