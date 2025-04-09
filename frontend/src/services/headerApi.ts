import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = "http://localhost:1337";

export const headerApi = createApi({
  reducerPath: 'headerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getHeaderVideo: builder.query({
      query: () => '/api/header-videos?populate=video',
    }),
  }),
});

export const { useGetHeaderVideoQuery } = headerApi;