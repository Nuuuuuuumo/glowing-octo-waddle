import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  cartListWrapper: {
    width: "100%",
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default useStyles;
