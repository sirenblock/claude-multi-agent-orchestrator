/**
 * @module RootLayout
 * @description Root layout component for the WhisperAPI landing page
 *
 * Provides:
 * - Global styles and fonts
 * - Navigation header
 * - Footer
 * - SEO metadata
 * - Analytics tracking
 * - Performance monitoring
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import { Suspense } from 'react';
import Analytics from '@/components/Analytics';
import {
  getOrganizationSchema,
  getProductSchema,
  getWebSiteSchema,
  getHomePageBreadcrumb,
  renderStructuredData,
} from '@/lib/structuredData';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://whisperapi.com';
const SITE_NAME = 'WhisperAPI';
const DESCRIPTION = 'OpenAI Whisper API powered by M4 Metal. 80% cheaper and 3x faster than cloud alternatives. Start with 60 free minutes per month.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // Basic metadata
  title: {
    default: 'WhisperAPI - 80% Cheaper Audio Transcription API',
    template: '%s | WhisperAPI',
  },
  description: DESCRIPTION,
  keywords: [
    'whisper api',
    'audio transcription',
    'speech to text',
    'openai whisper',
    'transcription api',
    'cheap transcription',
    'fast transcription',
    'm4 metal',
    'voice to text',
    'audio api',
  ],
  authors: [{ name: 'WhisperAPI Team', url: BASE_URL }],
  creator: 'WhisperAPI',
  publisher: 'WhisperAPI',

  // Verification
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: 'WhisperAPI - 80% Cheaper Audio Transcription API',
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'WhisperAPI - Fast and Affordable Audio Transcription',
        type: 'image/png',
      },
      {
        url: `${BASE_URL}/og-image-square.png`,
        width: 800,
        height: 800,
        alt: 'WhisperAPI Logo',
        type: 'image/png',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@whisperapi',
    creator: '@whisperapi',
    title: 'WhisperAPI - 80% Cheaper Audio Transcription API',
    description: DESCRIPTION,
    images: [`${BASE_URL}/twitter-image.png`],
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4f46e5',
      },
    ],
  },

  // Manifest
  manifest: '/manifest.json',

  // Alternate languages (if you support multiple languages)
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
      // 'es-ES': `${BASE_URL}/es`,
    },
  },

  // Category
  category: 'technology',
};

function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WhisperAPI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pricing" className="btn-ghost">
              Pricing
            </Link>
            <Link href="/docs" className="btn-ghost">
              Docs
            </Link>
            <Link href="/blog" className="btn-ghost">
              Blog
            </Link>
            <a
              href="https://github.com/whisperapi/whisperapi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden sm:inline-block text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WhisperAPI</span>
            </div>
            <p className="text-gray-600 text-sm">
              Fast, affordable audio transcription powered by OpenAI Whisper.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-gray-600 hover:text-primary-600 text-sm">Pricing</Link></li>
              <li><Link href="/docs" className="text-gray-600 hover:text-primary-600 text-sm">Documentation</Link></li>
              <li><Link href="/api-reference" className="text-gray-600 hover:text-primary-600 text-sm">API Reference</Link></li>
              <li><Link href="/status" className="text-gray-600 hover:text-primary-600 text-sm">Status</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-primary-600 text-sm">About</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-primary-600 text-sm">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-primary-600 text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary-600 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">Terms of Service</Link></li>
              <li><Link href="/security" className="text-gray-600 hover:text-primary-600 text-sm">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} WhisperAPI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com/whisperapi" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://github.com/whisperapi" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://plausible.io" />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={renderStructuredData(getOrganizationSchema())}
        />
        <Script
          id="product-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={renderStructuredData(getProductSchema())}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={renderStructuredData(getWebSiteSchema())}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={renderStructuredData(getHomePageBreadcrumb())}
        />
      </head>
      <body className={inter.className}>
        {/* Analytics and Performance Monitoring */}
        <Suspense fallback={null}>
          <Analytics
            ga4MeasurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
            plausibleDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            trackWebVitals={process.env.NEXT_PUBLIC_TRACK_WEB_VITALS !== 'false'}
            debug={process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true'}
          />
        </Suspense>

        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
