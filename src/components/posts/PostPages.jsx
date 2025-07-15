import { useEffect, useState } from "react";
import PostList from "./PostList";
import LoadingSpinner from "./LoadingSpinner";

const PostPages = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;
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