import { createSlice } from "@reduxjs/toolkit";

export const result = createSlice({
  name: "result",
  initialState: {
    username: "",
    quizName: "",
    answers: "",
  },
  reducers: {
    setResult: (state, action) => {
      console.log(action.payload);
      state.username = action.payload.username;
      state.quizName = action.payload.quizName;
      state.answers = action.payload.answers;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResult } = result.actions;

export default result.reducer;
