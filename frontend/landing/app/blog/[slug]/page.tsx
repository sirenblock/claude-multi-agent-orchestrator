import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/blogData';
import { Clock, Calendar, ArrowLeft, User } from 'lucide-react';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import TagList from '@/components/blog/TagList';
import AuthorBio from '@/components/blog/AuthorBio';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Audiscribe Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {post.category}
              </span>
              {post.tags && post.tags.length > 0 && (
                <TagList tags={post.tags} showIcon={false} />
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm border-t border-b border-gray-200 py-4">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white font-semibold text-base">
                    {post.author.name[0]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                  {post.author.bio && (
                    <span className="text-xs text-gray-500">{post.author.bio.split('.')[0]}</span>
                  )}
                </div>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg max-w-none blog-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <TagList tags={post.tags} />
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </div>

            {/* Author Bio */}
            <div className="mt-10">
              <AuthorBio author={post.author} />
            </div>

            {/* Divider */}
            <div className="my-16 border-t-2 border-gray-100"></div>

            {/* CTA Section */}
            <div className="mt-16 p-10 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white text-center shadow-xl">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to try Audiscribe?
                </h3>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Start transcribing audio with our lightning-fast API. Get 60 minutes free every month with no credit card required.
                </p>
                <Link
                  href="/signup"
                  className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Related Posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Continue Reading
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {post.relatedPosts.map((relatedSlug) => {
                    const relatedPost = getBlogPostBySlug(relatedSlug);
                    if (!relatedPost) return null;

                    return (
                      <Link
                        key={relatedSlug}
                        href={`/blog/${relatedSlug}`}
                        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="mb-3">
                          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{relatedPost.readingTime}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
