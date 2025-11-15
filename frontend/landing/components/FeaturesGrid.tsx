/**
 * @module FeaturesGrid
 * @description Comprehensive features showcase with 12+ features
 *
 * Features:
 * - Grid layout with feature cards
 * - Benefit-focused copy highlighting value
 * - Use case examples for each feature
 * - Icon-based visual hierarchy
 * - Responsive design
 *
 * @example
 * <FeaturesGrid />
 */

'use client';

interface Feature {
  title: string;
  description: string;
  benefit: string;
  useCase: string;
  icon: React.ReactNode;
  category: 'performance' | 'integration' | 'security' | 'developer';
}

export default function FeaturesGrid() {
  const features: Feature[] = [
    {
      title: 'M4 Metal Acceleration',
      description: 'Leverage Apple Silicon M4 chips for blazing-fast transcription processing.',
      benefit: '3x faster than cloud GPU solutions',
      useCase: 'Process 60-minute podcasts in under 3 minutes',
      category: 'performance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Multiple Model Support',
      description: 'Choose from Base, Small, and Medium Whisper models based on your accuracy needs.',
      benefit: 'Balance speed and accuracy for your use case',
      useCase: 'Use Base for quick drafts, Medium for production transcripts',
      category: 'performance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: 'Hybrid Cloud Architecture',
      description: 'Start with fast local Mac Mini processing, scale to cloud GPU workers automatically.',
      benefit: 'Pay for speed only when you need it',
      useCase: 'Handle traffic spikes without manual scaling',
      category: 'performance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      title: 'All Output Formats',
      description: 'Export transcripts as JSON, SRT, VTT, or plain text with a single API call.',
      benefit: 'No post-processing or format conversion needed',
      useCase: 'Generate video subtitles, podcast transcripts, and searchable text',
      category: 'integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'RESTful API',
      description: 'Simple HTTP endpoints that work with any programming language or framework.',
      benefit: 'Integrate in minutes, not days',
      useCase: 'Add transcription to your Node.js, Python, or Ruby app',
      category: 'integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Webhook Notifications',
      description: 'Get real-time callbacks when transcription jobs complete or fail.',
      benefit: 'Build async workflows without polling',
      useCase: 'Process large batches overnight, get notified when ready',
      category: 'integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      title: 'Batch Processing',
      description: 'Upload and process multiple audio files simultaneously with a single API call.',
      benefit: 'Save time on bulk transcription jobs',
      useCase: 'Transcribe entire podcast seasons or course libraries',
      category: 'integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Automatic File Deletion',
      description: 'Audio files and transcripts are permanently deleted after 24 hours automatically.',
      benefit: 'Zero-trust security by default',
      useCase: 'Comply with GDPR and data retention policies',
      category: 'security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'SOC2 Compliant',
      description: 'Audited security controls and compliance certifications for enterprise customers.',
      benefit: 'Meet your compliance requirements',
      useCase: 'Use in healthcare, legal, or financial services',
      category: 'security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'End-to-End Encryption',
      description: 'TLS 1.3 encryption for data in transit, AES-256 for data at rest.',
      benefit: 'Your audio stays private and secure',
      useCase: 'Transcribe confidential meetings and interviews',
      category: 'security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: 'API Key Management',
      description: 'Create, rotate, and revoke API keys with granular permissions and rate limits.',
      benefit: 'Secure access control for teams',
      useCase: 'Give each developer or service their own key',
      category: 'developer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: 'Usage Analytics',
      description: 'Real-time dashboards showing transcription usage, costs, and performance metrics.',
      benefit: 'Track costs and optimize usage',
      useCase: 'Monitor spending and predict monthly bills',
      category: 'developer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Code Libraries & SDKs',
      description: 'Official libraries for Python, Node.js, Ruby, and more with TypeScript support.',
      benefit: 'Get started in minutes with your stack',
      useCase: 'Use type-safe clients with auto-complete',
      category: 'developer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'OpenAPI Documentation',
      description: 'Complete API reference with interactive examples and code snippets.',
      benefit: 'Never guess what parameters to use',
      useCase: 'Test endpoints directly from documentation',
      category: 'developer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: '99.9% Uptime SLA',
      description: 'Guaranteed availability with automatic failover and redundant infrastructure.',
      benefit: 'Your transcription pipeline stays running',
      useCase: 'Build production apps with confidence',
      category: 'performance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  const categories = [
    { id: 'performance', label: 'Performance', color: 'primary' },
    { id: 'integration', label: 'Integration', color: 'blue' },
    { id: 'security', label: 'Security', color: 'green' },
    { id: 'developer', label: 'Developer Experience', color: 'purple' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Build
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From blazing-fast performance to enterprise-grade security, WhisperAPI has all the features
            you need to build production-ready transcription workflows
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-200 hover:border-primary-200 transition-all duration-300"
            >
              {/* Icon and Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {categories.find(c => c.id === feature.category)?.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefit */}
              <div className="mb-3">
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature.benefit}
                </div>
              </div>

              {/* Use Case */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 italic">
                  <span className="font-semibold not-italic">Use case:</span> {feature.useCase}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
              <span className="text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience These Features?
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Start with 60 free minutes per month. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/docs"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
