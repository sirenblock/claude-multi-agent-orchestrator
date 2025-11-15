#!/bin/bash

# ==============================================================================
# WHISPER API - VERCEL DEPLOYMENT SCRIPT
# ==============================================================================
# Deploys frontend (dashboard + landing) to Vercel
# Backend deployment to Railway handled separately

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     WHISPER API - VERCEL FRONTEND DEPLOYMENT                  ║"
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
print_warning "Before deploying frontend, you need a backend URL."
echo ""
echo "Options:"
echo "1. Use Railway for backend (recommended)"
echo "2. Use existing backend URL"
echo ""
read -p "Do you have a backend URL? (y/n): " HAS_BACKEND

if [ "$HAS_BACKEND" = "n" ]; then
    echo ""
    print_warning "You need to deploy the backend first!"
    echo ""
    echo "Quick deploy to Railway:"
    echo ""
    echo "  cd backend"
    echo "  railway login"
    echo "  railway init"
    echo "  railway add -d postgres"
    echo "  railway add -d redis"
    echo "  railway up"
    echo "  railway domain"
    echo ""
    echo "Then come back and run this script again."
    echo ""
    exit 1
fi

echo ""
read -p "Enter your backend API URL (e.g., https://api.yourdomain.com): " BACKEND_URL

# Validate URL
if [[ ! $BACKEND_URL =~ ^https?:// ]]; then
    print_error "Invalid URL. Must start with http:// or https://"
    exit 1
fi

print_success "Backend URL: $BACKEND_URL"
echo ""

# ============================================================================
# DEPLOY DASHBOARD
# ============================================================================

print_step "Step 1: Deploy Dashboard to Vercel"
echo ""

cd /Users/lsd/msclaude/projects/1-1/frontend/dashboard

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

print_success "Environment configured"
echo ""

print_warning "Deploying dashboard to Vercel..."
echo ""
echo "When prompted:"
echo "  - Project name: whisper-dashboard (or your choice)"
echo "  - Directory: ./ (default)"
echo ""
echo "Press Enter to continue..."
read

# Deploy to Vercel
vercel --prod

DASHBOARD_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)

print_success "Dashboard deployed!"
echo ""

# ============================================================================
# DEPLOY LANDING PAGE
# ============================================================================

print_step "Step 2: Deploy Landing Page to Vercel"
echo ""

cd /Users/lsd/msclaude/projects/1-1/frontend/landing

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
VITE_DASHBOARD_URL=$DASHBOARD_URL
EOF

print_success "Environment configured"
echo ""

print_warning "Deploying landing page to Vercel..."
echo ""
echo "When prompted:"
echo "  - Project name: whisper-landing (or your choice)"
echo "  - Directory: ./ (default)"
echo ""
echo "Press Enter to continue..."
read

# Deploy to Vercel
vercel --prod

LANDING_URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*' | head -1)

print_success "Landing page deployed!"
echo ""

# ============================================================================
# SUCCESS MESSAGE
# ============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              FRONTEND DEPLOYMENT SUCCESSFUL!                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Your Whisper API Frontend is now LIVE!"
echo ""
echo "📍 URLs:"
echo "   Backend API:  $BACKEND_URL"
echo "   Dashboard:    $DASHBOARD_URL"
echo "   Landing:      $LANDING_URL"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 IMPORTANT NEXT STEPS:"
echo ""
echo "1. Update CORS in Backend:"
echo "   The backend needs to allow requests from Vercel."
echo ""
if command -v railway &> /dev/null; then
    echo "   cd /Users/lsd/msclaude/projects/1-1/backend"
    echo "   railway variables set FRONTEND_URLS=\"$DASHBOARD_URL,$LANDING_URL\""
    echo "   railway restart"
else
    echo "   Add these URLs to your backend CORS configuration:"
    echo "   - $DASHBOARD_URL"
    echo "   - $LANDING_URL"
fi
echo ""
echo "2. Test Your Deployment:"
echo "   Dashboard: $DASHBOARD_URL"
echo "   Landing:   $LANDING_URL"
echo ""
echo "3. Configure Custom Domains (Optional):"
echo "   • Go to: https://vercel.com/dashboard"
echo "   • Select each project"
echo "   • Add custom domain in Settings → Domains"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Deployment complete!"
echo ""
echo "🌐 Open in browser:"
echo "   Dashboard: open $DASHBOARD_URL"
echo "   Landing:   open $LANDING_URL"
echo ""
