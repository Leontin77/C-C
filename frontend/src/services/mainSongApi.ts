import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

export const mainSongApi = createApi({
  reducerPath: 'mainSongApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMainSongs: builder.query({
      query: () => '/api/main-songs?populate=*',
    }),
  }),
});

export const { useGetMainSongsQuery } = mainSongApi;