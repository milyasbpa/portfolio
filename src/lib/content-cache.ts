import fs from 'fs';
import path from 'path';

// Build-time cache utilities
export interface ContentCacheItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  _file: string;
  _lastModified: string;
}

let contentCache: ContentCacheItem[] | null = null;
let slugsCache: string[] | null = null;
let tagsCache: string[] | null = null;

/**
 * Get build-time generated content index
 * Falls back to runtime generation if build-time cache doesn't exist
 */
export function getContentIndex(): ContentCacheItem[] {
  // Return cached data if available
  if (contentCache) {
    return contentCache;
  }

  try {
    // Try to read build-time generated index
    const cacheDir = path.join(process.cwd(), '.next', 'cache', 'content');
    const indexPath = path.join(cacheDir, 'index.json');
    
    if (fs.existsSync(indexPath)) {
      const indexData = fs.readFileSync(indexPath, 'utf8');
      contentCache = JSON.parse(indexData);
      console.log('📦 Using build-time content cache');
      return contentCache!;
    }
  } catch (error) {
    console.warn('⚠️  Could not read build-time cache, falling back to runtime generation', error);
  }

  // Fallback: generate at runtime (slower but works)
  console.log('🔄 Generating content index at runtime...');
  contentCache = generateRuntimeContentIndex();
  return contentCache!;
}

/**
 * Get pre-generated slugs list
 */
export function getCachedSlugs(): string[] {
  // Return cached slugs if available
  if (slugsCache) {
    return slugsCache;
  }

  try {
    // Try to read build-time generated slugs
    const cacheDir = path.join(process.cwd(), '.next', 'cache', 'content');
    const slugsPath = path.join(cacheDir, 'slugs.json');
    
    if (fs.existsSync(slugsPath)) {
      const slugsData = fs.readFileSync(slugsPath, 'utf8');
      slugsCache = JSON.parse(slugsData);
      console.log('📦 Using build-time slugs cache');
      return slugsCache!;
    }
  } catch (error) {
    console.warn('⚠️  Could not read build-time slugs cache', error);
  }

  // Fallback: extract from content index
  const contentIndex = getContentIndex();
  slugsCache = contentIndex.map(item => item.slug);
  return slugsCache!;
}

/**
 * Get pre-generated tags list
 */
export function getCachedTags(): string[] {
  // Return cached tags if available
  if (tagsCache) {
    return tagsCache;
  }

  try {
    // Try to read build-time generated tags
    const cacheDir = path.join(process.cwd(), '.next', 'cache', 'content');
    const tagsPath = path.join(cacheDir, 'tags.json');
    
    if (fs.existsSync(tagsPath)) {
      const tagsData = fs.readFileSync(tagsPath, 'utf8');
      tagsCache = JSON.parse(tagsData);
      console.log('📦 Using build-time tags cache');
      return tagsCache!;
    }
  } catch (error) {
    console.warn('⚠️  Could not read build-time tags cache', error);
  }

  // Fallback: extract from content index
  const contentIndex = getContentIndex();
  tagsCache = [...new Set(contentIndex.flatMap(item => item.tags))];
  return tagsCache!;
}

/**
 * Runtime fallback content generation
 * This is slower but ensures the system works even without build-time cache
 */
function generateRuntimeContentIndex(): ContentCacheItem[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const matter = require('gray-matter');
  
  try {
    const contentDir = path.join(process.cwd(), 'src', 'data', 'blogs');
    
    if (!fs.existsSync(contentDir)) {
      console.warn(`⚠️  Content directory not found: ${contentDir}`);
      return [];
    }
    
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'));
    
    const contentIndex: ContentCacheItem[] = [];
    
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      
      const slug = file.replace(/\.md$/, '');
      
      contentIndex.push({
        slug: frontmatter.slug || slug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date || '',
        publishedAt: frontmatter.publishedAt || frontmatter.date || '',
        readTime: frontmatter.readTime || '',
        author: frontmatter.author || '',
        tags: frontmatter.tags || [],
        image: frontmatter.image || '',
        _file: file,
        _lastModified: fs.statSync(filePath).mtime.toISOString(),
      });
    }
    
    // Sort by date (newest first)
    contentIndex.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date).getTime();
      const dateB = new Date(b.publishedAt || b.date).getTime();
      return dateB - dateA;
    });
    
    console.log(`✅ Generated runtime content index with ${contentIndex.length} posts`);
    return contentIndex;
    
  } catch (error) {
    console.error('💥 Error generating runtime content index:', error);
    return [];
  }
}

/**
 * Check if build-time cache exists and is fresh
 */
export function isBuildTimeCacheAvailable(): boolean {
  try {
    const cacheDir = path.join(process.cwd(), '.next', 'cache', 'content');
    const indexPath = path.join(cacheDir, 'index.json');
    return fs.existsSync(indexPath);
  } catch {
    return false;
  }
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
  const hasBuildCache = isBuildTimeCacheAvailable();
  const contentIndex = getContentIndex();
  const slugs = getCachedSlugs();
  const tags = getCachedTags();
  
  return {
    hasBuildTimeCache: hasBuildCache,
    totalPosts: contentIndex.length,
    totalSlugs: slugs.length,
    totalTags: tags.length,
    cacheType: hasBuildCache ? 'build-time' : 'runtime',
    lastGenerated: hasBuildCache ? 'build-time' : 'runtime',
  };
}
