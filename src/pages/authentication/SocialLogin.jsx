import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContexts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = ({ from }) => {
  const { googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  from = from || location.state?.from?.pathname || "/";

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
      };

      await axiosSecure.patch("/api/users", userInfo);

      Swal.fire("Success!", `Welcome, ${user.displayName || "User"}!`, "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  const handleGithub = async () => {
    try {
      const result = await githubLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
      };

      await axiosSecure.patch("/api/users", userInfo);

      Swal.fire("Success!", `Welcome, ${user.displayName || "User"}!`, "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "GitHub login failed", "error");
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <button onClick={handleGoogle} className="btn btn-outline w-full">
        <FaGoogle className="mr-2" /> Continue with Google
      </button>
      <button onClick={handleGithub} className="btn btn-outline w-full">
        <FaGithub className="mr-2" /> Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
