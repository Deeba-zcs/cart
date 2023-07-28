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
      state.currentUser=(action.payload);
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    add: (state, action) => {
      state.isLoggedIn = true;
      const productToAdd = action.payload;
      console.log("productoadd",productToAdd)
      const existingProduct = state.cartUser.find(
        (product) => product.id === productToAdd.id
      );

      if (!existingProduct) {
        productToAdd.quantity = 1;
        state.cartUser.push(productToAdd); 
      } else {
        alert("This product is already in the cart.");
      }
      localStorage.setItem("cartState", JSON.stringify(state));
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
      localStorage.setItem("cartState", JSON.stringify(state));
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
       
          state.cartUser = state.cartUser.filter(
            (product) => product.id !== productId
          );
        }
      } else {
        alert("Product not found in the cart.");
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    remove: (state, action) => {
      const productId = action.payload;
      state.cartUser = state.cartUser.filter((product) => product.id !== productId);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  
    updateUserCart: (state, action) => {
      const { userId, cartItems } = action.payload;
      const userIndex = state.currentUser.findIndex((user) => user.id === userId);
      
      if (userIndex !== -1) {
        state.currentUser[userIndex].cartItems = cartItems;
      } else {
      
        state.currentUser.push({
          id: userId,
          cartItems,
        });
      }}
  },
});

export const { login, logout, register, add, increase, 
  decrease, remove, persistCart,updateUserCart} =
  registerSlice.actions;

export default registerSlice.reducer;
