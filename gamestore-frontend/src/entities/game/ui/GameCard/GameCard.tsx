import {Link} from "react-router-dom";

import {Box, Typography} from "@mui/material";

import {Game} from "@/entities/game/model/types";

type Props = {
  game: Game
}

export const GameCard = (props: Props) => {
  const { id, title, imageUrl, genre, price } = props.game;


  return (
    <Link to={`/game/${id}`}>
      <img src={imageUrl}/>
      <Box>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h3">{genre}</Typography>
        <Typography variant="h5">{price} $</Typography>
      </Box>

    </Link>
  );
};