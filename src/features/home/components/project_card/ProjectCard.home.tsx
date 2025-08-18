import * as React from "react";
import clsx from "clsx";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaCode, FaStar, FaGithub } from "react-icons/fa";

export interface ProjectCardHomeProps {
  id?: string;
  name?: string;
  company?: string;
  link?: string;
  description?: string;
  skills?: { id: string; name: string }[];
  image_url?: string;
  index?: number;
}

export const ProjectCardHome = ({
  id = "",
  name = "",
  link = "",
  description = "",
  skills = [],
  image_url = "",
  index = 0,
}: ProjectCardHomeProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [20, -20]);
  const rotateY = useTransform(mouseX, [-300, 300], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotateX: 0 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.05,
        ease: "easeOut"
      }
    })
  };

  const floatingParticles = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.7,
    duration: 3 + i,
    x: [0, 30, -15, 0],
    y: [0, -20, -35, 0]
  }));

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="relative px-6 py-6"
    >
      {/* Floating Particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute inset-4 pointer-events-none overflow-hidden"
          animate={{
            x: particle.x,
            y: particle.y
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          <div 
            className={clsx(
              "w-1 h-1 rounded-full",
              "bg-gradient-to-r from-indigo-400 to-purple-500",
              "opacity-20 group-hover:opacity-40",
              "transition-opacity duration-500"
            )} 
          />
        </motion.div>
      ))}

      {/* Project Number Badge */}
      <motion.div
        className={clsx(
          "absolute -top-4 -left-4 z-20",
          "w-10 h-10 rounded-full",
          "bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600",
          "flex items-center justify-center",
          "text-white text-sm font-bold",
          "shadow-lg shadow-teal-500/25",
          "border-3 border-white/30",
          "backdrop-blur-sm"
        )}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ 
          delay: index * 0.1 + 0.3,
          duration: 0.6,
          type: "spring",
          stiffness: 200
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.div>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          y: -12,
          scale: 1.02,
          transition: { 
            duration: 0.3, 
            ease: "easeOut" 
          }
        }}
        className={clsx(
          "group relative block",
          "w-full p-6 tablet:p-8",
          "bg-white/80 hover:bg-white/95",
          "dark:bg-slate-800/80 dark:hover:bg-slate-700/95",
          "backdrop-blur-xl",
          "rounded-2xl tablet:rounded-3xl",
          "border border-white/30 hover:border-indigo-300/50",
          "dark:border-slate-600/30 dark:hover:border-indigo-500/50",
          "shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-indigo-500/10",
          "dark:shadow-black/20 dark:hover:shadow-indigo-500/20",
          "transition-all duration-500 ease-out",
          "cursor-pointer",
          "transform-gpu",
          "overflow-visible"
        )}
      >
        {/* Animated Background Gradient */}
        <motion.div 
          className={clsx(
            "absolute inset-0 opacity-0 group-hover:opacity-10 overflow-hidden",
            "bg-gradient-to-br from-teal-400 via-indigo-500 to-purple-600",
            "transition-opacity duration-700",
            "rounded-2xl tablet:rounded-3xl"
          )}
          animate={{
            background: [
              "linear-gradient(45deg, #14B8A6, #6366F1, #8B5CF6)",
              "linear-gradient(135deg, #06B6D4, #3B82F6, #6366F1)",
              "linear-gradient(225deg, #8B5CF6, #14B8A6, #06B6D4)",
              "linear-gradient(315deg, #6366F1, #8B5CF6, #14B8A6)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        
        {/* Premium Shine Effect */}
        <motion.div 
          className={clsx(
            "absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "transform -skew-x-12 -translate-x-full group-hover:translate-x-full",
            "transition-all duration-1200 ease-out",
            "rounded-2xl tablet:rounded-3xl"
          )}
        />

        <div className={clsx(
          "relative z-10",
          "grid grid-cols-1 tablet:grid-cols-[120px_1fr] gap-6",
          "items-start"
        )}>
          {/* Enhanced Project Image */}
          <motion.div
            variants={contentVariants}
            className={clsx(
              "order-2 tablet:order-1",
              "relative overflow-hidden rounded-xl",
              "bg-gradient-to-br from-slate-100 to-slate-200",
              "dark:from-slate-700 dark:to-slate-600",
              "ring-1 ring-white/20 hover:ring-indigo-400/30",
              "transition-all duration-300"
            )}
          >
            {/* Project Type Badge */}
            <motion.div
              className={clsx(
                "absolute top-2 right-2 z-10",
                "px-2 py-1 rounded-md",
                "bg-gradient-to-r from-teal-400 to-cyan-500",
                "text-white text-xs font-semibold",
                "shadow-lg"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <FaCode className="w-3 h-3" />
            </motion.div>

            {image_url ? (
              <motion.img
                src={image_url}
                alt={name}
                className={clsx(
                  "w-full h-20 tablet:w-[120px] tablet:h-16 object-cover",
                  "group-hover:scale-110",
                  "transition-transform duration-700"
                )}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <div className={clsx(
                "w-full h-20 tablet:w-[120px] tablet:h-16",
                "flex items-center justify-center",
                "bg-gradient-to-br from-indigo-100 to-purple-100",
                "dark:from-indigo-900/30 dark:to-purple-900/30",
                "text-indigo-600 dark:text-indigo-400"
              )}>
                <FaGithub className="w-6 h-6" />
              </div>
            )}
            
            {/* Image overlay with gradient */}
            <div className={clsx(
              "absolute inset-0 bg-gradient-to-t from-indigo-500/0 to-transparent",
              "group-hover:from-indigo-500/20",
              "transition-all duration-500"
            )} />
          </motion.div>

          {/* Enhanced Content */}
          <motion.div
            variants={contentVariants}
            className={clsx(
              "order-1 tablet:order-2",
              "space-y-4"
            )}
          >
            {/* Project Header */}
            <div className="space-y-2">
              <motion.div 
                className="flex items-center justify-between"
                variants={contentVariants}
              >
                <h3 className={clsx(
                  "text-lg tablet:text-xl font-bold",
                  "bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700",
                  "dark:from-white dark:via-indigo-300 dark:to-purple-300",
                  "bg-clip-text text-transparent",
                  "group-hover:from-indigo-600 group-hover:to-purple-600",
                  "dark:group-hover:from-indigo-200 dark:group-hover:to-purple-200",
                  "transition-all duration-500",
                  "flex items-center gap-3"
                )}>
                  {name}
                  
                  {/* Status Icons */}
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className={clsx(
                        "p-1 rounded-full",
                        "bg-gradient-to-r from-emerald-400 to-teal-500",
                        "text-white"
                      )}
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      title="Live Project"
                    >
                      <FaStar className="w-2.5 h-2.5" />
                    </motion.div>
                    
                    <motion.div
                      className={clsx(
                        "opacity-0 group-hover:opacity-100",
                        "text-indigo-500 dark:text-indigo-400",
                        "transition-all duration-300"
                      )}
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 45 }}
                      title="View Project"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </h3>
              </motion.div>
            </div>

            {/* Enhanced Description */}
            <motion.p
              className={clsx(
                "text-sm tablet:text-base leading-relaxed",
                "text-slate-700 dark:text-slate-300",
                "font-medium",
                "group-hover:text-slate-600 dark:group-hover:text-slate-200",
                "transition-colors duration-300"
              )}
              variants={contentVariants}
            >
              {description}
            </motion.p>

            {/* Premium Skills/Tech Stack */}
            <motion.div
              className={clsx(
                "flex flex-wrap gap-2",
                "pt-2"
              )}
              variants={contentVariants}
            >
              {skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill.id}
                  custom={skillIndex}
                  variants={skillVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1.5",
                    "text-xs font-semibold",
                    "bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600",
                    "hover:from-teal-400 hover:via-cyan-400 hover:to-indigo-500",
                    "text-white",
                    "rounded-lg",
                    "shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-indigo-500/30",
                    "transition-all duration-300",
                    "cursor-default",
                    "border border-white/20"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
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
