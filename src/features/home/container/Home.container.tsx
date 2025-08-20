import * as React from "react";
import { HomeClientContainer } from "./HomeClient.container";
import type { BlogPostMeta } from "@/lib/content";

interface HomeContainerProps {
  blogs: BlogPostMeta[];
}

export const HomeContainer: React.FC<HomeContainerProps> = ({ blogs }) => {
  return <HomeClientContainer blogs={blogs} />;
};
