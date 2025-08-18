import * as React from "react";
import clsx from "clsx";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { FaCode, FaRocket, FaUsers, FaLightbulb } from "react-icons/fa";

export const AboutHome = () => {
  const dictionaries = getDictionaries();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Mouse tracking for card hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const highlights = [
    {
      icon: FaCode,
      title: "5++ Years",
      subtitle: "Development Experience",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: FaUsers,
      title: "25-30 People",
      subtitle: "Team Management",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: FaRocket,
      title: "100,000++",
      subtitle: "Users Reached",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FaLightbulb,
      title: "Innovation",
      subtitle: "Driven Solutions",
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <motion.div
      id={dictionaries.about.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(
        "space-y-8",
        "w-full py-16",
        "flex flex-col items-center"
      )}
    >
      {/* Section Header */}
      <motion.div
        variants={itemVariants}
        className={clsx(
          "relative",
          "pb-6 mb-12",
          "text-center",
          "w-full max-w-4xl"
        )}
      >
        <motion.h2
          className={clsx(
            "text-3xl tablet:text-4xl desktop:text-5xl font-bold",
            "bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600",
            "dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400",
            "bg-clip-text text-transparent",
            "mb-4 leading-tight"
          )}
          dangerouslySetInnerHTML={{
            __html: dictionaries.about.title,
          }}
        />
        
        {/* Decorative elements */}
        <motion.div
          className="flex justify-center items-center space-x-2 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-300" />
        </motion.div>
      </motion.div>

      {/* Highlight Stats */}
      <motion.div
        variants={itemVariants}
        className={clsx(
          "w-full max-w-5xl",
          "grid grid-cols-2 tablet:grid-cols-4 gap-4 mb-12",
          "px-4"
        )}
      >
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            variants={iconVariants}
            className={clsx(
              "relative p-4 rounded-xl",
              "bg-white/80 dark:bg-slate-800/80",
              "backdrop-blur-sm border border-white/30 dark:border-slate-700/50",
              "shadow-lg hover:shadow-xl",
              "group cursor-pointer",
              "transform hover:scale-105 transition-all duration-300",
              "mx-auto w-full max-w-[200px]"
            )}
            whileHover={{ y: -5 }}
          >
            <div className="text-center space-y-2">
              <div className={clsx(
                "w-10 h-10 mx-auto rounded-full flex items-center justify-center",
                `bg-gradient-to-r ${highlight.color}`,
                "text-white shadow-lg"
              )}>
                <highlight.icon size={16} />
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {highlight.title}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {highlight.subtitle}
              </div>
            </div>
            
            {/* Hover glow effect */}
            <div className={clsx(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20",
              `bg-gradient-to-r ${highlight.color}`,
              "transition-opacity duration-300"
            )} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        variants={itemVariants}
        className={clsx(
          "relative overflow-hidden",
          "bg-gradient-to-br from-white/90 via-white/80 to-indigo-50/80",
          "dark:from-slate-800/90 dark:via-slate-800/80 dark:to-indigo-950/80",
          "backdrop-blur-lg",
          "rounded-3xl p-8 tablet:p-12",
          "border border-white/40 dark:border-slate-700/40",
          "shadow-2xl hover:shadow-3xl",
          "transition-all duration-500",
          "group",
          "w-full max-w-5xl",
          "mx-auto"
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-lg"
            animate={{
              y: [10, -10, 10],
              x: [5, -5, 5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.1)_1px,transparent_0)] bg-[size:24px_24px] opacity-30" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.p
            className={clsx(
              "text-lg tablet:text-xl leading-relaxed",
              "text-slate-700 dark:text-slate-300",
              "font-medium mb-8",
              "max-w-4xl mx-auto text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.about.description,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          
          {/* Tech skills highlight */}
          <motion.div
            className={clsx(
              "flex flex-wrap gap-3 justify-center items-center",
              "max-w-4xl mx-auto"
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {["React.JS", "Vue.JS", "Next.JS", "Node.JS", "Firebase", "GCP", "AWS"].map((tech, index) => (
              <motion.span
                key={tech}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-semibold",
                  "bg-gradient-to-r from-indigo-500/20 to-purple-500/20",
                  "text-indigo-700 dark:text-indigo-300",
                  "border border-indigo-200 dark:border-indigo-800",
                  "backdrop-blur-sm",
                  "hover:scale-110 transition-transform duration-200"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-br-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-teal-400/10 to-transparent rounded-tl-3xl" />
      </motion.div>
    </motion.div>
  );
};
