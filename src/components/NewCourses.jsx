import { useState, useEffect } from "react";
import CourseCard from "./posts/CourseCard";

const NewCourses = ({ allCourses }) => {
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Show first 6 by default
    const initial = allCourses.slice(0, 6);
    setVisibleCourses(initial);
  }, [allCourses]);

  const handleShowAll = () => {
    setVisibleCourses(allCourses); // show all 8
    setShowAll(true);
  };

  const handleUpdateComment = (id, updatedComment) => {
    const updated = visibleCourses.map((course) =>
      course._id === id ? { ...course, comment: updatedComment } : course
    );
    setVisibleCourses(updated);
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">📚 New Courses</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {visibleCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onUpdateComment={handleUpdateComment}
          />
        ))}
      </div>

      {!showAll && allCourses.length > 6 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowAll}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Show All Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCourses;
