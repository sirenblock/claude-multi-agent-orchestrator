#!/bin/bash

# Launch blog writing tasks 26-29

osascript <<'APPLESCRIPT'
tell application "Terminal"
    -- Task 26
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-26-blog-complete-guide.md && echo '' && echo 'Press Enter to start Task 26...' && read && claude 'Read task-summaries/task-26-blog-complete-guide.md and write the complete 2000+ word blog post in content/blog/complete-guide-audio-transcription-apis-2025.mdx with full MDX frontmatter, all sections, code examples, and SEO optimization. Report when complete with word count.'"

    -- Task 27
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-27-blog-whisper-vs-google.md && echo '' && echo 'Press Enter to start Task 27...' && read && claude 'Read task-summaries/task-27-blog-whisper-vs-google.md and write the complete 2000+ word comparison blog post in content/blog/whisper-ai-vs-google-speech-to-text-comparison.mdx. Report when complete.'"

    -- Task 28
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-28-blog-build-app.md && echo '' && echo 'Press Enter to start Task 28...' && read && claude 'Read task-summaries/task-28-blog-build-app.md and write the complete 2000+ word tutorial in content/blog/build-transcription-app-whisperapi-30-minutes.mdx. Report when complete.'"

    -- Task 29
    do script "cd /Users/lsd/msclaude/projects/1-1 && cat task-summaries/task-29-blog-use-cases.md && echo '' && echo 'Press Enter to start Task 29...' && read && claude 'Read task-summaries/task-29-blog-use-cases.md and write the complete 2000+ word use cases blog in content/blog/10-use-cases-audio-transcription-apis.mdx. Report when complete.'"
end tell
APPLESCRIPT
