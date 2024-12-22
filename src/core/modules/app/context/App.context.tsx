"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { AppActions, AppInitialStateType } from "./App.types";
import { AppThemeReducers } from "./App.reducers";

import { ThemeProvider as NextThemesProvider } from "next-themes";

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
  const [mounted, setMounted] = React.useState(false);

  // Ensure the theme provider only renders after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="invisible">{props.children}</div>; // Prevent rendering until mounted
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <AppContext.Provider value={{ state, dispatch }}>
        {props.children}
      </AppContext.Provider>
    </NextThemesProvider>
  );
};

export { AppProvider, AppContext };
