#!/bin/bash

# ==============================================================================
# WHISPER API - PRODUCTION DEPLOYMENT SCRIPT
# ==============================================================================
# This script will deploy your Whisper API to Railway in production

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     WHISPER API - PRODUCTION DEPLOYMENT TO RAILWAY            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check Railway CLI
if ! command -v railway &> /dev/null; then
    print_error "Railway CLI not found. Installing..."
    npm install -g @railway/cli
    print_success "Railway CLI installed"
fi

echo ""
print_step "Step 1: Railway Authentication"
echo ""
echo "You need to authenticate with Railway. This will open your browser."
echo "Press Enter to continue..."
read

railway login

print_success "Authenticated with Railway"
echo ""

print_step "Step 2: Create Railway Project"
echo ""
echo "Creating new Railway project..."

# Initialize Railway project
cd /Users/lsd/msclaude/projects/1-1/backend
railway init

print_success "Railway project created"
echo ""

print_step "Step 3: Add PostgreSQL Database"
echo ""
railway add -d postgres

print_success "PostgreSQL added"
echo ""

print_step "Step 4: Add Redis"
echo ""
railway add -d redis

print_success "Redis added"
echo ""

print_step "Step 5: Configure Environment Variables"
echo ""
print_warning "You need to provide some credentials. Please have these ready:"
echo ""
echo "1. AWS_ACCESS_KEY_ID"
echo "2. AWS_SECRET_ACCESS_KEY"
echo "3. S3_BUCKET_NAME"
echo "4. STRIPE_SECRET_KEY"
echo "5. STRIPE_WEBHOOK_SECRET"
echo ""
echo "Press Enter when ready to input these values..."
read

# Prompt for environment variables
echo ""
read -p "AWS Access Key ID: " AWS_KEY
read -p "AWS Secret Access Key: " AWS_SECRET
read -p "S3 Bucket Name: " S3_BUCKET
read -p "Stripe Secret Key: " STRIPE_KEY
read -p "Stripe Webhook Secret (optional, press Enter to skip): " STRIPE_WEBHOOK

# Generate JWT secret
JWT_SECRET=$(openssl rand -hex 32)

# Set environment variables
print_step "Setting environment variables..."

railway variables set AWS_ACCESS_KEY_ID="$AWS_KEY"
railway variables set AWS_SECRET_ACCESS_KEY="$AWS_SECRET"
railway variables set AWS_REGION="us-east-1"
railway variables set S3_BUCKET_NAME="$S3_BUCKET"
railway variables set STRIPE_SECRET_KEY="$STRIPE_KEY"

if [ ! -z "$STRIPE_WEBHOOK" ]; then
    railway variables set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK"
fi

railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set NODE_ENV="production"
railway variables set PORT="3000"

print_success "Environment variables configured"
echo ""

print_step "Step 6: Deploy to Railway"
echo ""
print_warning "This will deploy your backend API to production"
echo "Press Enter to continue..."
read

railway up

print_success "Deployment initiated!"
echo ""

print_step "Step 7: Run Database Migrations"
echo ""
railway run npx prisma migrate deploy

print_success "Database migrations complete"
echo ""

print_step "Step 8: Get Deployment URL"
echo ""
DOMAIN=$(railway domain)

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    DEPLOYMENT SUCCESSFUL!                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Your Whisper API is now LIVE!"
echo ""
echo "📍 Backend API URL: $DOMAIN"
echo "🔗 Health Check: $DOMAIN/health"
echo "📊 Dashboard: https://railway.app/dashboard"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 NEXT STEPS:"
echo ""
echo "1. Configure Stripe Webhooks:"
echo "   URL: $DOMAIN/api/v1/stripe/webhook"
echo "   Events: customer.subscription.*, invoice.payment.*"
echo ""
echo "2. Test your API:"
echo "   curl $DOMAIN/health"
echo ""
echo "3. Deploy Frontend (optional):"
echo "   cd frontend/dashboard"
echo "   vercel --prod"
echo ""
echo "4. Create your first user:"
echo "   curl -X POST $DOMAIN/api/v1/auth/signup \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"email\":\"you@example.com\",\"password\":\"your_password\"}'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Deployment complete!"
echo ""
echo "📖 Full documentation: https://github.com/sirenblock/whisper-transcription-api"
echo ""
