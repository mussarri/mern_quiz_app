import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import userSlice from "./userSlice";
import { quizApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    user: userSlice,
    // questions: questionsSlice,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

setupListeners(store.dispatch);
