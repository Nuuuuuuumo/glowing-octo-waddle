import {Box} from "@mui/material";

import React from "react";

import {useStyles} from "./gamePage.styles";

import {Browse} from "@/widgets/Browse";

export const GamesPage = () => {

  const {classes} = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Browse/>
      </Box>
    </>
  );
};