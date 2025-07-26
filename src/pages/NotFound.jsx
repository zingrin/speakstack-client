import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
     
      <h2 className="text-4xl font-bold text-red-600 mb-2">404 - Page Not Found</h2>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
