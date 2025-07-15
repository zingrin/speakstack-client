import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // ✅ Replace with your deployed URL later
  withCredentials: false, // since you're not using cookie-based auth either
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
