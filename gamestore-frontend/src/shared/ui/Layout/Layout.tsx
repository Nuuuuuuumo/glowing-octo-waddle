import {Box, Container, Paper, Typography} from "@mui/material";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {ReactNode} from "react";

import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {useStyles} from "@/shared/ui/Layout/layout.styles";

type Props = {
  navbarSlot?: ReactNode
  headerSlot: ReactNode
  bottomSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export const Layout = (props: Props) => {
  const {classes} = useStyles();
  return (
    <Box className={classes.rootWrapper}>
      <ToastContainer/>
      {props.navbarSlot}
      {props.headerSlot}
      <Container maxWidth="xl" className={classes.container}>
        <Outlet />
      </Container>
      <footer>
        <Paper elevation={3} square>
          <Typography variant="body2" align="center">
            {new Date().getFullYear()}, see source code on{" "}
            <a href="https://github.com/Nuuuuuuumo/gamestore">
              github.com/Nuuuuuuumo/gamestore/
            </a>
          </Typography>
        </Paper>
      </footer>
      <ScrollRestoration />
    </Box>
  );
};