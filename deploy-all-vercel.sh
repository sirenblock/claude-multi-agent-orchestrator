#!/bin/bash

# ==============================================================================
# WHISPER API - COMPLETE VERCEL DEPLOYMENT
# ==============================================================================
# Deploys EVERYTHING to Vercel: Backend + Frontend + Database + Redis

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     WHISPER API - COMPLETE VERCEL DEPLOYMENT                  ║"
echo "║     Backend + Frontend + Database + Redis                      ║"
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

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Installing..."
    npm install -g vercel
    print_success "Vercel CLI installed"
fi

echo ""
print_step "This will deploy your complete Whisper API to Vercel"
echo ""
print_warning "You'll need:"
echo "  ✓ AWS credentials (S3 storage)"
echo "  ✓ Stripe API keys"
echo "  ✓ Vercel Pro plan (for longer function timeouts - $20/month)"
echo ""
echo "Press Enter when ready..."
read

# ============================================================================
# COLLECT CREDENTIALS
# ============================================================================

print_step "Step 1: Gather Credentials"
echo ""

read -p "AWS Access Key ID: " AWS_KEY
read -p "AWS Secret Access Key: " AWS_SECRET
read -p "AWS Region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}
read -p "S3 Bucket Name: " S3_BUCKET
read -p "Stripe Secret Key: " STRIPE_KEY
read -p "Stripe Webhook Secret (optional, press Enter to skip): " STRIPE_WEBHOOK

# Generate JWT secret
JWT_SECRET=$(openssl rand -hex 32)

print_success "Credentials collected"
echo ""

# ============================================================================
# DEPLOY BACKEND
# ============================================================================

print_step "Step 2: Deploy Backend API to Vercel"
echo ""

cd /Users/lsd/msclaude/projects/1-1/backend

print_warning "Deploying backend to Vercel..."
echo ""
echo "When prompted:"
echo "  - Project name: whisper-api-backend"
echo "  - Directory: ./"
echo ""
echo "Press Enter to continue..."
read

# Deploy backend
vercel --prod

print_success "Backend deployed to Vercel!"
echo ""

# ============================================================================
# ADD VERCEL POSTGRES
# ============================================================================

print_step "Step 3: Add Vercel Postgres Database"
echo ""

print_warning "Opening Vercel dashboard to add Postgres..."
echo ""
echo "Follow these steps:"
echo "  1. Go to your project: whisper-api-backend"
echo "  2. Click 'Storage' tab"
echo "  3. Click 'Create Database'"
echo "  4. Select 'Postgres'"
echo "  5. Click 'Continue'"
echo ""
echo "This will create and connect a PostgreSQL database."
echo ""
echo "Press Enter when database is created..."
read

print_success "Database connected"
echo ""

# ============================================================================
# ADD VERCEL KV (REDIS)
# ============================================================================

print_step "Step 4: Add Vercel KV (Redis)"
echo ""

print_warning "Adding Redis to your project..."
echo ""
echo "Follow these steps:"
echo "  1. Still in 'Storage' tab"
echo "  2. Click 'Create Database'"
echo "  3. Select 'KV' (Redis)"
echo "  4. Click 'Continue'"
echo ""
echo "Press Enter when Redis is created..."
read

print_success "Redis connected"
echo ""

# ============================================================================
# SET ENVIRONMENT VARIABLES
# ============================================================================

print_step "Step 5: Configure Environment Variables"
echo ""

print_warning "Adding environment variables to Vercel..."
echo ""

# Create env file for reference
cat > .env.vercel << EOF
# AWS S3
AWS_ACCESS_KEY_ID=$AWS_KEY
AWS_SECRET_ACCESS_KEY=$AWS_SECRET
AWS_REGION=$AWS_REGION
S3_BUCKET_NAME=$S3_BUCKET

# Stripe
STRIPE_SECRET_KEY=$STRIPE_KEY
STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK

# JWT
JWT_SECRET=$JWT_SECRET

# App Config
NODE_ENV=production
EOF

echo "Environment variables saved to backend/.env.vercel"
echo ""
echo "Now adding them to Vercel..."
echo ""

# Add environment variables using Vercel CLI
vercel env add AWS_ACCESS_KEY_ID production << EOF
$AWS_KEY
EOF

vercel env add AWS_SECRET_ACCESS_KEY production << EOF
$AWS_SECRET
EOF

vercel env add AWS_REGION production << EOF
$AWS_REGION
EOF

vercel env add S3_BUCKET_NAME production << EOF
$S3_BUCKET
EOF

vercel env add STRIPE_SECRET_KEY production << EOF
$STRIPE_KEY
EOF

if [ ! -z "$STRIPE_WEBHOOK" ]; then
    vercel env add STRIPE_WEBHOOK_SECRET production << EOF
$STRIPE_WEBHOOK
EOF
fi

vercel env add JWT_SECRET production << EOF
$JWT_SECRET
EOF

vercel env add NODE_ENV production << EOF
production
EOF

print_success "Environment variables configured"
echo ""

# Redeploy to pick up env vars
print_warning "Redeploying to apply environment variables..."
vercel --prod

print_success "Backend redeployed with environment variables"
echo ""

# ============================================================================
# RUN DATABASE MIGRATIONS
# ============================================================================

print_step "Step 6: Run Database Migrations"
echo ""

print_warning "Running Prisma migrations..."

# Run migrations on Vercel
vercel env pull .env.production.local
npx prisma migrate deploy

print_success "Database migrations complete"
echo ""

# ============================================================================
# DEPLOY DASHBOARD
# ============================================================================

print_step "Step 7: Deploy Dashboard to Vercel"
echo ""

cd /Users/lsd/msclaude/projects/1-1/frontend/dashboard

# Get backend URL
BACKEND_URL=$(vercel ls whisper-api-backend 2>&1 | grep "Production" | awk '{print $2}' | head -1)
if [[ ! $BACKEND_URL =~ ^https:// ]]; then
    read -p "Enter your backend URL from Vercel: " BACKEND_URL
fi

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

print_warning "Deploying dashboard..."
echo ""

vercel --prod

DASHBOARD_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)

print_success "Dashboard deployed!"
echo ""

# ============================================================================
# DEPLOY LANDING PAGE
# ============================================================================

print_step "Step 8: Deploy Landing Page to Vercel"
echo ""

cd /Users/lsd/msclaude/projects/1-1/frontend/landing

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
VITE_DASHBOARD_URL=$DASHBOARD_URL
EOF

print_warning "Deploying landing page..."
echo ""

vercel --prod

LANDING_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)

print_success "Landing page deployed!"
echo ""

# ============================================================================
# SUCCESS MESSAGE
# ============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║            COMPLETE DEPLOYMENT SUCCESSFUL!                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Your COMPLETE Whisper API is now LIVE on Vercel!"
echo ""
echo "📍 URLs:"
echo "   Backend API:  $BACKEND_URL"
echo "   Dashboard:    $DASHBOARD_URL"
echo "   Landing:      $LANDING_URL"
echo ""
echo "🗄️  Databases:"
echo "   PostgreSQL:   Vercel Postgres (auto-connected)"
echo "   Redis:        Vercel KV (auto-connected)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 NEXT STEPS:"
echo ""
echo "1. Configure Stripe Webhooks:"
echo "   URL: $BACKEND_URL/api/v1/stripe/webhook"
echo "   Events: customer.subscription.*, invoice.payment.*"
echo ""
echo "2. Test Your API:"
echo "   curl $BACKEND_URL/health"
echo ""
echo "3. Create First User:"
echo "   curl -X POST $BACKEND_URL/api/v1/auth/signup \\"
echo "     -H \"Content-Type: application/json\" \\"
echo "     -d '{\"email\":\"you@example.com\",\"password\":\"securepass\"}'"
echo ""
echo "4. Open Dashboard:"
echo "   open $DASHBOARD_URL"
echo ""
echo "5. View Vercel Dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Deployment complete!"
echo ""
echo "💰 MONTHLY COST:"
echo "   Vercel Pro:        \$20/month"
echo "   Vercel Postgres:   ~\$10/month (5GB included, then pay-as-you-go)"
echo "   Vercel KV:         ~\$5/month (500MB included)"
echo "   AWS S3:            ~\$5/month (100GB storage)"
echo "   Stripe:            2.9% + 30¢ per transaction"
echo "   Total:             ~\$40/month + usage"
echo ""
echo "🎊 YOU'RE LIVE! 🎊"
echo ""
