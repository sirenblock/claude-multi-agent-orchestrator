import { Author } from '@/lib/blogData';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

interface AuthorBioProps {
  author: Author;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="author-card">
      <div className="author-avatar-large">
        {author.name[0]}
      </div>

      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-1">
          {author.name}
        </h4>
        <p className="text-gray-600 mb-3 leading-relaxed">
          {author.bio}
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3">
          {author.twitter && (
            <a
              href={`https://twitter.com/${author.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              aria-label={`${author.name} on Twitter`}
            >
              <Twitter className="w-4 h-4" />
              <span>{author.twitter}</span>
            </a>
          )}

          {author.github && (
            <a
              href={`https://github.com/${author.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={`${author.name} on GitHub`}
            >
              <Github className="w-4 h-4" />
              <span>{author.github}</span>
            </a>
          )}

          {author.linkedin && (
            <a
              href={`https://linkedin.com/in/${author.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-700 transition-colors"
              aria-label={`${author.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
