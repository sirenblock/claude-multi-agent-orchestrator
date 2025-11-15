import { Tag } from 'lucide-react';
import Link from 'next/link';

interface TagListProps {
  tags: string[];
  showIcon?: boolean;
}

export default function TagList({ tags, showIcon = true }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showIcon && <Tag className="w-4 h-4 text-gray-500" />}
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className="tag-badge"
        >
          #{tag.replace(/\s+/g, '-').toLowerCase()}
        </Link>
      ))}
    </div>
  );
}
