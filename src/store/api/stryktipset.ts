import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StryktipsetRoot } from '../../types/Stryktipset';

// Define a service using a base URL and expected endpoints
export const stryktipsetApi = createApi({
  reducerPath: 'stryktipsetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getStryktipset: builder.query<StryktipsetRoot, void>({
      query: () => `stryktipset`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStryktipsetQuery } = stryktipsetApi;
