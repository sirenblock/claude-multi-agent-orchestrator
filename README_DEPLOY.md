# WhisperAPI Deployment Guide

Complete guide for deploying WhisperAPI to production with Railway (API), Vercel (Frontend), and Mac Mini (Local Worker) or Modal (Cloud Worker).

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Deployment Options](#deployment-options)
  - [Option 1: Railway + Vercel (Recommended)](#option-1-railway--vercel-recommended)
  - [Option 2: Docker Compose (Self-hosted)](#option-2-docker-compose-self-hosted)
  - [Option 3: Production Docker](#option-3-production-docker)
- [Worker Setup](#worker-setup)
  - [Local Worker (Mac Mini)](#local-worker-mac-mini)
  - [Cloud Worker (Modal)](#cloud-worker-modal)
- [Environment Configuration](#environment-configuration)
- [Database Migration](#database-migration)
- [Monitoring & Logs](#monitoring--logs)
- [Backup & Restore](#backup--restore)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### Required Accounts
- **Railway**: [railway.app](https://railway.app) - API hosting
- **Vercel**: [vercel.com](https://vercel.com) - Frontend hosting
- **Stripe**: [stripe.com](https://stripe.com) - Payments
- **AWS/Cloudflare R2**: S3-compatible storage
- **Tailscale** OR **Cloudflare**: Secure tunneling (for local worker)

### Required Tools
```bash
# Install Railway CLI
npm install -g @railway/cli

# Install Vercel CLI
npm install -g vercel

# Install Docker (for local testing)
# Visit: https://www.docker.com/get-started
```

### System Requirements

**API Server (Railway):**
- Node.js 20.x
- PostgreSQL 15+
- Redis 7+
- 1GB RAM minimum

**Mac Mini Worker (Local):**
- macOS 12+ (for Metal acceleration)
- 16GB RAM minimum
- 50GB free storage
- Node.js 20.x
- whisper.cpp compiled with Metal

**Cloud Worker (Modal):**
- Python 3.10+
- Modal account

---

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/whisperapi.git
cd whisperapi

# Install dependencies
cd backend && npm install
cd ../frontend/dashboard && npm install
cd ../landing && npm install
```

### 2. Configure Environment

```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp frontend/dashboard/.env.example frontend/dashboard/.env
cp frontend/landing/.env.example frontend/landing/.env

# Edit .env files with your credentials
```

### 3. Test Locally

```bash
# Start local development stack
docker-compose up -d

# Run migrations
cd backend && npx prisma migrate deploy

# Start API
npm run dev

# In another terminal, start frontend
cd frontend/dashboard && npm run dev
```

### 4. Deploy to Production

```bash
# Deploy API to Railway
bash deploy/scripts/deploy-railway.sh

# Deploy frontend to Vercel
bash deploy/scripts/deploy-vercel.sh

# Setup worker (choose one)
bash deploy/tailscale-setup.sh  # For Mac Mini
# OR
bash deploy/cloudflare-tunnel-setup.sh  # For Mac Mini
# OR
cd workers/cloud && modal deploy modal_worker.py  # For cloud
```

---

## 🌐 Deployment Options

### Option 1: Railway + Vercel (Recommended)

**Best for:** Production deployment with automatic scaling

#### Deploy API to Railway

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login to Railway
railway login

# 3. Create new project
railway init

# 4. Add PostgreSQL database
railway add --plugin postgresql

# 5. Add Redis
railway add --plugin redis

# 6. Link project
railway link

# 7. Set environment variables
railway variables set DATABASE_URL="postgresql://..." \
  REDIS_URL="redis://..." \
  S3_BUCKET="your-bucket" \
  S3_ACCESS_KEY="xxx" \
  S3_SECRET_KEY="xxx" \
  STRIPE_SECRET_KEY="sk_live_xxx" \
  STRIPE_WEBHOOK_SECRET="whsec_xxx" \
  STRIPE_PRICE_ID_PRO="price_xxx" \
  WORKER_MODE="local" \
  LOCAL_WORKER_URL="http://100.x.x.x:3001"

# 8. Deploy
railway up

# 9. Run migrations
railway run npx prisma migrate deploy

# 10. Get deployment URL
railway domain
```

#### Configure Railway with JSON

Alternatively, use the Railway configuration file:

```bash
# Railway will automatically detect deploy/railway.json
railway up
```

The `railway.json` file includes:
- Build configuration with Prisma setup
- Health check endpoint
- Automatic restart policy
- Environment-specific variables

#### Deploy Frontend to Vercel

**Dashboard:**

```bash
# 1. Navigate to dashboard
cd frontend/dashboard

# 2. Install Vercel CLI (if not already installed)
npm i -g vercel

# 3. Deploy
vercel

# 4. Follow prompts:
#    - Project name: whisperapi-dashboard
#    - Framework: Next.js
#    - Root directory: frontend/dashboard

# 5. Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
# Enter your Railway URL: https://your-app.railway.app

# 6. Deploy to production
vercel --prod
```

**Landing Page:**

```bash
# 1. Navigate to landing
cd frontend/landing

# 2. Deploy
vercel

# 3. Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_DASHBOARD_URL production

# 4. Deploy to production
vercel --prod
```

#### Railway Configuration Details

The `deploy/railway.json` includes:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install && npx prisma generate && npx prisma migrate deploy"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### Option 2: Docker Compose (Self-hosted)

**Best for:** Local development and testing

```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env with your credentials
nano .env

# 3. Start all services
docker-compose up -d

# 4. Check status
docker-compose ps

# 5. View logs
docker-compose logs -f api

# 6. Access services
# API: http://localhost:3000
# PostgreSQL: localhost:5432
# Redis: localhost:6379

# 7. Stop services
docker-compose down

# 8. Stop and remove volumes
docker-compose down -v
```

**Services Included:**
- API Backend (Node.js)
- PostgreSQL Database
- Redis Cache

---

### Option 3: Production Docker

**Best for:** Self-hosted production deployment

```bash
# 1. Build production image
docker build -f deploy/Dockerfile -t whisperapi:latest .

# 2. Run with docker-compose.prod.yml
docker-compose -f deploy/docker-compose.prod.yml up -d

# 3. Configure external database URLs in .env
# Set DATABASE_URL and REDIS_URL to external services

# 4. Monitor
docker-compose -f deploy/docker-compose.prod.yml logs -f
```

**Resource Limits:**
- CPU: 2 cores max, 1 core reserved
- Memory: 2GB max, 1GB reserved

---

## 🖥️ Worker Setup

Choose between **Local Worker** (Mac Mini with Whisper.cpp) or **Cloud Worker** (Modal with GPU).

### Local Worker (Mac Mini)

#### Prerequisites

1. **Mac Mini Setup:**
   ```bash
   # Install Homebrew
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Install Node.js
   brew install node@20

   # Install ffmpeg
   brew install ffmpeg
   ```

2. **Install Whisper.cpp:**
   ```bash
   git clone https://github.com/ggerganov/whisper.cpp.git
   cd whisper.cpp

   # Build with Metal acceleration
   make clean
   WHISPER_METAL=1 make

   # Download models
   bash ./models/download-ggml-model.sh base
   bash ./models/download-ggml-model.sh small
   bash ./models/download-ggml-model.sh medium
   ```

3. **Setup Worker:**
   ```bash
   cd whisperapi/workers/local
   npm install

   # Test whisper.cpp
   node whisper-runner.js test
   ```

#### Network Configuration

Choose one of these methods:

##### Method 1: Tailscale (Recommended - Most Secure)

```bash
# Run setup script
bash deploy/tailscale-setup.sh

# Follow the prompts
# Script will:
# 1. Install Tailscale
# 2. Get your Mac Mini's Tailscale IP
# 3. Create configuration file

# Install Tailscale on Railway:
# 1. Go to Railway dashboard
# 2. Add Tailscale plugin
# 3. Set environment variable:
#    LOCAL_WORKER_URL=http://100.x.x.x:3001

# Start worker
cd workers/local
node index.js
```

**Benefits:**
- End-to-end encryption
- No public exposure
- Automatic firewall traversal
- Simple setup

##### Method 2: Cloudflare Tunnel (Public URL)

```bash
# Run setup script
bash deploy/cloudflare-tunnel-setup.sh

# Follow the prompts to:
# 1. Install cloudflared
# 2. Authenticate with Cloudflare
# 3. Create tunnel
# 4. Configure DNS

# The script will provide a public URL like:
# https://worker.yourdomain.com

# Update Railway environment:
# LOCAL_WORKER_URL=https://worker.yourdomain.com

# Start worker
cd workers/local
node index.js
```

**Benefits:**
- Public HTTPS URL
- DDoS protection
- Global CDN
- No VPN required

##### Method 3: Port Forwarding (Not Recommended)

```bash
# Only use if Tailscale/Cloudflare aren't options

# 1. Configure router port forwarding:
#    External: 3001 -> Internal: Mac Mini IP:3001

# 2. Get public IP
curl ifconfig.me

# 3. Update Railway:
#    LOCAL_WORKER_URL=http://YOUR_PUBLIC_IP:3001

# 4. Start worker with firewall rule
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add node
cd workers/local && node index.js
```

⚠️ **Security Warning:** This method exposes your worker publicly without encryption.

#### Start Worker

```bash
cd workers/local

# Development mode
npm run dev

# Production mode (with PM2)
npm install -g pm2
pm2 start index.js --name whisperapi-worker
pm2 save
pm2 startup  # Enable auto-start on reboot
```

#### Verify Worker

```bash
# Check health endpoint
curl http://100.x.x.x:3001/health
# or
curl https://worker.yourdomain.com/health

# Expected response:
# {"status":"ok","whisper":"ready"}
```

---

### Cloud Worker (Modal)

#### Prerequisites

```bash
# Install Modal
pip install modal

# Login to Modal
modal token new
```

#### Deploy Worker

```bash
cd workers/cloud

# Deploy to Modal
modal deploy modal_worker.py

# Get webhook URL
modal app list

# Example URL: https://username--whisper-worker-process.modal.run
```

#### Configure Railway

```bash
# Update Railway environment variables
railway variables set \
  WORKER_MODE="cloud" \
  CLOUD_WORKER_URL="https://username--whisper-worker-process.modal.run"

# Restart Railway service
railway up
```

#### Monitor Worker

```bash
# View logs
modal app logs whisper-worker

# Check stats
modal app stats whisper-worker
```

---

## 🔧 Environment Configuration

### Backend (.env)

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/whisperapi"

# Redis
REDIS_URL="redis://localhost:6379"

# S3 / Cloudflare R2
S3_BUCKET="whisper-audio"
S3_REGION="us-east-1"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"
S3_ENDPOINT="https://xxx.r2.cloudflarestorage.com"  # For R2

# Stripe
STRIPE_SECRET_KEY="sk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
STRIPE_PRICE_ID_PRO="price_xxx"

# Worker Configuration
WORKER_MODE="local"  # or "cloud"
LOCAL_WORKER_URL="http://100.x.x.x:3001"
CLOUD_WORKER_URL="https://xxx.modal.run"

# API Configuration
API_KEY_PREFIX="wtr_live_"
API_KEY_LENGTH=32
PORT=3000
NODE_ENV="production"

# Rate Limits (per hour)
RATE_LIMIT_FREE=3
RATE_LIMIT_PRO=20
RATE_LIMIT_PAYG=100

# Monthly Quotas (minutes)
QUOTA_FREE=60
QUOTA_PRO=600

# File Limits
MAX_FILE_SIZE_MB=500
ALLOWED_FORMATS="mp3,wav,m4a,mp4,mpeg,webm"

# Cleanup
FILE_RETENTION_HOURS=24
```

### Frontend (.env)

**Dashboard:**
```bash
NEXT_PUBLIC_API_URL="https://your-railway-app.railway.app"
```

**Landing:**
```bash
NEXT_PUBLIC_API_URL="https://your-railway-app.railway.app"
NEXT_PUBLIC_DASHBOARD_URL="https://dashboard.whisperapi.com"
```

---

## 🗄️ Database Migration

### Initial Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### Create New Migration

```bash
# Development
npx prisma migrate dev --name add_new_feature

# Production
npx prisma migrate deploy
```

### Reset Database (Danger!)

```bash
# Local only - destroys all data
npx prisma migrate reset

# Production - use with extreme caution
npx prisma migrate reset --skip-seed
```

---

## 📊 Monitoring & Logs

### Railway

```bash
# View logs
railway logs

# Follow logs
railway logs --follow

# Filter by service
railway logs --service api
```

### Vercel

```bash
# View logs
vercel logs whisperapi-dashboard

# Follow logs
vercel logs whisperapi-dashboard --follow
```

### Docker

```bash
# View API logs
docker-compose logs api

# Follow all logs
docker-compose logs -f

# View specific container
docker logs whisperapi-backend -f
```

### Local Worker

```bash
# PM2 logs
pm2 logs whisperapi-worker

# Follow logs
pm2 logs whisperapi-worker --lines 100
```

### Modal Worker

```bash
# View logs
modal app logs whisper-worker

# Follow logs
modal app logs whisper-worker --follow
```

---

## 💾 Backup & Restore

### Database Backup

#### Railway

```bash
# Create backup
railway run pg_dump -Fc > backup-$(date +%Y%m%d).dump

# List tables
railway run psql -c '\dt'

# Custom SQL query
railway run psql -c "SELECT COUNT(*) FROM users;"
```

#### Docker

```bash
# Backup
docker-compose exec db pg_dump -U whisper whisperapi > backup.sql

# Restore
docker-compose exec -T db psql -U whisper whisperapi < backup.sql
```

### Automated Backups

Create a cron job:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/whisperapi && bash deploy/scripts/backup-db.sh
```

Create `deploy/scripts/backup-db.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
railway run pg_dump -Fc > backups/db_$DATE.dump

# Keep only last 7 days
find backups/ -name "db_*.dump" -mtime +7 -delete
```

### S3 Backup

```bash
# Use AWS CLI to sync S3 bucket
aws s3 sync s3://whisper-audio s3://whisper-audio-backup

# Or with Cloudflare R2
rclone sync r2:whisper-audio r2:whisper-audio-backup
```

---

## 🔄 Switching Worker Modes

### From Local to Cloud

```bash
# 1. Deploy Modal worker
cd workers/cloud
modal deploy modal_worker.py

# 2. Update Railway environment
railway variables set \
  WORKER_MODE="cloud" \
  CLOUD_WORKER_URL="https://xxx.modal.run"

# 3. Restart Railway
railway up

# 4. Verify
curl https://your-railway-app.railway.app/health
```

### From Cloud to Local

```bash
# 1. Ensure worker is running
ssh mac-mini "cd whisperapi/workers/local && pm2 start index.js"

# 2. Update Railway environment
railway variables set \
  WORKER_MODE="local" \
  LOCAL_WORKER_URL="http://100.x.x.x:3001"

# 3. Restart Railway
railway up

# 4. Verify
curl https://your-railway-app.railway.app/health
```

---

## 🐛 Troubleshooting

### API Issues

**Problem:** API not starting

```bash
# Check Railway logs
railway logs

# Common issues:
# 1. Database connection
railway run npx prisma db push

# 2. Missing environment variables
railway variables

# 3. Port conflicts
railway variables set PORT=3000
```

**Problem:** Health check failing

```bash
# Test locally
curl http://localhost:3000/health

# Check if process is running
railway ps

# Restart service
railway up
```

### Worker Issues

**Problem:** Worker not connecting

```bash
# Check worker health
curl http://100.x.x.x:3001/health

# Check Tailscale status
tailscale status

# Restart worker
pm2 restart whisperapi-worker

# Check worker logs
pm2 logs whisperapi-worker
```

**Problem:** Transcription timeout

```bash
# Check worker resources
top

# Check disk space
df -h

# Check whisper.cpp
cd ~/whisper.cpp
./main -f test.wav -m models/ggml-base.bin
```

### Database Issues

**Problem:** Migration failed

```bash
# Check migration status
npx prisma migrate status

# Reset and re-run
npx prisma migrate reset
npx prisma migrate deploy
```

**Problem:** Connection timeout

```bash
# Test connection
railway run psql

# Check connection string
echo $DATABASE_URL

# Verify Railway database is running
railway status
```

### Frontend Issues

**Problem:** API calls failing

```bash
# Check CORS settings
# Ensure Railway allows frontend domain

# Verify environment variable
vercel env ls

# Test API endpoint
curl https://your-railway-app.railway.app/api/v1/health
```

**Problem:** Build failing

```bash
# Check Vercel build logs
vercel logs --follow

# Test build locally
npm run build

# Clear cache and rebuild
vercel --force
```

---

## 🔐 Security Checklist

- [ ] All environment variables set in Railway
- [ ] Stripe webhooks configured with correct secret
- [ ] S3 bucket has proper CORS settings
- [ ] API keys using secure prefix and length
- [ ] Rate limiting enabled
- [ ] HTTPS enforced on all endpoints
- [ ] Database has strong password
- [ ] Redis requires authentication
- [ ] Worker endpoint secured (Tailscale/Cloudflare)
- [ ] Firewall rules configured
- [ ] Automatic backups enabled
- [ ] Monitoring and alerts set up

---

## 📞 Support

- **Documentation**: [Full docs](https://docs.whisperapi.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/whisperapi/issues)
- **Email**: support@whisperapi.com

---

## 📄 License

MIT License - see LICENSE file for details
