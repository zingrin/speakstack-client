import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContexts";

const SocialLogin = () => {
  const { googleLogin, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await googleLogin();
      Swal.fire("Success!", "Logged in with Google", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  const handleGithub = async () => {
    try {
      await githubLogin();
      Swal.fire("Success!", "Logged in with GitHub", "success");
      navigate("/");
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
