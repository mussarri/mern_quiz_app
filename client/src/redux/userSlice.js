import { createSlice } from "@reduxjs/toolkit";

export const mode = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = mode.actions;

export default mode.reducer;
