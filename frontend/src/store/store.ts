import { configureStore } from "@reduxjs/toolkit";
import { songsApi } from "../services/songsApi";
import { headerApi } from "../services/headerApi";
import { ticketApi } from "../services/ticketApi";
import { feedbackApi } from "../services/feedbackApi";
import { blogApi } from "../services/blogApi";

export const store = configureStore({
  reducer: {
    // додаємо API редюсери
    [songsApi.reducerPath]: songsApi.reducer,
    [headerApi.reducerPath]: headerApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      songsApi.middleware,
      headerApi.middleware,
      ticketApi.middleware,
      feedbackApi.middleware,
      blogApi.middleware
    ), // Додаємо middleware для headerApi
});
