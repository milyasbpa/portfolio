/**
 * Client-side blog utilities
 * Safe to use in browser environment
 */

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  image?: string;
  slug: string;
}

export interface BlogPost extends BlogMetadata {
  content: string;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: 'en' | 'id' = 'id'): string {
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

/**
 * Get blog metadata for client-side rendering
 */
export async function getBlogMetadataForClient(limit?: number): Promise<BlogMetadata[]> {
  try {
    const response = await fetch(`/api/blogs${limit ? `?limit=${limit}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Get single blog post for client-side rendering
 */
export async function getBlogBySlugForClient(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blogs/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
