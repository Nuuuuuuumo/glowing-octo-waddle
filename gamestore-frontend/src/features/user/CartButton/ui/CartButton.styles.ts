import {makeStyles} from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  drawer: {
    "& .MuiPaper-root": {
      overflow: "hidden",
    },
  },
}));

export default useStyles;
