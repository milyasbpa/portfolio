import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaClock, FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import { useBlogContext } from "../../i18n";
import { getBlogBySlugForClient, type BlogPost as ClientBlogPost } from '../../utils/blogClient';
import { renderMarkdown } from '../../utils/markdown';
import type { BlogPost as BuildTimeBlogPost } from "@/lib/content";

export interface BlogContentProps {
  slug?: string;
  post?: BuildTimeBlogPost; // Build-time blog post data
}

// Format date for display - build time safe utility
function formatDateSafe(dateString: string, locale: 'en' | 'id' = 'id'): string {
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

export const BlogContent = ({ slug = "membangun-portfolio-modern", post }: BlogContentProps) => {
  const { dictionaries } = useBlogContext();
  const [blogPost, setBlogPost] = React.useState<ClientBlogPost | BuildTimeBlogPost | null>(post || null);
  const [loading, setLoading] = React.useState(!post); // No loading if we have build-time data

  React.useEffect(() => {
    // If we already have build-time data, don't fetch
    if (post) {
      setBlogPost(post);
      setLoading(false);
      console.log('📦 Using build-time blog post data');
      return;
    }

    // Fallback to runtime fetching if no build-time data
    const fetchBlogPost = async () => {
      try {
        console.log('🔄 Fetching blog post at runtime (fallback)');
        const blogData = await getBlogBySlugForClient(slug);
        if (blogData) {
          setBlogPost(blogData);
        } else {
          throw new Error('Blog post not found');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setBlogPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, post]);

  const formatContent = (post: ClientBlogPost | BuildTimeBlogPost) => {
    // For SSG, always use markdown rendering to avoid MDX server-side issues
    // The MDX content will be hydrated on client side if needed
    let contentString = '';
    
    if ('_raw' in post) {
      // Build-time post - use raw markdown content from file
      contentString = post._raw?.sourceFileContent || post.content?.toString() || '';
    } else {
      // Runtime post - use content directly
      contentString = typeof post.content === 'string' ? post.content : '';
    }
    
    const htmlContent = renderMarkdown(contentString);
    
    return (
      <motion.div
        className="blog-content prose prose-lg max-w-none [&>*]:animate-fade-in"
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
            <span>{dictionaries.meta.publishedAt} {formatDateSafe(blogPost.publishedAt, 'id')}</span>
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
        {formatContent(blogPost)}
      </motion.div>
    </motion.article>
  );
};
