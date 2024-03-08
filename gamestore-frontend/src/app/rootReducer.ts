import {combineReducers} from "@reduxjs/toolkit";

import {baseApi} from "@/shared/api/baseAPI";
import {sessionSlice} from "@/entities/authentification/model/slice";
import {bucketSlice} from "@/entities/bucket/model/slice";


export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [bucketSlice.name]: bucketSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
