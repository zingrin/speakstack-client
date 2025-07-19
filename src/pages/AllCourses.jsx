import React from "react";
import CourseCard from "../components/posts/CourseCard";
import useCourses from "../hooks/useCourses";

const AllCourses = () => {
  const { data: courses = [] } = useCourses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default AllCourses;
