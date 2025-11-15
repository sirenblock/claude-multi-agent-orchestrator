#!/bin/bash

# Launch blog writing tasks 30-33

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 30
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-30-blog-pricing.md && echo '' && echo 'Press Enter to start Task 30...' && read && claude 'Read task-summaries/task-30-blog-pricing.md and write the complete 2000+ word pricing guide in content/blog/audio-transcription-pricing-guide-2025.mdx. Report when complete.'"

    -- Task 31
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-31-blog-quickstart.md && echo '' && echo 'Press Enter to start Task 31...' && read && claude 'Read task-summaries/task-31-blog-quickstart.md and write the complete 2000+ word quickstart guide in content/blog/whisperapi-quickstart-guide-5-minutes.mdx. Report when complete.'"

    -- Task 32
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-32-blog-audio-prep.md && echo '' && echo 'Press Enter to start Task 32...' && read && claude 'Read task-summaries/task-32-blog-audio-prep.md and write the complete 2000+ word best practices guide in content/blog/audio-file-preparation-best-practices.mdx. Report when complete.'"

    -- Task 33
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-33-blog-ai-vs-human.md && echo '' && echo 'Press Enter to start Task 33...' && read && claude 'Read task-summaries/task-33-blog-ai-vs-human.md and write the complete 2000+ word comparison in content/blog/ai-vs-human-transcription-comparison.mdx. Report when complete.'"
end tell
APPLESCRIPT
