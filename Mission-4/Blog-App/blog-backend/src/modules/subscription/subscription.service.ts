import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

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

    const session =  await stripe.checkout.sessions.create({
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

export const subscriptionServices = {
  createCheckOutSession,
};
