import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "./home/Pagination";
import TagFilter from "./TagFilter";

const POSTS_PER_PAGE = 6;

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  // Handle filtered posts
  const handleFilterChange = ({ posts: filtered }) => {
    setPosts(filtered);
    setPage(1);
  };

  useEffect(() => {
    fetch("https://speak-stack-server.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      })
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4">
        <TagFilter onChange={handleFilterChange} />
      </div>
      {paginatedPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

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
