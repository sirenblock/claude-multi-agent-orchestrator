#!/bin/bash

# ==============================================================================
# MASTER BLOG ENHANCEMENT SCRIPT - Launch tasks, arrange windows, start keep-alive
# ==============================================================================

echo "🎨 Launching blog enhancement tasks..."

# Launch all 4 windows
./launch-blog-enhancement.sh &

# Wait for all windows to open
sleep 5

echo "📐 Arranging windows in 2x2 grid..."

# Arrange windows and press Enter in each
osascript <<'APPLESCRIPT'
tell application "Terminal"
    activate
    set allWindows to (every window)
    set windowCount to count of allWindows

    -- Get screen dimensions
    tell application "Finder"
        set screenBounds to bounds of window of desktop
        set screenWidth to item 3 of screenBounds
        set screenHeight to item 4 of screenBounds
    end tell

    -- Calculate window dimensions for 2x2 grid
    set windowWidth to (screenWidth / 2) - 20
    set windowHeight to ((screenHeight - 100) / 2) - 20

    -- Arrange latest 4 windows in a 2x2 grid
    set windowIndex to 1
    repeat with row from 0 to 1
        repeat with col from 0 to 1
            if windowIndex ≤ 4 and windowIndex ≤ windowCount then
                set theWindow to item windowIndex of allWindows
                set xPos to (col * ((screenWidth / 2))) + 10
                set yPos to (row * ((screenHeight - 100) / 2)) + 30
                set bounds of theWindow to {xPos, yPos, xPos + windowWidth, yPos + windowHeight}
                set windowIndex to windowIndex + 1
            end if
        end repeat
    end repeat

    delay 1

    -- Press Enter in each of the 4 windows to start processing
    repeat with i from 1 to 4
        if i ≤ windowCount then
            try
                tell (item i of allWindows)
                    do script "" in selected tab
                end tell
                delay 0.3
            end try
        end if
    end repeat
end tell
APPLESCRIPT

echo "✅ Windows arranged and started!"
echo "🔄 Starting keep-alive script (3 second interval)..."

# Start keep-alive script in background
./keep-alive-blog-enhancement.sh &

echo "✨ All systems running!"
echo ""
echo "📊 4 Claude AI agents working on blog enhancements"
echo "⏱️  Keep-alive running every 3 seconds"
echo "📝 Estimated completion: 10-15 minutes"
echo ""
echo "Tasks:"
echo "  1. Typography & Readability (Medium-style)"
echo "  2. MDX Components & Rich Content"
echo "  3. Layout & Visual Polish"
echo "  4. Code Block Syntax Highlighting"
echo ""
echo "Press Ctrl+C to stop keep-alive when tasks are complete"
