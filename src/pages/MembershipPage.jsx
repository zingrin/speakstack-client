import React from "react";
import SubscribeForm from "../components/SubscribeForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";

const MembershipPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-4">
        Become a Gold Member 🏅
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Get unlimited post access and a Gold badge by paying only ৳999
      </p>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <SubscribeForm />
        </Elements>
      </div>
    </div>
  );
};

export default MembershipPage;
