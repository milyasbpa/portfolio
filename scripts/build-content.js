#!/usr/bin/env node

/**
 * Build-time Content Generator
 * Pre-processes content at build time for better performance
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generateContentIndex() {
  console.log('🏗️  Starting build-time content generation...');
  
  const contentDir = path.join(process.cwd(), 'src', 'data', 'blogs');
  const outputDir = path.join(process.cwd(), '.next', 'cache', 'content');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Read all markdown files
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'));
    
    console.log(`📁 Found ${files.length} content files`);
    
    // Process each file and extract metadata
    const contentIndex = [];
    
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      
      const slug = file.replace(/\.md$/, '');
      
      const metadata = {
        slug: frontmatter.slug || slug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date || '',
        publishedAt: frontmatter.publishedAt || frontmatter.date || '',
        readTime: frontmatter.readTime || '',
        author: frontmatter.author || '',
        tags: frontmatter.tags || [],
        image: frontmatter.image || '',
        _file: file,
        _lastModified: fs.statSync(filePath).mtime.toISOString(),
      };
      
      contentIndex.push(metadata);
    }
    
    // Sort by date (newest first)
    contentIndex.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date).getTime();
      const dateB = new Date(b.publishedAt || b.date).getTime();
      return dateB - dateA;
    });
    
    // Write content index
    const indexPath = path.join(outputDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(contentIndex, null, 2));
    
    // Write individual slug list
    const slugsPath = path.join(outputDir, 'slugs.json');
    const slugs = contentIndex.map(item => item.slug);
    fs.writeFileSync(slugsPath, JSON.stringify(slugs, null, 2));
    
    // Write tags index
    const allTags = [...new Set(contentIndex.flatMap(item => item.tags))];
    const tagsPath = path.join(outputDir, 'tags.json');
    fs.writeFileSync(tagsPath, JSON.stringify(allTags, null, 2));
    
    console.log(`✅ Generated content index with ${contentIndex.length} posts`);
    console.log(`📋 Available slugs: ${slugs.join(', ')}`);
    console.log(`🏷️  Available tags: ${allTags.join(', ')}`);
    console.log(`💾 Files saved to: ${outputDir}`);
    
    return {
      posts: contentIndex.length,
      slugs: slugs.length,
      tags: allTags.length,
    };
    
  } catch (error) {
    console.error('💥 Error generating content index:', error);
    throw error;
  }
}

// CLI interface
if (require.main === module) {
  generateContentIndex()
    .then((stats) => {
      console.log('🎉 Build-time content generation completed!');
      console.log(`📊 Stats: ${stats.posts} posts, ${stats.slugs} slugs, ${stats.tags} tags`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Build-time content generation failed:', error);
      process.exit(1);
    });
}

module.exports = { generateContentIndex };
