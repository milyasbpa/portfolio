import React from "react";
import { BlogsContainer } from "@/features/blogs";
import { getAllBlogPostsMeta } from "@/lib/content";
import { Metadata } from "next";

// Generate dynamic metadata based on content
export async function generateMetadata(): Promise<Metadata> {
  try {
    const posts = await getAllBlogPostsMeta();
    const totalPosts = posts.length;
    const latestTags = [...new Set(posts.flatMap(post => post.tags))].slice(0, 10);
    
    return {
      title: `All Articles (${totalPosts}) | Ilyas Bashirah`,
      description: `Explore our collection of ${totalPosts} articles covering ${latestTags.join(', ')} and more.`,
      keywords: latestTags.join(', '),
      openGraph: {
        title: `All Articles (${totalPosts}) | Ilyas Bashirah`,
        description: `Explore our collection of ${totalPosts} articles covering ${latestTags.join(', ')} and more.`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `All Articles (${totalPosts}) | Ilyas Bashirah`, 
        description: `Explore our collection of ${totalPosts} articles covering ${latestTags.join(', ')} and more.`,
      }
    };
  } catch (error) {
    console.error('Error generating dynamic metadata:', error);
    // Fallback to static metadata
    return {
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
  }
}

export default function BlogsPage() {
  return <BlogsContainer />;
}
