import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {useStyles} from "./header.styles";

import {ProfileButton} from "@/features/user";
import {RedirectLink} from "@/shared/ui";
import {useAppSelector} from "@/shared/model/hooks";
import {selectIsAuth} from "@/entities/authentification/model/slice";
import {CartButton} from "@/features/user/CartButton/ui/CartButton";

export const Header = () => {
  const {classes} = useStyles();
  const isAuth = useAppSelector(selectIsAuth);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon/>
          </IconButton>
          <RedirectLink redirectTo="/">Game Store</RedirectLink>
          <Box className={classes.rootWrapper}>
            <RedirectLink redirectTo="/games">Games</RedirectLink>
            <RedirectLink redirectTo="/addGame">AddGame</RedirectLink>
          </Box>
          {isAuth ? (
            <>
              <CartButton/>
              <ProfileButton/>
            </>
          ) : (
            <>
              <RedirectLink redirectTo="/login">Sign in</RedirectLink>
              <RedirectLink redirectTo="/register">Sign Up</RedirectLink>
            </>)
          }
        </Toolbar>
      </AppBar>
    </>
  );
};