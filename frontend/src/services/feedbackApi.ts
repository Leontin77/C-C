import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => '/api/feedbacks?populate=*',
    }),
  }),
});

export const { useGetFeedbacksQuery } = feedbackApi;