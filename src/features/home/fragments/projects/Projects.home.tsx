import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { ProjectCardHome } from "../../components/project_card";
import { GoArrowRight } from "react-icons/go";

export const ProjectsHome = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      id={dictionaries.project.id}
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
        className={clsx("text-[1.5rem] text-grey40 dark:text-grey80 font-semibold")}
      >
        {dictionaries.project.title}
      </motion.h3>
      {dictionaries.project.items.map((project, projectIndex) => (
        <ProjectCardHome
          key={projectIndex}
          image_url={project.image_url}
          name={project.name}
          description={project.description}
          skills={project.stack}
        />
      ))}
      <motion.a
        href={dictionaries.project.cta.primary.url}
        className={clsx(
          "flex items-center justify-start gap-[0.5rem]",
          "text-[0.75rem] tablet:text-[0.875rem] font-bold text-dark18 dark:text-grey80",
          "opacity-80"
        )}
      >
        {dictionaries.project.cta.primary.children}
        <GoArrowRight />
      </motion.a>
    </div>
  );
};
