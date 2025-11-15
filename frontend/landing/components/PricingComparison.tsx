/**
 * @module PricingComparison
 * @description Enhanced pricing comparison table with annual/monthly toggle
 *
 * Features:
 * - Side-by-side plan comparison
 * - Feature checkmarks/X marks for detailed comparison
 * - Highlight most popular plan
 * - Annual/monthly toggle with savings badge
 * - PriceSpecification structured data for SEO
 *
 * @example
 * <PricingComparison />
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PricingFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  minutesIncluded: string;
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
}

export default function PricingComparison() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans: Plan[] = [
    {
      name: 'Free',
      description: 'Perfect for trying out WhisperAPI',
      monthlyPrice: 0,
      annualPrice: 0,
      minutesIncluded: '60 minutes/month',
      ctaText: 'Start Free',
      ctaLink: '/signup',
    },
    {
      name: 'Pro',
      description: 'Best for professionals and small teams',
      monthlyPrice: 19,
      annualPrice: 15.20, // 20% discount
      minutesIncluded: '600 minutes/month',
      popular: true,
      ctaText: 'Start Pro Trial',
      ctaLink: '/signup?plan=pro',
    },
    {
      name: 'Enterprise',
      description: 'For high-volume usage and custom needs',
      monthlyPrice: 0,
      annualPrice: 0,
      minutesIncluded: 'Custom',
      ctaText: 'Contact Sales',
      ctaLink: 'mailto:enterprise@whisperapi.com',
    },
  ];

  const features: PricingFeature[] = [
    {
      name: 'Minutes included',
      free: '60/month',
      pro: '600/month',
      enterprise: 'Custom',
    },
    {
      name: 'Whisper models',
      free: 'Base only',
      pro: 'Base, Small, Medium',
      enterprise: 'All models',
    },
    {
      name: 'Output formats',
      free: 'JSON',
      pro: 'JSON, SRT, VTT, TXT',
      enterprise: 'All + Custom',
    },
    {
      name: 'Processing speed',
      free: 'Standard',
      pro: 'Priority',
      enterprise: 'Dedicated',
    },
    {
      name: 'Rate limits',
      free: '3 requests/hour',
      pro: '20 requests/hour',
      enterprise: 'Custom',
    },
    {
      name: 'File retention',
      free: '24 hours',
      pro: '24 hours',
      enterprise: 'Custom',
    },
    {
      name: 'API key management',
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Usage analytics',
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Webhook notifications',
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Batch processing',
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: 'Priority support',
      free: false,
      pro: 'Email',
      enterprise: 'Phone + Email',
    },
    {
      name: 'SLA guarantee',
      free: false,
      pro: false,
      enterprise: '99.9% uptime',
    },
    {
      name: 'Dedicated account manager',
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      name: 'Custom integrations',
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      name: 'Volume discounts',
      free: false,
      pro: false,
      enterprise: true,
    },
  ];

  const getPrice = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return plan;
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return { ...plan, displayPrice: price };
  };

  const savingsPercent = 20; // 20% discount for annual

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compare Plans & Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your transcription needs
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                Save {savingsPercent}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => {
            const planWithPrice = getPrice(plan);
            const displayPrice = 'displayPrice' in planWithPrice ? planWithPrice.displayPrice : plan.monthlyPrice;

            return (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary-500 transform md:scale-105'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.monthlyPrice === 0 && plan.name === 'Free' ? (
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-gray-900">$0</span>
                        <span className="text-gray-600 ml-2">/month</span>
                      </div>
                    ) : plan.name === 'Enterprise' ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">Custom</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-5xl font-bold text-gray-900">
                            ${displayPrice}
                          </span>
                          <span className="text-gray-600 ml-2">/month</span>
                        </div>
                        {billingPeriod === 'annual' && (
                          <p className="text-sm text-primary-600 mt-2">
                            ${(displayPrice * 12).toFixed(0)} billed annually
                          </p>
                        )}
                      </>
                    )}
                    <p className="text-primary-600 font-medium mt-3">
                      {plan.minutesIncluded}
                    </p>
                  </div>

                  <Link
                    href={plan.ctaLink}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={index}
                      className={`px-6 py-4 text-center text-sm font-semibold ${
                        plan.popular ? 'text-primary-600' : 'text-gray-900'
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="px-6 py-4 text-center bg-primary-50/30">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            All plans include: End-to-end encryption • GDPR compliant • Auto file deletion • 24/7 API availability
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'WhisperAPI',
            description: 'Fast, affordable audio transcription API powered by OpenAI Whisper',
            offers: plans
              .filter(plan => plan.monthlyPrice > 0)
              .map(plan => ({
                '@type': 'Offer',
                name: `${plan.name} Plan`,
                price: billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice,
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  price: billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice,
                  priceCurrency: 'USD',
                  billingDuration: billingPeriod === 'monthly' ? 'P1M' : 'P1Y',
                },
                availability: 'https://schema.org/InStock',
              })),
          }),
        }}
      />
    </section>
  );
}

function renderFeatureValue(value: boolean | string) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg
        className="w-5 h-5 text-primary-500 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-gray-300 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return <span className="text-sm text-gray-700 font-medium">{value}</span>;
}
