import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";

import {red} from "@mui/material/colors";

import moment from "moment";

import {useGetGamesQuery} from "@/entities/game/api/gameAPi";


export const GameList = () => {

  const {data, isLoading} = useGetGamesQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      {data?.map((game) => {
        return (
          <Card key={game.id} sx={{maxWidth: 345}}>
            <CardHeader
              avatar={
                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe" src={game.imageUrl}/>
              }
              title={game.developer}
              subheader={moment(game.createdAt).format("LL")}
            />
            <CardMedia
              component="img"
              height="194"
              image={game.imageUrl}
              alt={game.genre}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {game.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
