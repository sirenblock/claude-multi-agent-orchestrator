# Task 5: Queue Service - Setup Guide

## Quick Start

Follow these steps to set up and test the BullMQ Queue Service.

## Prerequisites

- Node.js 20.x or higher
- Redis server running locally or remotely
- PostgreSQL database (for Prisma)

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `bullmq` - Job queue library
- `ioredis` - Redis client
- `@prisma/client` - Database ORM
- All other dependencies from `package.json`

## Step 2: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and configure Redis
nano .env
```

**Minimum required configuration:**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/whisperapi"
REDIS_URL="redis://localhost:6379"
```

## Step 3: Start Redis

**Option 1: Local Redis**

```bash
# Install Redis (macOS)
brew install redis

# Start Redis
redis-server

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

**Option 2: Docker Redis**

```bash
docker run -d -p 6379:6379 redis:7-alpine
```

**Option 3: Cloud Redis**

Use a cloud provider like:
- Upstash (https://upstash.com)
- Redis Cloud (https://redis.com/cloud)
- Railway (https://railway.app)

Update `.env`:
```bash
REDIS_URL="redis://username:password@host:port"
```

## Step 4: Generate Prisma Client

```bash
npm run prisma:generate
```

## Step 5: Run Tests

```bash
# Run all tests
npm test

# Run queue service tests only
npm test services/__tests__/queue.test.ts

# Run with coverage
npm test -- --coverage
```

Expected output:
```
PASS  src/services/__tests__/queue.test.ts
  ✓ addTranscriptionJob - should add job with default priority
  ✓ getJobStatus - should return job status
  ✓ createWorker - should create worker
  ... (all tests passing)

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Coverage:    80%+ (all metrics)
```

## Step 6: Test Queue Manually

Create a test file `test-queue.ts`:

```typescript
import { addTranscriptionJob, getJobStatus, createWorker } from './src/services/queue.service';

async function testQueue() {
  console.log('Testing BullMQ Queue Service...\n');

  // 1. Add a test job
  console.log('1. Adding test job...');
  const jobId = await addTranscriptionJob({
    transcriptionId: 'test-' + Date.now(),
    userId: 'test-user-123',
    s3AudioUrl: 'https://example.com/test-audio.mp3',
    model: 'BASE',
    format: 'JSON',
  });
  console.log(`✓ Job added: ${jobId}\n`);

  // 2. Check job status
  console.log('2. Checking job status...');
  const status = await getJobStatus(jobId);
  console.log(`✓ Status:`, status);
  console.log();

  // 3. Create a mock worker
  console.log('3. Creating mock worker...');
  const worker = createWorker(async (job) => {
    console.log(`→ Processing job: ${job.id}`);
    
    // Simulate processing
    await job.updateProgress(25);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await job.updateProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await job.updateProgress(75);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await job.updateProgress(100);
    
    return {
      s3ResultUrl: 'https://example.com/result.json',
      durationSeconds: 120,
      completedAt: new Date(),
    };
  }, 1);

  worker.on('completed', (job) => {
    console.log(`✓ Job completed: ${job.id}`);
    process.exit(0);
  });

  worker.on('failed', (job, err) => {
    console.error(`✗ Job failed: ${job?.id}`, err);
    process.exit(1);
  });

  console.log('✓ Worker started and waiting for jobs...\n');
}

testQueue().catch(console.error);
```

Run the test:

```bash
npx ts-node test-queue.ts
```

Expected output:
```
Testing BullMQ Queue Service...

1. Adding test job...
✓ Job added: test-1234567890

2. Checking job status...
✓ Status: { id: 'test-1234567890', status: 'waiting', progress: 0 }

3. Creating mock worker...
✓ Worker started and waiting for jobs...

→ Processing job: test-1234567890
✓ Job completed: test-1234567890
```

## Step 7: Monitor Queue

Use BullMQ Board for visual monitoring:

```bash
npm install -g @bull-board/cli
bull-board
```

Open http://localhost:3000 to see queue dashboard.

## Troubleshooting

### Problem: "Redis connection refused"

**Solution:**
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:7-alpine
```

### Problem: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm run prisma:generate
```

### Problem: Tests failing

**Solution:**
```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run tests again
npm test
```

### Problem: Jobs not processing

**Solution:**
1. Verify Redis connection: `redis-cli ping`
2. Check worker is running
3. Review worker logs
4. Check queue stats:
   ```typescript
   import { getQueueStats } from './services/queue.service';
   const stats = await getQueueStats();
   console.log(stats);
   ```

## Next Steps

1. **Integrate with API routes** (Task 8):
   - Import `addTranscriptionJob` in route handlers
   - Add jobs when users upload files

2. **Create workers** (Tasks 6 & 7):
   - Local worker for Mac Mini (Task 6)
   - Cloud worker for Modal (Task 7)

3. **Add monitoring**:
   - Set up BullMQ Board
   - Add custom metrics
   - Configure alerts

4. **Deploy**:
   - Configure production Redis
   - Set up worker auto-scaling
   - Enable Redis persistence

## File Structure

```
backend/
├── src/
│   ├── services/
│   │   ├── queue.service.ts        # Main queue service
│   │   ├── README.md               # Documentation
│   │   └── __tests__/
│   │       └── queue.test.ts       # Tests
│   └── ...
├── scripts/
│   └── cleanup-jobs.js             # Cleanup script
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── jest.config.js                   # Jest config
└── .env.example                     # Environment template
```

## Production Checklist

- [ ] Redis configured with password
- [ ] Redis persistence enabled (AOF or RDB)
- [ ] Environment variables set
- [ ] Workers deployed and running
- [ ] Monitoring dashboard set up
- [ ] Cleanup cron job scheduled
- [ ] Error tracking configured
- [ ] Backup strategy in place

## Resources

- **BullMQ Documentation:** https://docs.bullmq.io
- **Redis Documentation:** https://redis.io/docs
- **Integration Notes:** See `INTEGRATION_NOTES.md`
- **API Reference:** See `backend/src/services/README.md`

---

**Task 5 Setup Complete** ✓

For questions or issues, refer to the integration notes or contact the development team.
