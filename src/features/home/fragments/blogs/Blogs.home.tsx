import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { BlogCardHome } from "../../components/blog_card";
import { GoArrowRight } from "react-icons/go";

export const BlogsHome = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      id={dictionaries.blog.id}
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
        {dictionaries.blog.title}
      </motion.h3>
      {dictionaries.blog.items.map((project, projectIndex) => (
        <BlogCardHome
          key={projectIndex}
          title={project.name}
          description={project.description}
          image_url={project.image_url}
        />
      ))}
      <motion.a
        href={dictionaries.blog.cta.primary.url}
        className={clsx(
          "flex items-center justify-start gap-[0.5rem]",
          "text-[0.75rem] tablet:text-[0.875rem] font-bold text-dark18 dark:text-grey80",
          "opacity-80"
        )}
      >
        {dictionaries.blog.cta.primary.children}
        <GoArrowRight />
      </motion.a>
    </div>
  );
};
