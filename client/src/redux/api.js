import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
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

    loginUser: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body: body,
      }),
    }),
    logoutUser: builder.query({
      query: () => "/auth/logout",
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: `quiz/register`,
        body: body,
      }),
    }),
    refreshUser: builder.query({
      query: () => "auth/refresh",
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
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserQuery,
  useRefreshUserQuery,
} = quizApi;
