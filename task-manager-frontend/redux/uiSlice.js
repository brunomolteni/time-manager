import { createSlice } from "@reduxjs/toolkit";

import { actions as userActions } from "./userSlice";
import { actions as workActions } from "./workSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    login: {},
    settings: {},
    form: {},
    filter: { selecting: false },
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
    startFiltering: (ui) => {
      ui.filter.selecting = true;
    },
    setFilter: (ui, { payload }) => {
      ui.filter.range = payload;
      ui.filter.selecting = false;
    },
  },
  extraReducers: {
    [userActions.editUser.fulfilled]: (ui) => {
      ui.settings.open = !ui.settings.open;
    },
    [userActions.login.rejected]: (ui, action) => {
      ui.login.error = action.error.message;
    },
    [userActions.login.fulfilled]: (ui) => {
      ui.login = {};
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
