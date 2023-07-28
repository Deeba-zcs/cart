import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cartUser: [],
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      console.log("signin", state.currentUser);
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    register: (state, action) => {
      state.currentUser.push(action.payload);
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    add: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.cartUser.find(
        (product) => product.id === productToAdd.id
      );

      if (!existingProduct) {
        productToAdd.quantity = 1;
        state.cartUser.push(productToAdd); 
      } else {
        alert("This product is already in the cart.");
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    increase: (state, action) => {
      const productId = action.payload;
      const productToIncrease = state.cartUser.find(
        (product) => product.id === productId
      );

      if (productToIncrease) {
      
        productToIncrease.quantity += 1;
      } else {
        alert("Product not found in the cart.");
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    decrease: (state, action) => {
      const productId = action.payload;
      const productToDecrease = state.cartUser.find(
        (product) => product.id === productId
      );

      if (productToDecrease) {
        if (productToDecrease.quantity > 1) {
          productToDecrease.quantity -= 1;
        } else {
          // If the quantity is 1 or less, remove the item from the cart
          state.cartUser = state.cartUser.filter(
            (product) => product.id !== productId
          );
        }
      } else {
        alert("Product not found in the cart.");
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    remove: (state, action) => {
      const productId = action.payload;
      state.cartUser = state.cartUser.filter((product) => product.id !== productId);
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    persistCart: (state, action) => {
      state.cartUser = action.payload;
    },
  },
});

export const { login, logout, register, add, increase, decrease, remove, persistCart} =
  registerSlice.actions;

export default registerSlice.reducer;
