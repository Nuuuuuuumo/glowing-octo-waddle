import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

import {toast} from "react-toastify";

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
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      toast.error((refreshResult.error as ErrorHandle).data.message);
      
    }
  }
  return result;
};