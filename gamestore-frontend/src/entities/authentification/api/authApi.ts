import {baseApi} from "@/shared/api/baseAPI";
import {AUTH_TAG} from "@/shared/api/tags";
import {RequestLoginBody, Session, SessionDto} from "@/entities/authentification/model/types";
import {mapSession} from "@/entities/authentification/lib/mapSession";


export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [AUTH_TAG],
      transformResponse: (response: SessionDto) => mapSession(response),
    }),
    me: build.query({
      query: () => ({
        url: "auth/me",
        method: "POST",
      }),
      transformResponse: (response: SessionDto) => response,
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = sessionApi;