import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaClock, FaCalendarAlt, FaTag } from "react-icons/fa";
import { useBlogContext } from "../../i18n";

export interface BlogContentProps {
  slug?: string;
}

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const BlogContent = ({ slug = "membangun-portfolio-modern" }: BlogContentProps) => {
  const { dictionaries } = useBlogContext();
  const [blogPost, setBlogPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/blog/${slug}.txt`);
        if (!response.ok) throw new Error('Blog post not found');
        
        const text = await response.text();
        const parsed = parseBlogContent(text);
        setBlogPost(parsed);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const parseBlogContent = (text: string): BlogPost => {
    const lines = text.split('\n');
    let title = '';
    let date = '';
    let readTime = '';
    let tags: string[] = [];
    let content = '';
    
    let inContent = false;
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        title = line.substring(2);
      } else if (line.includes('**Publikasi:**')) {
        date = line.split('**Publikasi:**')[1].trim();
      } else if (line.includes('**Waktu Baca:**')) {
        readTime = line.split('**Waktu Baca:**')[1].trim();
      } else if (line.includes('**Tag:**')) {
        const tagString = line.split('**Tag:**')[1].trim();
        tags = tagString.split(', ');
      } else if (line === '---' && !inContent) {
        inContent = true;
        continue;
      } else if (inContent) {
        content += line + '\n';
      }
    }
    
    return { title, date, readTime, tags, content: content.trim() };
  };

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return (
            <motion.h2
              key={index}
              className={clsx(
                "text-2xl tablet:text-3xl font-bold mt-12 mb-6",
                "bg-gradient-to-r from-indigo-600 to-purple-600",
                "dark:from-indigo-400 dark:to-purple-400",
                "bg-clip-text text-transparent"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {paragraph.substring(3)}
            </motion.h2>
          );
        }
        
        if (paragraph.startsWith('### ')) {
          return (
            <motion.h3
              key={index}
              className={clsx(
                "text-xl tablet:text-2xl font-semibold mt-8 mb-4",
                "text-slate-800 dark:text-slate-200"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {paragraph.substring(4)}
            </motion.h3>
          );
        }

        if (paragraph.startsWith('- **')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- **'));
          return (
            <motion.ul
              key={index}
              className="space-y-3 my-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {items.map((item, itemIndex) => {
                const [boldPart, ...restParts] = item.substring(2).split('**');
                const rest = restParts.join('**').trim();
                return (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {boldPart}
                      </span>
                      {rest && (
                        <span className="text-slate-600 dark:text-slate-400">
                          {rest.startsWith(' - ') ? rest.substring(3) : rest}
                        </span>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          );
        }

        if (paragraph.startsWith('```')) {
          const codeContent = paragraph.replace(/```[\w]*\n?/g, '').trim();
          return (
            <motion.div
              key={index}
              className={clsx(
                "bg-slate-900 dark:bg-slate-950",
                "rounded-xl p-6 my-8",
                "border border-slate-700/50",
                "overflow-x-auto"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <pre className="text-sm text-slate-300">
                <code>{codeContent}</code>
              </pre>
            </motion.div>
          );
        }

        return (
          <motion.p
            key={index}
            className={clsx(
              "text-slate-700 dark:text-slate-300",
              "leading-relaxed mb-6",
              "text-base tablet:text-lg"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {paragraph.split('**').map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <strong key={partIndex} className="font-semibold text-slate-800 dark:text-slate-200">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </motion.p>
        );
      });
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
            <FaCalendarAlt className="w-4 h-4" />
            <span>{dictionaries.meta.publishedAt} {blogPost.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4" />
            <span>{blogPost.readTime} {dictionaries.meta.readTime}</span>
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
