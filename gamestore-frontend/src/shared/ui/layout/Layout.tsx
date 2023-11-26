import {Box} from "@mui/material";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {ReactNode} from "react";

import {useStyles} from "@/shared/ui/layout/layout.styles";

type Props = {
  navbarSlot: ReactNode
  headerSlot: ReactNode
  bottomSlot: ReactNode
  sidebarSlot: ReactNode
  children: ReactNode
}

export const Layout = (props: Partial<Props>) => {
  const {classes} = useStyles();
  return (
    <Box className={classes.rootWrapper}>
      {props.navbarSlot}
      {props.headerSlot}
      {props.children ?? <Outlet/>}
      <ScrollRestoration/>
    </Box>
  );
};