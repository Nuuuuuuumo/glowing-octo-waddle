import {CircularProgress} from "@mui/material";

import {useStyles} from "./loader.styles";

export const Loader = () => {
  const {classes} = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress/>
    </div>
  );
};