import { createSlice} from "@reduxjs/toolkit";

import {loginThunk} from "@/features/authentification/login/model/login";
import {UserSliceState} from "@/entities/authentification/model/types";


const initialState: UserSliceState = {
  data: null,
  profileData: null,
  status: statusTypes.INIT,
  errorMessage: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.status = statusTypes.LOADING;
      state.data = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
      state.status = statusTypes.SUCCESS;
      state.data = {...payload};
      state.errorMessage = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.status = statusTypes.ERROR;
      state.errorMessage = action.payload;
    });
  }});

