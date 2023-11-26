import React from "react";

import {CircularProgress, List, ListItem} from "@mui/material";

import {useStyles} from "./GameList.styles";

import {GameCard} from "@/entities/game";
import {Game} from "@/shared/api";

type GameListProps = {
  games: Game[]
  isFetching: boolean
}
export const GameList = ({games, isFetching}: Partial<GameListProps>) => {
  const {classes} = useStyles();
  if (isFetching) return <CircularProgress/>;
  if (!games) return <>Error</>;
  if (!games.length) return <>No matches games</>;
  return (
    <List className={classes.list}>
      {games?.map((game) => {
        return (
          <ListItem className={classes.item}>
            <GameCard key={game.id} game={game}/>
          </ListItem>
        );
      })}
    </List>
  );
}
  ;
