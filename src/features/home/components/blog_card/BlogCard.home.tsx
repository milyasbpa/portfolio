import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface BlogCardHomeProps {
  id?: string;
  title?: string;
  company?: string;
  company_link?: string;
  description?: string;

  image_url?: string;
}

export const BlogCardHome = ({
  id = "",
  title = "",
  company_link = "",
  description = "",
  image_url = "",
}: BlogCardHomeProps) => {
  return (
    <motion.a
      id={id}
      className={clsx(
        "grid grid-cols-1 tablet:grid-cols-[100px_1fr] place-content-start place-items-start gap-[1rem]",
        "w-full",
        "hover:bg-grey90 dark:hover:bg-dark13",
        "rounded-[0.5rem]",
        "px-[1rem] py-[1rem]"
      )}
      aria-label={id}
      href={company_link}
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
          {title}
        </p>
        <p
          className={clsx(
            "text-[0.875rem] font-medium text-dark18 dark:text-grey80"
          )}
        >
          {description}
        </p>
      </div>
    </motion.a>
  );
};
