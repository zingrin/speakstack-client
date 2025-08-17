import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./home/Pagination";

const POSTS_PER_PAGE = 6;

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://speak-stack-server.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => {
        // নতুন পোস্ট আগে দেখানোর জন্য sort
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
        setFilteredPosts(sorted);
      })
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4 text-center">All Posts</h2>
      <p className="text-center text-gray-600 text-xl mb-4">
        ✨ A hub of stories, ideas, and inspirations — explore the details that
        matter most.
      </p>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  );
};

export default AllPosts;
