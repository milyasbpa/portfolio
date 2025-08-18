import React from "react";
import { BlogsContainer } from "@/features/blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Ilyas Bashirah",
  description: "Explore our collection of articles covering algorithms, data structures, and software development best practices.",
  keywords: "blog, articles, algorithms, data structures, programming, software development",
  openGraph: {
    title: "All Articles | Ilyas Bashirah",
    description: "Explore our collection of articles covering algorithms, data structures, and software development best practices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Articles | Ilyas Bashirah", 
    description: "Explore our collection of articles covering algorithms, data structures, and software development best practices.",
  }
};

export default function BlogsPage() {
  return <BlogsContainer />;
}
