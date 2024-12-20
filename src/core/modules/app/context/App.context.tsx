import React, { createContext, useReducer, Dispatch } from "react";
import { AppActions, AppInitialStateType } from "./App.types";
import { AppThemeReducers } from "./App.reducers";

const initialState: AppInitialStateType = {
  theme: {
    mode: "dark",
  },
};

const AppContext = createContext<{
  state: AppInitialStateType;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ theme }: AppInitialStateType, action: AppActions) => ({
  theme: AppThemeReducers(theme, action),
});

const AppProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
