# Performance Optimization Guide

This document outlines the performance optimizations implemented in the WhisperAPI landing page and provides best practices for maintaining optimal performance.

## Table of Contents

- [Overview](#overview)
- [Core Web Vitals](#core-web-vitals)
- [Analytics Implementation](#analytics-implementation)
- [Image Optimization](#image-optimization)
- [Font Optimization](#font-optimization)
- [Code Splitting](#code-splitting)
- [Caching Strategy](#caching-strategy)
- [Monitoring](#monitoring)
- [Best Practices](#best-practices)

## Overview

The landing page is optimized for Core Web Vitals with the following goals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **INP (Interaction to Next Paint)**: < 200ms
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

## Core Web Vitals

### Largest Contentful Paint (LCP)

**Target: < 2.5 seconds**

LCP optimization strategies implemented:

1. **Image Optimization**
   - Use Next.js Image component for automatic optimization
   - Serve images in modern formats (AVIF, WebP)
   - Implement responsive images with `srcset`
   - Preload critical images

```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Preload above-the-fold images
  placeholder="blur"
/>
```

2. **Font Optimization**
   - Use `next/font` for automatic font optimization
   - Preload critical fonts
   - Use `font-display: swap` to prevent blocking

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
```

3. **Resource Hints**
   - DNS prefetching for external domains
   - Preconnect to critical origins
   - Preload critical assets

### First Input Delay (FID) / Interaction to Next Paint (INP)

**Target: FID < 100ms, INP < 200ms**

Optimization strategies:

1. **Code Splitting**
   - Lazy load non-critical components
   - Split vendor bundles
   - Dynamic imports for heavy components

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // If not needed for SEO
});
```

2. **Minimize JavaScript**
   - Remove unused code
   - Tree shaking enabled
   - Defer non-critical scripts

3. **Web Workers**
   - Offload heavy computations
   - Use for data processing

### Cumulative Layout Shift (CLS)

**Target: < 0.1**

Prevention strategies:

1. **Reserve Space for Dynamic Content**

```tsx
// Always specify dimensions for images
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>

// Use aspect-ratio for containers
<div className="aspect-video">
  <video />
</div>
```

2. **Avoid Layout Shifts**
   - Load fonts with `font-display: swap`
   - Reserve space for ads/embeds
   - Use transform instead of top/left for animations

## Analytics Implementation

### Google Analytics 4 (GA4)

#### Setup

1. **Add environment variable** (`.env.local`):

```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. **Add to layout**:

```tsx
import Analytics from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Analytics
          ga4MeasurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
          trackWebVitals={true}
        />
        {children}
      </body>
    </html>
  );
}
```

#### Event Tracking

Track user interactions:

```tsx
import { trackCTAClick, trackSignupStart } from '@/lib/analytics';

function CTAButton() {
  return (
    <button
      onClick={() => {
        trackCTAClick('Start Free Trial', 'hero');
        trackSignupStart('hero-cta');
      }}
    >
      Start Free Trial
    </button>
  );
}
```

### Plausible Analytics

Privacy-focused alternative to GA4.

#### Setup

1. **Add environment variable**:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=whisperapi.com
```

2. **Add to layout**:

```tsx
<Analytics
  plausibleDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
/>
```

Plausible automatically tracks page views without cookies.

### Custom Events

Track specific user actions:

```tsx
import {
  trackPlanSelect,
  trackCodeCopy,
  trackVideoPlay,
  trackFormSubmit,
} from '@/lib/analytics';

// Pricing events
trackPlanSelect('Pro Plan', 29);

// Documentation events
trackCodeCopy('javascript', 'getting-started');

// Media events
trackVideoPlay('Product Demo');

// Form events
trackFormSubmit('contact-form', true);
```

### Conversion Tracking

Track business-critical events:

```tsx
import {
  trackSignupComplete,
  trackAPIKeyGenerate,
  trackAPIFirstCall,
} from '@/lib/analytics';

// User signup
trackSignupComplete('user-123');

// API key generation
trackAPIKeyGenerate();

// First API call
trackAPIFirstCall('/v1/transcribe');
```

## Image Optimization

### Next.js Image Component

Always use the Next.js `Image` component:

```tsx
import Image from 'next/image';

// Local images
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>

// External images
<Image
  src="https://example.com/image.jpg"
  alt="External"
  width={800}
  height={400}
  loading="lazy" // For below-the-fold images
/>
```

### Configuration

Image optimization settings in `next.config.js`:

```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Lazy Loading

For images below the fold:

```tsx
<Image
  src="/below-fold.jpg"
  alt="Below fold"
  width={800}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Font Optimization

### Using next/font

Automatically optimize fonts:

```tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

### Custom Fonts

For local fonts:

```tsx
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/my-font.woff2',
  display: 'swap',
  weight: '400',
});
```

## Code Splitting

### Dynamic Imports

Lazy load components:

```tsx
import dynamic from 'next/dynamic';

// Component-level splitting
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div>Loading FAQ...</div>,
});

// Module-level splitting
const analytics = dynamic(() => import('@/lib/analytics'), {
  ssr: false,
});
```

### Route-based Splitting

Next.js automatically splits by route. Keep pages focused:

```
app/
  page.tsx          # Home page
  pricing/
    page.tsx        # Pricing page (separate bundle)
  docs/
    page.tsx        # Docs page (separate bundle)
```

### Vendor Splitting

Configured in `next.config.js`:

```js
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          priority: 20,
        },
        common: {
          minChunks: 2,
          priority: 10,
        },
      },
    };
  }
  return config;
}
```

## Caching Strategy

### Static Assets

Long-term caching for immutable assets:

```js
// next.config.js
async headers() {
  return [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### Images

Cache optimized images:

```js
{
  source: '/images/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

### API Responses

Use SWR or React Query for client-side caching:

```tsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 minute
  });

  // ...
}
```

## Monitoring

### Core Web Vitals Dashboard

Monitor in Google Search Console:
- https://search.google.com/search-console

### Real User Monitoring (RUM)

Track actual user experience:

```tsx
// Automatic with Analytics component
<Analytics
  ga4MeasurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
  trackWebVitals={true}
/>
```

### Custom Monitoring

```tsx
import { useWebVitals } from '@/components/Analytics';

function MyApp() {
  useWebVitals((metric) => {
    // Send to custom analytics
    console.log(metric);
  });
}
```

### Lighthouse CI

Add to CI/CD pipeline:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

## Best Practices

### 1. Measure First

Before optimizing, measure current performance:

```bash
# Run Lighthouse
npm run lighthouse

# Analyze bundle
npm run analyze
```

### 2. Optimize Images

- Use Next.js Image component
- Serve in modern formats (AVIF, WebP)
- Lazy load below-the-fold images
- Use appropriate sizes

### 3. Minimize JavaScript

- Remove unused dependencies
- Use dynamic imports
- Enable tree shaking
- Defer non-critical scripts

### 4. Optimize Fonts

- Use next/font
- Limit font variants
- Use font-display: swap
- Subset fonts when possible

### 5. Implement Caching

- Use appropriate Cache-Control headers
- Enable service workers
- Implement client-side caching

### 6. Monitor Continuously

- Set up Real User Monitoring
- Track Core Web Vitals
- Monitor bundle sizes
- Run regular audits

### 7. Progressive Enhancement

- Ensure basic functionality without JS
- Add enhancements progressively
- Test on slow connections

### 8. Server-Side Optimization

- Use edge functions when possible
- Enable compression
- Optimize API responses
- Use CDN for static assets

## Checklist

Before deployment, verify:

- [ ] All images use Next.js Image component
- [ ] Critical images have `priority` prop
- [ ] Fonts are optimized with next/font
- [ ] Analytics is properly configured
- [ ] Core Web Vitals tracking enabled
- [ ] Code splitting implemented
- [ ] Caching headers configured
- [ ] Bundle size is acceptable
- [ ] Lighthouse score > 90
- [ ] No console errors in production

## Resources

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Plausible Analytics](https://plausible.io/docs)

## Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Review Next.js documentation
