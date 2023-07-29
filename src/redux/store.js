import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import questionsSlice from "./questionsSlice";

export default configureStore({
  reducer: {
    mode: modeSlice,
    questions: questionsSlice,
  },
});
