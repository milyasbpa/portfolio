"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context";
import { AppActionEnum } from "../../context/App.types";
import clsx from "clsx";
import { HiSun, HiMoon } from "react-icons/hi";
import { RiMoonClearFill } from "react-icons/ri";

export const ThemeToggle = () => {
  const { state, dispatch } = useContext(AppContext);
  
  const toggleTheme = () => {
    dispatch({ type: AppActionEnum.ToggleTheme });
  };

  const getThemeIcon = () => {
    switch (state.theme.mode) {
      case "light":
        return <HiSun size={18} />;
      case "dark":
        return <HiMoon size={18} />;
      case "night":
        return <RiMoonClearFill size={18} />;
      default:
        return <HiMoon size={18} />;
    }
  };

  const getThemeLabel = () => {
    switch (state.theme.mode) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "night":
        return "Night";
      default:
        return "Dark";
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={clsx(
        "flex items-center justify-center gap-2",
        "w-auto px-4 py-2",
        "rounded-full transition-all duration-300",
        "bg-white/80 hover:bg-white text-slate-700 hover:text-primary-600",
        "dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:text-slate-200 dark:hover:text-primary-400",
        "border border-white/30 dark:border-slate-600/50",
        "shadow-sm hover:shadow-lg backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-transparent"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={`Switch to ${state.theme.mode === "light" ? "dark" : state.theme.mode === "dark" ? "night" : "light"} mode`}
    >
      <motion.div
        key={state.theme.mode}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {getThemeIcon()}
      </motion.div>
      <span className="text-sm font-medium">{getThemeLabel()}</span>
    </motion.button>
  );
};
