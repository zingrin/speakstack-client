import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import LoadingSpinner from "../ui/LoadingSpinner";
import PostList from "./PostList";
const PostPages = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");
        const data = await response.json();
console.log("Fetched Posts:", data);
        // ✅ Adjust based on actual API shape:
        setPosts(data.posts || data); 
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recent Posts</h1>
        <Link to="/posts/new" className="btn btn-primary">
          Create Post
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
};

export default PostPages;
