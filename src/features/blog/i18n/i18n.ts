"use client";
import * as React from "react";
import { blog_en } from "./locales/en";
import { blog_id } from "./locales/id";

type BlogDictionaries = typeof blog_en;

interface BlogContextValue {
  dictionaries: BlogDictionaries;
}

const BlogContext = React.createContext<BlogContextValue>({
  dictionaries: blog_en,
});

export const useBlogContext = () => {
  const context = React.useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: React.ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  // Simple locale detection - you can enhance this
  const [locale] = React.useState("id"); // Default to Indonesian
  
  const dictionaries = React.useMemo(() => {
    return locale === "id" ? blog_id : blog_en;
  }, [locale]);

  const value = React.useMemo(
    () => ({
      dictionaries,
    }),
    [dictionaries]
  );

  return React.createElement(BlogContext.Provider, { value }, children);
};
