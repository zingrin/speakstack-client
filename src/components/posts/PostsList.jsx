import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CourseCard from "./CourseCard";

const PostList = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses/popular"); 
      return res.data;
    },
  });

  const handleCommentUpdate = async (id, updatedComment) => {
    try {
      await axiosSecure.patch(`/courses/comment/${id}`, { comment: updatedComment });
      refetch(); // update UI after comment edit
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading popular courses...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load courses</div>;

  return (
    <div className="py-10 px-4 md:px-10 bg-[#0f172a] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">🔥 Popular Courses</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onUpdateComment={handleCommentUpdate}
            />
          ))
        ) : (
          <p className="text-gray-300">No popular courses found.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
