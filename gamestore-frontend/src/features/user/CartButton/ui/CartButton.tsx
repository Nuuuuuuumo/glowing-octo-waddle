import {Box, Button, Divider, Drawer, Slide, Tooltip, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, {useState} from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useStyles from "./CartButton.styles";

import {useGetUserBucketQuery} from "@/entities/bucket/api/bucketApi";
import {CartList} from "@/entities/bucket/ui/ui/CartList";
import {useAppSelector} from "@/shared/model/hooks";
import {selectUserBucket} from "@/entities/bucket/model/slice";


export const CartButton = () => {
  const {classes} = useStyles();
  const userBucket = useAppSelector(selectUserBucket);
  const {isLoading, error} = useGetUserBucketQuery();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Open Cart">
        <Button color="inherit" onClick={handleOpen}>
          <ShoppingCartIcon/>
        </Button>
      </Tooltip>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        onClose={handleClose}
        transitionDuration={300}
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box style={{width: 400, minHeight: "100%", display: "flex", flexDirection: "column"}}>
            <Box>
              <Button style={{fontSize: "16px", gap: 20, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} onClick={handleClose}>
                <Typography sx={{marginTop: "3px"}} fontSize="inherit">Continue shopping</Typography>
                <ArrowForwardIosIcon fontSize="inherit"/>
              </Button>
              <Divider/>
            </Box>
            <CartList isLoading={isLoading} bucket={userBucket} error={error}/>
            <Box style={{display: "flex", justifyContent: "space-around"}}>
              <Button>Gift to friend</Button>
              <Button>Purchase for myself</Button>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
};