import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const headerApi = createApi({
  reducerPath: 'headerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getHeaderVideo: builder.query({
      query: () => '/header-videos?populate=video',
    }),
  }),
});

export const { useGetHeaderVideoQuery } = headerApi;