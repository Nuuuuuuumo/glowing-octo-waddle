import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(({
  rootWrapper: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    alignItems: "center",
    justifyContent: "center",
  },
}));