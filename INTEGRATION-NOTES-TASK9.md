# Task 9: Stripe Integration - Integration Notes

## 🔗 Module Overview

This module provides complete Stripe payment integration for the Whisper Transcription API, including:
- Subscription checkout and management
- Webhook event processing
- Usage-based billing for PAYG plans
- Customer portal for self-service

## 📦 Exported Functions

### From `stripe.service.ts`

```typescript
export async function createCheckoutSession(params: CheckoutSessionParams): Promise<Stripe.Checkout.Session>
export async function createPortalSession(params: PortalSessionParams): Promise<Stripe.BillingPortal.Session>
export async function recordUsageForPayg(params: UsageRecordParams): Promise<void>
export async function handleWebhook(rawBody: Buffer, signature: string): Promise<void>
```

### From `stripe.routes.ts`

```typescript
export default router; // Express Router
```

## 🔌 Integration Requirements

### 1. Database Integration (Task 1)

**Required Prisma Client:**
```typescript
import { prisma } from '../db';
```

**Database Tables Used:**
- `User` - Read/Update for plan management and Stripe customer linking

**Fields Modified:**
- `User.stripeCustomerId` - Set when Stripe customer is created
- `User.plan` - Updated based on subscription status (FREE/PRO/PAYG)
- `User.monthlyMinutesUsed` - Reset on billing cycle or plan changes

**Example Integration:**
```typescript
// In your Prisma schema (Task 1)
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  stripeCustomerId  String?  @unique @map("stripe_customer_id")
  plan              Plan     @default(FREE)
  monthlyMinutesUsed Float   @default(0) @map("monthly_minutes_used")
  // ... other fields
}
```

### 2. Authentication Middleware (Task 3)

**Required Middleware:**
```typescript
import { authMiddleware } from '../middleware/auth.middleware';
```

**Expected Request Extension:**
```typescript
// authMiddleware should set req.user
interface Request {
  user?: {
    id: string;
    email: string;
    plan: 'FREE' | 'PRO' | 'PAYG';
  };
}
```

**Routes Using Auth:**
- `POST /create-checkout` - Requires authenticated user
- `POST /create-portal` - Requires authenticated user
- `POST /webhook` - Public (uses Stripe signature verification)
- `GET /plans` - Public

### 3. Main Application Setup (Task 8)

**Critical: Webhook Route Registration**

The webhook route MUST be registered BEFORE `express.json()` middleware:

```typescript
// src/index.ts or src/app.ts

import express from 'express';
import stripeRoutes from './routes/stripe.routes';

const app = express();

// ⚠️ IMPORTANT: Register webhook route BEFORE express.json()
app.use('/api/v1/stripe/webhook', stripeRoutes);

// Now add JSON body parser
app.use(express.json());

// Register other Stripe routes
app.use('/api/v1/stripe', stripeRoutes);

// Other routes...
app.use('/api/v1/transcribe', transcriptionRoutes);
```

**Why?** The webhook needs access to the raw request body for signature verification. `express.json()` consumes the raw body.

### 4. Transcription Completion Handler (Task 8)

**After transcription completes, record PAYG usage:**

```typescript
// In transcription completion handler (Task 8)
import { recordUsageForPayg } from '../services/stripe.service';

async function handleTranscriptionComplete(transcription: Transcription) {
  // ... update transcription status, upload results, etc.

  // Record usage for PAYG users
  if (transcription.user.plan === 'PAYG') {
    try {
      await recordUsageForPayg({
        userId: transcription.userId,
        minutes: transcription.durationSeconds / 60,
        transcriptionId: transcription.id,
      });
    } catch (error) {
      // Log error but don't fail transcription
      console.error('Failed to record PAYG usage:', error);
    }
  }
}
```

### 5. Rate Limiting (Task 4)

**Plan-based rate limits:**

The rate limiting middleware (Task 4) should check `req.user.plan`:

```typescript
// Example integration with Task 4
const rateLimits = {
  FREE: 3,   // 3 requests per hour
  PRO: 20,   // 20 requests per hour
  PAYG: 100, // 100 requests per hour
};

export function getRateLimitForUser(plan: string): number {
  return rateLimits[plan] || rateLimits.FREE;
}
```

When a user upgrades their plan via Stripe, the rate limit automatically increases on the next request.

### 6. Frontend Integration (Task 10 - Dashboard)

**Checkout Button:**

```typescript
// In your dashboard component
const handleUpgrade = async (priceId: string) => {
  try {
    const response = await fetch('/api/v1/stripe/create-checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { data } = await response.json();

    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (error) {
    console.error('Checkout failed:', error);
  }
};

// Usage
<button onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO)}>
  Upgrade to Pro
</button>
```

**Customer Portal Button:**

```typescript
const openBillingPortal = async () => {
  try {
    const response = await fetch('/api/v1/stripe/create-portal', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const { data } = await response.json();

    // Redirect to Stripe portal
    window.location.href = data.url;
  } catch (error) {
    console.error('Portal failed:', error);
  }
};

// Usage
<button onClick={openBillingPortal}>
  Manage Subscription
</button>
```

**Display Current Plan:**

```typescript
const { data: plans } = await fetch('/api/v1/stripe/plans').then(r => r.json());

// Show current plan and available upgrades
```

### 7. Landing Page (Task 11)

**Pricing Table:**

```typescript
// Fetch available plans
const response = await fetch('/api/v1/stripe/plans');
const { data: plans } = await response.json();

// Display pricing cards
{plans.map(plan => (
  <PricingCard
    key={plan.id}
    name={plan.name}
    price={plan.price}
    interval={plan.interval}
    features={plan.features}
    priceId={plan.priceId}
  />
))}
```

## 🔄 Event Flow Diagrams

### User Upgrades to PRO Plan

```
Frontend (Task 10)
  ↓ POST /api/v1/stripe/create-checkout
Stripe Routes (Task 9)
  ↓ createCheckoutSession()
Stripe Service (Task 9)
  ↓ Check user in database
Database (Task 1)
  ↓ Get/Create Stripe customer
Stripe API
  ↓ Create checkout session
Frontend (Task 10)
  ↓ Redirect to Stripe Checkout
User completes payment
  ↓ Stripe sends webhook
Webhook Handler (Task 9)
  ↓ handleWebhook()
Database (Task 1)
  ↓ Update user.plan = 'PRO'
User upgraded ✅
```

### PAYG Usage Recording

```
Transcription completes (Task 8)
  ↓ Calculate duration
Transcription Handler (Task 8)
  ↓ recordUsageForPayg()
Stripe Service (Task 9)
  ↓ Check user.plan === 'PAYG'
Database (Task 1)
  ↓ Get user subscription
Stripe API
  ↓ Record metered usage
Stripe API
  ↓ Bill on next invoice
Usage recorded ✅
```

### Subscription Cancellation

```
User clicks "Cancel" in portal
  ↓ Stripe processes cancellation
Stripe sends webhook
  ↓ customer.subscription.deleted
Webhook Handler (Task 9)
  ↓ handleWebhook()
Database (Task 1)
  ↓ Update user.plan = 'FREE'
  ↓ Reset monthlyMinutesUsed = 0
User downgraded to FREE ✅
```

## ⚙️ Environment Variables Required

**Stripe-specific (Add to .env):**
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_PAYG=price_...
FRONTEND_URL=http://localhost:3001
```

**Used by other modules:**
```bash
DATABASE_URL=postgresql://...  # Task 1
REDIS_URL=redis://...         # Task 5
```

## 🧪 Testing Integration

### Mock Stripe Service in Tests

```typescript
// In other module tests that depend on Stripe
jest.mock('../services/stripe.service', () => ({
  recordUsageForPayg: jest.fn(),
}));

// In your test
import { recordUsageForPayg } from '../services/stripe.service';

it('should record usage for PAYG users', async () => {
  // ... test code
  expect(recordUsageForPayg).toHaveBeenCalledWith({
    userId: 'user_123',
    minutes: 5.5,
    transcriptionId: 'trans_123',
  });
});
```

### Test Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/v1/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## 🚨 Common Integration Issues

### Issue 1: Webhook 400 Error

**Symptom:** Webhooks fail with "Invalid signature" error

**Cause:** Webhook route registered after `express.json()` middleware

**Solution:**
```typescript
// ❌ WRONG
app.use(express.json());
app.use('/api/v1/stripe', stripeRoutes);

// ✅ CORRECT
app.use('/api/v1/stripe/webhook', stripeRoutes);
app.use(express.json());
app.use('/api/v1/stripe', stripeRoutes);
```

### Issue 2: User Plan Not Updating

**Symptom:** User completes checkout but plan remains FREE

**Cause:** Webhook endpoint not publicly accessible or not configured in Stripe

**Solution:**
1. Ensure webhook endpoint is deployed and publicly accessible
2. Add webhook endpoint in Stripe Dashboard → Developers → Webhooks
3. Select correct events: `checkout.session.completed`, `customer.subscription.*`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Issue 3: PAYG Usage Not Recording

**Symptom:** `recordUsageForPayg()` returns without error but usage not in Stripe

**Cause:** User not on PAYG plan or subscription not active

**Solution:**
```typescript
// Add detailed logging
console.log('Recording usage for user:', userId);
console.log('User plan:', user.plan);
console.log('Stripe customer:', user.stripeCustomerId);

// Check Stripe dashboard for subscription details
```

### Issue 4: Rate Limit Not Updating After Upgrade

**Symptom:** User upgrades but still hitting FREE tier rate limits

**Cause:** Rate limiter caching old plan value

**Solution:**
```typescript
// In rate limit middleware (Task 4)
// Always fetch fresh user data from database
const user = await prisma.user.findUnique({
  where: { id: req.user.id },
  select: { plan: true },
});

const limit = getRateLimitForUser(user.plan);
```

## 📊 Monitoring Recommendations

### Key Metrics to Track

1. **Checkout Conversion Rate**
   - Sessions created vs completed
   - Track with: `checkout.session.created` and `checkout.session.completed` events

2. **Subscription Churn**
   - Count `customer.subscription.deleted` events
   - Calculate monthly churn rate

3. **PAYG Revenue**
   - Track usage records sent to Stripe
   - Monitor `invoice.payment_succeeded` for PAYG subscriptions

4. **Failed Payments**
   - Count `invoice.payment_failed` events
   - Alert on failed payments for manual follow-up

### Logging Examples

```typescript
// Add to your logging service
logger.info('subscription_created', {
  userId: user.id,
  plan: 'PRO',
  stripeCustomerId: customerId,
});

logger.error('payment_failed', {
  userId: user.id,
  invoiceId: invoice.id,
  amountDue: invoice.amount_due,
});
```

## 🔒 Security Checklist

- [x] Webhook signature verification implemented
- [x] API key authentication required for checkout/portal endpoints
- [x] Input validation using Zod schemas
- [x] No sensitive data logged (Stripe keys, customer data)
- [x] HTTPS enforced for production webhooks
- [x] Rate limiting on checkout endpoint to prevent abuse
- [x] Metadata sanitized before sending to Stripe

## 📝 Deployment Checklist

### Before Production Deployment

1. **Switch to Live Stripe Keys**
   ```bash
   STRIPE_SECRET_KEY=sk_live_...  # Not sk_test_
   STRIPE_WEBHOOK_SECRET=whsec_... # From live webhook endpoint
   ```

2. **Create Production Prices**
   - Create PRO and PAYG prices in live mode
   - Update `STRIPE_PRICE_ID_PRO` and `STRIPE_PRICE_ID_PAYG`

3. **Configure Production Webhook**
   - Add production webhook URL to Stripe
   - Use HTTPS endpoint
   - Select all required events

4. **Enable Customer Portal**
   - Configure in Stripe Dashboard → Settings → Billing → Customer portal
   - Customize branding and allowed actions

5. **Test Webhook Delivery**
   ```bash
   # Send test event from Stripe dashboard
   # Verify webhook receives and processes correctly
   # Check database for plan updates
   ```

6. **Monitor Initial Deployments**
   - Watch logs for webhook processing
   - Verify plan updates working correctly
   - Test checkout flow end-to-end
   - Confirm PAYG usage recording

## 🎯 Success Criteria

✅ **Checkout Flow:**
- User can click upgrade button
- Redirects to Stripe Checkout
- After payment, user plan updates to PRO/PAYG
- User redirected back to dashboard

✅ **Subscription Management:**
- PRO users can open customer portal
- Can update payment method
- Can cancel subscription
- Cancellation downgrades to FREE

✅ **PAYG Usage:**
- Usage recorded after each transcription
- Appears in Stripe dashboard usage records
- Billed correctly on monthly invoice

✅ **Webhooks:**
- All webhook events process successfully
- Database updates reflect subscription changes
- No signature verification errors
- Failed webhooks retry successfully

## 📚 Additional Resources

### Stripe Documentation
- [Checkout Sessions](https://stripe.com/docs/api/checkout/sessions)
- [Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- [Webhooks](https://stripe.com/docs/webhooks)
- [Metered Billing](https://stripe.com/docs/billing/subscriptions/usage-based)

### Testing Tools
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)

---

## 🤝 Integration Support

If you encounter issues integrating this module:

1. **Check the logs** - All functions log extensively
2. **Verify environment variables** - Ensure all Stripe vars are set
3. **Test webhooks** - Use Stripe CLI to verify webhook processing
4. **Review database** - Check if user.plan and user.stripeCustomerId are updating
5. **Check Stripe Dashboard** - Verify events are being sent

**Module complete and ready for integration!** ✅

Last updated: 2025-11-15
