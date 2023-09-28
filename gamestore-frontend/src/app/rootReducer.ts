import { combineReducers } from "@reduxjs/toolkit";

import {userSlice} from "@/entities/authentification/model/slice";


export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});
