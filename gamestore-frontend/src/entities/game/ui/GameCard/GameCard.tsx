import {Card, CardContent, CardMedia, Typography} from "@mui/material";

import {useStyles} from "./gameCard.styles";

import {Game} from "@/shared/api";
import {RedirectLink} from "@/shared/ui";

type Props = {
  game: Game
}

export const GameCard = (props: Props) => {
  const {classes} = useStyles();
  const {game} = props;

  return (
    <RedirectLink redirectTo={`/games/${game.id}`}>
      <Card key={game.id} className={classes.root}>
        <CardMedia
          component="img"
          className={classes.image}
          height="300"
          image={game.imageUrl}
        />
        <CardContent>
          <Typography>{game.publisher}</Typography>
          <Typography className={classes.title}>{game.title}</Typography>
          <Typography className={classes.price}>${game.price}</Typography>
        </CardContent>
      </Card>
    </RedirectLink>
  );
};