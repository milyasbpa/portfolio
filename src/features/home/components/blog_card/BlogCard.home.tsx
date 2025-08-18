import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";

export interface BlogCardHomeProps {
  id?: string;
  title?: string;
  company?: string;
  company_link?: string;
  description?: string;
  image_url?: string;
}

export const BlogCardHome = ({
  id = "",
  title = "",
  company_link = "",
  description = "",
  image_url = "",
}: BlogCardHomeProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.a
      id={id}
      ref={ref}
      href={company_link}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={clsx(
        "group relative block",
        "w-full p-6 tablet:p-8",
        "bg-white/70 hover:bg-white/90",
        "dark:bg-dark-800/70 dark:hover:bg-dark-700/90",
        "backdrop-blur-sm",
        "rounded-2xl",
        "border border-neutral-200/50 hover:border-primary-300/50",
        "dark:border-dark-600/50 dark:hover:border-primary-500/50",
        "shadow-sm hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        "overflow-hidden"
      )}
    >
      {/* Background Gradient Overlay */}
      <div className={clsx(
        "absolute inset-0 opacity-0 group-hover:opacity-5",
        "bg-gradient-to-br from-accent-emerald via-secondary-500 to-primary-500",
        "transition-opacity duration-500"
      )} />
      
      {/* Shine Effect */}
      <div className={clsx(
        "absolute inset-0 opacity-0 group-hover:opacity-100",
        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "transform -skew-x-12 -translate-x-full group-hover:translate-x-full",
        "transition-all duration-1000 ease-out"
      )} />

      <div className={clsx(
        "relative z-10",
        "grid grid-cols-1 tablet:grid-cols-[140px_1fr] gap-6",
        "items-start"
      )}>
        {/* Blog Image */}
        <motion.div
          variants={cardVariants}
          className={clsx(
            "order-2 tablet:order-1",
            "relative overflow-hidden rounded-xl",
            "bg-gradient-to-br from-neutral-100 to-neutral-200",
            "dark:from-dark-700 dark:to-dark-600"
          )}
        >
          {image_url ? (
            <motion.img
              src={image_url}
              alt={title}
              className={clsx(
                "w-full h-24 tablet:w-[140px] tablet:h-20 object-cover",
                "group-hover:scale-110",
                "transition-transform duration-500"
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className={clsx(
              "w-full h-24 tablet:w-[140px] tablet:h-20",
              "flex items-center justify-center",
              "bg-gradient-to-br from-accent-emerald/20 to-secondary-100",
              "dark:from-accent-emerald/10 dark:to-secondary-900/30",
              "text-accent-emerald dark:text-accent-emerald/70"
            )}>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
              </svg>
            </div>
          )}
          
          {/* Image overlay */}
          <div className={clsx(
            "absolute inset-0 bg-accent-emerald/0 group-hover:bg-accent-emerald/10",
            "transition-colors duration-300"
          )} />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={cardVariants}
          className={clsx(
            "order-1 tablet:order-2",
            "space-y-4"
          )}
        >
          {/* Blog Title */}
          <motion.h3
            className={clsx(
              "text-lg tablet:text-xl font-bold",
              "text-neutral-800 dark:text-neutral-100",
              "group-hover:text-accent-emerald dark:group-hover:text-accent-emerald/90",
              "transition-colors duration-300",
              "flex items-center gap-2"
            )}
            variants={cardVariants}
          >
            {title}
            
            {/* External Link Icon */}
            <motion.svg
              className={clsx(
                "w-4 h-4 opacity-0 group-hover:opacity-100",
                "text-accent-emerald",
                "transition-all duration-300"
              )}
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </motion.h3>

          {/* Description */}
          <motion.p
            className={clsx(
              "text-sm tablet:text-base leading-relaxed",
              "text-neutral-700 dark:text-neutral-300",
              "font-medium"
            )}
            variants={cardVariants}
          >
            {description}
          </motion.p>

          {/* Blog Badge */}
          <motion.div
            className={clsx(
              "flex items-center gap-2",
              "pt-2"
            )}
            variants={cardVariants}
          >
            <span className={clsx(
              "inline-block px-3 py-1.5",
              "text-xs font-semibold",
              "bg-gradient-to-r from-accent-emerald to-secondary-500",
              "text-white",
              "rounded-lg",
              "shadow-sm"
            )}>
              Blog Post
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.a>
  );
};
