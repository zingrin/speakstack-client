import React from "react";
import { useParams, useNavigate } from "react-router"; 
import trendingCourses from "../data/trendingCourses";

const TrendingCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = trendingCourses.find((c) => c.id === parseInt(id));

  if (!course) return <p>Course not found!</p>;

  return (
    <div className="px-4 md:px-20 py-10">
      <button onClick={() => navigate(-1)} className="btn btn-sm btn-secondary mb-6">
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={course?.image} alt={course?.title} className="w-full md:w-1/2 h-auto rounded-xl shadow-lg" />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{course?.title}</h2>
          <p className="text-green-600 font-bold mb-2">{course?.discount}</p>
          <p className="text-gray-700 font-semibold mb-4">Price: ${course?.price}</p>
          <p className="text-gray-600">{course?.description}</p>
          <button className="mt-6 btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default TrendingCourseDetail;
