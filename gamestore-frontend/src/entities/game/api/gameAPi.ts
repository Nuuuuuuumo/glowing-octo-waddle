import {baseApi} from "@/shared/api/baseAPI";
import {Game} from "@/shared/api";
import {GAME_TAG} from "@/shared/api/tags";
import {ResponseGetGenresAndPlatforms} from "@/entities/game/model/types";


export const gameApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFilteredGames: build.query<Game[], URLSearchParams>({
      query: (params) => ({
        url: "games/filteredGames",
        method: "GET",
        params,
      }),
    }),
    getGames: build.query<Game[], void>({
      query: () => ({
        url: "games",
        method: "GET",
      }),
    }),
    getGame: build.query<Game, string>({
      query: (id) => ({
        url: `games/game/${id}`,
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
    addGame: build.mutation<Game, FormData>({
      query: (body) => ({
        url: "games/addGame",
        method: "POST",
        body: body,

      }),
    }),
    deleteGame: build.mutation<string, string>({
      query: (id) => ({
        url: `games/game/${id}`,
        method: "DELETE",
      }),
    }),
    getGenresAndPlatforms: build.query<ResponseGetGenresAndPlatforms, void>({
      query: () => ({
        url: "games/getGenresAndPlatforms",
        method: "GET",
      }),
      providesTags: [GAME_TAG],
    }),
  }),
});

export const {useGetGameQuery, useAddGameMutation, useGetGenresAndPlatformsQuery, useGetGamesQuery, useLazyGetFilteredGamesQuery, useDeleteGameMutation} = gameApi;