#!/bin/bash

# ==============================================================================
# MASTER LAUNCH SCRIPT - Launch tasks, arrange windows, start keep-alive
# ==============================================================================

echo "🚀 Launching all tasks in parallel..."

# Launch all 12 windows
./launch-blog-writing-1-4.sh &
sleep 2
./launch-blog-writing-5-8.sh &
sleep 2
./launch-blog-writing-9-12.sh &

# Wait for all windows to open
sleep 3

echo "📐 Arranging windows in 4x3 grid..."

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

    -- Calculate window dimensions for 4x3 grid
    set windowWidth to (screenWidth / 4) - 10
    set windowHeight to ((screenHeight - 100) / 3) - 10

    -- Arrange latest 12 windows in a 4x3 grid
    set windowIndex to 1
    repeat with row from 0 to 2
        repeat with col from 0 to 3
            if windowIndex ≤ 12 and windowIndex ≤ windowCount then
                set theWindow to item windowIndex of allWindows
                set xPos to (col * ((screenWidth / 4))) + 5
                set yPos to (row * ((screenHeight - 100) / 3)) + 30
                set bounds of theWindow to {xPos, yPos, xPos + windowWidth, yPos + windowHeight}
                set windowIndex to windowIndex + 1
            end if
        end repeat
    end repeat

    delay 1

    -- Press Enter in each of the 12 windows to start processing
    repeat with i from 1 to 12
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
./keep-alive-blog-tasks.sh &

echo "✨ All systems running!"
echo ""
echo "📊 12 Claude AI agents working in parallel"
echo "⏱️  Keep-alive running every 3 seconds"
echo "📝 Estimated completion: 25-35 minutes"
echo ""
echo "Press Ctrl+C to stop keep-alive when tasks are complete"
