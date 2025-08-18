import { BlogProvider } from "@/features/blog/i18n";
import { BlogContainer } from "@/features/blog/container";

interface BlogSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;

  return (
    <BlogProvider>
      <BlogContainer slug={slug} />
    </BlogProvider>
  );
}
