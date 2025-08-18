import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogMetadata } from '@/features/blog/utils/blogLoader';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    
    const blogs = await getAllBlogMetadata(limitNumber);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in blogs API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
