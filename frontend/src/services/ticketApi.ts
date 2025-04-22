
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => '/api/tickets?populate=*', 
    }),
  }),
});

export const { useGetTicketsQuery } = ticketApi;
