"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { BlogListItem, BlogFilter, Pagination } from "../../components";
import { BlogMetadata } from "@/features/blog/utils/blogClient";

interface BlogsListProps {
  blogs: BlogMetadata[];
}

const ITEMS_PER_PAGE = 6;

export const BlogsList: React.FC<BlogsListProps> = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const observerRef = useRef<IntersectionObserver>();

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [blogs]);

  // Filter blogs based on selected tags and search
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(blog =>
        selectedTags.every(tag => blog.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [blogs, selectedTags, searchQuery]);

  // Handle load more function with useCallback
  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || displayedItems >= filteredBlogs.length) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredBlogs.length));
    setIsLoadingMore(false);
  }, [isLoadingMore, displayedItems, filteredBlogs.length]);

  const lastBlogElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && isMobile && displayedItems < filteredBlogs.length) {
        handleLoadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, isMobile, displayedItems, filteredBlogs.length, handleLoadMore]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate pagination for desktop
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get current blogs to display
  const currentBlogs = isMobile 
    ? filteredBlogs.slice(0, displayedItems)
    : filteredBlogs.slice(startIndex, endIndex);

  // Reset to first page/items when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedItems(ITEMS_PER_PAGE);
  }, [selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasMore = displayedItems < filteredBlogs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Filter */}
      <BlogFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
        totalCount={blogs.length}
        filteredCount={filteredBlogs.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results info */}
      {(selectedTags.length > 0 || searchQuery.trim()) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200">
              {filteredBlogs.length === 0 ? (
                <>No articles found matching your criteria.</>
              ) : (
                <>
                  Found {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} 
                  {selectedTags.length > 0 && (
                    <> with tag{selectedTags.length !== 1 ? 's' : ''}: <strong>{selectedTags.join(', ')}</strong></>
                  )}
                  {searchQuery.trim() && (
                    <> matching &quot;<strong>{searchQuery}</strong>&quot;</>
                  )}
                </>
              )}
            </p>
          </div>
        </motion.div>
      )}

      {/* Blog Grid */}
      {currentBlogs.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentBlogs.map((blog, index) => {
              const isLastElement = index === currentBlogs.length - 1;
              return (
                <div 
                  key={blog.slug}
                  ref={isMobile && isLastElement ? lastBlogElementRef : null}
                >
                  <BlogListItem
                    blog={blog}
                    index={index}
                  />
                </div>
              );
            })}
          </motion.div>

          {/* Mobile: Infinite Scroll Loading Indicator */}
          {isMobile && hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              {isLoadingMore ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 dark:text-gray-400">Loading more articles...</span>
                </div>
              ) : (
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Articles
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              )}
            </motion.div>
          )}

          {/* Desktop: Traditional Pagination */}
          {!isMobile && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredBlogs.length}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              loading={isLoadingMore}
            />
          )}
        </>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search criteria or browse all articles.
          </p>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
};
