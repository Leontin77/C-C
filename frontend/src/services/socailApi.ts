import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSocails: builder.query({
      query: () => '/api/socials?populate=*',
    }),
  }),
});

export const { useGetSocailsQuery } = socialApi;