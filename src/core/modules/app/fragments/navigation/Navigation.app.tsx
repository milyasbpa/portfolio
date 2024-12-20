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

  const [scrollProgress, setScrollProgress] = React.useState<number>(0);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      </div>

      <div
        className={clsx("bg-purple78", "h-[2px]")}
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};
