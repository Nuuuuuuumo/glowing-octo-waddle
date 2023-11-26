import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {ProfileButton} from "@/features/user";
import {RedirectLink} from "@/shared/ui";


export const Header = () => {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Box sx={{flexGrow: 1, display: "flex", gap: "10px"}}>
            <RedirectLink sx={{fontWeight: 500, fontSize: "1.25rem"}} redirectTo="/"></RedirectLink>
            <RedirectLink sx={{fontWeight: 500, fontSize: "1.25rem"}} redirectTo="/games">Games</RedirectLink>
            <RedirectLink sx={{fontWeight: 500, fontSize: "1.25rem"}} redirectTo="/addGame">AddGame</RedirectLink>
          </Box>
          <ProfileButton/>
        </Toolbar>
      </AppBar>
    </>
  );
};