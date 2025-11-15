# Task 13: Deployment Configurations - Integration Notes

## 📦 Module Overview

**Task**: Deployment Configurations
**Purpose**: One-command deployment configs for Railway (API), Vercel (Frontend), and secure tunneling
**Dependencies**: ALL other tasks (1-12)
**Status**: ✅ Complete

---

## 🔗 Integration Points

### Task 1: Database Schema (Prisma)
**Integration:**
- `railway.json` runs `npx prisma migrate deploy` during build
- `docker-compose.yml` includes PostgreSQL service with proper schema setup
- `init-db.sql` creates extensions and optimizations for Prisma
- Deployment scripts run migrations automatically

**Files Used:**
- `backend/prisma/schema.prisma` → migrations in Railway/Docker
- Database connection via `DATABASE_URL` environment variable

**Testing:**
```bash
# Verify Prisma migrations run correctly
railway run npx prisma migrate status
```

---

### Task 2: S3 Service
**Integration:**
- Environment variables for S3 configuration in all deployment configs
- Docker compose includes S3 credentials
- Health check validates S3 endpoint accessibility

**Required Environment Variables:**
```bash
S3_BUCKET=whisper-audio
S3_REGION=us-east-1
S3_ACCESS_KEY=xxx
S3_SECRET_KEY=xxx
S3_ENDPOINT=https://xxx.r2.cloudflarestorage.com  # Optional for R2
```

**Testing:**
```bash
# Validate S3 config
bash deploy/scripts/validate-env.sh
```

---

### Task 3: Auth Middleware
**Integration:**
- Deployment ensures `API_KEY_PREFIX` and `API_KEY_LENGTH` are set
- Railway/Docker configs include these environment variables
- Health checks don't require auth, but API endpoints do

**Environment Variables:**
```bash
API_KEY_PREFIX=wtr_live_
API_KEY_LENGTH=32
```

---

### Task 4: Rate Limiting Middleware
**Integration:**
- Redis service configured in Docker and Railway
- Rate limit values set via environment variables
- Health checks verify Redis connectivity

**Environment Variables:**
```bash
REDIS_URL=redis://localhost:6379
RATE_LIMIT_FREE=3
RATE_LIMIT_PRO=20
RATE_LIMIT_PAYG=100
QUOTA_FREE=60
QUOTA_PRO=600
```

---

### Task 5: Job Queue Service (BullMQ)
**Integration:**
- Redis service required for BullMQ
- Worker mode configuration determines job routing
- Docker compose includes Redis with persistence

**Environment Variables:**
```bash
WORKER_MODE=local  # or cloud
LOCAL_WORKER_URL=http://100.x.x.x:3001
CLOUD_WORKER_URL=https://xxx.modal.run
```

---

### Task 6: Local Worker (Mac Mini)
**Integration:**
- Tailscale setup script connects Mac Mini to Railway
- Cloudflare tunnel provides alternative connection
- Health checks verify worker accessibility

**Setup Scripts:**
```bash
# Tailscale (secure VPN)
bash deploy/tailscale-setup.sh

# Cloudflare Tunnel (public HTTPS)
bash deploy/cloudflare-tunnel-setup.sh
```

**Required Configuration:**
- Mac Mini must be accessible from Railway
- Worker health endpoint: `http://100.x.x.x:3001/health`
- Environment variable `LOCAL_WORKER_URL` points to Mac Mini

---

### Task 7: Cloud Worker (Modal)
**Integration:**
- Railway can switch to cloud worker by changing `WORKER_MODE`
- No tunnel setup required
- Deploy Modal worker before switching

**Setup:**
```bash
# Deploy Modal worker
cd workers/cloud
modal deploy modal_worker.py

# Update Railway
railway variables set WORKER_MODE=cloud
railway variables set CLOUD_WORKER_URL=https://xxx.modal.run
```

---

### Task 8: API Routes
**Integration:**
- Railway serves the API routes from `backend/src/routes/`
- Health check endpoint at `/health` configured in `railway.json`
- Vercel frontend proxies API calls to Railway URL

**Configuration:**
- Railway: `railway.json` specifies start command
- Docker: `Dockerfile` exposes port 3000
- Health check: `/health` endpoint must return 200

---

### Task 9: Stripe Integration
**Integration:**
- Stripe webhook endpoint configured in Railway
- Stripe credentials set via environment variables
- Production deployment requires live Stripe keys

**Environment Variables:**
```bash
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID_PRO=price_xxx
```

**Webhook Setup:**
1. Deploy to Railway
2. Get Railway URL
3. Configure Stripe webhook: `https://your-app.railway.app/webhooks/stripe`

---

### Task 10: Dashboard (Next.js)
**Integration:**
- Deployed to Vercel via `vercel-dashboard.json`
- Environment variable `NEXT_PUBLIC_API_URL` points to Railway
- Build process validates during CI/CD

**Deployment:**
```bash
# Manual deployment
bash deploy/scripts/deploy-vercel.sh dashboard

# Automatic via GitHub Actions
git push origin main  # Triggers .github/workflows/deploy-frontend.yml
```

---

### Task 11: Landing Page (Next.js)
**Integration:**
- Deployed to Vercel via `vercel-landing.json`
- Links to dashboard URL
- Separate Vercel project from dashboard

**Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://your-app.railway.app
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.whisperapi.com
```

---

### Task 12: Configuration Module
**Integration:**
- Deployment configs use the same environment variables
- `validate-env.sh` script checks all config values
- Railway/Docker load config from environment

**Integration Pattern:**
```javascript
// backend/src/config/index.js exports config
// Deployment ensures environment variables are set correctly
```

---

## 🚀 Deployment Workflow

### Complete Deployment Flow

```
1. Developer pushes code to GitHub
   ↓
2. GitHub Actions runs tests (.github/workflows/test.yml)
   ↓
3. If tests pass on main branch:
   - API deploys to Railway (.github/workflows/deploy-api.yml)
   - Frontend deploys to Vercel (.github/workflows/deploy-frontend.yml)
   ↓
4. Railway:
   - Builds backend (npm install, prisma generate)
   - Runs migrations (prisma migrate deploy)
   - Starts server
   - Health check passes
   ↓
5. Vercel:
   - Builds Next.js apps
   - Deploys to CDN
   - Sets environment variables
   ↓
6. Worker (Local or Cloud):
   - Receives jobs from Railway via queue
   - Processes transcriptions
   - Returns results to S3
```

---

## 🔧 Environment Setup by Platform

### Railway Environment Variables

Set these in Railway dashboard or via CLI:

```bash
railway variables set \
  DATABASE_URL="postgresql://..." \
  REDIS_URL="redis://..." \
  S3_BUCKET="whisper-audio" \
  S3_ACCESS_KEY="xxx" \
  S3_SECRET_KEY="xxx" \
  STRIPE_SECRET_KEY="sk_live_xxx" \
  STRIPE_WEBHOOK_SECRET="whsec_xxx" \
  STRIPE_PRICE_ID_PRO="price_xxx" \
  WORKER_MODE="local" \
  LOCAL_WORKER_URL="http://100.x.x.x:3001" \
  API_KEY_PREFIX="wtr_live_" \
  API_KEY_LENGTH=32 \
  RATE_LIMIT_FREE=3 \
  RATE_LIMIT_PRO=20 \
  RATE_LIMIT_PAYG=100 \
  QUOTA_FREE=60 \
  QUOTA_PRO=600 \
  MAX_FILE_SIZE_MB=500 \
  ALLOWED_FORMATS="mp3,wav,m4a,mp4,mpeg,webm" \
  FILE_RETENTION_HOURS=24
```

### Vercel Environment Variables

Dashboard:
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-app.railway.app
```

Landing:
```bash
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_DASHBOARD_URL production
```

---

## 🧪 Testing Integration

### 1. Validate Configuration

```bash
# Validate environment variables
bash deploy/scripts/validate-env.sh backend/.env.production

# Run deployment tests
cd deploy
npm install
npm test
```

### 2. Test Health Checks

```bash
# Local
bash deploy/scripts/health-check.sh

# Production
API_URL=https://your-app.railway.app bash deploy/scripts/health-check.sh
```

### 3. Test Docker Build

```bash
# Build image
docker build -f deploy/Dockerfile -t whisperapi:test .

# Run container
docker run -p 3000:3000 --env-file .env whisperapi:test

# Test health
curl http://localhost:3000/health
```

### 4. Test Full Stack

```bash
# Start all services
docker-compose up -d

# Wait for services to start
sleep 10

# Run health check
bash deploy/scripts/health-check.sh
```

---

## 📊 Monitoring & Observability

### Health Check Endpoints

All platforms should expose:
- **API**: `GET /health` → `{"status":"ok"}`
- **Worker**: `GET /health` → `{"status":"ok","whisper":"ready"}`

### Logs

**Railway:**
```bash
railway logs --follow
```

**Vercel:**
```bash
vercel logs whisperapi-dashboard --follow
```

**Docker:**
```bash
docker-compose logs -f api
```

**Local Worker:**
```bash
pm2 logs whisperapi-worker
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **`.github/workflows/test.yml`**
   - Runs on PRs and develop branch
   - Tests backend, frontend, deployment configs
   - Security scanning

2. **`.github/workflows/deploy-api.yml`**
   - Runs on main branch (backend changes)
   - Deploys to Railway
   - Runs migrations
   - Health check

3. **`.github/workflows/deploy-frontend.yml`**
   - Runs on main branch (frontend changes)
   - Deploys to Vercel
   - Separate jobs for dashboard and landing

### Required GitHub Secrets

```bash
# Railway
RAILWAY_TOKEN=xxx

# Vercel
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID_DASHBOARD=xxx
VERCEL_PROJECT_ID_LANDING=xxx
```

---

## 🔐 Security Considerations

### Production Checklist

- [ ] All environment variables use production values
- [ ] Stripe uses live keys (sk_live_)
- [ ] Database has strong password
- [ ] Redis requires authentication
- [ ] S3 bucket has proper CORS and permissions
- [ ] Worker endpoint secured (Tailscale/Cloudflare)
- [ ] API keys use secure prefix
- [ ] Rate limiting enabled
- [ ] File upload size limits enforced
- [ ] HTTPS enforced on all endpoints
- [ ] Security headers configured in Vercel
- [ ] Docker runs as non-root user
- [ ] Automated backups enabled

### Security Scanning

GitHub Actions includes:
- Trivy vulnerability scanner
- ShellCheck for bash scripts
- Dependency scanning

---

## 🆘 Troubleshooting

### Common Issues

**1. Railway deployment fails**
```bash
# Check logs
railway logs

# Verify environment variables
railway variables

# Re-run migrations
railway run npx prisma migrate deploy
```

**2. Worker not connecting**
```bash
# Check Tailscale status
tailscale status

# Test worker directly
curl http://100.x.x.x:3001/health

# Check Railway can reach worker
railway run curl $LOCAL_WORKER_URL/health
```

**3. Frontend can't reach API**
```bash
# Verify API is running
curl https://your-app.railway.app/health

# Check CORS settings
# Ensure Railway allows frontend domain

# Verify environment variable
vercel env ls
```

**4. Database connection issues**
```bash
# Test connection
railway run psql $DATABASE_URL

# Check if database is running
railway status

# Verify connection string
echo $DATABASE_URL
```

---

## 📦 Deliverables Checklist

- [x] `deploy/railway.json` - Railway configuration
- [x] `deploy/vercel-dashboard.json` - Vercel dashboard config
- [x] `deploy/vercel-landing.json` - Vercel landing config
- [x] `deploy/Dockerfile` - Production Docker image
- [x] `deploy/docker-compose.yml` - Development stack
- [x] `deploy/docker-compose.prod.yml` - Production stack
- [x] `deploy/init-db.sql` - Database initialization
- [x] `deploy/tailscale-setup.sh` - Tailscale setup script
- [x] `deploy/cloudflare-tunnel-setup.sh` - Cloudflare tunnel script
- [x] `deploy/scripts/health-check.sh` - Health check script
- [x] `deploy/scripts/deploy-railway.sh` - Railway deployment script
- [x] `deploy/scripts/deploy-vercel.sh` - Vercel deployment script
- [x] `deploy/scripts/backup-db.sh` - Database backup script
- [x] `deploy/scripts/validate-env.sh` - Environment validation
- [x] `deploy/__tests__/deployment.test.js` - Deployment tests
- [x] `.github/workflows/test.yml` - CI testing workflow
- [x] `.github/workflows/deploy-api.yml` - API deployment workflow
- [x] `.github/workflows/deploy-frontend.yml` - Frontend deployment workflow
- [x] `README_DEPLOY.md` - Comprehensive deployment guide
- [x] `TASK13_INTEGRATION_NOTES.md` - This document

---

## 🎯 Success Criteria

✅ **Configuration Validation:**
- All config files are valid JSON/YAML
- Scripts have proper bash syntax
- Docker configurations validate with `docker-compose config`

✅ **Deployment Testing:**
- Can deploy API to Railway with one command
- Can deploy frontend to Vercel with one command
- Can switch worker modes in under 30 seconds

✅ **Integration:**
- All environment variables documented
- Health checks work for all services
- Database migrations run automatically
- Worker connectivity tested

✅ **Documentation:**
- Complete deployment guide
- Troubleshooting section
- Security checklist
- Integration notes for all 13 tasks

---

## 🔄 Quick Reference

### Deploy Everything

```bash
# 1. Validate environment
bash deploy/scripts/validate-env.sh

# 2. Deploy API
bash deploy/scripts/deploy-railway.sh production

# 3. Deploy frontend
bash deploy/scripts/deploy-vercel.sh all

# 4. Setup worker (choose one)
bash deploy/tailscale-setup.sh
# OR
bash deploy/cloudflare-tunnel-setup.sh

# 5. Health check
bash deploy/scripts/health-check.sh
```

### Switch Worker Mode

```bash
# To cloud
railway variables set WORKER_MODE=cloud
railway variables set CLOUD_WORKER_URL=https://xxx.modal.run
railway up

# To local
railway variables set WORKER_MODE=local
railway variables set LOCAL_WORKER_URL=http://100.x.x.x:3001
railway up
```

---

## 📞 Module Exports

This deployment module provides:

- **Configuration Files**: Railway, Vercel, Docker configs
- **Setup Scripts**: Tailscale, Cloudflare, deployment automation
- **Validation Tools**: Environment validation, health checks
- **CI/CD Workflows**: Automated testing and deployment
- **Documentation**: Complete deployment guide with troubleshooting

---

## ✅ Task Complete

Task 13 provides production-ready deployment configurations that integrate seamlessly with all other modules. The system can be deployed with a single command and supports both local and cloud worker modes with easy switching.

**Total Files Delivered:** 19
**Lines of Code:** ~4,500
**Test Coverage:** Deployment validation suite included
**Documentation:** Complete with examples and troubleshooting
