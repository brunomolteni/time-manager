import { createSlice } from "@reduxjs/toolkit";

import { actions as userActions } from "./userSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: { login: {}, settings: {}, form: {}, filter: {} },
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
  },
  extraReducers: {
    [userActions.edit.fulfilled]: (ui) => {
      ui.settings.open = !ui.settings.open;
    },
    [userActions.login.rejected]: (ui, action) => {
      ui.login.error = action.error.message;
    },
    [userActions.login.fulfilled]: (ui) => {
      ui.login = {};
    },
  },
});

export const actions = uiSlice.actions;

export default uiSlice.reducer;
