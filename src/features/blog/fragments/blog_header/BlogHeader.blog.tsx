import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useBlogContext } from "../../i18n";

export const BlogHeader = () => {
  const { dictionaries } = useBlogContext();

  return (
    <motion.header
      className={clsx(
        "sticky top-0 z-50",
        "bg-white/80 dark:bg-slate-800/80",
        "backdrop-blur-xl border-b border-white/20",
        "dark:border-slate-700/50"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full sm:container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Back to Home */}
          <Link
            href="/"
            className={clsx(
              "group flex items-center gap-2 px-2 sm:px-3 py-2",
              "text-slate-600 hover:text-indigo-600",
              "dark:text-slate-300 dark:hover:text-indigo-400",
              "transition-all duration-300",
              "rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50",
              "flex-shrink-0"
            )}
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-medium text-sm hidden sm:inline">
              {dictionaries.navigation.home}
            </span>
          </Link>

          {/* Blog Title */}
          <div className="flex-1 min-w-0">
            <h1 className={clsx(
              "text-base sm:text-lg md:text-xl font-bold",
              "bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600",
              "dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400",
              "bg-clip-text text-transparent",
              "line-clamp-1"
            )}>
              {dictionaries.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 hidden sm:block">
              {dictionaries.subtitle}
            </p>
          </div>

          {/* Home Icon */}
          <Link
            href="/"
            className={clsx(
              "p-2 sm:p-3 rounded-xl flex-shrink-0",
              "bg-gradient-to-r from-indigo-500 to-purple-600",
              "hover:from-indigo-600 hover:to-purple-700",
              "text-white shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "transform hover:scale-105",
              "hidden sm:block"
            )}
          >
            <FaHome className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
