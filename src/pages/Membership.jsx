import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContexts";
import { useNavigate } from "react-router";

const Membership = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dummy price & payment simulation
  const membershipCost = 50; // $50 or whatever currency

  const handlePayment = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      setSuccess("Congratulations! You are now a member and have the Gold badge.");
      // TODO: Call backend API to update membership status for user
    }, 2000);
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to access membership page.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Become a Member</h2>
      <p className="mb-4">
        Join SpeakStack membership for <span className="font-semibold">${membershipCost}</span> to unlock Gold badge and post more than 5 posts.
      </p>

      {error && <p className="text-error mb-4">{error}</p>}
      {success && <p className="text-success mb-4">{success}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
      >
        {loading ? "Processing Payment..." : `Pay $${membershipCost}`}
      </button>
    </div>
  );
};

export default Membership;
