import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(({
  root: {
    width: "100%",
    boxShadow: "none",
  },
  image: {
    display: "block",
    height: "auto",
    left: "50%",
    maxWidth: "100%",
    minWidth: "100%",
    position: "relative",
    transform: "translate(-50%)",
  },

  price: {
    fontWeight: "bold",
  },
  title: {
    color: "grey",
    fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem)",
  },
}));