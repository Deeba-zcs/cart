import { configureStore } from "@reduxjs/toolkit";

import registerslice from "src/app/Store/registerslice.js"

const store = configureStore({
  reducer: {

    signup: registerslice,
  },
});
export default store;
