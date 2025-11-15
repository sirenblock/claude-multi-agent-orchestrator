# 🚀 Deploy to Vercel - Complete Guide

## ✨ Recommended Approach: Vercel Frontend + Railway Backend

Since your Vercel is already connected, here's the fastest way to deploy:

**Frontend (Dashboard + Landing)** → Vercel ✅
**Backend (API + Database + Redis)** → Railway ✅

This gives you:
- ⚡ Lightning-fast frontend on Vercel's CDN
- 🗄️ Full backend with PostgreSQL + Redis on Railway
- 💰 Optimal cost (~$20/month)
- 🔧 Easy to manage

---

## 🎯 FASTEST DEPLOYMENT (15 minutes)

### Step 1: Deploy Backend to Railway

```bash
cd /Users/lsd/msclaude/projects/1-1/backend

# Login to Railway (opens browser)
railway login

# Create project
railway init

# Add PostgreSQL
railway add -d postgres

# Add Redis
railway add -d redis

# Set environment variables
railway variables set AWS_ACCESS_KEY_ID="YOUR_AWS_KEY"
railway variables set AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET"
railway variables set AWS_REGION="us-east-1"
railway variables set S3_BUCKET_NAME="YOUR_BUCKET_NAME"
railway variables set STRIPE_SECRET_KEY="YOUR_STRIPE_KEY"
railway variables set JWT_SECRET="$(openssl rand -hex 32)"
railway variables set NODE_ENV="production"
railway variables set PORT="3000"

# Deploy backend
railway up

# Run migrations
railway run npx prisma migrate deploy

# Get your backend URL
railway domain
```

**Save your Railway backend URL** - you'll need it in Step 2!

---

### Step 2: Deploy Dashboard to Vercel

```bash
cd /Users/lsd/msclaude/projects/1-1/frontend/dashboard

# Set environment variable for backend API
echo "VITE_API_URL=https://YOUR_RAILWAY_URL" > .env.production

# Deploy to Vercel
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? whisper-dashboard
# - Directory? ./
# - Override settings? No
```

---

### Step 3: Deploy Landing Page to Vercel

```bash
cd /Users/lsd/msclaude/projects/1-1/frontend/landing

# Set environment variable
echo "VITE_API_URL=https://YOUR_RAILWAY_URL" > .env.production

# Deploy to Vercel
vercel --prod

# When prompted:
# - Project name? whisper-landing
# - Directory? ./
# - Override settings? No
```

---

## ✅ DONE! Your URLs

After deployment, you'll have:

- **Backend API:** `https://whisper-api-production-xxxx.railway.app`
- **Dashboard:** `https://whisper-dashboard.vercel.app`
- **Landing Page:** `https://whisper-landing.vercel.app`

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS in Backend

The backend needs to allow requests from your Vercel frontends:

```bash
# Add to Railway environment variables
railway variables set FRONTEND_URLS="https://whisper-dashboard.vercel.app,https://whisper-landing.vercel.app"
```

### 2. Configure Stripe Webhooks

```
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: https://YOUR_RAILWAY_URL/api/v1/stripe/webhook
4. Events:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
5. Copy webhook signing secret
6. Add to Railway:
   railway variables set STRIPE_WEBHOOK_SECRET="whsec_xxxx"
```

### 3. Test Everything

```bash
# Test backend health
curl https://YOUR_RAILWAY_URL/health

# Test dashboard (open in browser)
open https://whisper-dashboard.vercel.app

# Test landing page
open https://whisper-landing.vercel.app
```

---

## 🌐 Custom Domain Setup (Optional)

### For Dashboard:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select `whisper-dashboard` project
3. Settings → Domains
4. Add domain: `dashboard.yourdomain.com`
5. Update DNS records as shown

### For Landing:

1. Select `whisper-landing` project
2. Settings → Domains
3. Add domain: `yourdomain.com`
4. Update DNS records

### For Backend:

```bash
railway domain add api.yourdomain.com
```

Then add CNAME record in your DNS:
```
api.yourdomain.com → your-project.railway.app
```

---

## 🎨 Environment Variables Reference

### Backend (Railway)

Required:
```bash
DATABASE_URL              # Auto-provided by Railway
REDIS_URL                 # Auto-provided by Railway
AWS_ACCESS_KEY_ID         # Your AWS key
AWS_SECRET_ACCESS_KEY     # Your AWS secret
AWS_REGION                # e.g., us-east-1
S3_BUCKET_NAME            # Your S3 bucket
STRIPE_SECRET_KEY         # From Stripe dashboard
STRIPE_WEBHOOK_SECRET     # From Stripe webhooks
JWT_SECRET                # openssl rand -hex 32
NODE_ENV                  # production
PORT                      # 3000
```

Optional:
```bash
FRONTEND_URLS             # Comma-separated Vercel URLs
MODAL_TOKEN_ID            # For cloud GPU workers
MODAL_TOKEN_SECRET        # For cloud GPU workers
```

### Dashboard (Vercel)

Create `frontend/dashboard/.env.production`:
```bash
VITE_API_URL=https://YOUR_RAILWAY_URL
```

### Landing (Vercel)

Create `frontend/landing/.env.production`:
```bash
VITE_API_URL=https://YOUR_RAILWAY_URL
VITE_DASHBOARD_URL=https://whisper-dashboard.vercel.app
```

---

## 💰 Cost Breakdown

### Monthly Costs:

**Backend (Railway):**
- Starter Plan: $20/month
  - PostgreSQL included
  - Redis included
  - 8GB RAM, 8 vCPU
  - SSL included

**Frontend (Vercel):**
- Hobby Plan: FREE
  - 100GB bandwidth/month
  - Unlimited deployments
  - SSL included
  - Global CDN

**Additional Services:**
- AWS S3: ~$5/month (100GB storage)
- Stripe: 2.9% + 30¢ per transaction

**Total: ~$25/month + transaction fees**

---

## 🚨 Troubleshooting

### "Command not found: vercel"

```bash
npm install -g vercel
```

### "Command not found: railway"

```bash
npm install -g @railway/cli
```

### Frontend can't connect to backend

Check CORS settings in backend:

```typescript
// backend/src/index.ts should have:
app.use(cors({
  origin: [
    'https://whisper-dashboard.vercel.app',
    'https://whisper-landing.vercel.app',
    'http://localhost:5173', // for local dev
  ],
  credentials: true
}));
```

Add via Railway:
```bash
railway variables set FRONTEND_URLS="https://whisper-dashboard.vercel.app,https://whisper-landing.vercel.app"
railway restart
```

### Database migrations failed

```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

### Deployment failed

```bash
# Check Railway logs
railway logs

# Check Vercel logs
vercel logs
```

---

## 📊 Alternative: Pure Vercel Deployment

If you want everything on Vercel, you can use:

**Database:** Vercel Postgres (powered by Neon)
**Redis:** Vercel KV (powered by Upstash)
**Backend:** Vercel Serverless Functions

### Setup:

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend
cd /Users/lsd/msclaude/projects/1-1/backend

# Create Vercel project
vercel

# Add Vercel Postgres
vercel integration add neon

# Add Vercel KV
vercel integration add upstash

# Set environment variables in Vercel dashboard
vercel env add AWS_ACCESS_KEY_ID
vercel env add AWS_SECRET_ACCESS_KEY
vercel env add S3_BUCKET_NAME
vercel env add STRIPE_SECRET_KEY
vercel env add JWT_SECRET

# Deploy
vercel --prod
```

**Note:** Workers will be limited to 60s execution time on Vercel Pro plan.

**Cost:** ~$20/month for Vercel Pro + ~$10/month for Vercel Postgres

---

## 🎯 Quick Commands Reference

### Railway

```bash
railway login              # Login
railway init               # Create project
railway add -d postgres    # Add PostgreSQL
railway add -d redis       # Add Redis
railway up                 # Deploy
railway logs               # View logs
railway domain             # Get URL
railway variables          # List env vars
railway restart            # Restart service
```

### Vercel

```bash
vercel login               # Login
vercel                     # Deploy preview
vercel --prod              # Deploy production
vercel logs                # View logs
vercel env ls              # List env vars
vercel domains             # Manage domains
vercel --help              # Get help
```

---

## 🎉 Success Checklist

After deployment:

- [ ] Backend deployed to Railway
- [ ] PostgreSQL + Redis provisioned
- [ ] Database migrations ran successfully
- [ ] Backend health check passes
- [ ] Dashboard deployed to Vercel
- [ ] Landing page deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Stripe webhooks configured
- [ ] Can create user account
- [ ] Can generate API key
- [ ] Can upload file
- [ ] Transcription works end-to-end

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **GitHub Repo:** https://github.com/sirenblock/whisper-transcription-api

---

## 🚀 ONE-LINER DEPLOYMENT

If you want to deploy everything right now:

```bash
# Deploy backend to Railway
cd /Users/lsd/msclaude/projects/1-1/backend && railway login && railway init && railway add -d postgres && railway add -d redis && railway up

# Deploy dashboard to Vercel
cd /Users/lsd/msclaude/projects/1-1/frontend/dashboard && vercel --prod

# Deploy landing to Vercel
cd /Users/lsd/msclaude/projects/1-1/frontend/landing && vercel --prod
```

**That's it! You're live!** 🎉

---

<div align="center">

**Your Whisper API is ready to deploy with Vercel!**

[Railway](https://railway.app) • [Vercel](https://vercel.com) • [GitHub Repo](https://github.com/sirenblock/whisper-transcription-api)

</div>
