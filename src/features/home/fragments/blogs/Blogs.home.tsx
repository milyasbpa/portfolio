import * as React from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { BlogCardHome } from "../../components/blog_card";
import { GoArrowRight } from "react-icons/go";

export const BlogsHome = () => {
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
      id={dictionaries.blog.id}
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
            "bg-gradient-to-r from-accent-emerald to-secondary-500",
            "bg-clip-text text-transparent",
            "mb-2"
          )}
        >
          {dictionaries.blog.title}
        </motion.h2>
        
        {/* Decorative line */}
        <motion.div
          className={clsx(
            "absolute bottom-0 left-0",
            "h-px w-20",
            "bg-gradient-to-r from-accent-emerald to-transparent"
          )}
          initial={{ width: 0 }}
          animate={isInView ? { width: "5rem" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        className={clsx(
          "space-y-6"
        )}
        variants={containerVariants}
      >
        {dictionaries.blog.items.map((blog, blogIndex) => (
          <motion.div
            key={blogIndex}
            variants={itemVariants}
          >
            <BlogCardHome
              title={blog.name}
              description={blog.description}
              image_url={blog.image_url}
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
          href={dictionaries.blog.cta.primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "group inline-flex items-center gap-3",
            "px-6 py-3",
            "text-sm tablet:text-base font-semibold",
            "text-accent-emerald hover:text-accent-emerald/80",
            "bg-accent-emerald/10 hover:bg-accent-emerald/20",
            "border border-accent-emerald/30 hover:border-accent-emerald/50",
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
          <span>{dictionaries.blog.cta.primary.children}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-accent-emerald"
          >
            <GoArrowRight size={18} />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
