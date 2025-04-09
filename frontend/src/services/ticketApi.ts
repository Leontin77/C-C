
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }), // заміни на свій продакшн URL
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => 'tickets?populate=*', 
    }),
  }),
});

export const { useGetTicketsQuery } = ticketApi;
