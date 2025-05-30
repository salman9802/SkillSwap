import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";
import api from "./api";

export const store = configureStore({
  reducer,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware),
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
