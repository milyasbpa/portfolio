"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogMetadata } from "@/features/blog/utils/blogClient";

interface BlogListItemProps {
  blog: BlogMetadata;
  index: number;
}

export const BlogListItem: React.FC<BlogListItemProps> = ({ blog, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", 
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    ];
    
    const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
    >
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="p-6">
          {/* Header with date and read time */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <time dateTime={blog.date}>
              {formatDate(blog.date)}
            </time>
            <span>{blog.readTime}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {blog.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {blog.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 4).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 4 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{blog.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
              {blog.author.split(" ").map(name => name[0]).join("").toUpperCase()}
            </div>
            <span>By {blog.author}</span>
          </div>

          {/* Read More Indicator */}
          <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            Read Article
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
