import { BlogProvider } from "@/features/blog/i18n";
import { BlogContainer } from "@/features/blog/container";

export default function BlogPage() {
  return (
    <BlogProvider>
      <BlogContainer />
    </BlogProvider>
  );
}
