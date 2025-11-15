# Task 5: Queue Service - Integration Notes

## Overview

This document describes how the BullMQ Queue Service (Task 5) integrates with other modules in the WhisperAPI system.

## Module Information

**Task:** 5  
**Module:** Job Queue System (BullMQ)  
**Location:** `backend/src/services/queue.service.ts`  
**Status:** ✅ Complete

## Exported Functions

The queue service exports the following functions for use by other modules:

```typescript
// Core functions
export async function addTranscriptionJob(data: TranscriptionJobData, priority?: number): Promise<string>
export async function getJobStatus(jobId: string): Promise<JobStatus | null>
export function createWorker(processor: Function, concurrency?: number): Worker
export async function updateJobProgress(jobId: string, progress: number): Promise<void>
export async function cancelJob(jobId: string): Promise<boolean>

// Management functions
export async function retryFailedJob(jobId: string): Promise<boolean>
export async function getQueueStats(): Promise<QueueStats>
export async function cleanupOldJobs(olderThan?: number): Promise<void>
export async function shutdown(): Promise<void>

// Constants
export const JOB_PRIORITIES = { FREE: 1, PRO: 5, PAYG: 10 }

// Instances (for advanced usage)
export { transcriptionQueue, queueEvents }
```

## Integration Points

### 1. Integration with Database (Task 1)

**File:** `prisma/schema.prisma`

The queue service updates the `Transcription` table automatically:

```typescript
// When job is added
await prisma.transcription.update({
  where: { id: transcriptionId },
  data: { 
    status: 'QUEUED',
    jobId: job.id 
  }
});

// When processing starts
await prisma.transcription.update({
  where: { id: transcriptionId },
  data: { status: 'PROCESSING' }
});

// When completed
await prisma.transcription.update({
  where: { id: transcriptionId },
  data: {
    status: 'COMPLETED',
    s3ResultUrl,
    durationSeconds,
    completedAt: new Date(),
    progress: 100
  }
});

// When failed
await prisma.transcription.update({
  where: { id: transcriptionId },
  data: {
    status: 'FAILED',
    errorMessage
  }
});
```

**Required from Task 1:**
- Prisma client instance
- `Transcription` model with fields: `status`, `jobId`, `progress`, `s3ResultUrl`, `durationSeconds`, `completedAt`, `errorMessage`

### 2. Integration with S3 Service (Task 2)

**File:** `backend/src/services/s3.service.ts`

Workers use S3 service to download/upload files:

```typescript
import { getDownloadUrl, uploadFile } from '../services/s3.service';

const worker = createWorker(async (job) => {
  // Download audio from S3
  const audioUrl = await getDownloadUrl(job.data.s3AudioUrl);
  const audioPath = await downloadFile(audioUrl);
  
  // Process transcription...
  
  // Upload result to S3
  const s3ResultUrl = await uploadFile(resultPath, 'results/');
  
  return { s3ResultUrl, durationSeconds, completedAt: new Date() };
});
```

**Required from Task 2:**
- `getDownloadUrl(s3Key: string): Promise<string>`
- `uploadFile(filePath: string, prefix: string): Promise<string>`

### 3. Integration with API Routes (Task 8)

**File:** `backend/src/routes/transcription-routes.ts`

API routes add jobs to the queue:

```typescript
import { addTranscriptionJob, getJobStatus, cancelJob, JOB_PRIORITIES } from '../services/queue.service';

// POST /api/v1/transcribe
router.post('/transcribe', authMiddleware, rateLimitMiddleware, async (req, res) => {
  // ... validation and S3 upload ...
  
  // Determine priority based on user plan
  const priority = user.plan === 'PRO' ? JOB_PRIORITIES.PRO :
                   user.plan === 'PAYG' ? JOB_PRIORITIES.PAYG :
                   JOB_PRIORITIES.FREE;
  
  // Add job to queue
  const jobId = await addTranscriptionJob({
    transcriptionId,
    userId: user.id,
    s3AudioUrl,
    model: req.body.model || 'BASE',
    format: req.body.format || 'JSON'
  }, priority);
  
  res.json({ 
    success: true, 
    data: { transcriptionId, jobId, status: 'QUEUED' } 
  });
});

// GET /api/v1/status/:transcriptionId
router.get('/status/:transcriptionId', authMiddleware, async (req, res) => {
  const transcription = await prisma.transcription.findUnique({
    where: { id: req.params.transcriptionId }
  });
  
  if (!transcription || !transcription.jobId) {
    return res.status(404).json({ 
      success: false, 
      error: { code: 'TRANSCRIPTION_NOT_FOUND', message: 'Not found' } 
    });
  }
  
  const jobStatus = await getJobStatus(transcription.jobId);
  
  res.json({
    success: true,
    data: {
      id: transcription.id,
      status: transcription.status,
      progress: transcription.progress,
      jobStatus: jobStatus?.status,
      createdAt: transcription.createdAt,
      completedAt: transcription.completedAt
    }
  });
});

// DELETE /api/v1/transcribe/:transcriptionId
router.delete('/transcribe/:transcriptionId', authMiddleware, async (req, res) => {
  const transcription = await prisma.transcription.findUnique({
    where: { id: req.params.transcriptionId }
  });
  
  if (!transcription?.jobId) {
    return res.status(404).json({ 
      success: false, 
      error: { code: 'TRANSCRIPTION_NOT_FOUND', message: 'Not found' } 
    });
  }
  
  const cancelled = await cancelJob(transcription.jobId);
  
  res.json({ 
    success: true, 
    data: { cancelled } 
  });
});
```

**Required from Task 8:**
- Import queue service functions
- Call `addTranscriptionJob()` after uploading to S3
- Use correct priority based on user plan
- Expose status endpoint using `getJobStatus()`

### 4. Integration with Local Worker (Task 6)

**File:** `workers/local/index.ts`

Local workers poll the queue and process jobs:

```typescript
import { createWorker, TranscriptionJobResult } from '../../backend/src/services/queue.service';
import { processWithWhisperCpp } from './whisper-runner';
import { getDownloadUrl, uploadFile } from '../../backend/src/services/s3.service';

const worker = createWorker(async (job) => {
  console.log(`[Local Worker] Processing job ${job.id}`);
  
  const { transcriptionId, s3AudioUrl, model, format } = job.data;
  
  try {
    // 1. Download audio from S3 (10%)
    await job.updateProgress(10);
    const audioPath = await downloadAudioFromS3(s3AudioUrl);
    
    // 2. Run Whisper.cpp (10% -> 80%)
    await job.updateProgress(30);
    const result = await processWithWhisperCpp(audioPath, model, format, (progress) => {
      job.updateProgress(30 + (progress * 0.5)); // Scale to 30-80%
    });
    
    // 3. Upload result to S3 (80% -> 100%)
    await job.updateProgress(80);
    const s3ResultUrl = await uploadResultToS3(result, transcriptionId, format);
    
    await job.updateProgress(100);
    
    return {
      s3ResultUrl,
      durationSeconds: result.durationSeconds,
      completedAt: new Date()
    };
  } catch (error) {
    console.error(`[Local Worker] Job ${job.id} failed:`, error);
    throw error;
  }
}, 2); // Process 2 jobs concurrently

// Worker event handlers
worker.on('completed', (job) => {
  console.log(`[Local Worker] Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`[Local Worker] Job ${job?.id} failed:`, err.message);
});

console.log('[Local Worker] Started and waiting for jobs...');
```

**Required from Task 6:**
- Call `createWorker()` with processor function
- Download audio, process with Whisper.cpp, upload result
- Update progress regularly using `job.updateProgress()`
- Return `TranscriptionJobResult` object

### 5. Integration with Cloud Worker (Task 7)

**File:** `workers/cloud/modal_worker.py`

Cloud workers also poll the BullMQ queue:

```python
import modal
from bullmq import Worker, Job
import os

stub = modal.Stub("whisper-worker")

@stub.function(
    gpu="A10G",
    image=modal.Image.debian_slim().pip_install("openai-whisper", "boto3", "bullmq")
)
async def process_transcription_job(job_data):
    """Process a single transcription job"""
    import whisper
    import boto3
    from io import BytesIO
    
    # Download from S3
    s3 = boto3.client('s3')
    audio_data = download_from_s3(job_data['s3AudioUrl'])
    
    # Run Whisper
    model = whisper.load_model(job_data['model'].lower())
    result = model.transcribe(audio_data)
    
    # Upload result to S3
    s3_result_url = upload_to_s3(result, job_data['format'])
    
    return {
        's3ResultUrl': s3_result_url,
        'durationSeconds': result.get('duration', 0),
        'completedAt': datetime.now().isoformat()
    }

# BullMQ worker (runs continuously)
@stub.function()
async def worker_loop():
    """Poll BullMQ queue and process jobs"""
    from bullmq import Worker
    
    async def processor(job: Job):
        result = await process_transcription_job.remote(job.data)
        return result
    
    worker = Worker('transcription', processor, {
        'connection': {'host': os.getenv('REDIS_URL')},
        'concurrency': 5
    })
    
    await worker.run()

if __name__ == "__main__":
    # Deploy worker
    with stub.run():
        worker_loop.remote()
```

**Required from Task 7:**
- Connect to same Redis instance
- Poll 'transcription' queue
- Return same result format as local worker

### 6. Integration with Rate Limiting (Task 4)

**File:** `backend/src/middleware/rateLimit.middleware.ts`

Queue stats can be used for rate limiting decisions:

```typescript
import { getQueueStats } from '../services/queue.service';

export async function checkQuota(userId: string) {
  // Check if user has too many queued jobs
  const stats = await getQueueStats();
  
  const userJobs = await prisma.transcription.count({
    where: {
      userId,
      status: { in: ['QUEUED', 'PROCESSING'] }
    }
  });
  
  const maxConcurrentJobs = user.plan === 'FREE' ? 1 : 
                            user.plan === 'PRO' ? 3 : 10;
  
  if (userJobs >= maxConcurrentJobs) {
    throw new Error('Too many concurrent jobs');
  }
}
```

## Environment Variables

Required environment variables (add to `.env`):

```bash
# Redis connection
REDIS_URL="redis://localhost:6379"

# Queue configuration
QUEUE_CONCURRENCY=2
QUEUE_MAX_RETRIES=3
QUEUE_RETRY_DELAY=5000

# Cleanup
JOB_RETENTION_HOURS=24
FAILED_JOB_RETENTION_HOURS=168
```

## Data Flow

```
User Request → API Route (Task 8)
                  ↓
              S3 Upload (Task 2)
                  ↓
          Add Job to Queue ← Queue Service (Task 5)
                  ↓
          BullMQ Queue (Redis)
                  ↓
          Worker pulls job ← Local Worker (Task 6) OR Cloud Worker (Task 7)
                  ↓
          Download from S3 (Task 2)
                  ↓
          Process with Whisper
                  ↓
          Upload result to S3 (Task 2)
                  ↓
          Update Database (Task 1) ← Queue Service
                  ↓
          User fetches result ← API Route (Task 8)
```

## Testing Integration

### Test with Mock Worker

```typescript
import { addTranscriptionJob, createWorker } from '../services/queue.service';

// Add test job
const jobId = await addTranscriptionJob({
  transcriptionId: 'test-123',
  userId: 'user-123',
  s3AudioUrl: 'https://s3.example.com/test.mp3',
  model: 'BASE',
  format: 'JSON'
});

// Create mock worker
const worker = createWorker(async (job) => {
  console.log('Processing:', job.data);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    s3ResultUrl: 'https://s3.example.com/result.json',
    durationSeconds: 120,
    completedAt: new Date()
  };
});

// Job will be processed automatically
```

### Test Status Polling

```typescript
import { getJobStatus } from '../services/queue.service';

const status = await getJobStatus('job-123');
console.log(`Status: ${status?.status}`);
console.log(`Progress: ${status?.progress}%`);
```

## Common Issues & Solutions

### Issue 1: Redis Connection Failed

**Symptom:** `Error: Redis connection failed`

**Solution:**
```bash
# Check Redis is running
redis-cli ping

# Should return: PONG

# Start Redis if not running
redis-server
```

### Issue 2: Jobs Not Being Processed

**Symptom:** Jobs stuck in QUEUED status

**Solution:**
- Ensure worker is running
- Check worker logs for errors
- Verify Redis connection in worker
- Check queue stats: `await getQueueStats()`

### Issue 3: Worker Crashes on Job Failure

**Symptom:** Worker stops after failed job

**Solution:**
- Jobs automatically retry (up to 3 times)
- Check error handling in processor function
- Review worker event handlers

## Performance Considerations

### Concurrency

- **FREE users:** 1 concurrent job (priority 1)
- **PRO users:** 3 concurrent jobs (priority 5)
- **PAYG users:** 10 concurrent jobs (priority 10)

### Worker Scaling

Run multiple workers to increase throughput:

```bash
# Terminal 1
npm run queue:worker

# Terminal 2
npm run queue:worker

# Terminal 3
npm run queue:worker
```

Each worker processes 2 jobs concurrently (default), so 3 workers = 6 concurrent jobs.

### Memory Management

- Jobs removed after 24 hours (completed)
- Failed jobs kept for 7 days
- Regular cleanup recommended:

```typescript
// Run daily cleanup
setInterval(async () => {
  await cleanupOldJobs();
}, 86400000); // 24 hours
```

## Security Notes

1. **Redis Security:**
   - Use password authentication in production
   - Use SSL/TLS for Redis connections
   - Restrict Redis port access

2. **Job Data:**
   - Never include sensitive data in job payloads
   - Use S3 URLs with expiration
   - Sanitize error messages

3. **Rate Limiting:**
   - Enforce per-user job limits
   - Monitor queue depth
   - Implement backpressure

## Next Steps

1. **Task 6:** Implement local worker that uses `createWorker()`
2. **Task 7:** Implement cloud worker that polls same queue
3. **Task 8:** Add queue integration to API routes
4. **Task 10:** Display job status in dashboard UI

## Support

For issues with the queue service:
1. Check Redis connection: `redis-cli ping`
2. Review logs: Check console output for errors
3. Test queue: `npm test services/__tests__/queue.test.ts`
4. Monitor stats: Use `getQueueStats()` to check queue health

---

**Task 5 Complete** | Integration ready for Tasks 6, 7, 8, and 10
