/**
 * Blog post data loader
 * Reads and parses MDX files from content/blog directory
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export const authors: Record<string, Author> = {
  'sarah-chen': {
    name: 'Sarah Chen',
    avatar: '/images/authors/sarah-chen.jpg',
    bio: 'Senior Developer Advocate at WhisperAPI. Passionate about AI and developer tools.',
    twitter: '@sarahchen',
    github: 'sarahchen',
  },
  'mike-johnson': {
    name: 'Mike Johnson',
    avatar: '/images/authors/mike-johnson.jpg',
    bio: 'ML Engineer specializing in speech recognition and NLP.',
    twitter: '@mikejohnson',
    github: 'mikejohnson',
  },
  'whisperapi-team': {
    name: 'WhisperAPI Team',
    avatar: '/images/authors/whisperapi-team.jpg',
    bio: 'Building the future of speech-to-text technology.',
    twitter: '@whisperapi',
    github: 'whisperapi',
  },
};

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  author: Author;
  authorName?: string;
  category: string;
  tags: string[];
  image?: string;
  coverImage?: string;
  readingTime: string;
  content: string;
  relatedPosts: string[];
  featured?: boolean;
  published?: boolean;
}

/**
 * Get all blog post files
 */
function getBlogFiles(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn(`Content directory not found: ${contentDirectory}`);
      return [];
    }
    return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading blog files:', error);
    return [];
  }
}

/**
 * Read and parse a single MDX file
 */
function parseBlogPost(filename: string): BlogPost | null {
  try {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Determine author
    let author: Author;
    const authorKey = data.author?.toLowerCase().replace(/\s+/g, '-') || 'whisperapi-team';
    author = authors[authorKey] || authors['whisperapi-team'];

    // If author name is provided but not in our authors list, create a temporary author
    if (data.author && !authors[authorKey]) {
      author = {
        name: data.author,
        avatar: data.authorImage || '/images/authors/default.jpg',
        bio: data.authorTitle || 'Content contributor',
      };
    }

    // Convert markdown content to HTML
    const htmlContent = marked.parse(content, {
      gfm: true,
      breaks: true,
    }) as string;

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.description || data.excerpt || '',
      description: data.description || data.excerpt || '',
      date: data.publishedAt || data.date || new Date().toISOString().split('T')[0],
      publishedAt: data.publishedAt || data.date,
      updatedAt: data.updatedAt,
      author,
      authorName: data.author,
      category: data.category || 'General',
      tags: data.tags || [],
      image: data.image || data.coverImage || '/images/blog/default.jpg',
      coverImage: data.image || data.coverImage,
      readingTime: data.readingTime || calculateReadingTime(content),
      content: htmlContent,
      relatedPosts: data.relatedPosts || [],
      featured: data.featured || false,
      published: data.published !== false,
    };
  } catch (error) {
    console.error(`Error parsing blog post ${filename}:`, error);
    return null;
  }
}

/**
 * Calculate reading time from content
 */
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get all blog posts
 */
function getAllBlogPosts(): BlogPost[] {
  const files = getBlogFiles();
  const posts = files
    .map(parseBlogPost)
    .filter((post): post is BlogPost => post !== null && post.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

// Export blogPosts
export const blogPosts = getAllBlogPosts();

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get blog post content by slug (legacy function for compatibility)
 */
export function getBlogPostContent(slug: string): string {
  const post = getBlogPostBySlug(slug);
  return post?.content || '';
}

export const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
