"use client";

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  content: MDXRemoteSerializeResult;
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  return <MDXRemote {...content} />;
};
