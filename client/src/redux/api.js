import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (builder) => ({
    getAllQuiz: builder.query({
      query: () => `quiz`,
    }),
    getSingleQuizQuestion: builder.query({
      query: ({ slug, trace }) => ({
        url: `quiz/${slug}`,
        params: {
          trace: trace,
        },
      }),
    }),
    getSingleQuizAnswers: builder.query({
      query: ({ slug }) => ({
        url: `quiz/result`,
        params: {
          quizName: slug,
        },
      }),
    }),
    createQuery: builder.mutation({
      query: (data) => ({
        url: "quiz",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
    }),
  }),
});

export const {
  useGetAllQuizQuery,
  useCreateQueryMutation,
  useGetSingleQuizQuestionQuery,
  useGetSingleQuizAnswersQuery,
} = quizApi;
