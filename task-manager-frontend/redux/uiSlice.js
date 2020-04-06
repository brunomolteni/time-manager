import { createSlice } from "@reduxjs/toolkit";

import { actions as userActions } from "./userSlice";
import { actions as workActions } from "./workSlice";

import { dateRange } from "../util";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    login: {
      error: false,
    },
    register: {
      done: false,
      error: false,
    },
    settings: {
      open: false,
    },
    form: {
      open: false,
      editing: false,
    },
    filter: {
      selecting: false,
      searching: false,
      range: dateRange(7), // by default show the past week
    },
  },
  reducers: {
    toggleSettings: (ui) => {
      ui.settings.open = !ui.settings.open;
    },
    toggleForm: (ui) => {
      ui.form.open = !ui.form.open;
    },
    startEditing: (ui, { payload }) => {
      ui.form.open = true;
      ui.form.editing = payload;
    },
    finishEditing: (ui) => {
      ui.form.open = false;
      ui.form.editing = false;
    },
    toggleFiltering: (ui) => {
      ui.filter.selecting = !ui.filter.selecting;
    },
    setFilter: (ui, { payload }) => {
      ui.filter.range = payload;
      ui.filter.selecting = false;
      ui.filter.searching = true;
    },
  },
  extraReducers: {
    [userActions.editUser.fulfilled]: (ui) => {
      ui.settings.open = false;
      ui.form.open = false;
    },
    [userActions.login.rejected]: (ui, action) => {
      ui.login.error = action.error.message;
    },
    [userActions.login.fulfilled]: (ui) => {
      ui.login = {};
    },
    [userActions.register.rejected]: (ui, action) => {
      ui.register.error = action.error.message;
    },
    [userActions.register.fulfilled]: (ui) => {
      ui.register.done = true;
    },
    [userActions.deleteUser.pending]: (ui) => {
      ui.form.deleting = true;
    },
    [userActions.deleteUser.fulfilled]: (ui) => {
      ui.form.open = false;
      ui.form.deleting = false;
    },
    [workActions.createWork.fulfilled]: (ui) => {
      ui.form.open = false;
    },
    [workActions.editWork.fulfilled]: (ui) => {
      ui.form.open = false;
      ui.form.editing = false;
    },
    [workActions.deleteWork.pending]: (ui) => {
      ui.form.deleting = true;
    },
    [workActions.deleteWork.fulfilled]: (ui) => {
      ui.form.open = false;
      ui.form.deleting = false;
    },
  },
});

export const actions = uiSlice.actions;

export default uiSlice.reducer;
