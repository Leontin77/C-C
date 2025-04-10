import { configureStore } from "@reduxjs/toolkit";
import { songsApi } from "../services/songsApi";
import { headerApi } from "../services/headerApi";
import { ticketApi } from "../services/ticketApi";
import { feedbackApi } from "../services/feedbackApi";
import { blogApi } from "../services/blogApi";

import modalReducer from '../store/modal/modal.slice'

export const store = configureStore({
  reducer: {
    // додаємо API редюсери
    [songsApi.reducerPath]: songsApi.reducer,
    [headerApi.reducerPath]: headerApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,

    modal: modalReducer,

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

export type RootState = ReturnType<typeof store.getState>;
