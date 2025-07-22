import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useStripePayment = (price) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/api/create-payment-intent", { amount: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch client secret", err);
          setLoading(false);
        });
    }
  }, [price, axiosSecure]);

  return { clientSecret, loading };
};

export default useStripePayment;
