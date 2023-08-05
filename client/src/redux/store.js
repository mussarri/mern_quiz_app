import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import userSlice from "./userSlice";
import { quizApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import resultSlice from "./resultSlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    user: userSlice,
    result: resultSlice,
    // questions: questionsSlice,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

setupListeners(store.dispatch);
