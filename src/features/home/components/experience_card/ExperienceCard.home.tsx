import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { FaBuilding, FaExternalLinkAlt, FaClock } from "react-icons/fa";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="relative w-full"
    >
      <motion.a
        href={company_link}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "group relative block w-full p-0",
          "cursor-pointer"
        )}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        {/* Card Content */}
        <div className="space-y-6">
          {/* Header with Period and Company */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4"
          >
            {/* Period Badge */}
            <motion.div
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2",
                "bg-gradient-to-r from-indigo-100 to-purple-100",
                "dark:from-indigo-900/30 dark:to-purple-900/30",
                "rounded-full",
                "border border-indigo-200 dark:border-indigo-800/50",
                "backdrop-blur-sm"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaClock className="text-indigo-600 dark:text-indigo-400 text-sm" />
              <span className={clsx(
                "text-sm font-semibold",
                "text-indigo-700 dark:text-indigo-300"
              )}>
                {period}
              </span>
            </motion.div>

            {/* Company */}
            <motion.div
              className={clsx(
                "inline-flex items-center gap-2 px-4 py-2",
                "bg-gradient-to-r from-teal-100 to-cyan-100",
                "dark:from-teal-900/30 dark:to-cyan-900/30",
                "rounded-full",
                "border border-teal-200 dark:border-teal-800/50",
                "backdrop-blur-sm",
                "hover:scale-105 transition-transform duration-200"
              )}
            >
              <FaBuilding className="text-teal-600 dark:text-teal-400 text-sm" />
              <span className={clsx(
                "text-sm font-semibold",
                "text-teal-700 dark:text-teal-300"
              )}>
                {company}
              </span>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaExternalLinkAlt className="text-teal-500 dark:text-teal-400 text-xs" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Position Title */}
          <motion.div
            variants={cardVariants}
            className="space-y-2"
          >
            <h3 className={clsx(
              "text-xl tablet:text-2xl font-bold",
              "bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700",
              "dark:from-slate-100 dark:via-indigo-300 dark:to-purple-300",
              "bg-clip-text text-transparent",
              "leading-tight"
            )}>
              {position}
            </h3>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={cardVariants}
            className="space-y-3"
          >
            <p className={clsx(
              "text-base tablet:text-lg leading-relaxed",
              "text-slate-700 dark:text-slate-300",
              "font-medium"
            )}>
              {description}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={cardVariants}
            className="space-y-3"
          >
            <motion.div
              className="flex flex-wrap gap-2"
              variants={cardVariants}
            >
              {skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill.id}
                  variants={skillVariants}
                  className={clsx(
                    "inline-block px-3 py-1.5",
                    "text-sm font-semibold",
                    "bg-gradient-to-r from-indigo-500/20 to-purple-500/20",
                    "hover:from-indigo-500/30 hover:to-purple-500/30",
                    "text-indigo-700 dark:text-indigo-300",
                    "border border-indigo-200 dark:border-indigo-800/50",
                    "rounded-full",
                    "backdrop-blur-sm",
                    "transition-all duration-200",
                    "hover:scale-105 hover:-translate-y-0.5"
                  )}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};
