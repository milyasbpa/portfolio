"use client";
import * as React from "react";
import clsx from "clsx";
import { AppActionEnum, AppContext } from "../../context";
import { FaMoon, FaSun } from "react-icons/fa";
import { ScrollProgressApp } from "../../components/scroll_progress";
import Link from "next/link";
import { getDictionaries } from "../../i18n";
import useIntersectionObserverForIds from "@/core/utils/ui/hooks/useIntersectionObserverForIds";
import { motion } from "framer-motion";

export const NavigationApp = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const dictionaries = getDictionaries();
  const ids = dictionaries.navigation.menu.items.map((item) => item.id);
  const activeIds = useIntersectionObserverForIds(ids, { threshold: 0.5 });
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
            "flex items-center justify-between",
            "w-full max-w-6xl",
            "px-[1rem]"
          )}
        >
          {/* menu */}
          <div className={clsx("flex items-center justify-start gap-[1rem]")}>
            {dictionaries.navigation.menu.items.map((menu, menuIndex) => (
              <Link
                href={`#${menu.id}`}
                key={menuIndex}
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
                )}
              >
                <motion.p
                  animate={{
                    opacity: activeIds.includes(menu.id) ? "100%" : "70%",
                    fontWeight: activeIds.includes(menu.id) ? "700" : "600",
                  }}
                  whileHover={{
                    opacity: "100%",
                  }}
                  className={clsx(
                    "text-[0.875rem] text-dark18 dark:text-white"
                  )}
                >
                  {menu.name}
                </motion.p>
              </Link>
            ))}
          </div>
          {/* settings */}
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

      <ScrollProgressApp />
    </nav>
  );
};
