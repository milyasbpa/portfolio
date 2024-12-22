"use client";
import * as React from "react";
import clsx from "clsx";
import { ScrollProgressApp } from "../../components/scroll_progress";
import { ThemeApp } from "../theme";
import { MenuApp } from "../menu";

export const NavigationApp = () => {
  return (
    <nav
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "fixed",
        "top-0",
        "z-[20]",
        "w-full",
        "opacity-80",
        "px-[1.5rem] desktop:px-0",
        "pt-[1rem]",
        "bg-white dark:bg-[#171717]"
      )}
    >
      <div className={clsx("flex items-center justify-center", "w-full")}>
        <div
          className={clsx(
            "flex items-center justify-end lg:justify-between",
            "w-full max-w-6xl",
            "px-[1rem]"
          )}
        >
          {/* menu */}
          <MenuApp />
          {/* settings */}
          <div className={clsx("flex items-center justify-end gap-[1rem]")}>
            {/* theme */}
            <ThemeApp />
          </div>
        </div>
      </div>

      <ScrollProgressApp />
    </nav>
  );
};
