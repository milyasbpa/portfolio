"use client";
import * as React from "react";
import { BlogHeader, BlogContent, BlogNavigation } from "../fragments";

export interface BlogContainerProps {
  slug?: string;
}

export default function BlogContainer({ slug }: BlogContainerProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.03)_1px,transparent_0)] bg-[size:32px_32px]" />
      
      <div className="relative z-10">
        <BlogHeader />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {slug ? (
            <BlogContent slug={slug} />
          ) : (
            <BlogNavigation />
          )}
        </div>
      </div>
    </main>
  );
};
