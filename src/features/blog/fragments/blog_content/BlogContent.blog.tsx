import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaClock, FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import { useBlogContext } from "../../i18n";
import matter from 'gray-matter';
import { renderMarkdown } from '../../utils/markdown';

export interface BlogContentProps {
  slug?: string;
}

interface BlogPost {
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  slug: string;
  content: string;
}

export const BlogContent = ({ slug = "membangun-portfolio-modern" }: BlogContentProps) => {
  const { dictionaries } = useBlogContext();
  const [blogPost, setBlogPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  const parseMarkdownContent = React.useCallback((markdownText: string): BlogPost => {
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(markdownText);
    
    return {
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      publishedAt: frontmatter.publishedAt || '',
      readTime: frontmatter.readTime || '',
      author: frontmatter.author || '',
      tags: frontmatter.tags || [],
      image: frontmatter.image || '',
      slug: frontmatter.slug || slug,
      content: content.trim()
    };
  }, [slug]);

  React.useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/blog/${slug}.md`);
        if (!response.ok) throw new Error('Blog post not found');
        
        const markdownText = await response.text();
        const parsed = parseMarkdownContent(markdownText);
        setBlogPost(parsed);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, parseMarkdownContent]);

  const formatContent = (content: string) => {
    const htmlContent = renderMarkdown(content);
    
    return (
      <motion.div
        className="prose prose-lg max-w-none [&>*]:animate-fade-in"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          staggerChildren: 0.1 
        }}
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <motion.div
          className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {dictionaries.notFound.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {dictionaries.notFound.description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.article
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Blog Header */}
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className={clsx(
          "text-3xl tablet:text-4xl desktop:text-5xl font-bold mb-6",
          "bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700",
          "dark:from-white dark:via-indigo-300 dark:to-purple-300",
          "bg-clip-text text-transparent leading-tight"
        )}>
          {blogPost.title}
        </h1>

        {/* Blog Meta */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            <span>{blogPost.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4" />
            <span>{dictionaries.meta.publishedAt} {blogPost.publishedAt}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4" />
            <span>{blogPost.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FaTag className="w-4 h-4 text-slate-500" />
          {blogPost.tags.map((tag, index) => (
            <span
              key={index}
              className={clsx(
                "px-3 py-1 text-xs font-medium rounded-full",
                "bg-gradient-to-r from-indigo-100 to-purple-100",
                "dark:from-indigo-900/30 dark:to-purple-900/30",
                "text-indigo-700 dark:text-indigo-300",
                "border border-indigo-200/50 dark:border-indigo-700/50"
              )}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.header>

      {/* Blog Content */}
      <motion.div
        className={clsx(
          "prose prose-lg max-w-none",
          "bg-white/80 dark:bg-slate-800/80",
          "backdrop-blur-xl rounded-2xl tablet:rounded-3xl",
          "p-8 tablet:p-12",
          "border border-white/30 dark:border-slate-700/30",
          "shadow-xl"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {formatContent(blogPost.content)}
      </motion.div>
    </motion.article>
  );
};
