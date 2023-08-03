import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import { quizApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    // questions: questionsSlice,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

setupListeners(store.dispatch);
