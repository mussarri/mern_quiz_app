import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => ({
    getAllQuiz: builder.query({
      query: () => `quiz`,
    }),
    getAllUsers: builder.query({
      query: () => `admin/users`,
    }),
    getSingleUser: builder.query({
      query: ({ username }) => `admin/user/${username}`,
    }),
    getUserResults: builder.query({
      query: ({ username }) => `admin/user/${username}/results`,
    }),
    getSingleQuiz: builder.query({
      query: ({ slug }) => `admin/quizzes/${slug}`,
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
  }),
});

export const {
  useGetAllQuizQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetUserResultsQuery,
  useGetSingleQuizQuery,
  useGetSingleQuizQuestionQuery,
  useGetSingleQuizAnswersQuery,
} = quizApi;
