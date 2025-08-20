"use client";

import React from "react";
import { BlogsList } from "../fragments";
import type { BlogPostMeta } from "@/lib/content";

// Format date for client-side - build time safe utility
function formatDate(dateString: string, locale: 'en' | 'id' = 'id'): string {
  try {
    const date = new Date(dateString);
    
    if (locale === 'id') {
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch {
    return dateString;
  }
}

interface BlogsContainerProps {
  blogs: BlogPostMeta[];
}

export const BlogsContainer: React.FC<BlogsContainerProps> = ({ blogs }) => {
  // Convert BlogPostMeta to format expected by BlogsList
  const convertedBlogs = blogs.map(blog => ({
    ...blog,
    date: formatDate(blog.date, "id"),
    publishedAt: blog.date
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogsList blogs={convertedBlogs} />
    </div>
  );
};
