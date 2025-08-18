import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { useBlogContext } from "../../i18n";

export const BlogNavigation = () => {
  const { dictionaries } = useBlogContext();

  return (
    <motion.nav
      className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-700/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Previous Post */}
        <div className="flex-1">
          {/* Placeholder for previous post - you can implement this later */}
          <div className="opacity-50 cursor-not-allowed">
            <div className={clsx(
              "flex items-center gap-3 p-4",
              "bg-slate-100/50 dark:bg-slate-800/50",
              "rounded-xl border border-slate-200/50 dark:border-slate-700/50"
            )}>
              <FaArrowLeft className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  {dictionaries.navigation.previous}
                </div>
                <div className="text-sm text-slate-400">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className={clsx(
            "group flex items-center justify-center",
            "w-12 h-12 rounded-full",
            "bg-gradient-to-r from-indigo-500 to-purple-600",
            "hover:from-indigo-600 hover:to-purple-700",
            "text-white shadow-lg hover:shadow-xl",
            "transition-all duration-300",
            "transform hover:scale-110"
          )}
        >
          <FaHome className="w-5 h-5" />
        </Link>

        {/* Next Post */}
        <div className="flex-1">
          {/* Placeholder for next post - you can implement this later */}
          <div className="opacity-50 cursor-not-allowed">
            <div className={clsx(
              "flex items-center justify-end gap-3 p-4",
              "bg-slate-100/50 dark:bg-slate-800/50",
              "rounded-xl border border-slate-200/50 dark:border-slate-700/50"
            )}>
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  {dictionaries.navigation.next}
                </div>
                <div className="text-sm text-slate-400">
                  Coming Soon
                </div>
              </div>
              <FaArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
