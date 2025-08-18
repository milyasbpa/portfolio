import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";

export const AboutHome = () => {
  const dictionaries = getDictionaries();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      id={dictionaries.about.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(
        "space-y-6",
        "w-full py-16"
      )}
    >
      {/* Section Header */}
      <motion.div
        variants={itemVariants}
        className={clsx(
          "relative",
          "pb-4 mb-8",
          "border-b border-neutral-200 dark:border-dark-600"
        )}
      >
        <motion.h2
          className={clsx(
            "text-2xl tablet:text-3xl desktop:text-4xl font-bold",
            "bg-gradient-to-r from-primary-600 to-primary-500",
            "dark:from-primary-400 dark:to-primary-300",
            "bg-clip-text text-transparent",
            "mb-2"
          )}
          dangerouslySetInnerHTML={{
            __html: dictionaries.about.title,
          }}
        />
        
        {/* Decorative line */}
        <motion.div
          className={clsx(
            "absolute bottom-0 left-0",
            "h-px w-20",
            "bg-gradient-to-r from-primary-500 to-transparent"
          )}
          initial={{ width: 0 }}
          animate={isInView ? { width: "5rem" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={itemVariants}
        className={clsx(
          "relative",
          "bg-white/50 dark:bg-dark-800/50",
          "backdrop-blur-sm",
          "rounded-2xl p-6 tablet:p-8",
          "border border-neutral-200/50 dark:border-dark-600/50",
          "shadow-sm hover:shadow-lg",
          "transition-all duration-300",
          "group"
        )}
      >
        {/* Background gradient on hover */}
        <div className={clsx(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5",
          "bg-gradient-to-r from-primary-500 to-secondary-500",
          "transition-opacity duration-500"
        )} />
        
        <motion.p
          className={clsx(
            "relative z-10",
            "text-base tablet:text-lg leading-relaxed",
            "text-neutral-700 dark:text-neutral-300",
            "font-medium"
          )}
          dangerouslySetInnerHTML={{
            __html: dictionaries.about.description,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        
        {/* Decorative elements */}
        <div className={clsx(
          "absolute top-4 right-4",
          "w-2 h-2 rounded-full",
          "bg-primary-400/50",
          "animate-pulse"
        )} />
        <div className={clsx(
          "absolute bottom-4 left-4",
          "w-1 h-1 rounded-full",
          "bg-secondary-400/30",
          "animate-bounce"
        )} />
      </motion.div>
    </motion.div>
  );
};
