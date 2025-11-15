/**
 * @module InlineCTA
 * @description Inline CTA components that can be scattered throughout the page
 *
 * Features:
 * - Multiple CTA variants (default, highlight, minimal)
 * - Urgency messaging options
 * - Social proof integration
 * - Icon support
 * - Fully responsive
 *
 * @example
 * <InlineCTA variant="highlight" />
 * <InlineCTA variant="minimal" title="Custom Title" />
 */

'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  CheckCircle,
  TrendingUp,
  Zap,
  LucideIcon
} from 'lucide-react';

interface InlineCTAProps {
  variant?: 'default' | 'highlight' | 'minimal' | 'urgency' | 'social';
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  icon?: LucideIcon;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function InlineCTA({
  variant = 'default',
  title,
  description,
  primaryText = "Start Free Trial",
  primaryHref = "#signup",
  secondaryText = "Book a Demo",
  secondaryHref = "#demo",
  icon: Icon,
  stats
}: InlineCTAProps) {
  // Default variant
  if (variant === 'default') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-16"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            {Icon && (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
            )}
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title || "Ready to Transform Your Outreach?"}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {description || "Join thousands of sales teams using personalized video to close more deals. Start your free trial today - no credit card required."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {primaryText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all border-2 border-blue-600"
              >
                {secondaryText}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Highlight variant - more prominent
  if (variant === 'highlight') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-16"
      >
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl p-1 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 animate-pulse"></div>

          <div className="relative bg-white rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mb-6">
                <Zap className="w-4 h-4 mr-2" />
                LIMITED TIME OFFER
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {title || "Get Started Today & Close More Deals Tomorrow"}
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {description || "14-day free trial. Full access to all features. Cancel anytime."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={primaryHref}
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 text-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {primaryText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href={secondaryHref}
                  className="inline-flex items-center justify-center px-10 py-5 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all text-lg"
                >
                  {secondaryText}
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Free 14-day trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Minimal variant - subtle
  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-12"
      >
        <div className="text-center py-8 border-y border-gray-200">
          <p className="text-gray-600 mb-4">
            {description || "Ready to see it in action?"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {primaryText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {secondaryText}
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // Urgency variant
  if (variant === 'urgency') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-16"
      >
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12 border border-orange-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title || "Don't Miss Out - Limited Time Offer"}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {description || "Join now and get 2 months free when you sign up for an annual plan. Offer ends soon!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30"
              >
                <Clock className="w-5 h-5 mr-2" />
                {primaryText}
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all border-2 border-orange-600"
              >
                {secondaryText}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Social proof variant
  if (variant === 'social') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-16"
      >
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-green-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title || "Join 10,000+ Sales Teams"}
              </h3>
              <p className="text-lg text-gray-600">
                {description || "Companies using personalized video are closing deals faster and scaling their outreach like never before."}
              </p>
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {primaryText}
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all border-2 border-blue-600"
              >
                {secondaryText}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
