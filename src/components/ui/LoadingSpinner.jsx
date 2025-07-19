import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-primary">
      <FaSpinner className="animate-spin text-5xl mb-4" />
      <p className="text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
