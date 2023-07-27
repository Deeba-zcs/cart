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
        state.cartUser.push(productToAdd); // Add the selected product to the cartUser array
      } else {
        alert("This product is already in the cart.");
      }
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
    },
    decrease(state, action) {
        const productId = action.payload;
        const existingProduct = state.find((item) => item.id === productId);
        if (existingProduct) {
          if (existingProduct.quantity > 0) {
            existingProduct.quantity -= 1;
          }
        }
      },
      deleteitem(state, action) {
        return state.filter((item) => item.id !== action.payload);
      },
  },
});

export const { login, logout, register, add, increase, decrease, deleteitem } =
  registerSlice.actions;

export default registerSlice.reducer;
