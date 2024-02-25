import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventsRoot } from 'types/Events';

// Define a service using a base URL and expected endpoints
export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getEvents: builder.query<EventsRoot[], void>({
      query: () => `events`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventsQuery } = eventsApi;
