import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";

export interface ExperienceCardHomeProps {
  id?: string;
  position?: string;
  period?: string;
  company?: string;
  company_link?: string;
  description?: string;
  skills?: { id: string; name: string }[];
}

export const ExperienceCardHome = ({
  id = "",
  position = "",
  period = "",
  company = "",
  company_link = "",
  description = "",
  skills = [],
}: ExperienceCardHomeProps) => {
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
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
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
        "bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600",
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
        "grid grid-cols-1 tablet:grid-cols-[120px_1fr] gap-6",
        "items-start"
      )}>
        {/* Period */}
        <motion.div
          variants={cardVariants}
          className={clsx(
            "order-2 tablet:order-1"
          )}
        >
          <span
            className={clsx(
              "inline-block px-3 py-1.5",
              "text-sm font-semibold",
              "bg-primary-100 text-primary-800",
              "dark:bg-primary-900/30 dark:text-primary-300",
              "rounded-lg",
              "border border-primary-200",
              "dark:border-primary-700/50"
            )}
          >
            {period}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={cardVariants}
          className={clsx(
            "order-1 tablet:order-2",
            "space-y-4"
          )}
        >
          {/* Position & Company */}
          <div className="space-y-2">
            <motion.h3
              className={clsx(
                "text-lg tablet:text-xl font-bold",
                "text-neutral-800 dark:text-neutral-100",
                "group-hover:text-primary-600 dark:group-hover:text-primary-400",
                "transition-colors duration-300"
              )}
              variants={cardVariants}
            >
              {position}
            </motion.h3>
            
            <motion.p
              className={clsx(
                "text-base font-semibold",
                "text-neutral-600 dark:text-neutral-400",
                "flex items-center gap-2"
              )}
              variants={cardVariants}
            >
              <span>at</span>
              <span className={clsx(
                "text-primary-600 dark:text-primary-400",
                "group-hover:text-primary-500",
                "transition-colors duration-300"
              )}>
                {company}
              </span>
              
              {/* External Link Icon */}
              <motion.svg
                className={clsx(
                  "w-4 h-4 opacity-0 group-hover:opacity-100",
                  "text-primary-500",
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
            </motion.p>
          </div>

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

          {/* Skills */}
          <motion.div
            className={clsx(
              "flex flex-wrap gap-2",
              "pt-2"
            )}
            variants={cardVariants}
          >
            {skills.map((skill, skillIndex) => (
              <motion.span
                key={skill.id}
                variants={skillVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className={clsx(
                  "inline-block px-3 py-1.5",
                  "text-xs font-semibold",
                  "bg-gradient-to-r from-primary-500 to-primary-600",
                  "dark:from-primary-600 dark:to-primary-700",
                  "text-white",
                  "rounded-lg",
                  "shadow-sm hover:shadow-md",
                  "transition-all duration-200",
                  "cursor-default"
                )}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.a>
  );
};
