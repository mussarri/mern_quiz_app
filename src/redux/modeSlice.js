import { createSlice } from "@reduxjs/toolkit";

export const mode = createSlice({
  name: "counter",
  initialState: {
    value: "dark",
  },
  reducers: {
    setMode: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode } = mode.actions;

export default mode.reducer;
