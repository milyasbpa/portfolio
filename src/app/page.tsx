import { AppContainer } from "@/core/modules/app/container";
import { HomeContainer } from "@/features/home/container/Home.container";
import { getAllBlogPostsMeta } from "@/lib/content";

export default async function Home() {
  // Get blog data at build time
  const allBlogs = await getAllBlogPostsMeta();
  // Sort by date and take first 4 for homepage
  const recentBlogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <AppContainer>
      <HomeContainer blogs={recentBlogs} />
    </AppContainer>
  );
}
