"use client";
import * as React from "react";
import clsx from "clsx";
import { MenuApp } from "../fragments/menu";
import { ScrollProgressApp } from "../fragments/scroll_progress";
import { ThemeApp } from "../fragments/theme";
import { LogoApp } from "../fragments/logo";

export interface AppContainer {
  children?: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainer) => {
  return (
    <main
      className={clsx(
        "grid grid-cols-1 justify-center justify-items-center items-start content-start",
        "w-full"
      )}
    >
      <nav
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "fixed",
          "top-0",
          "z-[20]",
          "w-full",
          "px-[1.5rem] desktop:px-0",
          "pt-[1rem]"
        )}
      >
        <div
          className={clsx(
            "absolute",
            "top-0 left-0 right-0",
            "bg-white dark:bg-[#171717]",
            "opacity-80",
            "w-full h-[calc(100%-2px)]"
          )}
        />
        <div
          className={clsx(
            "relative",
            "flex items-center justify-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-end lg:justify-between",
              "w-full max-w-6xl",
              "px-[1rem]"
            )}
          >
            <LogoApp />
            {/* settings */}
            <div className={clsx("flex items-center justify-end gap-[1rem]")}>
              {/* menu */}
              <MenuApp />
              {/* theme */}
              <ThemeApp />
            </div>
          </div>
        </div>

        <ScrollProgressApp />
      </nav>
      {children}
    </main>
  );
};
