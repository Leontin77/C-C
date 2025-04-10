import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/const/url';

interface Song {
  id: number;
  attributes: {
    title: string;
    audio: { data: { attributes: { url: string } } };
    album: {
      data: {
        attributes: {
          cover: { data: { attributes: { url: string } } };
        };
      };
    };
  };
}

export const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSongs: builder.query<Song[], void>({  
      query: () => `songs?populate[album][populate]=cover&populate=audio`,
    }),
  }),
});

// Генеруємо хук
export const { useGetSongsQuery } = songsApi;
