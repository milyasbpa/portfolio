import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { ExperienceCardHome } from "../../components/experience_card/ExperienceCard.home";
import { GoArrowRight } from "react-icons/go";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaStar } from "react-icons/fa";

export const ExperiencesHome = () => {
  const dictionaries = getDictionaries();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      id={dictionaries.experience.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(
        "space-y-12",
        "w-full py-16",
        "flex flex-col items-center"
      )}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-xl"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        variants={headerVariants}
        className={clsx(
          "relative",
          "pb-8 mb-12",
          "text-center",
          "w-full max-w-4xl"
        )}
      >
        {/* Header Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={
            isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
          }
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <div
            className={clsx(
              "w-16 h-16 rounded-2xl",
              "bg-gradient-to-br from-indigo-500 to-purple-600",
              "flex items-center justify-center",
              "shadow-2xl shadow-indigo-500/25",
              "border border-white/20"
            )}
          >
            <FaBriefcase className="text-white text-2xl" />
          </div>
        </motion.div>

        <motion.h2
          className={clsx(
            "text-3xl tablet:text-4xl desktop:text-5xl font-bold",
            "bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600",
            "dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400",
            "bg-clip-text text-transparent",
            "mb-4 leading-tight"
          )}
        >
          {dictionaries.experience.title}
        </motion.h2>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center items-center space-x-2 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <div className="w-20 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-300" />
        </motion.div>

        {/* Experience summary stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: FaStar,
              label: "Years",
              value: "5++",
              color: "from-indigo-500 to-blue-600",
            },
            {
              icon: FaBuilding,
              label: "Companies",
              value: "3+",
              color: "from-purple-500 to-pink-600",
            },
            {
              icon: FaCalendarAlt,
              label: "Projects",
              value: "20++",
              color: "from-teal-500 to-cyan-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={clsx(
                "text-center p-4 rounded-xl",
                "bg-white/60 dark:bg-slate-800/60",
                "backdrop-blur-sm border border-white/30 dark:border-slate-700/50",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "group"
              )}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className={clsx(
                  "w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center",
                  `bg-gradient-to-r ${stat.color}`,
                  "text-white shadow-lg"
                )}
              >
                <stat.icon size={12} />
              </div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Experience Cards */}
      <motion.div
        className={clsx("w-full max-w-4xl", "space-y-8")}
        variants={containerVariants}
      >
        {dictionaries.experience.items.map((experience, experienceIndex) => (
          <motion.div
            key={experienceIndex}
            variants={itemVariants}
            className="relative"
          >
            {/* Timeline connector */}
            {experienceIndex < dictionaries.experience.items.length - 1 && (
              <div
                className={clsx(
                  "absolute left-8 -bottom-8 w-px h-8",
                  "bg-gradient-to-b from-indigo-400/50 to-purple-400/30",
                  "z-0"
                )}
              />
            )}

            {/* Enhanced Experience Card Container */}
            <motion.div
              className={clsx(
                "relative overflow-hidden",
                "bg-gradient-to-br from-white/90 via-white/80 to-indigo-50/60",
                "dark:from-slate-800/90 dark:via-slate-800/80 dark:to-indigo-950/60",
                "backdrop-blur-lg",
                "rounded-2xl p-8",
                "border border-white/40 dark:border-slate-700/40",
                "shadow-xl hover:shadow-2xl",
                "transition-all duration-500",
                "group",
                "z-10"
              )}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.05)_1px,transparent_0)] bg-[size:20px_20px] opacity-40" />

              {/* Timeline dot */}
              <motion.div
                className={clsx(
                  "absolute -left-2 top-8",
                  "w-4 h-4 rounded-full",
                  "bg-gradient-to-r from-indigo-500 to-purple-600",
                  "border-4 border-white dark:border-slate-900",
                  "shadow-lg",
                  "z-20"
                )}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + experienceIndex * 0.1,
                }}
              />

              {/* Hover glow effect */}
              <div
                className={clsx(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10",
                  "bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500",
                  "transition-opacity duration-500"
                )}
              />

              <div className="relative z-10">
                <ExperienceCardHome
                  position={experience.position}
                  period={experience.period}
                  description={experience.description}
                  company={experience.company}
                  company_link={experience.company_link}
                  skills={experience.skills}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced View More Link */}
      <motion.div variants={itemVariants} className="pt-12 flex justify-center">
        <motion.a
          id={dictionaries.experience.cta.primary.id}
          href={dictionaries.experience.cta.primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "group relative overflow-hidden",
            "inline-flex items-center gap-4",
            "px-8 py-4",
            "text-base tablet:text-lg font-semibold",
            "bg-gradient-to-r from-indigo-600 to-purple-600",
            "hover:from-indigo-700 hover:to-purple-700",
            "text-white",
            "rounded-2xl",
            "shadow-xl hover:shadow-2xl",
            "shadow-indigo-500/25 hover:shadow-purple-500/30",
            "border border-white/20",
            "backdrop-blur-sm",
            "transition-all duration-300",
            "transform hover:scale-105"
          )}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Icon with animation */}
          <motion.div
            className={clsx(
              "w-6 h-6 rounded-lg",
              "bg-white/20 backdrop-blur-sm",
              "flex items-center justify-center"
            )}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaBriefcase size={14} />
          </motion.div>

          <span className="relative z-10">
            {dictionaries.experience.cta.primary.children}
          </span>

          {/* Animated arrow */}
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white/90"
          >
            <GoArrowRight size={20} />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute top-2 left-4 w-1 h-1 bg-white/40 rounded-full"
              animate={{
                y: [-2, -8, -2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute bottom-3 right-6 w-1 h-1 bg-white/30 rounded-full"
              animate={{
                y: [2, 8, 2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
