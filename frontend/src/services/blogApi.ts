import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => 'blogs?populate=*',
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;