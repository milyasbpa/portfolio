'use client'
import * as React from "react";
import clsx from "clsx";
import { NavigationApp } from "../fragments/navigation";
import { AppProvider } from "../context";

export interface AppContainer {
  children?: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainer) => {
  return (
    <AppProvider>
      <main
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center items-start content-start",
          "w-full"
        )}
      >
        <NavigationApp />
        {children}
      </main>
    </AppProvider>
  );
};
