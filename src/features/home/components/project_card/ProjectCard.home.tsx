import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface ProjectCardHomeProps {
  id?: string;
  name?: string;
  company?: string;
  link?: string;
  description?: string;
  skills?: { id: string; name: string }[];
  image_url?: string;
}

export const ProjectCardHome = ({
  id = "",
  name = "",
  link = "",
  description = "",
  skills = [],
  image_url = "",
}: ProjectCardHomeProps) => {
  return (
    <motion.a
      id={id}
      className={clsx(
        "grid grid-cols-1 tablet:grid-cols-[100px_1fr] place-content-start place-items-start gap-[1rem]",
        "w-full",
        "hover:bg-grey90 dark:hover:bg-dark13",
        "rounded-[0.5rem]",
        "px-[1rem] py-[1rem]",
        "opacity-100 dark:opacity-60 dark:hover:opacity-100"
      )}
      aria-label={id}
      href={link}
    >
      <img
        alt={id}
        src={image_url}
        className={clsx(
          "w-[280px] h-[150px] desktop:w-[100px] desktop:h-[50px]",
          "rounded-[0.25rem]"
        )}
      />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.875rem] font-semibold text-dark18 dark:text-white"
          )}
        >
          {name}
        </p>
        <p
          className={clsx(
            "text-[0.875rem] font-medium text-dark18 dark:text-grey80"
          )}
        >
          {description}
        </p>

        <div
          className={clsx(
            "flex flex-wrap items-center justify-start gap-[0.5rem]",
            "w-full"
          )}
        >
          {/* badge */}
          {skills.map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className={clsx(
                "rounded-[0.5rem]",
                "px-[0.5rem] py-[0.25rem]",
                "bg-purple60 dark:bg-purple78",
                "text-[0.75rem] font-semibold text-white"
              )}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
};
