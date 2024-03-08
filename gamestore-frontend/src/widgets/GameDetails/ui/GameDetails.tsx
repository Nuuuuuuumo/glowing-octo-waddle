import {Button, Grid, Paper, Typography} from "@mui/material";

import React from "react";

import {enqueueSnackbar} from "notistack";

import {useNavigate} from "react-router-dom";

import {Game} from "@/shared/api";
import {useStyles} from "@/widgets/GameDetails/ui/GameDetails.styles";
import {useDeleteGameMutation} from "@/entities/game";
import {useAddGameToBucketMutation} from "@/entities/bucket/api/bucketApi";

type GameDetails = {
  game: Game
}

export const GameDetails = ({game}: GameDetails) => {
  const navigate = useNavigate();
  const [deleteGame, {isSuccess: isDeletingGameSuccess, isLoading: isGameDeleteLoading}] = useDeleteGameMutation();
  const [addGameToCard, {isSuccess: isAddGameToCardSuccess, isLoading: isAddGameToCardLoading}] = useAddGameToBucketMutation();
  const {classes} = useStyles();

  const addGameToCart = async () => {
    await addGameToCard(game.id)
      .unwrap()
      .then(() => {
        if (isAddGameToCardSuccess) {
          enqueueSnackbar("Game successfully added to cart.", {variant: "success"});
        }
      })
      .catch(() => {
        enqueueSnackbar("An error occurred on adding game to cart.", {variant: "error"});
      });

  };


  const handleGameDelete = async () => {
    await deleteGame(game.id)
      .unwrap()
      .then(() => {
        if (isDeletingGameSuccess) {
          enqueueSnackbar("Game successfully deleted.", {variant: "success"});
          navigate("/games");
        }
      })
      .catch(() => {
        enqueueSnackbar("An error occurred on deleting game.", {variant: "error"});
      });
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <img src={game.imageUrl} alt={game.title} className={classes.image}/>
        <Typography variant="h4" gutterBottom>
          {game.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {game.description}
        </Typography>
        <Grid container spacing={2} className={classes.details}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Genres:</strong> {game.genres.map((genre) => genre.name).join(", ")}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Platforms:</strong> {game.platforms.map((platform) => platform.name).join(", ")}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Price:</strong> ${game.price}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Rating:</strong> {game.rating}/10
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Publisher:</strong> {game.publisher}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Developer:</strong> {game.developer}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Multiplayer Support:</strong> {game.multiplayerSupport ? "Yes" : "No"}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary">
          Buy Now
        </Button>
        <Button variant="contained" color="success" onClick={addGameToCart}>
          {isAddGameToCardLoading ? "Adding game to cart" : "Add game to cart"}
        </Button>
        <Button disabled={isGameDeleteLoading} onClick={handleGameDelete} variant="contained" color="warning">
          {isGameDeleteLoading ? "Deleting game" : "Delete game"}
        </Button>
      </Paper>
    </div>
  );
};