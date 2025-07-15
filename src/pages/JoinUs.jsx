import { useLocation, useNavigate } from "react-router";

const JoinUs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to SpeakStack</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => navigate("/login")}
            className={`py-2 px-6 rounded font-semibold ${
              location.pathname === "/login"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`py-2 px-6 rounded font-semibold ${
              location.pathname === "/register"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        <p className="text-gray-700">
          Please select an option above to continue.
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
