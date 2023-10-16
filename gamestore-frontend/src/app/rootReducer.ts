import { combineReducers } from "@reduxjs/toolkit";

import {baseApi} from "@/shared/api/baseAPI";
import {sessionSlice} from "@/entities/authentification/model/slice";


export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
