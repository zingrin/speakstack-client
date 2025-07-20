import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts") // API endpoint
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <Link to={`/post/${post._id}`}>
                <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                  {post.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {post.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorImage || "https://i.ibb.co/M1vNYyd/avatar.png"}
                    alt="author"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{post.authorName}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>

              <div className="flex justify-between mt-3 text-gray-600 text-sm">
                <span>👍 {post.upVote || 0} | 👎 {post.downVote || 0}</span>
                <span>💬 {post.commentCount || 0} Comments</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
