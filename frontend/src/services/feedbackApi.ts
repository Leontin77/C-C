import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedbacks?populate=*',
    }),
  }),
});

export const { useGetFeedbacksQuery } = feedbackApi;