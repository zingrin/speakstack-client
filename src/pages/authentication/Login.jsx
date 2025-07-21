import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import AuthContext from "../../contexts/AuthContexts";

const Login = () => {
  const { loginWithEmail } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      await loginWithEmail(data.email, data.password);
      // Redirect or success handled outside this component
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {error && <p className="text-error text-sm">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

<SocialLogin from={location.state?.from?.pathname || "/"} />

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-gray-700">
        Don&apos;t have an account?
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
