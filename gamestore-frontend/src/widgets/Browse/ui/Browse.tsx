import {Box} from "@mui/material";

import React, {useEffect, useState} from "react";

import {debounce} from "lodash";

import {useStyles} from "./browse.styles";

import {GameList, useLazyGetFilteredGamesQuery} from "@/entities/game";
import {GamesFilter} from "@/entities/game/ui/GamesFilter/GamesFilter";


export type FilterState = {
  genres: string[]
  platforms: string[]
  title: string
  rating: string
}

export const Browse = () => {
  const {classes} = useStyles();
  const [trigger, {data: games, isFetching}] = useLazyGetFilteredGamesQuery();

  const [filters, setFilters] = useState<FilterState>({
    title: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const handleApplyFiltersDebounced = debounce(
    (newFilters: FilterState) => {
      const queryParams = new URLSearchParams({
        title: newFilters.title,
        rating: newFilters.rating,
        genres: newFilters.genres.join(","),
        platforms: newFilters.platforms.join(","),
      });
      trigger(queryParams);
    },
    350,
  );

  useEffect(() => {
    handleApplyFiltersDebounced(filters);

    return () => handleApplyFiltersDebounced.cancel();
  }, [filters]);

  return (
    <Box className={classes.root}>
      <GameList isFetching={isFetching} games={games}/>
      <GamesFilter filters={filters} onChangeFilters={setFilters}/>
    </Box>
  );
};