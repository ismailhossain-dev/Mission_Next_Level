import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

//stripe post
const createCheckOutSession = async (userId: string) => {
  //there are multiple queries here . so we are usigne $transaction
  const transactionResult = await prisma.$transaction(async (tx) => {
    //check user exist in database
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      //include the subccription to get the customerId.
      include: {
        subscription: true,
      },
    });

    let stripeCustomerId = await user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      //create new subscriber
      //we send product information into stripe
      const customer = await stripe.customers.create({
        email: user?.email,
        name: user?.name,
        //store extra informatio in metadata
        metadata: { userId: user.id },
      });

      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.stripe_product_price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.app_url}/premium?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: { userId: user.id },
    });

    return session.url;
  });

  return {
    //The url is stripe payment url
    paymentUrl: transactionResult,
  };
};
/*ekane kichu console e dekte chaile
  1.npm run dev ->terminal-1
  2.npm run stripe:webhook ->terminal-2
  3.payment http://localhost:5000/api/subscription/checkout
  4.get a payment url and payment
  5.check npm run dev console

*/
//save payment info in db
const hanldeWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret as string,
  );
  //we are working 3 event
  //Handle the event
  switch (event.type) {
    //checkout.session.completed stripe type
    case "checkout.session.completed":
      //optimized
      await handleCheckOutCompleted(event.data.object);
      break;

    case "customer.subscription.updated":
      break;

    //....my code....
    case "customer.subscription.deleted":

    // ... handle other event types
    default:
      console.log(`No event matched. Unhandled event type ${event.type}`);
      break;
  }
};

//date function for optimization

const getPerioadEnd = (payload: Stripe.Subscription) => {
  const currentPeriodEndInMilli = payload.items.data[0]?.current_period_end!;
  //millisecond convert actual  time
  const currentPeriodEnd = new Date(currentPeriodEndInMilli * 1000);

  //console.log(currentPeriodEnd , "current time ")
  return currentPeriodEnd;
};

const handleCheckOutCompleted = async (session: Stripe.Checkout.Session) => {
  //We are getting all payment information.
  //console.log(event.data.object);
  // const session: Stripe.Checkout.Session = event.data.object;
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const stripeSubscriptionId = session.subscription as string;
  if (!userId || !stripeSubscriptionId || !stripeCustomerId) {
    throw new Error("Webhook Failed");
  }
  //check subscription remaining days

  const stripeSubscription =
    await stripe.subscriptions.retrieve(stripeSubscriptionId);

  //console.log("Sub info", stripeSubscription.items.data[0])
  const currentPeriodEnd = getPerioadEnd(stripeSubscription);

  /**
   * upsert=> insert or updated .
   * If subscription exits,update it . otherwise, create a new subscription
   */
  await prisma.subscription.upsert({
    where: {
      id: userId,
    },
    create: {
      userId,
      stripeCustomerId,
      stripeSubscriptionId,
      status: "ACTIVE",
      currentPeriodEnd: currentPeriodEnd,
    },
    update: {
      stripeCustomerId,
      stripeSubscriptionId,
      status: "ACTIVE",
      currentPeriodEnd: currentPeriodEnd,
    },
  });
};

//after one year update subscription & delete
const handleChangeSubscription = (payload:Stripe.Subscription)=> {
  const stripeSubscriptionId = payload.id;
  const status = payload.status
}
export const subscriptionServices = {
  createCheckOutSession,
  hanldeWebhook,
};
