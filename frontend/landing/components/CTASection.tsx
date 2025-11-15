/**
 * @module CTASection
 * @description Sticky bottom CTA bar that appears on scroll
 *
 * Features:
 * - Sticky positioning at bottom of viewport
 * - Appears after user scrolls past hero
 * - Multiple CTA options (trial, demo)
 * - Dismissible option
 * - Mobile responsive
 *
 * @example
 * <CTASection />
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar } from 'lucide-react';

interface CTASectionProps {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  showAfterScroll?: number;
}

export default function CTASection({
  primaryText = "Start Free Trial",
  primaryHref = "#signup",
  secondaryText = "Book a Demo",
  secondaryHref = "#demo",
  showAfterScroll = 800
}: CTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > showAfterScroll && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4 pointer-events-auto">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 opacity-50"></div>

              <div className="relative px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left: Message */}
                  <div className="flex items-center gap-3 text-white">
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">
                        Ready to 10x Your Outreach?
                      </p>
                      <p className="text-sm text-white/90 hidden sm:block">
                        Start creating personalized videos in minutes - no credit card required
                      </p>
                    </div>
                  </div>

                  {/* Right: CTAs */}
                  <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                    <a
                      href={primaryHref}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {primaryText}
                    </a>
                    <a
                      href={secondaryHref}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {secondaryText}
                    </a>
                    <button
                      onClick={handleDismiss}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Dismiss"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
