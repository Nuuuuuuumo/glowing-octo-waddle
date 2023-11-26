import {configureStore} from "@reduxjs/toolkit";

import {rootReducer} from "@/app/rootReducer";
import {baseApi} from "@/shared/api/baseAPI";

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({serializableCheck: false}).concat(baseApi.middleware);
    },
  });
}

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch