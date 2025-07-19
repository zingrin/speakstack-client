import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PopularCourses = () => {
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/courses/popular");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load courses</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Courses</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Instructor: {course.instructor}</p>
              <div className="flex justify-between text-sm mt-2">
                <span>⭐ {course.rating}</span>
                <span>👥 {course.enrolled} Enrolled</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
