"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../app/utils/stripe"; // Import your stripe configuration

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
