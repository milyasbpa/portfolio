import * as React from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeApp = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleClickSetTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button
      className={clsx(
        "w-[2rem] h-[2rem]",
        "flex items-center justify-center",
        "rounded-[0.5rem]",
        "dark:text-white text-dark25",
        "border border-grey80 dark:border-dark18"
      )}
      aria-label="theme"
      onClick={handleClickSetTheme}
    >
      {theme === "dark" ? <FaMoon size={16} /> : <FaSun size={16} />}
    </button>
  );
};
