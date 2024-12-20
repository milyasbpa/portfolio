import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { motion } from "framer-motion";
import useIntersectionObserverForIds from "@/core/utils/ui/hooks/useIntersectionObserverForIds";
import Link from "next/link";

export const MenuHome = () => {
  const dictionaries = getDictionaries();
  const ids = dictionaries.hero.menu.items.map((item) => item.id);
  const activeIds = useIntersectionObserverForIds(ids, { threshold: 0.5 });

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      {dictionaries.hero.menu.items.map((menu, menuIndex) => (
        <Link
          href={`#${menu.id}`}
          key={menuIndex}
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <motion.div
            animate={{
              width: activeIds.includes(menu.id) ? "100px" : "50px",
            }}
            className={clsx(
              "h-[1px]",
              "bg-dark18 dark:bg-[white]",
              "rounded-[0.5rem]"
            )}
          />
          <motion.p
            animate={{
              opacity: activeIds.includes(menu.id) ? "100%" : "70%",
              fontWeight: activeIds.includes(menu.id) ? "700" : "600",
            }}
            className={clsx("text-[0.875rem] text-dark18 dark:text-white")}
          >
            {menu.name}
          </motion.p>
        </Link>
      ))}
    </div>
  );
};
