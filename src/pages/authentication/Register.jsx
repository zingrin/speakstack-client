import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import SocialLogin from "./SocialLogin";
import AuthContext from "../../contexts/AuthContexts";
import { Link } from "react-router";

const Register = () => {
  const { registerWithEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerWithEmail(data.email, data.password, data.name);
    } catch (err) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            {...register("name", { required: "Name required" })}
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <label className="block text-sm mt-1 text-gray-600">Name</label>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email", { required: "Email required" })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <label className="block text-sm mt-1 text-gray-600">Email</label>
        </div>

        {/* Password */}
        <div>
          <input
            {...register("password", { required: "Password required" })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <label className="block text-sm mt-1 text-gray-600">Password</label>
        </div>

        {/* Confirm Password */}
        <div>
          <input
            {...register("confirmPassword", { required: "Confirm password required" })}
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
          <label className="block text-sm mt-1 text-gray-600">Confirm Password</label>
        </div>

        {error && <p className="text-error text-sm">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <div className="divider">OR</div>

      <SocialLogin />

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
