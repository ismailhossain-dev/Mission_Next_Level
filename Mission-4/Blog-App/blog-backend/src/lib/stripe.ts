import Stripe from "stripe"
import config from "../config"
//Stripe is a class that's way call stripe
export const stripe = new Stripe(config.stripe_secret_key)

//7 minutes complete 