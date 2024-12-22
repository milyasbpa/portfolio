import * as React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import useIntersectionObserverForIds from "@/core/utils/ui/hooks/useIntersectionObserverForIds";

export const MenuDropdownApp = () => {
  const dictionaries = getDictionaries();
  const ids = dictionaries.navigation.menu.items.map((item) => item.id);
  const activeIds = useIntersectionObserverForIds(ids, { threshold: 0.5 });
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className={clsx("relative")}>
      {/* Dropdown Button */}
      <button
        className={clsx(
          "w-[2rem] h-[2rem]",
          "lg:hidden flex flex-col items-center justify-center gap-[0.125rem]",
          "rounded-[0.5rem]",
          "dark:text-white text-dark25",
          "border border-grey80 dark:border-dark18"
        )}
        onClick={toggleMenu}
      >
        {/* Top Line */}
        <motion.div
          className={clsx(
            "w-[1rem] h-[2px]",
            "bg-dark25 dark:bg-white",
            "rounded-[0.125rem]"
          )}
          animate={isOpen ? { rotate: 45, y: 4, x: 0 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        {/* Middle Line */}
        <motion.div
          className={clsx(
            "w-[1rem] h-[2px]",
            "bg-dark25 dark:bg-white",
            "rounded-[0.125rem]"
          )}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Bottom Line */}
        <motion.div
          className={clsx(
            "w-[1rem] h-[2px]",
            "bg-dark25 dark:bg-white",
            "rounded-[0.125rem]"
          )}
          animate={isOpen ? { rotate: -45, y: -4, x: 0 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            "fixed top-[66px] left-0 right-0",
            "w-full",
            "p-4",
            "bg-dark08",
            "rounded-[0px]",
            "shadow-lg"
            // "border border-grey80 dark:border-dark18"
          )}
        >
          <ul className="flex flex-col gap-2">
            {dictionaries.navigation.menu.items.map((menu, menuIndex) => (
              <li key={menuIndex}>
                <motion.a
                  href={`#${menu.id}`}
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
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};
