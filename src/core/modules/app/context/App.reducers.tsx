"use client";
import { AppActionEnum, AppActions, AppTheme } from "./App.types";

// Theme
export const AppThemeReducers = (state: AppTheme, action: AppActions): AppTheme => {
  switch (action.type) {
    case AppActionEnum.SetThemeData:
      return action.payload;

    case AppActionEnum.ToggleTheme:
      const nextMode = state.mode === "light" ? "dark" : state.mode === "dark" ? "night" : "light";
      return { ...state, mode: nextMode };

    default:
      return state;
  }
};
