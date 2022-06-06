import { createSlice } from "@reduxjs/toolkit";

export const searchBodySlice = createSlice({
  name: "searchBody",
  initialState: {
    status: "unsettled",
    offset: 1,
    firstDate: null,
  },

  reducers: {
    nextPage: (state) => {
      console.log("gotme")
     state.offset++
    },
    prevPage: (state) => {
      state.offset--
    },
    offsetReset: (state) => {
      state.offset = 1
    }
  }
})

export const {nextPage, prevPage, offsetReset} = searchBodySlice.actions;

export default searchBodySlice.reducer;