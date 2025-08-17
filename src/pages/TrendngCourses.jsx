import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/trending-courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="my-12 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
        🎯 Trending Courses with Discount!
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover group-hover:scale-105 duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-green-600 font-bold mt-1">🔥 {course.discount}</p>
              <p className="text-gray-700 font-semibold mt-1">Price: ${course.price}</p>
              <button
                onClick={() => navigate(`/trending/${course._id}`)}
                className="mt-4 btn btn-sm btn-primary rounded-full"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCourses;
