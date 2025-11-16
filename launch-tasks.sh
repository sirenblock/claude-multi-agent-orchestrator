#!/bin/bash

# ==============================================================================
# ALL-IN-ONE TASK ORCHESTRATOR
# ==============================================================================
# Launch Claude tasks in multiple terminal windows with auto-keep-alive
# Usage: ./launch-tasks.sh <task1> <task2> ... <taskN>
# ==============================================================================

if [ $# -lt 1 ]; then
    cat <<USAGE
╔════════════════════════════════════════════════════════════════╗
║              🚀 CLAUDE TASK ORCHESTRATOR v2.0                 ║
╚════════════════════════════════════════════════════════════════╝

Launch multiple Claude tasks in terminal windows with auto-keep-alive

USAGE:
  $0 <task1> <task2> ... <taskN>

EXAMPLES:
  # Launch 4 tasks in 2x2 grid
  $0 \\
    "Fix authentication bug in login.tsx" \\
    "Update README with new API docs" \\
    "Add unit tests for user service" \\
    "Refactor database queries for performance"

  # Launch 6 tasks in 3x2 grid
  $0 \\
    "Task 1: Review and fix TypeScript errors" \\
    "Task 2: Optimize image loading" \\
    "Task 3: Add error boundaries" \\
    "Task 4: Update dependencies" \\
    "Task 5: Write integration tests" \\
    "Task 6: Improve accessibility"

FEATURES:
  ✓ Auto-arranges windows in optimal grid layout
  ✓ Displays task info before starting
  ✓ Auto-presses Enter every 3 seconds (keep-alive)
  ✓ Beautiful progress display
  ✓ Easy to stop (Ctrl+C)

GRID LAYOUTS:
  1-2 tasks  → 1x2 or 2x1
  3-4 tasks  → 2x2
  5-6 tasks  → 3x2
  7-9 tasks  → 3x3
  10-12 tasks → 4x3

USAGE
    exit 1
fi

TASKS=("$@")
NUM_TASKS=${#TASKS[@]}

# Determine optimal grid layout
if [ $NUM_TASKS -le 2 ]; then
    GRID_COLS=2
    GRID_ROWS=1
elif [ $NUM_TASKS -le 4 ]; then
    GRID_COLS=2
    GRID_ROWS=2
elif [ $NUM_TASKS -le 6 ]; then
    GRID_COLS=3
    GRID_ROWS=2
elif [ $NUM_TASKS -le 9 ]; then
    GRID_COLS=3
    GRID_ROWS=3
else
    GRID_COLS=4
    GRID_ROWS=3
fi

KEEP_ALIVE_INTERVAL=3

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  🚀 TASK ORCHESTRATOR v2.0                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Tasks to launch: $NUM_TASKS"
echo "📐 Grid layout: ${GRID_COLS}x${GRID_ROWS}"
echo "⏱️  Keep-alive interval: ${KEEP_ALIVE_INTERVAL}s"
echo ""
echo "Tasks:"
for i in "${!TASKS[@]}"; do
    TASK_NUM=$((i + 1))
    echo "  $TASK_NUM. ${TASKS[$i]}"
done
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Launch all windows
echo "🎨 Step 1/4: Launching $NUM_TASKS terminal windows..."

# Generate AppleScript to open terminal windows
APPLESCRIPT_TASKS=""
for i in "${!TASKS[@]}"; do
    TASK_NUM=$((i + 1))
    TASK="${TASKS[$i]}"
    ESCAPED_TASK=$(echo "$TASK" | sed "s/'/'\\\\''/g")

    APPLESCRIPT_TASKS+="
    -- Task $TASK_NUM
    do script \"cd /Users/lsd/msclaude/projects/1-1/frontend/landing && clear && echo '╔════════════════════════════════════════════════════════════════╗' && echo '║  🎯 TASK $TASK_NUM/$NUM_TASKS' && echo '╚════════════════════════════════════════════════════════════════╝' && echo '' && echo '$ESCAPED_TASK' && echo '' && echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' && echo '' && echo '⏸️  Press Enter to start this task...' && read && claude '$ESCAPED_TASK. Provide clear progress updates and report completion status.'\"
"
done

osascript <<APPLESCRIPT
tell application "Terminal"
    $APPLESCRIPT_TASKS
end tell
APPLESCRIPT

echo "   ✓ Windows launched"
sleep 5
echo ""

# Step 2: Arrange windows in grid
echo "📐 Step 2/4: Arranging windows in ${GRID_COLS}x${GRID_ROWS} grid..."

osascript <<APPLESCRIPT
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

    -- Calculate window dimensions
    set windowWidth to (screenWidth / $GRID_COLS) - 20
    set windowHeight to ((screenHeight - 100) / $GRID_ROWS) - 20

    -- Arrange windows in grid
    set windowIndex to 1
    repeat with row from 0 to ($GRID_ROWS - 1)
        repeat with col from 0 to ($GRID_COLS - 1)
            if windowIndex ≤ $NUM_TASKS and windowIndex ≤ windowCount then
                set theWindow to item windowIndex of allWindows
                set xPos to (col * ((screenWidth / $GRID_COLS))) + 10
                set yPos to (row * ((screenHeight - 100) / $GRID_ROWS)) + 30
                set bounds of theWindow to {xPos, yPos, xPos + windowWidth, yPos + windowHeight}
                set windowIndex to windowIndex + 1
            end if
        end repeat
    end repeat

    delay 1
end tell
APPLESCRIPT

echo "   ✓ Grid layout complete"
echo ""

# Step 3: Press Enter in each window to start tasks
echo "▶️  Step 3/4: Starting all tasks (pressing Enter)..."

osascript <<APPLESCRIPT
tell application "Terminal"
    set allWindows to (every window)
    set windowCount to count of allWindows

    repeat with i from 1 to $NUM_TASKS
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

echo "   ✓ All tasks initiated"
echo ""

# Step 4: Start keep-alive script
echo "🔄 Step 4/4: Starting keep-alive monitor..."

# Run keep-alive in background
(
    while true; do
        osascript <<APPLESCRIPT
        tell application "Terminal"
            set allWindows to (every window)
            set windowCount to count of allWindows

            repeat with i from 1 to $NUM_TASKS
                if i ≤ windowCount then
                    try
                        tell (item i of allWindows)
                            do script "" in selected tab
                        end tell
                    end try
                end if
            end repeat
        end tell
APPLESCRIPT
        sleep $KEEP_ALIVE_INTERVAL
    done
) &
KEEP_ALIVE_PID=$!

echo "   ✓ Keep-alive running (PID: $KEEP_ALIVE_PID)"
echo ""

# Display summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ ALL SYSTEMS OPERATIONAL!"
echo ""
echo "╭─────────────────────────────────────────────────────────────╮"
echo "│  📊 Status Dashboard                                        │"
echo "├─────────────────────────────────────────────────────────────┤"
echo "│  🎯 Active Tasks:     $NUM_TASKS                                          │"
echo "│  📐 Layout:           ${GRID_COLS}x${GRID_ROWS} grid                                     │"
echo "│  🔄 Keep-alive:       Every ${KEEP_ALIVE_INTERVAL}s (PID: $KEEP_ALIVE_PID)            │"
echo "│  ⌨️  Auto-Enter:       Enabled                                  │"
echo "╰─────────────────────────────────────────────────────────────╯"
echo ""
echo "🎛️  Controls:"
echo "   • Press Ctrl+C to stop keep-alive when tasks complete"
echo "   • All task windows will remain open for review"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Trap Ctrl+C to clean up
trap "echo ''; echo ''; echo '🛑 Stopping keep-alive...'; kill $KEEP_ALIVE_PID 2>/dev/null; echo '✅ Keep-alive stopped. Task windows remain open.'; echo ''; exit 0" INT

# Wait for user to press Ctrl+C
wait $KEEP_ALIVE_PID
