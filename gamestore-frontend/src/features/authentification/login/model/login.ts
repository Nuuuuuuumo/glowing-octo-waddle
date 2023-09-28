import {createAsyncThunk} from "@reduxjs/toolkit";

import {LoginRequestData, LoginResponseData} from "./types";
 
import {authApi} from "@/entities/authentification/api/authApi";

export const loginThunk = createAsyncThunk<LoginResponseData, LoginRequestData, {rejectValue: string}>(
  "user/fetchLogin",
  async (loginData, thunkAPI) => {
    try {
      const {data} = await authApi.post(
        "/login",
        loginData
      );
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Something went wrong. Check please entered data");
    }
  }
);