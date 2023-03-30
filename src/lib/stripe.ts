import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "ignite shop",
  },
});
