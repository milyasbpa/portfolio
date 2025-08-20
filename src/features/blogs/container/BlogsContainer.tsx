"use client";

import React, { useEffect, useState } from "react";
import { BlogsList } from "../fragments";
import { getBlogMetadataForClient } from "@/features/blog/utils/blogClient";
import type { BlogPostMeta } from "@/lib/content";

// Compatible interface for both build-time and runtime
interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  slug: string;
}

interface BlogsContainerProps {
  blogs?: BlogPostMeta[] | BlogMetadata[]; // Optional for backward compatibility
}

export const BlogsContainer: React.FC<BlogsContainerProps> = ({ blogs: propBlogs }) => {
  const [blogs, setBlogs] = useState<BlogMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have blogs from props (build-time), use them
    if (propBlogs && propBlogs.length > 0) {
      const formattedBlogs = propBlogs.map(blog => ({
        title: blog.title,
        description: blog.description,
        date: blog.date,
        publishedAt: blog.publishedAt || blog.date,
        readTime: blog.readTime,
        author: blog.author,
        tags: blog.tags,
        image: blog.image,
        slug: blog.slug,
      }));
      
      setBlogs(formattedBlogs);
      setLoading(false);
      console.log('📦 Using build-time blog data');
      return;
    }

    // Fallback to runtime fetching if no props provided
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching blogs at runtime (fallback)');
        const blogsData = await getBlogMetadataForClient();
        
        // Sort blogs by date (newest first)
        const sortedBlogs = blogsData.sort((a: BlogMetadata, b: BlogMetadata) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setBlogs(sortedBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [propBlogs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Unable to load articles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogsList blogs={blogs} />
    </div>
  );
};
