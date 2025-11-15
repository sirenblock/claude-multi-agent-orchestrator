#!/bin/bash

# Keep blog optimization tasks alive by pressing Enter every 5 seconds

while true; do
    osascript <<'APPLESCRIPT'
    tell application "Terminal"
        set allWindows to (every window)
        set windowCount to count of allWindows
        
        -- Press Enter in the latest 12 windows
        repeat with i from 1 to 12
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
