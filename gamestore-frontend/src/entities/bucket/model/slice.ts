import {createSlice} from "@reduxjs/toolkit";

import {Bucket} from "@/entities/bucket/model/types";
import {bucketApi} from "@/entities/bucket/api/bucketApi";

type BucketSliceState = {
  data: null | Bucket,
};

const initialState: BucketSliceState = {
  data: null,
};

export const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    clearBucketData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(bucketApi.endpoints.getUserBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
    builder.addMatcher(bucketApi.endpoints.addGameToBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
    builder.addMatcher(bucketApi.endpoints.deleteGameFromBucket.matchFulfilled, (state: BucketSliceState, {payload}) => {
      state.data = payload;
    });
  },
});

export const selectUserBucket = (state: RootState) => {
  return state.bucket.data;
};


export const {clearBucketData} = bucketSlice.actions;