'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Enforce alt tag requirement
  fallbackSrc?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  showPlaceholder?: boolean;
  placeholderColor?: string;
}

/**
 * OptimizedImage Component
 *
 * A wrapper around Next.js Image component with:
 * - Automatic WebP/AVIF optimization
 * - Lazy loading by default
 * - Alt tag enforcement
 * - Error fallback handling
 * - Responsive image support
 * - Blur placeholder support
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/hero-demo.png"
 *   alt="Product demo screenshot"
 *   width={1200}
 *   height={800}
 *   priority // Use for above-the-fold images
 * />
 * ```
 */
export default function OptimizedImage({
  alt,
  fallbackSrc = '/images/placeholder.png',
  aspectRatio,
  objectFit = 'cover',
  showPlaceholder = true,
  placeholderColor = '#f3f4f6',
  className = '',
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(props.src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any) => {
    console.error('Image failed to load:', props.src);
    setHasError(true);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    onError?.(error);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Build container styles for aspect ratio
  const containerStyle = aspectRatio
    ? { aspectRatio, position: 'relative' as const }
    : undefined;

  // Build image class names
  const imageClasses = [
    className,
    isLoading && showPlaceholder ? 'blur-sm' : '',
    'transition-all duration-300',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      style={containerStyle}
      className={aspectRatio ? 'relative overflow-hidden' : undefined}
    >
      {/* Placeholder background */}
      {isLoading && showPlaceholder && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
          role="img"
          aria-label={alt}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Next.js Image component */}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={imageClasses}
        style={{
          objectFit,
          ...props.style,
        }}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        // Enable automatic format optimization (WebP/AVIF)
        // Next.js handles this automatically via next.config.js
        quality={props.quality || 85}
        // Lazy loading is enabled by default unless priority is set
        loading={props.priority ? undefined : props.loading || 'lazy'}
      />
    </div>
  );
}

/**
 * Responsive Image Component
 *
 * For art-directed responsive images with different sources for different breakpoints
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   mobileSrc="/images/hero-mobile.jpg"
 *   desktopSrc="/images/hero-desktop.jpg"
 *   alt="Hero image"
 * />
 * ```
 */
interface ResponsiveImageProps {
  mobileSrc: string;
  tabletSrc?: string;
  desktopSrc: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function ResponsiveImage({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
}: ResponsiveImageProps) {
  return (
    <>
      {/* Mobile */}
      <OptimizedImage
        src={mobileSrc}
        alt={alt}
        width={width || 800}
        height={height || 600}
        priority={priority}
        className={`${className} md:hidden`}
        objectFit={objectFit}
      />

      {/* Tablet */}
      {tabletSrc && (
        <OptimizedImage
          src={tabletSrc}
          alt={alt}
          width={width || 1200}
          height={height || 800}
          priority={priority}
          className={`${className} hidden md:block lg:hidden`}
          objectFit={objectFit}
        />
      )}

      {/* Desktop */}
      <OptimizedImage
        src={desktopSrc}
        alt={alt}
        width={width || 1920}
        height={height || 1080}
        priority={priority}
        className={`${className} ${tabletSrc ? 'hidden lg:block' : 'hidden md:block'}`}
        objectFit={objectFit}
      />
    </>
  );
}

/**
 * Avatar Image Component
 *
 * Optimized for circular user avatars
 *
 * @example
 * ```tsx
 * <AvatarImage
 *   src="/images/testimonials/user-1.jpg"
 *   alt="John Doe"
 *   size={48}
 * />
 * ```
 */
interface AvatarImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function AvatarImage({
  src,
  alt,
  size = 40,
  className = '',
}: AvatarImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      objectFit="cover"
    />
  );
}

/**
 * Logo Image Component
 *
 * Optimized for company/product logos
 *
 * @example
 * ```tsx
 * <LogoImage
 *   src="/images/logo.svg"
 *   alt="Company Logo"
 *   width={120}
 * />
 * ```
 */
interface LogoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function LogoImage({
  src,
  alt,
  width = 120,
  height = 40,
  className = '',
}: LogoImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      objectFit="contain"
      priority={true} // Logos are typically above the fold
    />
  );
}
