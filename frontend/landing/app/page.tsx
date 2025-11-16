/**
 * @module HomePage
 * @description Main landing page for Audioscribe
 *
 * Integrates:
 * - Hero section with value proposition
 * - Features showcase
 * - Pricing table
 * - Comparison table
 * - FAQ section
 * - Final CTA
 *
 * @example
 * Rendered at: /
 */

import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import TrustBadges from '@/components/TrustBadges';
import Features from '@/components/Features';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import PricingTable from '@/components/PricingTable';
import PricingComparison from '@/components/PricingComparison';
import ComparisonTable from '@/components/ComparisonTable';
import GuaranteeSection from '@/components/GuaranteeSection';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import InlineCTA from '@/components/InlineCTA';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Social Proof Section */}
      <SocialProof />

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Features Section */}
      <Features />

      {/* Inline CTA 1 - After Features */}
      <InlineCTA variant="minimal" description="See how easy it is to integrate Audioscribe" />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Inline CTA 2 - After How It Works */}
      <InlineCTA
        variant="default"
        title="Ready to Start Transcribing?"
        description="Get started in minutes with our simple API. No complex setup required."
      />

      {/* Use Cases Section */}
      <UseCases />

      {/* Live Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how fast Audioscribe transcribes audio
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 text-white mx-auto mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <p className="text-white text-lg">Demo Video Coming Soon</p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">3min</div>
                    <div className="text-sm text-gray-600">Processing Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">99.2%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">60min</div>
                    <div className="text-sm text-gray-600">Audio Duration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Inline CTA 3 - Highlight variant */}
      <InlineCTA
        variant="highlight"
        title="80% Cheaper Than Competitors"
        description="See why thousands of developers are switching to Audioscribe"
      />

      {/* Pricing Table */}
      <PricingTable />

      {/* Pricing Comparison - Detailed */}
      <PricingComparison />

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* FAQ */}
      <FAQ />

      {/* Inline CTA 4 - Social proof variant */}
      <InlineCTA
        variant="social"
        title="Join 10,000+ Developers"
        description="Start transcribing audio with the fastest, most affordable API"
        stats={[
          { value: '500M+', label: 'Minutes Transcribed' },
          { value: '99.2%', label: 'Accuracy Rate' },
          { value: '10K+', label: 'Developers' },
          { value: '2.5K+', label: 'Companies' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-500">
        <div className="section-container">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers using Audioscribe for fast, affordable transcription
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/docs"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Read the Docs
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">
              60 free minutes • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA - appears on scroll */}
      <CTASection
        primaryText="Start Free Trial"
        primaryHref="/signup"
        secondaryText="Book Demo"
        secondaryHref="#demo"
      />
    </>
  );
}
