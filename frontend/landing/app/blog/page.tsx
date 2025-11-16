import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Audioscribe | Audio Transcription Guides & Tutorials',
  description: 'Learn about audio transcription APIs, speech-to-text technology, and how to integrate Audioscribe into your applications.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-700">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Audioscribe Blog
            </h1>
            <p className="text-xl text-blue-100">
              Guides, tutorials, and insights about audio transcription APIs
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-7 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                  <span>Read article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
