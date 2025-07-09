import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        const postRes = await axiosSecure.get(`/posts/${postId}`);
        setPost(postRes.data);

        const commentsRes = await axiosSecure.get(`/comments?postId=${postId}`);
        setComments(commentsRes.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load post or comments",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId, axiosSecure]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Comment",
        text: "Comment cannot be empty",
      });
      return;
    }
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "You must be logged in to comment",
      });
      return;
    }

    const commentData = {
      postId,
      authorId: user.uid,
      authorName: user.displayName || user.email,
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/comments", commentData);
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
      Swal.fire({
        icon: "success",
        title: "Comment Added",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add comment",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-6">{post.content}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Comments</h2>

        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Add Comment
          </button>
        </form>

        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border rounded p-3 mb-3 bg-gray-50"
            >
              <p className="font-semibold">{comment.authorName}</p>
              <p className="text-sm text-gray-600">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">{comment.text}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PostDetails;
