import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogMetadata } from '@/features/blog/utils/blogLoader';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Blogs API called');
    console.log('📍 Process cwd:', process.cwd());
    console.log('📍 __dirname:', __dirname);
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    
    console.log('🔢 Fetching blogs with limit:', limitNumber);
    
    // Additional file system debug
    const { promises: fs } = await import('fs');
    // const path = await import('path');
    
    try {
      const varTaskExists = await fs.access('/var/task').then(() => true).catch(() => false);
      console.log('📁 /var/task exists:', varTaskExists);
      
      if (varTaskExists) {
        const varTaskContents = await fs.readdir('/var/task');
        console.log('📂 /var/task contents:', varTaskContents);
      }
      
      const cwdContents = await fs.readdir(process.cwd());
      console.log('📂 process.cwd() contents:', cwdContents);
    } catch (debugError) {
      console.log('⚠️  Debug filesystem error:', debugError);
    }
    
    const blogs = await getAllBlogMetadata(limitNumber);
    console.log('📊 Found blogs count:', blogs.length);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('💥 Error in blogs API:', error);
    console.error('📋 Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
