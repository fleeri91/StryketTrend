import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StryktipsetRoot } from "../../types/Stryktipset";

// Define a service using a base URL and expected endpoints
export const stryktipsetApi = createApi({
  reducerPath: "stryktipsetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.www.svenskaspel.se/external/1/draw/",
  }),
  tagTypes: ["Stryktipset"],
  endpoints: (builder) => ({
    getStryktipset: builder.query<StryktipsetRoot, string>({
      query: (key) => `/europatipset/draws?accesskey=${key}`,
      providesTags: ["Stryktipset"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStryktipsetQuery } = stryktipsetApi;
