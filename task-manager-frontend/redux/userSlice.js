import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nookies from "nookies";
import { put, post } from "../util";
import Router from "next/router";

import { config } from "../util";

const asyncActions = {
  edit: createAsyncThunk("user/edit", async (settings, { getState }) => {
    const { id } = getState().user;
    const newUser = { ...settings, id };

    await put(`/api/users/${id}`, settings);
    nookies.set(null, "user", JSON.stringify(newUser), config.COOKIES);
    return newUser;
  }),
  login: createAsyncThunk("user/login", async (credentials) => {
    return post("/api/login", credentials).then((user) => {
      Router.push("/");
      return user;
    });
  }),
  logout: createAsyncThunk("user/logout", async () => {
    await post("/api/logout");
    Router.push("/login");
    return { success: true };
  }),
};

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    init: (user, action) => action.payload,
  },
  extraReducers: {
    [asyncActions.edit.fulfilled]: (user, action) => ({
      ...user,
      ...action.payload,
    }),
    [asyncActions.login.fulfilled]: (user, action) => action.payload,
    [asyncActions.logout.pending]: (user) => {
      user.loggingOut = true;
    },
  },
});

export const actions = { ...userSlice.actions, ...asyncActions };

export default userSlice.reducer;
