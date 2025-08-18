import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { getDictionaries } from "../../i18n";
import { BlogCardHome } from "../../components/blog_card";
import { GoArrowRight } from "react-icons/go";
import { FaBlog, FaBookOpen, FaEdit, FaEye } from "react-icons/fa";
import {
  getBlogMetadataForClient,
  formatDate,
  type BlogMetadata,
} from "@/features/blog/utils/blogClient";

export const BlogsHome = () => {
  const dictionaries = getDictionaries();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State untuk blog data
  const [blogs, setBlogs] = React.useState<BlogMetadata[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch blog data saat komponen dimount
  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogMetadataForClient(4); // Limit 4 blog untuk homepage
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
      id={dictionaries.blog.id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(
        "relative w-full py-20",
        "flex flex-col items-center",
        "bg-gradient-to-br from-slate-50/50 via-white/30 to-indigo-50/50",
        "dark:from-slate-900/50 dark:via-slate-800/30 dark:to-indigo-950/50"
      )}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-20 -left-20 w-40 h-40 bg-teal-400/10 dark:bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-32 -right-32 w-60 h-60 bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 15, -25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(20,184,166,0.05)_1px,transparent_0)] bg-[size:48px_48px] opacity-30" />
      </div>
      {/* Enhanced Section Header */}
      <motion.div
        variants={itemVariants}
        className={clsx("relative text-center mb-16", "max-w-4xl mx-auto px-4")}
      >
        {/* Header Icon */}
        <motion.div
          className={clsx(
            "inline-flex items-center justify-center mb-6",
            "w-16 h-16 rounded-2xl",
            "bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600",
            "shadow-2xl shadow-teal-500/25",
            "border border-white/20"
          )}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 },
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={
            isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
          }
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 200,
          }}
        >
          <FaBlog className="text-white text-2xl" />
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
          {dictionaries.blog.title}
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

        {/* Blog summary stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: FaBookOpen,
              label: "Articles",
              value: `${blogs.length}+`,
              color: "from-teal-500 to-cyan-600",
            },
            {
              icon: FaEdit,
              label: "Topics",
              value: `${blogs.reduce(
                (acc, blog) => acc + blog.tags.length,
                0
              )}+`,
              color: "from-cyan-500 to-blue-600",
            },
            {
              icon: FaEye,
              label: "Languages",
              value: "2",
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

      {/* Enhanced Blog Cards Grid */}
      <motion.div
        className={clsx(
          "w-full max-w-6xl",
          "grid grid-cols-1 tablet:grid-cols-2 gap-8",
          "px-4 tablet:px-6"
        )}
        variants={containerVariants}
      >
        {loading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              variants={itemVariants}
              className="relative"
            >
              <div
                className={clsx(
                  "w-full p-6 tablet:p-8",
                  "bg-white/80 dark:bg-slate-800/80",
                  "backdrop-blur-xl rounded-2xl tablet:rounded-3xl",
                  "border border-white/30 dark:border-slate-600/30",
                  "animate-pulse"
                )}
              >
                <div className="grid grid-cols-[120px_1fr] gap-6 items-start">
                  <div className="w-full h-16 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                  <div className="space-y-4">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : blogs.length > 0 ? (
          blogs.map((blog, blogIndex) => (
            <motion.div
              key={blog.slug}
              variants={itemVariants}
              className="relative"
            >
              <BlogCardHome
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
                date={formatDate(blog.date, "id")}
                readTime={blog.readTime}
                index={blogIndex}
              />
            </motion.div>
          ))
        ) : (
          // No blogs found
          <motion.div
            variants={itemVariants}
            className="col-span-full text-center py-12"
          >
            <div className="text-slate-500 dark:text-slate-400">
              <FaBlog className="mx-auto text-4xl mb-4 opacity-50" />
              <p className="text-lg">No blog posts found</p>
              <p className="text-sm">Check back later for new content</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced View More Link */}
      <motion.div variants={itemVariants} className="pt-12 flex justify-center">
        <motion.div
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/blog"
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
              <FaBlog size={14} />
            </motion.div>

            <span className="relative z-10">
              {dictionaries.blog.cta.primary.children}
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
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
