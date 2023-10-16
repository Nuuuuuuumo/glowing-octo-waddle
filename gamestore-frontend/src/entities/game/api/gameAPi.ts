import {baseApi} from "@/shared/api/baseAPI";
import {Game} from "@/shared/api";
import {GAME_TAG} from "@/shared/api/tags";


export const gameApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGames: build.query<Game[], void>({
      query: () => ({
        url: "game/getGames",
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),

  }),
});

export const { useGetGamesQuery } = gameApi;