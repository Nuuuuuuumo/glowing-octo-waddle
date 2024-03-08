import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {MouseEvent, useState} from "react";

import {enqueueSnackbar} from "notistack";

import {selectUserData} from "@/entities/authentification";
import {useAppDispatch, useAppSelector} from "@/shared/model/hooks";
import {useLogoutMutation} from "@/entities/authentification/api/authApi";
import {clearSessionData} from "@/entities/authentification/model/slice";
import {RedirectLink} from "@/shared/ui";

export const ProfileButton = () => {
  const [logoutMutation] = useLogoutMutation();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    dispatch(clearSessionData());
    await logoutMutation().unwrap().then((payload) => {
      enqueueSnackbar(payload?.message, {variant: "success"});
    });
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar alt="Remy Sharp" src={userData?.avatarURL}/>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: "45px"}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}><RedirectLink redirectTo="/profile">Profile</RedirectLink></MenuItem>
        <MenuItem onClick={handleCloseUserMenu}><RedirectLink redirectTo="/profile">Bucket</RedirectLink></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};