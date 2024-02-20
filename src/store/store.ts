/** Library */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

/** API */
import { stryktipsetApi } from "./api/stryktipset";
import { eventsApi } from "./api/events";

/** Slice */
import { baseReducer } from "./slices/base.slice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    [stryktipsetApi.reducerPath]: stryktipsetApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    base: baseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stryktipsetApi.middleware)
      .concat(eventsApi.middleware),
});

// Configure listeners for the API endpoints
setupListeners(store.dispatch);

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;
