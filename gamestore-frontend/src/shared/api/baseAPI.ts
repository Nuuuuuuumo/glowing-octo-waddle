import {createApi} from "@reduxjs/toolkit/query/react";

import {AUTH_TAG, baseQueryWithReAuth, GAME_TAG} from "@/shared/api";

export const baseApi = createApi({
  tagTypes: [AUTH_TAG, GAME_TAG],
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),

});