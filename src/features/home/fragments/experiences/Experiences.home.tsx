import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { ExperienceCardHome } from "../../components/experience_card/ExperienceCard.home";
import { GoArrowRight } from "react-icons/go";

export const ExperiencesHome = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      id={dictionaries.experience.id}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
        "w-full min-h-screen",
        "py-[60px]"
      )}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={clsx(
          "text-[1.5rem] text-grey40 dark:text-grey80 font-semibold"
        )}
      >
        {dictionaries.experience.title}
      </motion.h3>
      {dictionaries.experience.items.map((experience, experienceIndex) => (
        <ExperienceCardHome
          key={experienceIndex}
          position={experience.position}
          period={experience.period}
          description={experience.description}
          company={experience.company}
          company_link={experience.company_link}
          skills={experience.skills}
        />
      ))}
      <motion.a
        href={dictionaries.experience.cta.primary.url}
        className={clsx(
          "flex items-center justify-start gap-[0.5rem]",
          "text-[0.75rem] tablet:text-[0.875rem] font-bold text-dark18 dark:text-grey80",
          "opacity-80"
        )}
      >
        {dictionaries.experience.cta.primary.children}
        <GoArrowRight />
      </motion.a>
    </div>
  );
};
