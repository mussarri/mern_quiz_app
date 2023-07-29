import { createSlice } from "@reduxjs/toolkit";

export const questions = createSlice({
  name: "questions",
  initialState: {
    user: "a",
    questions: [
      {
        text: "________ is a cloud-hosted service from Docker that provides registry capabilities for public and private content. Which option is the most avaible word of this sentence ?",
        answers: [
          "Docker Cloud",
          "Docker Cloud 2",
          "Docker Cloud 3",
          "Docker Cloud 4",
        ],
        true: 1,
      },
      {
        text: "________ is a cloud-hosted service from Docker that provides registry capabilities for public and private content. Which option is the most avaible word of this sentence ?",
        answers: [
          "Docker Cloud",
          "Docker Cloud 2",
          "Docker Cloud 3",
          "Docker Cloud 4",
        ],
        true: 2,
      },
      {
        text: "________ is a cloud-hosted service from Docker that provides registry capabilities for public and private content. Which option is the most avaible word of this sentence ?",
        answers: [
          "Docker Cloud",
          "Docker Cloud 2",
          "Docker Cloud 3",
          "Docker Cloud 4",
        ],
        true: 3,
      },
      {
        text: "________ is a cloud-hosted service from Docker that provides registry capabilities for public and private content. Which option is the most avaible word of this sentence ?",
        answers: [
          "Docker Cloud",
          "Docker Cloud 2",
          "Docker Cloud 3",
          "Docker Cloud 4",
        ],
        true: 3,
      },
    ],
    length: () => questions.getInitialState().questions.length,
    getQuestion: function (trace) {
      return {
        text: questions.getInitialState().questions[trace].text,
        options: questions.getInitialState().questions[trace].answers,
      };
    },
    answers: [],
    trace: 0,
    result: [],
  },
  reducers: {
    next: (state, action) => {
      state.answers[state.trace] = action.payload;
      if (state.trace < state.questions.length - 1) {
        state.trace = state.trace + 1;
      }
    },
    prev: (state) => {
      if (state.trace > 0) {
        state.trace = state.trace - 1;
      }
    },
    endQuiz: (state) => {
      state.answers = [];
      state.trace = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { next, prev, length, getQuestion, endQuiz } = questions.actions;

export default questions.reducer;
