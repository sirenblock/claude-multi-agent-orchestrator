/**
 * Sample blog post metadata
 * This file contains example blog posts for the blog system
 * In production, this would be replaced by actual MDX files in content/blog
 */

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export const authors: Record<string, Author> = {
  'john-doe': {
    name: 'John Doe',
    avatar: '/images/authors/john-doe.jpg',
    bio: 'Senior Developer Advocate at WhisperAPI. Passionate about AI and developer tools.',
    twitter: '@johndoe',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
  'jane-smith': {
    name: 'Jane Smith',
    avatar: '/images/authors/jane-smith.jpg',
    bio: 'ML Engineer specializing in speech recognition and NLP.',
    twitter: '@janesmith',
    github: 'janesmith',
  },
  'whisperapi-team': {
    name: 'WhisperAPI Team',
    avatar: '/images/authors/whisperapi-team.jpg',
    bio: 'Building the future of speech-to-text technology.',
    twitter: '@whisperapi',
    github: 'whisperapi',
  },
};

export const categories = [
  'Product Updates',
  'Tutorials',
  'Best Practices',
  'Case Studies',
  'Technology',
  'Company News',
  'API Updates',
];

export const sampleBlogPosts = [
  {
    slug: 'introducing-whisperapi-v2',
    title: 'Introducing WhisperAPI v2: Faster, More Accurate Speech Recognition',
    excerpt: 'We\'re excited to announce WhisperAPI v2 with 40% faster processing, improved accuracy, and new language support.',
    date: '2024-01-15',
    author: 'whisperapi-team',
    category: 'Product Updates',
    tags: ['release', 'features', 'performance'],
    coverImage: '/images/blog/whisperapi-v2.jpg',
    published: true,
  },
  {
    slug: 'building-voice-powered-apps',
    title: 'Building Voice-Powered Applications with WhisperAPI',
    excerpt: 'Learn how to build production-ready voice applications using WhisperAPI with this comprehensive guide.',
    date: '2024-01-10',
    author: 'john-doe',
    category: 'Tutorials',
    tags: ['tutorial', 'voice', 'development'],
    coverImage: '/images/blog/voice-apps.jpg',
    published: true,
  },
  {
    slug: 'real-time-transcription-best-practices',
    title: 'Real-Time Transcription: Best Practices and Optimization',
    excerpt: 'Discover the best practices for implementing real-time transcription in your applications.',
    date: '2024-01-05',
    author: 'jane-smith',
    category: 'Best Practices',
    tags: ['real-time', 'optimization', 'performance'],
    coverImage: '/images/blog/real-time-transcription.jpg',
    published: true,
  },
  {
    slug: 'how-acme-corp-scaled-voice-transcription',
    title: 'How Acme Corp Scaled Voice Transcription to 1M+ Users',
    excerpt: 'A deep dive into how Acme Corp used WhisperAPI to scale their voice transcription service.',
    date: '2023-12-28',
    author: 'john-doe',
    category: 'Case Studies',
    tags: ['case-study', 'scaling', 'enterprise'],
    coverImage: '/images/blog/acme-corp-case-study.jpg',
    published: true,
  },
  {
    slug: 'understanding-speech-recognition-accuracy',
    title: 'Understanding Speech Recognition Accuracy Metrics',
    excerpt: 'A comprehensive guide to measuring and improving speech recognition accuracy.',
    date: '2023-12-20',
    author: 'jane-smith',
    category: 'Technology',
    tags: ['accuracy', 'metrics', 'ml'],
    coverImage: '/images/blog/accuracy-metrics.jpg',
    published: true,
  },
  {
    slug: 'multilingual-support-expansion',
    title: 'WhisperAPI Now Supports 50+ Languages',
    excerpt: 'We\'ve expanded our language support to cover 50+ languages with native-level accuracy.',
    date: '2023-12-15',
    author: 'whisperapi-team',
    category: 'Company News',
    tags: ['languages', 'international', 'announcement'],
    coverImage: '/images/blog/multilingual.jpg',
    published: true,
  },
  {
    slug: 'webhook-integration-guide',
    title: 'Complete Guide to WhisperAPI Webhook Integration',
    excerpt: 'Learn how to integrate webhooks for asynchronous transcription workflows.',
    date: '2023-12-10',
    author: 'john-doe',
    category: 'Tutorials',
    tags: ['webhooks', 'integration', 'async'],
    coverImage: '/images/blog/webhooks.jpg',
    published: true,
  },
  {
    slug: 'api-security-best-practices',
    title: 'API Security Best Practices for Speech-to-Text Services',
    excerpt: 'Essential security practices for protecting your voice data and API keys.',
    date: '2023-12-05',
    author: 'jane-smith',
    category: 'Best Practices',
    tags: ['security', 'api', 'best-practices'],
    coverImage: '/images/blog/security.jpg',
    published: true,
  },
  {
    slug: 'custom-vocabulary-support',
    title: 'Introducing Custom Vocabulary Support',
    excerpt: 'Improve transcription accuracy for industry-specific terms with custom vocabulary.',
    date: '2023-11-30',
    author: 'whisperapi-team',
    category: 'API Updates',
    tags: ['features', 'vocabulary', 'accuracy'],
    coverImage: '/images/blog/custom-vocabulary.jpg',
    published: true,
  },
];

/**
 * Get blog post content by slug
 * This would be replaced by actual MDX file reading in production
 */
export function getBlogPostContent(slug: string): string {
  // Sample markdown content
  // In production, this would read from MDX files
  return `
# ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

## Introduction

This is a sample blog post demonstrating the blog system architecture. In production, this content would be loaded from MDX files stored in the \`content/blog\` directory.

## Key Features

- **Performance**: Optimized for fast loading and rendering
- **SEO**: Built-in structured data and meta tags
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first design

## Getting Started

Here's a quick example of how to use this feature:

\`\`\`javascript
const result = await whisperAPI.transcribe({
  file: audioFile,
  language: 'en',
  model: 'whisper-1'
});

console.log(result.text);
\`\`\`

## Best Practices

1. **Always validate input**: Ensure audio files are in supported formats
2. **Handle errors gracefully**: Implement proper error handling and retries
3. **Monitor usage**: Keep track of your API usage and quota

## Advanced Usage

For more advanced use cases, you can customize various parameters:

- Language detection
- Speaker diarization
- Custom vocabulary
- Webhook callbacks

## Conclusion

This feature enables powerful voice transcription capabilities in your applications. We're excited to see what you build with it!

### Resources

- [API Documentation](/docs/api)
- [Code Examples](/docs/examples)
- [Community Forum](/community)

---

*Have questions? Reach out to our support team or join our Discord community.*
  `.trim();
}

// Export blogPosts for compatibility
export const blogPosts = sampleBlogPosts.map(post => ({
  ...post,
  readingTime: '5 min read',
  content: getBlogPostContent(post.slug),
  author: authors[post.author],
  relatedPosts: [],
}));

// Get blog post by slug
export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
