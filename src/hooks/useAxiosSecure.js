import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://speak-stack-server.vercel.app", 
  withCredentials: false, 
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
