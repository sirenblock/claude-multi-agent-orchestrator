#!/bin/bash

# Keep-alive script for blog enhancement tasks (3 second interval)

while true; do
    osascript <<'APPLESCRIPT'
    tell application "Terminal"
        set allWindows to (every window)
        set windowCount to count of allWindows

        -- Press Enter in the first 4 windows (tasks 38-41)
        repeat with i from 1 to 4
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
    sleep 3
done
