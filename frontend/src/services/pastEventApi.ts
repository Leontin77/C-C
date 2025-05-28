
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const pastEventApi = createApi({
  reducerPath: 'pastEventApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPastEvents: builder.query({
      query: () => '/api/past-events?populate=*', 
    }),
  }),
});

export const { useGetPastEventsQuery } = pastEventApi;
