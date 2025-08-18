"use client";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";
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

const mainReducer = (
  state: AppInitialStateType,
  action: AppActions
): AppInitialStateType => ({
  theme: AppThemeReducers(state.theme, action),
});

const AppProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [mounted, setMounted] = React.useState(false);

  // Ensure the theme provider only renders after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", state.theme.mode);

      // Also set class for compatibility
      const classList = document.documentElement.classList;
      classList.remove("light", "dark", "night");
      classList.add(state.theme.mode);
    }
  }, [state.theme.mode, mounted]);

  if (!mounted) {
    return <div className="invisible">{props.children}</div>; // Prevent rendering until mounted
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={state.theme.mode}
      themes={["light", "dark", "night"]}
      enableSystem={false}
    >
      <AppContext.Provider value={{ state, dispatch }}>
        {props.children}
      </AppContext.Provider>
    </NextThemesProvider>
  );
};

export { AppProvider, AppContext };
