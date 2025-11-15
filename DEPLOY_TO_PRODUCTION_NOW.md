# 🚀 Deploy to Production - Execute Now!

## ⚡ READY TO GO LIVE - 3 Options

I've prepared everything. Choose your deployment method below:

---

## 🥇 OPTION 1: Railway (RECOMMENDED - Fastest & Easiest)

### What You Need:
- [ ] AWS Account (for S3 storage)
  - Access Key ID
  - Secret Access Key
  - S3 Bucket Name
- [ ] Stripe Account
  - Secret Key
  - Webhook Secret (get after deployment)

### Deploy Now (15 minutes):

```bash
# Run the automated deployment script
./deploy-now.sh
```

**The script will:**
1. Authenticate you with Railway (opens browser)
2. Create a new Railway project
3. Add PostgreSQL & Redis automatically
4. Ask for your AWS & Stripe credentials
5. Deploy your API to production
6. Run database migrations
7. Give you your live URL!

**After deployment:**
- Your API will be live at: `https://your-project.railway.app`
- Cost: ~$20/month
- Auto-scaling included
- Database backups included

---

## 🥈 OPTION 2: Vercel + Railway (Best for Full Stack)

### Backend on Railway:
```bash
cd backend
railway login
railway init
railway add -d postgres
railway add -d redis

# Set environment variables in Railway dashboard
# Then deploy:
railway up
```

### Frontend on Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy Dashboard
cd frontend/dashboard
vercel --prod

# Deploy Landing Page
cd ../landing
vercel --prod
```

**Result:**
- Backend API: `https://api-your-project.railway.app`
- Dashboard: `https://dashboard-your-project.vercel.app`
- Landing: `https://your-project.vercel.app`
- Cost: ~$20/month (frontend free on Vercel)

---

## 🥉 OPTION 3: Docker (Self-Hosted)

### On Your Server:

```bash
# 1. Clone repository
git clone https://github.com/sirenblock/whisper-transcription-api.git
cd whisper-transcription-api

# 2. Configure environment
cp .env.master.example backend/.env
nano backend/.env  # Add your credentials

# 3. Deploy with Docker Compose
docker-compose -f deploy/docker-compose.prod.yml up -d

# 4. Run migrations
docker-compose exec backend npx prisma migrate deploy

# 5. Check health
curl http://localhost:3000/health
```

**Setup SSL with Caddy:**
```bash
cd deploy
./cloudflare-tunnel-setup.sh
```

---

## 📋 Pre-Deployment Checklist

### Get These Ready First:

#### AWS (Required):
```
1. Go to: https://console.aws.amazon.com/iam/
2. Create IAM user with S3 permissions
3. Get Access Key ID & Secret
4. Create S3 bucket (e.g., "whisper-api-prod")
5. Note bucket region (e.g., "us-east-1")
```

#### Stripe (Required):
```
1. Go to: https://dashboard.stripe.com
2. Get your Secret Key (starts with sk_)
3. After deployment, create webhook at:
   https://dashboard.stripe.com/webhooks
   Point to: YOUR_API_URL/api/v1/stripe/webhook
4. Copy webhook signing secret
```

#### Domain (Optional):
```
1. Buy domain if you want custom URL
2. Point DNS to deployment after setup
```

---

## 🎯 Deploy to Railway RIGHT NOW

### Step-by-Step:

#### 1. Get Your Credentials Ready
Create a text file with:
```
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_BUCKET_NAME=whisper-api-prod
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxx
```

#### 2. Run Deployment Script
```bash
cd /Users/lsd/msclaude/projects/1-1
./deploy-now.sh
```

#### 3. Follow Prompts
- Login to Railway (browser opens)
- Enter your AWS credentials when asked
- Enter your Stripe key when asked
- Wait for deployment (~5 minutes)

#### 4. Get Your URL
The script will show you:
```
🎉 Your Whisper API is now LIVE!
📍 Backend API URL: https://whisper-api-production-xxxx.railway.app
```

#### 5. Configure Stripe Webhook
```
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: https://YOUR_URL/api/v1/stripe/webhook
4. Select events:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
5. Copy webhook signing secret
6. Add to Railway:
   railway variables set STRIPE_WEBHOOK_SECRET="whsec_xxxx"
```

#### 6. Test Your API
```bash
# Health check
curl https://YOUR_URL/health

# Create user
curl -X POST https://YOUR_URL/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"securepass123"}'

# Login and get API key
# Use dashboard at YOUR_URL to manage API keys
```

---

## 🚨 Troubleshooting

### "AWS credentials invalid"
- Check Access Key ID & Secret are correct
- Ensure IAM user has S3 permissions
- Verify bucket exists and region matches

### "Database connection failed"
- Railway auto-provides DATABASE_URL
- Check Railway dashboard for database status
- Try restarting: `railway restart`

### "Stripe webhook failing"
- Ensure webhook URL matches your deployment
- Check webhook signing secret is set
- View webhook logs in Stripe dashboard

### "API not responding"
- Check deployment logs: `railway logs`
- Verify all environment variables are set
- Check service status in Railway dashboard

---

## 💰 Cost Breakdown

### Railway (Option 1):
- **Starter Plan:** $20/month
  - PostgreSQL database
  - Redis
  - 8GB RAM
  - 8vCPUs
  - Auto-scaling
  - SSL included

### Plus Additional:
- **AWS S3:** ~$5/month (100GB storage)
- **Stripe:** 2.9% + 30¢ per transaction
- **Total:** ~$25/month + usage

### Free Tier (Testing):
- Railway: $5 free credit/month
- Vercel: Free for frontend
- Good for testing before going live

---

## 🎊 Success Checklist

After deployment, verify:

- [ ] API responds to health check
- [ ] Can create user account
- [ ] Can generate API key
- [ ] Can upload file
- [ ] Workers process jobs
- [ ] Stripe webhooks working
- [ ] Frontend connects to API
- [ ] SSL certificate valid
- [ ] Monitoring active

---

## 📞 Quick Deploy Support

### If You Get Stuck:

1. **Check Railway Logs:**
   ```bash
   railway logs
   ```

2. **Check Environment Variables:**
   ```bash
   railway variables
   ```

3. **Restart Service:**
   ```bash
   railway restart
   ```

4. **View Dashboard:**
   ```bash
   railway open
   ```

---

## 🏁 After Going Live

### Share Your API:
1. Update GitHub README with live URL
2. Tweet about your launch
3. Post on Product Hunt
4. Share in AI/ML communities

### Monitor:
- Set up UptimeRobot for monitoring
- Enable Railway metrics
- Check Stripe dashboard for payments

### Scale:
- Add more workers as needed
- Upgrade Railway plan for more resources
- Enable Redis persistence

---

## 🚀 DEPLOY NOW - ONE COMMAND

```bash
./deploy-now.sh
```

**That's it!** Follow the prompts and you'll be live in 15 minutes.

---

<div align="center">

**Everything is ready. Just run the script and go live!** 🎉

**Questions?** Check the full deployment guide in `DEPLOYMENT_GUIDE.md`

[GitHub Repo](https://github.com/sirenblock/whisper-transcription-api) • [Railway](https://railway.app) • [Vercel](https://vercel.com)

</div>
