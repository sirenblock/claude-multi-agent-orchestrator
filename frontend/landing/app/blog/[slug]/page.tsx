import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/blogData';

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
    title: `${post.title} | WhisperAPI Blog`,
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
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              ← Back to Blog
            </Link>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {post.author.name[0]}
                  </span>
                </div>
                <span>{post.author.name}</span>
              </div>
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to try WhisperAPI?
              </h3>
              <p className="text-blue-100 mb-6">
                Start transcribing audio with our powerful API. Get 60 minutes free every month.
              </p>
              <Link
                href="/signup"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Related Posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((relatedSlug) => {
                    const relatedPost = getBlogPostBySlug(relatedSlug);
                    if (!relatedPost) return null;

                    return (
                      <Link
                        key={relatedSlug}
                        href={`/blog/${relatedSlug}`}
                        className="card card-hover group"
                      >
                        <div className="mb-2">
                          <span className="text-sm text-blue-600 font-semibold">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {relatedPost.readingTime}
                        </p>
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
