import { BlogProvider } from "@/features/blog/i18n";
import { BlogContainer } from "@/features/blog/container";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/content";
import { notFound } from 'next/navigation';

interface BlogSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params at build time
export async function generateStaticParams() {
  try {
    const slugs = getAllBlogSlugs();
    console.log(`🏗️  Generating static params for ${slugs.length} blog posts`);
    
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }
    
    return {
      title: post.title,
      description: post.description,
      keywords: post.tags.join(', '),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author],
        tags: post.tags,
        ...(post.image && { images: [{ url: post.image }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        ...(post.image && { images: [post.image] }),
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for ${slug}:`, error);
    return {
      title: 'Blog Post',
      description: 'A blog post from Ilyas Bashirah',
    };
  }
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;

  // Verify the post exists at build time
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <BlogProvider>
      <BlogContainer slug={slug} />
    </BlogProvider>
  );
}
