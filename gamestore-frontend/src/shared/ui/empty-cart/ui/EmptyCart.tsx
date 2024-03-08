import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {Typography} from "@mui/material";
import React from "react";

export const EmptyCart = () => {
  return (
    <>
      <AddShoppingCartIcon fontSize="large"/>
      <Typography>U have no games in wishlist.</Typography>
    </>
  );
};