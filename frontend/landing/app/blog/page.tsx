import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Blog - WhisperAPI | Audio Transcription Guides & Tutorials',
  description: 'Learn about audio transcription APIs, speech-to-text technology, and how to integrate WhisperAPI into your applications.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-700">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              WhisperAPI Blog
            </h1>
            <p className="text-xl text-blue-100">
              Guides, tutorials, and insights about audio transcription APIs
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover group"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.readingTime}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
