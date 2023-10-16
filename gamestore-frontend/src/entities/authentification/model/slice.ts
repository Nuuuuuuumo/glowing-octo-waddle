import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {normalize, schema} from "normalizr";

import {User} from "@/shared/api";

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};

type NormalizedUsers = Record<number, User>;

export const userSchema = new schema.Entity<User>("users");
export const normalizeUser = (data: User) =>
  normalize<User, { users: NormalizedUsers }>(data, userSchema);
export const normalizeUsers = (data: User[]) =>
  normalize<User, { users: NormalizedUsers }>(data, [userSchema]);

export const initialState: {
  data: NormalizedUsers;
  queryConfig?: QueryConfig;
} = {
  data: {},
  queryConfig: {},
};

export const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
      state.queryConfig = payload;
    },
  },
});