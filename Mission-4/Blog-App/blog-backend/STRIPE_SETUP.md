# 💳 Stripe Setup

## Step-1: Stripe Documentation

Go to:

```text
stripe.com
→ Developers
→ Stripe Docs
→ Get started with Stripe
→ Sell subscriptions as a SaaS startup
→ Quick start

Select:

Node.js + React

Then follow the Stripe documentation and implement Stripe in the project.

Step-2: Stripe Dashboard
1. Create Product

Go to:

Stripe Dashboard
→ Product catalog
→ Create product

Set the product information:

Name        → Project name
Description → Write something
Amount      → BDT
Example     → 999 BDT
Billing     → Yearly / Monthly

Then click:

Add product
2. Get Price ID

Click the created product/price card:

Product
→ ...
→ Copy Price ID

Then add the Price ID to .env:

STRIPE_PRODUCT_PRICE_ID="YOUR_STRIPE_PRODUCT_PRICE"
OR

You can also get the Price ID from Stripe Docs:

stripe.com
→ Developers
→ Stripe Docs
→ Get started with Stripe
→ Sell subscriptions as a SaaS startup
→ Define a product to sell
→ Select Project Name
→ Get Product Price ID
Step-3: Code
1. Install Stripe
npm i stripe
2. Create Stripe File

Create:

lib/
└── stripe.ts
3. Get Stripe Secret Key

Go to:

Stripe Dashboard
→ Developers
→ API keys
→ Secret key

Copy the Secret Key and add it to .env:

STRIPE_SECRET_KEY="YOUR_SECRET_KEY"
Step-4: Handle Webhook

⚠️ Webhook is the most important part of Stripe integration.

1. Install Stripe CLI

Go to:

Stripe Dashboard
→ Developers
→ Webhooks
→ Test With Local Listener
→ Install the Stripe CLI
2. Install Stripe CLI
npm i -g @stripe/cli@latest

Then:

stripe login

After running stripe login:

→ Enter verification code
→ Select Test mode
→ Enable CLI
→ Click Authorize
3. Create Webhook API Before express.json()
app.use(
  "/api/subscription/webhook",
  express.raw({ type: "application/json" }),
  () => {}
);

The webhook API should be created before express.json().

4. Add Stripe Webhook Script

Add this script to package.json:

"stripe:webhook": "stripe listen --events checkout.session.completed --forward-to localhost:5000/api/subscription/webhook"
5. Run Stripe Webhook
npm run stripe:webhook

After running the command, you will get a Webhook Signing Secret.

Example:

whsec_xxxxxxxxxxxxxxxxx

Add it to .env:

6.stripe trigger payment_intent.succeeded=> run api => and get all console where run backend application

STRIPE_WEBHOOK_SECRET="YOUR_WEBHOOK_SIGNING_SECRET"
🔐 Stripe Environment Variables
STRIPE_PRODUCT_PRICE_ID="YOUR_STRIPE_PRODUCT_PRICE"

STRIPE_SECRET_KEY="YOUR_SECRET_KEY"

STRIPE_WEBHOOK_SECRET="YOUR_WEBHOOK_SIGNING_SECRET"

⚠️ Never share or push your real Stripe secret keys to GitHub.



 
