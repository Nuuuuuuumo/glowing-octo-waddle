import {Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography} from "@mui/material";
import React from "react";


import DeleteIcon from "@mui/icons-material/Delete";

import {enqueueSnackbar} from "notistack";

import {Bucket} from "../../model/types";

import useStyles from "./CartList.styles";

import {Loader} from "@/shared/ui/loader/Loader";
import {EmptyCart} from "@/shared/ui/empty-cart";
import {useDeleteGameFromBucketMutation} from "@/entities/bucket/api/bucketApi";

interface CartListProps {
  isLoading: boolean;
  bucket: Bucket | null;
  error: any;
}

export const CartList = ({isLoading, bucket, error}: CartListProps) => {
  const {classes} = useStyles();
  const isError = Boolean(isLoading || error);

  const [deleteGameFromBucket, {isLoading: isGameDeleting}] = useDeleteGameFromBucketMutation();

  const handleDeleteGameFromBucket = async (gameId: string) => {
    if (bucket) {
      await deleteGameFromBucket({gameId, bucketId: bucket.id})
        .unwrap()
        .then(() => {
          if (isGameDeleting) {
            enqueueSnackbar("Game successfully deleted from cart.", {variant: "success"});
          }
        })
        .catch(() => {
          enqueueSnackbar("An error occurred on deleting game from cart.", {variant: "error"});
        });
    }
  };

  return (
    <>
      {isError &&
        (
          <Box className={classes.cartListWrapper}>
            {isLoading && <Loader/>}
            {error && (<p>Something went wrong...</p>)}
          </Box>
        )}
      {!bucket?.games ? (<EmptyCart/>) : (
        <>
          <List style={{flex: "1 1 auto"}}>
            {bucket.games.map((game) => (
              <ListItem key={game.id}>
                <ListItemAvatar>
                  <Avatar variant="square" alt={game.title} src={game.imageUrl}/>
                </ListItemAvatar>
                <ListItemText primary={game.title} secondary={`Price: $${game.price}`}/>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => {
                    handleDeleteGameFromBucket(game.id);
                  }}>
                    <DeleteIcon style={{color: "red"}}/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <Divider/>
            <Box style={{display: "flex", justifyContent: "space-between", padding: "10px  20px"}}>
              <Typography><strong>Total price</strong></Typography>
              <Typography><strong>{bucket.totalPrice}$</strong></Typography>
            </Box>
          </List>
        </>
      )}
    </>
  );
};