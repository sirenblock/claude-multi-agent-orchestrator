#!/bin/bash

# Launch blog writing tasks 34-37

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 34
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-34-blog-integration.md && echo '' && echo 'Press Enter to start Task 34...' && read && claude 'Read task-summaries/task-34-blog-integration.md and write the complete 2000+ word developer guide in content/blog/whisperapi-integration-developer-guide.mdx. Report when complete.'"

    -- Task 35
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-35-blog-future.md && echo '' && echo 'Press Enter to start Task 35...' && read && claude 'Read task-summaries/task-35-blog-future.md and write the complete 2000+ word trends article in content/blog/future-speech-recognition-trends-2025.mdx. Report when complete.'"

    -- Task 36 (SEO Optimization)
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-36-blog-optimization.md && echo '' && echo 'Press Enter to start Task 36...' && read && claude 'Read task-summaries/task-36-blog-optimization.md and optimize ALL 10 blog posts for SEO: meta tags, headings, keywords, internal links, images, structured data, readability, CTAs. Report completion with SEO scores.'"

    -- Task 37 (Final Review)
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-37-blog-review.md && echo '' && echo 'Press Enter to start Task 37...' && read && claude 'Read task-summaries/task-37-blog-review.md and perform final review of ALL blog posts: quality check, code verification, links, visuals, engagement, technical SEO, conversion optimization. Report completion with quality scores.'"
end tell
APPLESCRIPT
