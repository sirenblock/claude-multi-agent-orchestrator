#!/bin/bash

# Launch tasks 5-8 for blog optimization

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 18
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-18-summary.md && echo '' && echo 'Press Enter to start Task 18 with Claude...' && read && claude 'Read the task summary at task-summaries/task-18-summary.md and complete all requirements. Create the pricing guide blog post with 2000+ words, comparison table, calculator, and all SEO elements. Report when complete.'"

    -- Task 19
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-19-summary.md && echo '' && echo 'Press Enter to start Task 19 with Claude...' && read && claude 'Read the task summary at task-summaries/task-19-summary.md and complete all requirements. Create the quickstart guide with 2000+ words, code in 4 languages, screenshots, and all SEO elements. Report when complete.'"

    -- Task 20
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-20-summary.md && echo '' && echo 'Press Enter to start Task 20 with Claude...' && read && claude 'Read the task summary at task-summaries/task-20-summary.md and complete all requirements. Create the audio preparation blog post with 2000+ words, best practices, tool recommendations, and all SEO elements. Report when complete.'"

    -- Task 21
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-21-summary.md && echo '' && echo 'Press Enter to start Task 21 with Claude...' && read && claude 'Read the task summary at task-summaries/task-21-summary.md and complete all requirements. Create the AI vs Human comparison with 2000+ words, detailed analysis, cost calculator, and all SEO elements. Report when complete.'"
end tell
APPLESCRIPT
