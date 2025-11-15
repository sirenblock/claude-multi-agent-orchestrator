/**
 * @module Analytics
 * @description Client-side analytics component for tracking and monitoring
 *
 * Features:
 * - Google Analytics 4 integration
 * - Plausible Analytics integration
 * - Automatic page view tracking
 * - Core Web Vitals monitoring
 * - Privacy-focused tracking options
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  initGA4,
  initPlausible,
  trackPageView,
  trackPerformance,
} from '@/lib/analytics';

interface AnalyticsProps {
  /**
   * Google Analytics 4 Measurement ID
   * Format: G-XXXXXXXXXX
   */
  ga4MeasurementId?: string;

  /**
   * Plausible Analytics domain
   * Should match your website domain
   */
  plausibleDomain?: string;

  /**
   * Enable debug mode (logs to console)
   */
  debug?: boolean;

  /**
   * Enable Core Web Vitals tracking
   */
  trackWebVitals?: boolean;
}

/**
 * Analytics component
 *
 * @example
 * ```tsx
 * // In your root layout
 * <Analytics
 *   ga4MeasurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
 *   plausibleDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
 *   trackWebVitals={true}
 * />
 * ```
 */
export default function Analytics({
  ga4MeasurementId,
  plausibleDomain,
  debug = false,
  trackWebVitals = true,
}: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    // Initialize GA4
    if (ga4MeasurementId) {
      if (debug) {
        console.log('[Analytics] Initializing GA4:', ga4MeasurementId);
      }
      initGA4(ga4MeasurementId);
    }

    // Initialize Plausible
    if (plausibleDomain) {
      if (debug) {
        console.log('[Analytics] Initializing Plausible:', plausibleDomain);
      }
      initPlausible(plausibleDomain);
    }

    // Track initial page view
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [ga4MeasurementId, plausibleDomain, debug, pathname, searchParams]);

  // Track page changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    if (debug) {
      console.log('[Analytics] Page view:', url);
    }

    trackPageView(url);
  }, [pathname, searchParams, debug]);

  // Track Core Web Vitals
  useEffect(() => {
    if (!trackWebVitals) return;

    // Use Next.js Web Vitals reporting
    const reportWebVitals = (metric: any) => {
      if (debug) {
        console.log('[Analytics] Web Vital:', metric);
      }

      // Track to analytics
      trackPerformance(metric.name, metric.value);

      // Send to GA4 with specific event
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Send to Plausible
      if (window.plausible) {
        window.plausible('Web Vitals', {
          props: {
            metric: metric.name,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            rating: metric.rating,
          },
        });
      }
    };

    // Use web-vitals library if available
    if ('web-vitals' in window || typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals);
        onFCP(reportWebVitals);
        onLCP(reportWebVitals);
        onTTFB(reportWebVitals);
        onINP(reportWebVitals);
      }).catch((error) => {
        if (debug) {
          console.warn('[Analytics] Failed to load web-vitals:', error);
        }
      });
    }
  }, [trackWebVitals, debug]);

  // This component doesn't render anything
  return null;
}

/**
 * Web Vitals tracking hook
 * Can be used independently for custom tracking
 */
export function useWebVitals(callback: (metric: any) => void) {
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(callback);
      onFCP(callback);
      onLCP(callback);
      onTTFB(callback);
      onINP(callback);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, [callback]);
}

/**
 * Consent management component
 * For GDPR/CCPA compliance
 */
interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  position?: 'top' | 'bottom';
}

export function ConsentBanner({
  onAccept,
  onDecline,
  position = 'bottom',
}: ConsentBannerProps) {
  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div className={`fixed ${positionClasses} left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg`}>
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm">
              We use cookies and analytics to improve your experience. By continuing to use this site,
              you agree to our use of cookies and analytics tracking.
              {' '}
              <a href="/privacy" className="underline hover:text-primary-400">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Analytics provider with consent management
 */
interface AnalyticsProviderProps extends AnalyticsProps {
  children?: React.ReactNode;
  requireConsent?: boolean;
}

export function AnalyticsProvider({
  children,
  requireConsent = false,
  ...analyticsProps
}: AnalyticsProviderProps) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for stored consent
    const storedConsent = localStorage.getItem('analytics-consent');
    if (storedConsent) {
      setConsent(storedConsent === 'true');
    } else if (!requireConsent) {
      setConsent(true);
    }
  }, [requireConsent]);

  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem('analytics-consent', 'true');
  };

  const handleDecline = () => {
    setConsent(false);
    localStorage.setItem('analytics-consent', 'false');
  };

  return (
    <>
      {consent === true && <Analytics {...analyticsProps} />}
      {consent === null && requireConsent && (
        <ConsentBanner onAccept={handleAccept} onDecline={handleDecline} />
      )}
      {children}
    </>
  );
}

// Import useState for AnalyticsProvider
import { useState } from 'react';
