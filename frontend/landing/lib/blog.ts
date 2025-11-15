import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  readingTime: number;
  published: boolean;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  readingTime: number;
  published: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const realSlug = slug.replace(/\.(md|mdx)$/, '');

  // Try both .md and .mdx extensions
  let fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const readingTime = calculateReadingTime(content);

  return {
    slug: realSlug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    content,
    date: data.date || new Date().toISOString(),
    author: data.author || {
      name: 'WhisperAPI Team',
      avatar: '/images/authors/default.jpg',
      bio: 'Building the future of speech-to-text technology',
    },
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    coverImage: data.coverImage || '/images/blog/default.jpg',
    readingTime,
    published: data.published !== false,
  };
}

/**
 * Get all blog posts
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter(post => post.published)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

/**
 * Get blog post metadata (without content)
 */
export function getPostMetadata(slug: string): BlogPostMetadata | null {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const { content, ...metadata } = post;
  return metadata;
}

/**
 * Get all blog post metadata
 */
export function getAllPostsMetadata(): BlogPostMetadata[] {
  const posts = getAllPosts();
  return posts.map(({ content, ...metadata }) => metadata);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return Array.from(new Set(categories)).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter(post => post.slug !== slug);

  // Score posts based on relevance
  const scoredPosts = allPosts.map(post => {
    let score = 0;

    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 10;
    }

    // Shared tags
    const sharedTags = post.tags.filter(tag =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 5;

    return { post, score };
  });

  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Paginate posts
 */
export function paginatePosts(
  posts: BlogPost[],
  page: number = 1,
  postsPerPage: number = 9
): {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Search posts by title, excerpt, or content
 */
export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string): Array<{
  id: string;
  title: string;
  level: number;
}> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}
