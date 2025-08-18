import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { ProjectCardHome } from "../../components/project_card";
import { GoArrowRight } from "react-icons/go";
import { FaRocket, FaCode, FaStar, FaEye, FaFolderOpen } from "react-icons/fa";

export const ProjectsHome = () => {
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
      id={dictionaries.project.id}
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
          className="absolute top-32 right-20 w-40 h-40 bg-gradient-to-r from-teal-400/8 to-cyan-400/8 rounded-full blur-3xl"
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-16 w-36 h-36 bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-2xl"
          animate={{
            y: [25, -25, 25],
            x: [15, -15, 15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Code pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(20,184,166,0.02)_25px,rgba(20,184,166,0.02)_26px,transparent_27px)] bg-[size:50px_50px] opacity-30" />
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
              "bg-gradient-to-br from-teal-500 to-cyan-600",
              "flex items-center justify-center",
              "shadow-2xl shadow-teal-500/25",
              "border border-white/20"
            )}
          >
            <FaRocket className="text-white text-2xl" />
          </div>
        </motion.div>

        <motion.h2
          className={clsx(
            "text-3xl tablet:text-4xl desktop:text-5xl font-bold",
            "bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600",
            "dark:from-teal-400 dark:via-cyan-400 dark:to-indigo-400",
            "bg-clip-text text-transparent",
            "mb-4 leading-tight"
          )}
        >
          {dictionaries.project.title}
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
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          <div className="w-20 h-px bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500" />
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300" />
        </motion.div>

        {/* Project summary stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: FaCode,
              label: "Projects",
              value: "10++",
              color: "from-teal-500 to-cyan-600",
            },
            {
              icon: FaStar,
              label: "Technologies",
              value: "15++",
              color: "from-cyan-500 to-blue-600",
            },
            {
              icon: FaEye,
              label: "Live Sites",
              value: "8++",
              color: "from-indigo-500 to-purple-600",
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

      {/* Project Cards Grid */}
      <motion.div
        className={clsx(
          "w-full max-w-7xl",
          "grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8",
          "px-2 tablet:px-4"
        )}
        variants={containerVariants}
      >
        {dictionaries.project.items.map((project, projectIndex) => (
          <motion.div
            key={projectIndex}
            variants={itemVariants}
            className="relative"
          >
            <ProjectCardHome
              image_url={project.image_url}
              name={project.name}
              description={project.description}
              skills={project.stack}
              index={projectIndex}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced View More Link */}
      <motion.div variants={itemVariants} className="pt-12 flex justify-center">
        <motion.a
          href={dictionaries.project.cta.primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "group relative overflow-hidden",
            "inline-flex items-center gap-4",
            "px-8 py-4",
            "text-base tablet:text-lg font-semibold",
            "bg-gradient-to-r from-teal-600 to-cyan-600",
            "hover:from-teal-700 hover:to-cyan-700",
            "text-white",
            "rounded-2xl",
            "shadow-xl hover:shadow-2xl",
            "shadow-teal-500/25 hover:shadow-cyan-500/30",
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
            <FaFolderOpen size={14} />
          </motion.div>

          <span className="relative z-10">
            {dictionaries.project.cta.primary.children}
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
