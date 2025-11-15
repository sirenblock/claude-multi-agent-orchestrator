#!/bin/bash

# Launch first 4 blog optimization tasks in separate terminal windows

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 14
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-14-summary.md && echo '' && echo 'Press Enter to start Task 14 with Claude...' && read && claude 'Read the task summary at task-summaries/task-14-summary.md and complete all requirements. Create the blog post with 2000+ words, all SEO elements, code examples, and structured data. Report when complete with file location and word count.'"

    -- Task 15
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-15-summary.md && echo '' && echo 'Press Enter to start Task 15 with Claude...' && read && claude 'Read the task summary at task-summaries/task-15-summary.md and complete all requirements. Create the comparison blog post with 2000+ words, detailed table, code examples for both APIs, and all SEO elements. Report when complete.'"

    -- Task 16
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-16-summary.md && echo '' && echo 'Press Enter to start Task 16 with Claude...' && read && claude 'Read the task summary at task-summaries/task-16-summary.md and complete all requirements. Create the tutorial blog post with 2000+ words, complete working code, step-by-step instructions, and all SEO elements. Report when complete.'"

    -- Task 17
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-17-summary.md && echo '' && echo 'Press Enter to start Task 17 with Claude...' && read && claude 'Read the task summary at task-summaries/task-17-summary.md and complete all requirements. Create the use cases blog post with 2000+ words, 10 detailed use cases, ROI for each, and all SEO elements. Report when complete.'"
end tell
APPLESCRIPT
