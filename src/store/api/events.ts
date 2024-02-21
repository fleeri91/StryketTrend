import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GamesRoot } from 'types/Games';

// Define a service using a base URL and expected endpoints
export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['events'],
  endpoints: (builder) => ({
    getGames: builder.query<GamesRoot[], void>({
      query: () => `games`,
      providesTags: ['events'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGamesQuery } = eventsApi;
