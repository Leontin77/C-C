import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/api/blogs?populate=*',
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;