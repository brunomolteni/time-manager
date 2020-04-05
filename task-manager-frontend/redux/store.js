import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workReducer from "./workSlice";
import uiReducer from "./uiSlice";

export const makeStore = (preloadedState) => {
  return configureStore({
    reducer: {
      user: userReducer,
      work: workReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
};
