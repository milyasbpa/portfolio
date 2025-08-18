import matter from "gray-matter";

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
 * Get all blog files - tries multiple directories (server-side only)
 */
export async function getAllBlogFiles(): Promise<string[]> {
  if (typeof window !== "undefined") {
    throw new Error("getAllBlogFiles can only be called on server-side");
  }

  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");

    // Try multiple possible blog directories in order of preference
    const possiblePaths = [
      path.join(process.cwd(), "src", "data", "blogs"), // src/data/blogs (most reliable in Vercel)
      path.join(process.cwd(), "public", "blog"),       // public/blog (traditional)
      path.join(process.cwd(), "blog"),                 // blog/ (alternative)
    ];

    console.log("Current working directory:", process.cwd());
    console.log("Trying blog directories:", possiblePaths);

    for (const blogDirectory of possiblePaths) {
      try {
        await fs.access(blogDirectory);
        const files = await fs.readdir(blogDirectory);
        const mdFiles = files.filter((file) => file.endsWith(".md"));
        
        if (mdFiles.length > 0) {
          console.log(`✅ Found ${mdFiles.length} blog files at:`, blogDirectory);
          console.log("Blog files:", mdFiles);
          return mdFiles;
        }
        
        console.log(`⚠️  Directory exists but no .md files found:`, blogDirectory);
      } catch (accessError) {
        console.log(`❌ Cannot access directory:`, blogDirectory);
      }
    }

    console.error("❌ No blog directories found with .md files");
    return [];
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

/**
 * Get the correct blog directory path
 */
async function getBlogDirectory(): Promise<string | null> {
  const { promises: fs } = await import("fs");
  const path = await import("path");

  const possiblePaths = [
    path.join(process.cwd(), "src", "data", "blogs"),
    path.join(process.cwd(), "public", "blog"),
    path.join(process.cwd(), "blog"),
  ];

  for (const blogDirectory of possiblePaths) {
    try {
      await fs.access(blogDirectory);
      return blogDirectory;
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Parse a single blog file and extract metadata (server-side only)
 */
export async function parseBlogFile(
  filename: string
): Promise<BlogMetadata | null> {
  if (typeof window !== "undefined") {
    throw new Error("parseBlogFile can only be called on server-side");
  }

  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");

    const blogDirectory = await getBlogDirectory();
    if (!blogDirectory) {
      console.error("No blog directory found");
      return null;
    }

    const fullPath = path.join(blogDirectory, filename);
    const fileContents = await fs.readFile(fullPath, "utf8");

    const { data: frontmatter } = matter(fileContents);

    // Extract slug from filename
    const slug = filename.replace(/\.md$/, "");

    return {
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      date: frontmatter.date || "",
      publishedAt: frontmatter.publishedAt || frontmatter.date || "",
      readTime: frontmatter.readTime || "",
      author: frontmatter.author || "",
      tags: frontmatter.tags || [],
      image: frontmatter.image || "",
      slug: frontmatter.slug || slug,
    };
  } catch (error) {
    console.error(`Error parsing blog file ${filename}:`, error);
    return null;
  }
}

/**
 * Get all blog metadata sorted by date (newest first) - server-side only
 */
export async function getAllBlogMetadata(
  limit?: number
): Promise<BlogMetadata[]> {
  if (typeof window !== "undefined") {
    throw new Error("getAllBlogMetadata can only be called on server-side");
  }

  try {
    const files = await getAllBlogFiles();
    const blogMetadataPromises = files.map((file) => parseBlogFile(file));
    const blogMetadata = await Promise.all(blogMetadataPromises);

    // Filter out null values and sort by date
    const validBlogs = blogMetadata
      .filter((blog): blog is BlogMetadata => blog !== null)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.date).getTime();
        const dateB = new Date(b.publishedAt || b.date).getTime();
        return dateB - dateA; // Newest first
      });

    // Apply limit if specified
    return limit ? validBlogs.slice(0, limit) : validBlogs;
  } catch (error) {
    console.error("Error getting blog metadata:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug - server-side only
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (typeof window !== "undefined") {
    throw new Error("getBlogBySlug can only be called on server-side");
  }

  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");

    const blogDirectory = await getBlogDirectory();
    if (!blogDirectory) {
      console.error("No blog directory found");
      return null;
    }

    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");

    const { data: frontmatter, content } = matter(fileContents);

    return {
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      date: frontmatter.date || "",
      publishedAt: frontmatter.publishedAt || frontmatter.date || "",
      readTime: frontmatter.readTime || "",
      author: frontmatter.author || "",
      tags: frontmatter.tags || [],
      image: frontmatter.image || "",
      slug: frontmatter.slug || slug,
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Format date for display
 */
export function formatDate(
  dateString: string,
  locale: "en" | "id" = "id"
): string {
  try {
    const date = new Date(dateString);

    if (locale === "id") {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch {
    return dateString;
  }
}

/**
 * Get blog metadata for client-side rendering
 */
export async function getBlogMetadataForClient(
  limit?: number
): Promise<BlogMetadata[]> {
  try {
    const response = await fetch(`/api/blogs${limit ? `?limit=${limit}` : ""}`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

/**
 * Get single blog post for client-side rendering
 */
export async function getBlogBySlugForClient(
  slug: string
): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blogs/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch blog post");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
