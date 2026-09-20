import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoute } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { subscriptionRoute } from "./modules/subscription/subscription.route";
import { premiumRoutes } from "./modules/premium/premium.route";
const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    //it will be work in cokkie
    credentials: true,
  }),
);
//Webhooks use for store payment data
// const endpointSecret = config.stripe_webhook_secret;

// app.post(
//   "/api/subscription/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     //all code copy from stripe/webhook
//     let event = request.body;
//     console.log(event, "stripe request body");
//     console.log(request.headers, "stripe req headers");
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers["stripe-signature"]!;
//       try {
//         //converting event buffer to a valid object
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret,
//         );
//       } catch (err: any) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return response.status(400).json({
//           message: err.message,
//         });
//       }
//     }

//     console.log(event, "event after try block");

//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntent = event.data.object;
//         console.log(
//           `PaymentIntent for ${paymentIntent.amount} was successful!`,
//         );
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       case "payment_method.attached":
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   },
// );

//..The webhook should be placed before expres.json()
//don't need subscriptionRoute it automatic wil be go subscriptionRoute
app.use("/api/subscription/webhook",express.raw({ type: "application/json" }))

app.use(express.json());
//This middleware keeps client data in req.body.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/premium", premiumRoutes)

//If api is not found then give me globall error
app.use(notFound);

app.use(globalErrorHandler);
export default app;
