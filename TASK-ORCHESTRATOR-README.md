# 🚀 Claude Task Orchestrator

A powerful system for running multiple Claude AI tasks in parallel with automatic window management and keep-alive functionality.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Examples](#examples)
- [Advanced Usage](#advanced-usage)
- [How It Works](#how-it-works)

## 🎯 Overview

This orchestration system allows you to:

✅ **Launch multiple Claude tasks** in separate terminal windows
✅ **Auto-arrange windows** in optimal grid layouts (2x2, 3x2, 3x3, 4x3)
✅ **Keep sessions alive** by auto-pressing Enter every 3 seconds
✅ **Beautiful display** with progress indicators and status dashboards
✅ **Easy control** - just press Ctrl+C to stop when done

## 🚀 Quick Start

### Simple: All-in-One Script

The easiest way to launch tasks:

```bash
./launch-tasks.sh \
  "Fix authentication bug in login.tsx" \
  "Update README with API documentation" \
  "Add unit tests for user service" \
  "Optimize database queries"
```

That's it! The script will:
1. Open 4 terminal windows
2. Arrange them in a 2x2 grid
3. Display each task and wait for you to press Enter (or auto-press)
4. Start auto-pressing Enter every 3 seconds to keep sessions alive

### Stop Keep-Alive

When tasks are complete, just press **Ctrl+C** in the orchestrator window.

## 📦 Scripts

### 1. `launch-tasks.sh` (Recommended)

**All-in-one script** - Simplest way to launch tasks.

```bash
./launch-tasks.sh <task1> <task2> ... <taskN>
```

**Features:**
- Auto-detects optimal grid layout based on number of tasks
- Beautiful UI with task summaries
- Auto keep-alive built-in
- One command does everything

**Example:**
```bash
./launch-tasks.sh \
  "Review TypeScript errors in src/" \
  "Optimize image loading performance" \
  "Add error boundaries to components" \
  "Update package dependencies"
```

### 2. `launch-master-template.sh`

**Generic orchestrator** - Use with custom task launchers.

```bash
./launch-master-template.sh <launcher-script> <num-tasks> <cols> <rows> <name>
```

**Example:**
```bash
./launch-master-template.sh launch-blog-enhancement.sh 4 2 2 "Blog Enhancement"
```

### 3. `create-task-launcher.sh`

**Task launcher generator** - Create reusable task launchers.

```bash
./create-task-launcher.sh <output-file> <task1> <task2> ... <taskN>
```

**Example:**
```bash
./create-task-launcher.sh launch-my-tasks.sh \
  "Task 1: Fix bugs" \
  "Task 2: Add tests" \
  "Task 3: Update docs"

# Then run with:
./launch-master-template.sh launch-my-tasks.sh 3 2 2 "My Tasks"
```

## 💡 Examples

### Example 1: Quick Bug Fixes (2 tasks)

```bash
./launch-tasks.sh \
  "Fix null pointer exception in UserService.ts line 42" \
  "Resolve CSS layout issue on mobile breakpoint"
```

**Result:** 2x1 grid, auto keep-alive every 3s

### Example 2: Feature Development (4 tasks)

```bash
./launch-tasks.sh \
  "Implement user profile edit functionality" \
  "Add profile image upload with S3 integration" \
  "Create profile settings page UI" \
  "Write integration tests for profile features"
```

**Result:** 2x2 grid, auto keep-alive

### Example 3: Blog Enhancement (4 tasks)

```bash
./launch-tasks.sh \
  "Add Medium-style typography with custom prose styles" \
  "Create rich MDX components (callouts, code blocks)" \
  "Implement reading progress bar and sticky TOC" \
  "Add syntax highlighting to code blocks"
```

**Result:** 2x2 grid, perfect for parallel blog improvements

### Example 4: Large Refactor (9 tasks)

```bash
./launch-tasks.sh \
  "Refactor authentication module" \
  "Update API endpoints to REST standards" \
  "Migrate database to PostgreSQL" \
  "Add Redis caching layer" \
  "Implement rate limiting" \
  "Add request validation middleware" \
  "Create API documentation with Swagger" \
  "Write E2E tests" \
  "Update deployment configuration"
```

**Result:** 3x3 grid, all running in parallel

## 🔧 Advanced Usage

### Using Existing Task Launchers

You already have several pre-built launchers:

```bash
# Blog enhancement tasks (4 windows)
./launch-blog-enhancement-master.sh

# Blog writing tasks (12 windows)
./launch-and-keep-alive.sh
```

### Custom Grid Layouts

Override automatic grid detection:

```bash
# Force 3x2 layout for 6 tasks
./launch-master-template.sh launch-my-tasks.sh 6 3 2 "Custom Layout"
```

### Adjust Keep-Alive Interval

Edit the script to change from 3 seconds:

```bash
KEEP_ALIVE_INTERVAL=5  # Change to 5 seconds
```

## ⚙️ How It Works

### Step 1: Launch Windows
- Opens N terminal windows using AppleScript
- Each window shows task description
- Waits for Enter key press

### Step 2: Arrange Grid
- Calculates optimal window size based on screen dimensions
- Arranges windows in grid layout (2x2, 3x2, 3x3, or 4x3)
- Positions windows to fill screen efficiently

### Step 3: Start Tasks
- Presses Enter in each window to start Claude
- Tasks begin processing in parallel

### Step 4: Keep-Alive
- Background process runs in infinite loop
- Every 3 seconds, presses Enter in all task windows
- Keeps Claude sessions active and responsive
- Stops when you press Ctrl+C

## 📐 Grid Layouts

The system automatically chooses the best layout:

| Tasks | Grid | Layout |
|-------|------|--------|
| 1-2   | 2x1  | Two side-by-side |
| 3-4   | 2x2  | Perfect square |
| 5-6   | 3x2  | Three columns, two rows |
| 7-9   | 3x3  | Large square |
| 10-12 | 4x3  | Maximum density |

## 🎨 UI Features

### Beautiful Task Display

```
╔════════════════════════════════════════════════════════════════╗
║  🎯 TASK 1/4
╚════════════════════════════════════════════════════════════════╝

Fix authentication bug in login.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏸️  Press Enter to start this task...
```

### Status Dashboard

```
╭─────────────────────────────────────────────────────────────╮
│  📊 Status Dashboard                                        │
├─────────────────────────────────────────────────────────────┤
│  🎯 Active Tasks:     4                                     │
│  📐 Layout:           2x2 grid                              │
│  🔄 Keep-alive:       Every 3s (PID: 12345)                 │
│  ⌨️  Auto-Enter:       Enabled                              │
╰─────────────────────────────────────────────────────────────╯
```

## 🛠️ Troubleshooting

### Windows Don't Arrange Properly

- Make sure Terminal has accessibility permissions
- Try increasing the sleep delay in Step 1: `sleep 5` → `sleep 8`

### Keep-Alive Not Working

- Check that the keep-alive PID is shown in the dashboard
- Verify Terminal windows are still open
- Make sure you didn't accidentally close the orchestrator window

### Tasks Not Starting

- Ensure `claude` CLI is installed and in PATH
- Check that you're in the correct directory
- Verify task commands are properly escaped

## 📝 Tips

1. **Start Small**: Test with 2-3 tasks before launching 12
2. **Monitor Progress**: Keep an eye on the windows initially
3. **Use Descriptive Tasks**: Clear task descriptions help Claude understand better
4. **Stop When Done**: Press Ctrl+C when tasks complete to free resources
5. **Review Logs**: Check each window for errors or completion status

## 🎯 Best Practices

### Task Descriptions

**Good:**
```bash
"Fix the null pointer exception in UserService.ts at line 42, add proper error handling"
```

**Not Ideal:**
```bash
"fix bug"
```

### Number of Tasks

- **2-4 tasks**: Ideal for focused work
- **5-8 tasks**: Good for parallel development
- **9-12 tasks**: Maximum for large refactors
- **12+**: Consider splitting into multiple sessions

### Keep-Alive Duration

- **Short tasks (5-15 min)**: 3 second interval is perfect
- **Long tasks (30+ min)**: Consider 5 second interval to reduce overhead

## 🔗 Related Scripts

- `launch-blog-enhancement-master.sh` - Blog enhancement orchestrator
- `launch-and-keep-alive.sh` - Blog writing orchestrator (12 tasks)
- `keep-alive-blog-enhancement.sh` - Standalone keep-alive for 4 windows
- `keep-alive-blog-tasks.sh` - Standalone keep-alive for 12 windows

## 📄 License

MIT License - Use freely for your projects!

---

**Happy orchestrating! 🎼✨**
