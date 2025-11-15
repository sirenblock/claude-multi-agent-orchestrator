'use client';

import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Share2 className="w-5 h-5" />
        <span className="font-semibold">Share this article</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
          <span>Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span>Facebook</span>
        </a>

        <button
          onClick={copyToClipboard}
          className="share-button"
          aria-label="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
