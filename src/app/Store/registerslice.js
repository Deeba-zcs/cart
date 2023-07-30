import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "signup",
  initialState: {
    currentUser: [],
    isLoggedIn: false,
    cart: JSON.parse(localStorage.getItem("cart_items")) || [],
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
    
    },
    updateQuantity: (state, action) => {
      const { id, quantity,subitem } = action.payload;
      console.log("id,quatity,subitem",id,quantity,subitem)
      // const existingCartItem = state.cart.find((item) => item.id === id);

      // if (existingCartItem) {
      //   existingCartItem.quantity = quantity;
  
      //    // Calculate the subitem (total number of items in the cart) after updating the quantity
      //    const cartItems = JSON.parse(localStorage.getItem("cartState")) || {};
      //    const userCartItems = cartItems[state.username?.id] || [];
      //    const subitem = userCartItems.reduce((total, item) => total + item.quantity, 0);
      //    console.log("suitemregister",subitem)
         state.subitem = subitem; // Update the subitem in the state
   
    localStorage.setItem("cartState", JSON.stringify(state.cart));
        
    },
  },
});

export const { login, logout, register,addToCart, removeItem , updateQuantity } =registerSlice.actions;

export default registerSlice.reducer;
