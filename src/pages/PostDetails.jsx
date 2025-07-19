import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaComments,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CommentsPage from "../components/comments/CommentsPage";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (postId) {
      axiosSecure
        .get(`/posts/${postId}`)
        .then((res) => {
          if (res.data) {
            setPost(res.data);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Not Found",
              text: "This post does not exist.",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch post:", err);
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong while fetching the post.",
          });
        });
    }
  }, [postId, axiosSecure]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex items-center mb-4 space-x-4">
        {post.author?.image ? (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-400" />
        )}
        <div>
          <p className="font-semibold">{post.author?.name}</p>
          <p className="text-sm text-gray-500">{formatDate(post.time)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span key={tag} className="badge badge-outline cursor-pointer">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-6 text-gray-600">
        <div className="flex items-center space-x-1">
          <FaThumbsUp />
          <span>{post.upVote}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaThumbsDown />
          <span>{post.downVote}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaComments />
          <span>{post.commentsCount || 0} Comments</span>
        </div>
      </div>

      {/* 🔽 Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentsPage postId={postId} />
      </div>
    </div>
  );
};

export default PostDetails;
