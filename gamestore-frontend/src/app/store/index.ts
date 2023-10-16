import {configureStore} from "@reduxjs/toolkit";

import {rootReducer} from "@/app/rootReducer";
import {baseApi} from "@/shared/api/baseAPI";

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(baseApi.middleware);
    },
  });
}

export const appStore = makeStore();