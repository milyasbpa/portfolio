import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { ExperienceCardHome } from "../../components/experience_card/ExperienceCard.home";
import { GoArrowRight } from "react-icons/go";

export const ExperiencesHome = () => {
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
      id={dictionaries.experience.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(
        "space-y-8",
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
        >
          {dictionaries.experience.title}
        </motion.h2>
        
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

      {/* Experience Cards */}
      <motion.div
        className={clsx(
          "space-y-6"
        )}
        variants={containerVariants}
      >
        {dictionaries.experience.items.map((experience, experienceIndex) => (
          <motion.div
            key={experienceIndex}
            variants={itemVariants}
          >
            <ExperienceCardHome
              position={experience.position}
              period={experience.period}
              description={experience.description}
              company={experience.company}
              company_link={experience.company_link}
              skills={experience.skills}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View More Link */}
      <motion.div
        variants={itemVariants}
        className="pt-8"
      >
        <motion.a
          id={dictionaries.experience.cta.primary.id}
          href={dictionaries.experience.cta.primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "group inline-flex items-center gap-3",
            "px-6 py-3",
            "text-sm tablet:text-base font-semibold",
            "text-primary-600 hover:text-primary-500",
            "dark:text-primary-400 dark:hover:text-primary-300",
            "bg-primary-50 hover:bg-primary-100",
            "dark:bg-primary-900/20 dark:hover:bg-primary-900/30",
            "border border-primary-200 hover:border-primary-300",
            "dark:border-primary-700/50 dark:hover:border-primary-600/50",
            "rounded-xl",
            "transition-all duration-300",
            "transform hover:scale-105 hover:shadow-lg"
          )}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{dictionaries.experience.cta.primary.children}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-primary-500"
          >
            <GoArrowRight size={18} />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
