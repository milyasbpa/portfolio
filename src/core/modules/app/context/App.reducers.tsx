import { AppActionEnum, AppActions, AppTheme } from "./App.types";

// Theme
export const AppThemeReducers = (state: AppTheme, action: AppActions) => {
  switch (action.type) {
    case AppActionEnum.SetThemeData:
      return action.payload;

    default:
      return state;
  }
};
