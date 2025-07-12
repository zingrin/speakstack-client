import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import PostCard from "../components/PostCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortPopular, setSortPopular] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const axiosSecure = useAxiosSecure();
  const limit = 5;

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = `?page=${page}&limit=${limit}&sort=${sortPopular}&tag=${searchTerm}`;
      const { data } = await axiosSecure.get(`/posts${query}`);
      setPosts(data.posts);
      setHasMore(data.posts.length === limit);
    } catch (err) {
      console.error("Failed to load posts", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts whenever filter or page changes
  useEffect(() => {
    fetchPosts();
  }, [page, searchTerm, sortPopular]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortPopular]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Banner onSearch={setSearchTerm} />

      <div className="text-right mb-4">
        <button
          className="btn btn-outline"
          onClick={() => setSortPopular(!sortPopular)}
          aria-label="Toggle sort order"
        >
          {sortPopular ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 text-center space-x-2">
        <button
          className="btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
