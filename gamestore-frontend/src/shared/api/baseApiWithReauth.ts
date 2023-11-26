import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";


import {enqueueSnackbar} from "notistack";

import {config} from "@/shared/lib/config";
import {ErrorHandle} from "@/shared/types";

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
  credentials: "include",
  jsonContentType: "application/json",
});
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery("auth/refresh", api, extraOptions);

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        enqueueSnackbar((refreshResult.error as ErrorHandle).data.message, {variant: "error"});
      }
    } else {
      enqueueSnackbar((result.error as ErrorHandle).data.message, {variant: "error"});
    }
  }

  return result;
};