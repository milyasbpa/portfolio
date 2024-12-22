import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionaries } from "../../i18n";
import useIntersectionObserverForIds from "@/core/utils/ui/hooks/useIntersectionObserverForIds";

export const MenuApp = () => {
  const dictionaries = getDictionaries();
  const ids = dictionaries.navigation.menu.items.map((item) => item.id);
  const activeIds = useIntersectionObserverForIds(ids, { threshold: 0.5 });
  return (
    <div
      className={clsx("hidden lg:flex items-center justify-start gap-[1rem]")}
    >
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
            className={clsx("text-[0.875rem] text-dark18 dark:text-white")}
          >
            {menu.name}
          </motion.p>
        </Link>
      ))}
    </div>
  );
};
