import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./ui/LoadingSpinner";

const AllPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/posts");
        const postData = res.data.posts || [];

        // Sort by newest first
        const sorted = postData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sorted);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />; 

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default AllPosts;
