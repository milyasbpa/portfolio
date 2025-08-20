import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Dynamic imports for better compatibility
let serialize: any;
let rehypeSlug: any;
let rehypeAutolinkHeadings: any;
let rehypePrettyCode: any;

// Initialize imports with proper error handling
async function initializeMDXDependencies() {
  try {
    if (!serialize) {
      const { serialize: mdxSerialize } = await import('next-mdx-remote/serialize');
      serialize = mdxSerialize;
    }
    if (!rehypeSlug) {
      rehypeSlug = (await import('rehype-slug')).default;
    }
    if (!rehypeAutolinkHeadings) {
      rehypeAutolinkHeadings = (await import('rehype-autolink-headings')).default;
    }
    if (!rehypePrettyCode) {
      rehypePrettyCode = (await import('rehype-pretty-code')).default;
    }
  } catch (error) {
    console.warn('Failed to load MDX dependencies:', error);
    // Fallback to basic functionality
  }
}

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getContentIndex, getCachedSlugs, getCacheStats } from './content-cache';

// Content types - similar to contentlayer schemas
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  content: MDXRemoteSerializeResult;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: 'markdown';
    flattenedPath: string;
  };
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: 'markdown';
    flattenedPath: string;
  };
}

// Content directories - optimized for build time
const CONTENT_PATHS = {
  blogs: 'src/data/blogs',
} as const;

// Cache for runtime optimization
let blogDirectoryCache: string | null = null;
let blogPostsCache: BlogPost[] | null = null;

// Get content directory path with caching and fallback logic
function getContentPath(contentType: keyof typeof CONTENT_PATHS): string {
  // If we have cached directory, use it
  if (blogDirectoryCache && contentType === 'blogs') {
    return blogDirectoryCache;
  }

  // Try multiple possible paths (for Vercel, local, etc.)
  const possiblePaths = [
    // Vercel serverless paths (production)
    path.join("/var/task", CONTENT_PATHS[contentType]),
    path.join("/var/task", "public", "blog"),
    path.join("/var/task", ".next", "server", CONTENT_PATHS[contentType]),
    
    // Local development and build paths
    path.join(process.cwd(), CONTENT_PATHS[contentType]),
    path.join(process.cwd(), "public", "blog"),
    
    // Additional fallback paths
    path.resolve(__dirname, "../../../data/blogs"),
    path.resolve(process.cwd(), CONTENT_PATHS[contentType]),
  ];

  for (const possiblePath of possiblePaths) {
    try {
      if (fs.existsSync(possiblePath)) {
        // Cache the found directory
        if (contentType === 'blogs') {
          blogDirectoryCache = possiblePath;
        }
        console.log(`✅ Using content directory: ${possiblePath}`);
        return possiblePath;
      }
    } catch (error) {
      // Continue to next path
      console.debug('Path not accessible:', possiblePath, error);
      continue;
    }
  }

  // Fallback to default path
  const defaultPath = path.join(process.cwd(), CONTENT_PATHS[contentType]);
  console.warn(`⚠️  Using fallback directory: ${defaultPath}`);
  return defaultPath;
}

// Parse frontmatter and content with caching (server-side only)
async function parseContent(filePath: string, slug: string): Promise<{
  frontmatter: any;
  content: MDXRemoteSerializeResult;
  _raw: any;
}> {
  if (typeof window !== 'undefined') {
    throw new Error('parseContent can only be called on server-side');
  }

  // Initialize MDX dependencies
  await initializeMDXDependencies();

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: rawContent } = matter(fileContent);

  // Serialize MDX content with plugins (with fallback)
  let mdxSource: MDXRemoteSerializeResult;
  
  if (serialize && rehypeSlug && rehypeAutolinkHeadings && rehypePrettyCode) {
    try {
      mdxSource = await serialize(rawContent, {
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ['subheading-anchor'],
                  ariaLabel: 'Link to section',
                },
              },
            ],
            [
              rehypePrettyCode,
              {
                theme: 'github-dark',
                keepBackground: false,
              },
            ],
          ],
        },
      });
    } catch (error) {
      console.warn(`MDX serialization failed for ${slug}, using fallback:`, error);
      // Fallback to basic serialization
      mdxSource = { compiledSource: '', frontmatter: {}, scope: {} } as MDXRemoteSerializeResult;
    }
  } else {
    console.warn('MDX dependencies not loaded, using fallback');
    // Fallback serialization
    mdxSource = { compiledSource: '', frontmatter: {}, scope: {} } as MDXRemoteSerializeResult;
  }

  const _raw = {
    sourceFilePath: filePath,
    sourceFileName: path.basename(filePath),
    sourceFileDir: path.dirname(filePath),
    contentType: 'markdown' as const,
    flattenedPath: slug,
  };

  return {
    frontmatter,
    content: mdxSource,
    _raw,
  };
}

// Blog post functions with build-time optimization
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getAllBlogPosts can only be called on server-side');
  }

  // Return cached posts if available (runtime optimization)
  if (blogPostsCache) {
    console.log('📦 Using runtime cached blog posts');
    return blogPostsCache;
  }

  // Get content index from build-time cache or generate at runtime
  const contentIndex = getContentIndex();
  const blogPath = getContentPath('blogs');

  console.log(`🔄 Processing ${contentIndex.length} blog posts...`);
  console.log('📊 Cache stats:', getCacheStats());

  const posts = await Promise.all(
    contentIndex.map(async (item: any) => {
      const filePath = path.join(blogPath, item._file);
      const { frontmatter, content, _raw } = await parseContent(filePath, item.slug);

      return {
        slug: frontmatter.slug || item.slug,
        title: frontmatter.title || item.title,
        description: frontmatter.description || item.description,
        date: frontmatter.date || item.date,
        publishedAt: frontmatter.publishedAt || item.publishedAt,
        readTime: frontmatter.readTime || item.readTime,
        author: frontmatter.author || item.author,
        tags: frontmatter.tags || item.tags,
        image: frontmatter.image || item.image,
        content,
        _raw,
      } as BlogPost;
    })
  );

  // Sort by date (newest first) - should already be sorted from build-time cache
  const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
    const dateA = new Date(a.publishedAt || a.date).getTime();
    const dateB = new Date(b.publishedAt || b.date).getTime();
    return dateB - dateA;
  });

  // Cache the posts for next time (runtime optimization)
  blogPostsCache = sortedPosts;
  console.log(`✅ Processed and cached ${sortedPosts.length} blog posts`);

  return sortedPosts;
}

export async function getAllBlogPostsMeta(): Promise<BlogPostMeta[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getAllBlogPostsMeta can only be called on server-side');
  }

  // For metadata, we can use build-time cache directly without processing MDX content
  const contentIndex = getContentIndex();
  
  return contentIndex.map(item => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.date,
    publishedAt: item.publishedAt,
    readTime: item.readTime,
    author: item.author,
    tags: item.tags,
    image: item.image,
    _raw: {
      sourceFilePath: path.join(getContentPath('blogs'), item._file),
      sourceFileName: item._file,
      sourceFileDir: getContentPath('blogs'),
      contentType: 'markdown' as const,
      flattenedPath: item.slug,
    },
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (typeof window !== 'undefined') {
    throw new Error('getBlogPostBySlug can only be called on server-side');
  }

  try {
    // First try to get from cached posts
    if (blogPostsCache) {
      const cachedPost = blogPostsCache.find(post => post.slug === slug);
      if (cachedPost) {
        console.log(`📦 Using cached post: ${slug}`);
        return cachedPost;
      }
    }

    // Try to get metadata from build-time cache
    const contentIndex = getContentIndex();
    const postMeta = contentIndex.find(item => item.slug === slug);
    
    if (!postMeta) {
      console.warn(`⚠️  Blog post not found in index: ${slug}`);
      return null;
    }

    // Load and parse the individual post
    const blogPath = getContentPath('blogs');
    const filePath = path.join(blogPath, postMeta._file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Blog post file not found: ${filePath}`);
      return null;
    }

    const { frontmatter, content, _raw } = await parseContent(filePath, slug);

    const post: BlogPost = {
      slug: frontmatter.slug || postMeta.slug,
      title: frontmatter.title || postMeta.title,
      description: frontmatter.description || postMeta.description,
      date: frontmatter.date || postMeta.date,
      publishedAt: frontmatter.publishedAt || postMeta.publishedAt,
      readTime: frontmatter.readTime || postMeta.readTime,
      author: frontmatter.author || postMeta.author,
      tags: frontmatter.tags || postMeta.tags,
      image: frontmatter.image || postMeta.image,
      content,
      _raw,
    };

    console.log(`✅ Loaded individual post: ${slug}`);
    return post;
  } catch (error) {
    console.error(`💥 Error parsing blog post ${slug}:`, error);
    return null;
  }
}

// Get all blog slugs for static generation (build time)
export function getAllBlogSlugs(): string[] {
  if (typeof window !== 'undefined') {
    throw new Error('getAllBlogSlugs can only be called on server-side');
  }
  
  // Use cached slugs from build-time or runtime generation
  const slugs = getCachedSlugs();
  console.log(`📋 Available blog slugs: ${slugs.join(', ')}`);
  return slugs;
}

// Clear cache (useful for development)
export function clearContentCache(): void {
  blogDirectoryCache = null;
  blogPostsCache = null;
  console.log('🗑️  Content cache cleared');
}

// Date formatting utility (works on both server and client)
export function formatDate(
  dateString: string,
  locale: 'en' | 'id' = 'en'
): string {
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
        day: 'numeric',
      });
    }
  } catch {
    return dateString;
  }
}
