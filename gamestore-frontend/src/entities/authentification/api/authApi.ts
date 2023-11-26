import {baseApi} from "@/shared/api/baseAPI";
import {AUTH_TAG} from "@/shared/api/tags";
import {mapSession} from "@/entities/authentification/lib/mapSession";
import {User} from "@/shared/api";
import {RequestLoginBody, Session} from "@/entities/authentification/model/types";


export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [AUTH_TAG],
      transformResponse: (response: User): Session => mapSession(response),
    }),
    me: build.query({
      query: () => ({
        url: "auth/me",
        method: "POST",
      }),
      transformResponse: (response: User) => mapSession(response),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {useLoginMutation, useMeQuery, useLogoutMutation} = sessionApi;