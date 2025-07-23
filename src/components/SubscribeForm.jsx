import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../src/hooks/useAuth";
import useStripePayment from "../../src/hooks/useStripePayment";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SubscribeForm = ({ price = 999 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { clientSecret, loading } = useStripePayment(price);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Payment Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      receipt_email: user?.email,
    });

    if (confirmError) {
      Swal.fire("Payment Failed", confirmError.message, "error");
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentData = {
        email: user?.email,
        price,
        transactionId: paymentIntent.id,
        date: new Date(),
        membership: "Gold",
      };

      try {
        await axiosSecure.post("/api/payments", paymentData);
        await axiosSecure.patch(`/api/users/membership/${user.email}`, {
          membership: "Gold",
        });

        Swal.fire("Success", "You're now a Gold Member!", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update membership.", "error");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2 text-center">Gold Membership</h2>
      <p className="text-center mb-4">Pay ৳{price} to unlock unlimited posting and Gold Badge</p>

      <CardElement className="border p-2 rounded" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-4 w-full"
      >
        {processing ? "Processing..." : `Pay ৳${price}`}
      </button>

      {transactionId && (
        <p className="mt-3 text-green-600 text-center">
          ✅ Transaction ID: <br /> <span className="font-mono">{transactionId}</span>
        </p>
      )}
    </form>
  );
};

export default SubscribeForm;
