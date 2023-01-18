import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    // getUsers: builder.query({
    //   query: () => ({
    //     url: `post`,
    //     method: "Get",
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM5NTMyMTUsImV4cCI6MTY3Mzk1MzUxNX0.LhvakngLbuUpCYixkTINkfu6zMz-rilnv5zVKumTUBk`,
    //     },
    //   }),
    // }),
    userLogin: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    userRegister: builder.mutation({
      query: (userRegisterInfo) => ({
        url: "user",
        method: "POST",
        body: userRegisterInfo,
      }),
    }),
  }),
})

export const { useUserRegisterMutation, useUserLoginMutation } = userApi
