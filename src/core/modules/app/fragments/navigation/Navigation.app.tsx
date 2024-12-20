"use client";
import * as React from "react";
import clsx from "clsx";
import { AppActionEnum, AppContext } from "../../context";
import { FaMoon, FaSun } from "react-icons/fa";

export const NavigationApp = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const darkMode = state.theme.mode === "dark";

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleClickThemeMode = () => {
    dispatch({
      type: AppActionEnum.SetThemeData,
      payload: {
        ...state.theme,
        mode: state.theme.mode === "dark" ? "light" : "dark",
      },
    });
  };
  return (
    <nav
      className={clsx(
        "flex items-center justify-center",
        "fixed",
        "top-0",
        "z-[20]",
        "w-full",
        "h-[60px]",
        "px-[1.5rem] desktop:px-0",
        "bg-white dark:bg-[#171717]"
      )}
    >
      <div
        className={clsx("flex items-center justify-end", "w-full max-w-6xl")}
      >
        <button
          className={clsx(
            "w-[2rem] h-[2rem]",
            "flex items-center justify-center",
            "rounded-[0.5rem]",
            darkMode ? "text-white" : "text-dark25",
            "border border-grey80 dark:border-dark18"
          )}
          aria-label="theme"
          onClick={handleClickThemeMode}
        >
          {darkMode ? <FaMoon size={16} /> : <FaSun size={16} />}
        </button>
      </div>
    </nav>
  );
};
