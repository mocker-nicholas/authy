import { createSlice } from "@reduxjs/toolkit";

export const searchBodySlice = createSlice({
  name: "searchBody",
  initialState: {
    status: "unsettled",
    offset: 1,
    firstDate: null,
    lastDate: null,
  },

  reducers: {
    nextPage: (state) => {
      state.offset++;
    },
    prevPage: (state) => {
      if (state.offset > 1) {
        state.offset--;
      }
    },
    offsetReset: (state) => {
      state.offset = 1;
    },
    bodyUpdate: (state, action) => {
      if (action.payload.firstDate && action.payload.status) {
        state.offset = 1;
        state.firstDate = action.payload.firstDate;
        state.lastDate = action.payload.firstDate;
        state.status = action.payload.status;
      }
    },
  },
});

export const { nextPage, prevPage, offsetReset, bodyUpdate } =
  searchBodySlice.actions;

export default searchBodySlice.reducer;
