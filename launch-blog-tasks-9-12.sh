#!/bin/bash

# Launch final 4 tasks (blogs 9-10 + SEO + Conversion)

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 22
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-22-summary.md && echo '' && echo 'Press Enter to start Task 22 with Claude...' && read && claude 'Read the task summary at task-summaries/task-22-summary.md and complete all requirements. Create the developer integration guide with 2000+ words, SDKs, webhooks, complete code, and all SEO elements. Report when complete.'"

    -- Task 23
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-23-summary.md && echo '' && echo 'Press Enter to start Task 23 with Claude...' && read && claude 'Read the task summary at task-summaries/task-23-summary.md and complete all requirements. Create the future trends blog post with 2000+ words, predictions, market analysis, and all SEO elements. Report when complete.'"

    -- Task 24 (SEO Optimization)
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-24-summary.md && echo '' && echo 'Press Enter to start Task 24 with Claude...' && read && claude 'Read the task summary at task-summaries/task-24-summary.md and complete all requirements. Optimize entire landing page for SEO: meta tags, structured data, sitemap, robots.txt, image optimization, Core Web Vitals. Report when complete with Lighthouse scores.'"

    -- Task 25 (Conversion Optimization)
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-25-summary.md && echo '' && echo 'Press Enter to start Task 25 with Claude...' && read && claude 'Read the task summary at task-summaries/task-25-summary.md and complete all requirements. Optimize landing page for conversions: hero, social proof, CTAs, FAQ, pricing comparison, analytics. Report when complete with all components created.'"
end tell
APPLESCRIPT
