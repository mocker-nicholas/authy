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
      state.offset++
    },
    prevPage: (state) => {
      state.offset--
    }
  }
})

export const {nextPage, prevPage} = searchBodySlice.actions;

export default searchBodySlice.reducer;