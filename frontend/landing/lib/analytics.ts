/**
 * @module Analytics
 * @description Analytics utilities for tracking user interactions and conversions
 *
 * Supports:
 * - Google Analytics 4 (GA4)
 * - Plausible Analytics
 * - Custom event tracking
 * - Conversion tracking
 * - Page view tracking
 */

// Type definitions for analytics events
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  transaction_id?: string;
  [key: string]: string | number | undefined;
}

// Check if window is defined (client-side)
const isClient = typeof window !== 'undefined';

/**
 * Initialize Google Analytics 4
 */
export const initGA4 = (measurementId: string): void => {
  if (!isClient || !measurementId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send manually for better control
  });
};

/**
 * Initialize Plausible Analytics
 */
export const initPlausible = (domain: string): void => {
  if (!isClient || !domain) return;

  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = domain;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);

  // Initialize plausible function
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
};

/**
 * Track page view
 */
export const trackPageView = (url: string): void => {
  if (!isClient) return;

  // GA4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Plausible automatically tracks page views via their script
  if (window.plausible) {
    window.plausible('pageview');
  }
};

/**
 * Track custom event
 */
export const trackEvent = ({
  action,
  category,
  label,
  value,
  ...params
}: AnalyticsEvent): void => {
  if (!isClient) return;

  // GA4
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }

  // Plausible
  if (window.plausible) {
    window.plausible(action, {
      props: {
        category,
        label,
        value,
        ...params,
      },
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event:', { action, category, label, value, ...params });
  }
};

/**
 * Track conversion event
 */
export const trackConversion = ({
  event_name,
  currency = 'USD',
  value,
  transaction_id,
  ...params
}: ConversionEvent): void => {
  if (!isClient) return;

  // GA4
  if (window.gtag) {
    window.gtag('event', event_name, {
      currency,
      value,
      transaction_id,
      ...params,
    });
  }

  // Plausible
  if (window.plausible) {
    window.plausible(event_name, {
      props: {
        currency,
        value,
        transaction_id,
        ...params,
      },
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Conversion:', { event_name, currency, value, transaction_id, ...params });
  }
};

/**
 * Pre-defined event tracking functions for common actions
 */

// CTA Click Events
export const trackCTAClick = (ctaName: string, location: string): void => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    location,
  });
};

export const trackSignupStart = (source: string): void => {
  trackConversion({
    event_name: 'sign_up_start',
    source,
  });
};

export const trackSignupComplete = (userId?: string): void => {
  trackConversion({
    event_name: 'sign_up_complete',
    user_id: userId,
  });
};

// Pricing Events
export const trackPricingView = (plan: string): void => {
  trackEvent({
    action: 'pricing_view',
    category: 'pricing',
    label: plan,
  });
};

export const trackPlanSelect = (plan: string, price: number): void => {
  trackConversion({
    event_name: 'plan_select',
    plan_name: plan,
    value: price,
  });
};

// Documentation Events
export const trackDocsView = (page: string): void => {
  trackEvent({
    action: 'docs_view',
    category: 'documentation',
    label: page,
  });
};

export const trackCodeCopy = (language: string, section: string): void => {
  trackEvent({
    action: 'code_copy',
    category: 'documentation',
    label: language,
    section,
  });
};

// Video/Demo Events
export const trackVideoPlay = (videoName: string): void => {
  trackEvent({
    action: 'video_play',
    category: 'engagement',
    label: videoName,
  });
};

export const trackDemoRequest = (source: string): void => {
  trackConversion({
    event_name: 'demo_request',
    source,
  });
};

// Social/External Link Events
export const trackExternalLink = (url: string, linkText: string): void => {
  trackEvent({
    action: 'external_link_click',
    category: 'engagement',
    label: linkText,
    destination: url,
  });
};

export const trackSocialClick = (platform: string): void => {
  trackEvent({
    action: 'social_click',
    category: 'social',
    label: platform,
  });
};

// Form Events
export const trackFormStart = (formName: string): void => {
  trackEvent({
    action: 'form_start',
    category: 'forms',
    label: formName,
  });
};

export const trackFormSubmit = (formName: string, success: boolean): void => {
  trackEvent({
    action: 'form_submit',
    category: 'forms',
    label: formName,
    success: success ? 1 : 0,
  });
};

// API Integration Events
export const trackAPIKeyGenerate = (): void => {
  trackConversion({
    event_name: 'api_key_generate',
  });
};

export const trackAPIFirstCall = (endpoint: string): void => {
  trackConversion({
    event_name: 'api_first_call',
    endpoint,
  });
};

// Error Tracking
export const trackError = (errorType: string, errorMessage: string): void => {
  trackEvent({
    action: 'error',
    category: 'errors',
    label: errorType,
    error_message: errorMessage,
  });
};

// Performance Tracking
export const trackPerformance = (metric: string, value: number): void => {
  trackEvent({
    action: 'performance_metric',
    category: 'performance',
    label: metric,
    value: Math.round(value),
  });
};

/**
 * TypeScript declarations for global window objects
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    plausible: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}

export {};
