import { configureStore } from "@reduxjs/toolkit";
import searchBodySlice from "./search-body-slice";

const store = configureStore({
  reducer: {
    auth: null,
    searchBody: searchBodySlice
  }
})

export default store;