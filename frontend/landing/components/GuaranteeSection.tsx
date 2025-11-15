/**
 * @module GuaranteeSection
 * @description Money-back guarantee section with trust signals
 *
 * Features:
 * - 30-day money-back guarantee
 * - Risk-free trial messaging
 * - Trust badges and security certifications
 * - Customer testimonials integration
 * - Visual trust indicators
 *
 * @example
 * <GuaranteeSection />
 */

'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Lock,
  Award,
  Users,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export default function GuaranteeSection() {
  const guarantees = [
    {
      icon: Shield,
      title: '30-Day Money-Back Guarantee',
      description: 'Try WhisperAPI risk-free. If you\'re not completely satisfied within 30 days, we\'ll refund your payment - no questions asked.',
    },
    {
      icon: Clock,
      title: '60 Free Minutes Every Month',
      description: 'Start with our free tier and test the API with real audio. No credit card required to get started.',
    },
    {
      icon: Lock,
      title: 'Enterprise-Grade Security',
      description: 'SOC 2 Type II certified, GDPR compliant, and CCPA compliant. Your data is encrypted in transit and at rest.',
    },
    {
      icon: TrendingUp,
      title: 'Uptime SLA',
      description: '99.9% uptime guarantee on Pro and Enterprise plans. We monitor our infrastructure 24/7 to ensure reliability.',
    },
  ];

  const trustBadges = [
    {
      icon: Award,
      label: 'SOC 2 Type II',
      description: 'Certified',
    },
    {
      icon: Shield,
      label: 'GDPR',
      description: 'Compliant',
    },
    {
      icon: Lock,
      label: 'SSL/TLS',
      description: 'Encrypted',
    },
    {
      icon: CheckCircle,
      label: '99.9%',
      description: 'Uptime',
    },
  ];

  const customerStats = [
    { value: '10,000+', label: 'Happy Developers' },
    { value: '2,500+', label: 'Companies' },
    { value: '500M+', label: 'Minutes Processed' },
    { value: '99.2%', label: 'Accuracy Rate' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        {/* Main Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Risk-Free Guarantee
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're so confident in WhisperAPI that we offer a 30-day money-back guarantee.
            Try it risk-free and see the difference for yourself.
          </p>
        </motion.div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Enterprise-Grade Security & Compliance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-gray-50 hover:bg-primary-50 transition-colors"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 shadow-sm">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="font-bold text-gray-900">{badge.label}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-3xl font-bold mb-2">
                Join Thousands of Satisfied Customers
              </h3>
              <p className="text-lg opacity-90">
                Trusted by developers and companies worldwide
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {customerStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 border-2 border-green-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Start Your Risk-Free Trial Today
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                No credit card required. Cancel anytime. 30-day money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-xl hover:scale-105"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-all border-2 border-primary-600"
                >
                  View Pricing
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  60 free minutes/month
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
