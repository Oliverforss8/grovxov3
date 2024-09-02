// /utils/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_live_51Pqa7RP0CcxODE1R32Hmmzvu1jyUiloirH6eWBSwG8lmzsL1dl8pF16r0sh8XFYzejvqgXGfj0ySHsFHQOSC8AJ100dd8NtaQd"
); // Replace with your actual Stripe publishable key
