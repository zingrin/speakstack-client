import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/posts?email=${user.email}`)
        .then((res) => {
          setPosts(Array.isArray(res.data) ? res.data : []);
        })
        .catch((err) => {
          console.error("Failed to fetch posts", err);
        });
    }
  }, [axiosSecure, user]);

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/posts/${postId}`);
        if (res.data.deletedCount > 0) {
          setPosts((prev) => prev.filter((post) => post._id !== postId));
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        }
      } catch (err) {
        console.error("Failed to delete post", err);
        Swal.fire("Error", "Failed to delete the post.", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Posts ({posts.length})</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">You have not created any posts yet.</p>
      ) : (
        <table className="table w-full border">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>Title</th>
              <th>Votes</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                <td>
                  <Link
                    to={`/comments/${post._id}`}
                    className="btn btn-xs btn-info text-white"
                  >
                    View Comments
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPosts;
