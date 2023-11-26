import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "none",
  },
  details: {
    marginTop: theme.spacing(2),
    textAlign: "left",
  },
}));