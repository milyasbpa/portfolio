import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogMetadata } from '@/features/blog/utils/blogLoader';

export async function GET(request: NextRequest) {
  try {
    console.log('Blogs API called');
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    
    console.log('Fetching blogs with limit:', limitNumber);
    const blogs = await getAllBlogMetadata(limitNumber);
    console.log('Found blogs:', blogs.length);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in blogs API:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
