import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `post`,
        method: "Get",
      }),
    }),
  }),
})

export const { useGetPostsQuery } = postApi
