import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nookies from "nookies";
import Router from "next/router";

import { config, put, post, del } from "../util";

const asyncActions = {
  editUser: createAsyncThunk("user/edit", async (values, { getState }) => {
    const { id: userId } = getState().user;

    return put(`/api/users/${values.id}`, values).then((newUser) => {
      const { id, hoursPerDay, darkMode, role } = newUser;
      const publicUser = { id, hoursPerDay, darkMode, role: role.type };

      if (values.id === userId) {
        nookies.set(null, "user", JSON.stringify(publicUser), config.COOKIES);
      }

      return publicUser;
    });
  }),
  deleteUser: createAsyncThunk("user/delete", async (id) =>
    del(`/api/users/${id}`)
  ),
  register: createAsyncThunk("user/register", async (credentials) =>
    post("/api/auth/local/register", credentials)
  ),
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
    [asyncActions.editUser.fulfilled]: (user, action) => {
      if (user.id === action.payload.id) {
        return {
          ...user,
          ...action.payload,
        };
      }
    },
    [asyncActions.login.fulfilled]: (user, action) => action.payload,
    [asyncActions.logout.pending]: (user) => {
      user.loggingOut = true;
    },
  },
});

export const actions = { ...userSlice.actions, ...asyncActions };

export default userSlice.reducer;
