import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/router";
import AuthProvider from "./components/auth/AuthProvider";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { stripePromise } from "./stripe";
import { Elements } from "@stripe/react-stripe-js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
