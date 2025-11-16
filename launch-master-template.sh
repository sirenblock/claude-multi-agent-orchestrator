#!/bin/bash

# ==============================================================================
# MASTER LAUNCH ORCHESTRATOR - Generic template for any task set
# ==============================================================================
# Usage: ./launch-master-template.sh <task-launcher-script> <num-tasks> <grid-cols> <grid-rows> <session-name>
# Example: ./launch-master-template.sh launch-my-tasks.sh 4 2 2 "My Tasks"
# ==============================================================================

TASK_LAUNCHER=${1:-"launch-blog-enhancement.sh"}
NUM_TASKS=${2:-4}
GRID_COLS=${3:-2}
GRID_ROWS=${4:-2}
SESSION_NAME=${5:-"Task Session"}
KEEP_ALIVE_INTERVAL=${6:-3}

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  🚀 TASK ORCHESTRATOR v2.0                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Session: $SESSION_NAME"
echo "🎯 Tasks: $NUM_TASKS"
echo "📐 Grid: ${GRID_COLS}x${GRID_ROWS}"
echo "⏱️  Keep-alive: Every ${KEEP_ALIVE_INTERVAL}s"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Launch all windows
echo "🎨 Step 1/4: Launching $NUM_TASKS terminal windows..."
if [ -f "./$TASK_LAUNCHER" ]; then
    ./$TASK_LAUNCHER &
    LAUNCHER_PID=$!
    echo "   ✓ Task launcher started (PID: $LAUNCHER_PID)"
else
    echo "   ✗ Error: Task launcher '$TASK_LAUNCHER' not found!"
    exit 1
fi

# Wait for all windows to open
echo "   ⏳ Waiting for windows to initialize..."
sleep 5
echo "   ✓ Windows ready"
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

# Generate temporary keep-alive script
KEEP_ALIVE_SCRIPT="/tmp/keep-alive-$$.sh"
cat > "$KEEP_ALIVE_SCRIPT" <<KEEPALIVE
#!/bin/bash
while true; do
    osascript <<'APPLESCRIPT'
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
KEEPALIVE

chmod +x "$KEEP_ALIVE_SCRIPT"
"$KEEP_ALIVE_SCRIPT" &
KEEP_ALIVE_PID=$!

echo "   ✓ Keep-alive running (PID: $KEEP_ALIVE_PID)"
echo "   ✓ Auto-pressing Enter every ${KEEP_ALIVE_INTERVAL}s"
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
echo "│  🔄 Keep-alive:       Every ${KEEP_ALIVE_INTERVAL}s                                 │"
echo "│  📝 Session:          $SESSION_NAME                          │"
echo "╰─────────────────────────────────────────────────────────────╯"
echo ""
echo "🎛️  Control:"
echo "   • Press Ctrl+C to stop keep-alive when tasks complete"
echo "   • Keep-alive PID: $KEEP_ALIVE_PID"
echo ""
echo "📝 Log files will be saved in task-summaries/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Trap Ctrl+C to clean up
trap "echo ''; echo '🛑 Stopping keep-alive...'; kill $KEEP_ALIVE_PID 2>/dev/null; rm -f '$KEEP_ALIVE_SCRIPT'; echo '✅ Cleanup complete'; exit 0" INT

# Wait for keep-alive
wait $KEEP_ALIVE_PID
