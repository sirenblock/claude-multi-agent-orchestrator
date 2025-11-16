#!/bin/bash

# Launch blog enhancement tasks 38-41

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 38: Typography & Readability
    do script "cd /Users/lsd/msclaude/projects/1-1/frontend/landing && cat ../../task-summaries/task-38-blog-typography.md && echo '' && echo 'Press Enter to start Task 38...' && read && claude 'Read ../../task-summaries/task-38-blog-typography.md and implement professional typography like Medium: larger fonts (20-21px body), proper heading sizes, generous spacing (1.6-1.8 line height), drop caps, pull quotes. Update app/blog/[slug]/page.tsx and add custom prose styles. Report completion.'"

    -- Task 39: MDX Components
    do script "cd /Users/lsd/msclaude/projects/1-1/frontend/landing && cat ../../task-summaries/task-39-blog-mdx-components.md && echo '' && echo 'Press Enter to start Task 39...' && read && claude 'Read ../../task-summaries/task-39-blog-mdx-components.md and create rich MDX components: callout boxes, code blocks, image captions, icons (lucide-react). Create components/blog/MDXComponents.tsx and integrate. Report completion.'"

    -- Task 40: Layout & Visual Polish
    do script "cd /Users/lsd/msclaude/projects/1-1/frontend/landing && cat ../../task-summaries/task-40-blog-layout.md && echo '' && echo 'Press Enter to start Task 40...' && read && claude 'Read ../../task-summaries/task-40-blog-layout.md and create professional blog layout: centered 680px column, sticky ToC, reading progress bar, author card, hero images, navigation. Update layout components. Report completion.'"

    -- Task 41: Code Highlighting
    do script "cd /Users/lsd/msclaude/projects/1-1/frontend/landing && cat ../../task-summaries/task-41-blog-code-highlighting.md && echo '' && echo 'Press Enter to start Task 41...' && read && claude 'Read ../../task-summaries/task-41-blog-code-highlighting.md and implement professional code blocks with syntax highlighting using react-syntax-highlighter. Add copy button, line numbers, language badges. Create components/blog/CodeBlock.tsx. Report completion.'"
end tell
APPLESCRIPT
