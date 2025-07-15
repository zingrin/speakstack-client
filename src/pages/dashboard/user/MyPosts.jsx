import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/posts")
      .then((res) => {
        console.log("API Response:", res.data);
        setPosts(res.data.posts);
      })
      .catch((err) => console.error("Failed to fetch posts", err));
  }, [axiosSecure]);

  const handleDelete = async (id) => {
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
        await axiosSecure.delete(`/posts/${id}`);
        setPosts((prev) => prev.filter((post) => post._id !== id));
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire("Error", "Failed to delete the post.", "error");
      }
    }
  };

  const handleViewComments = (id) => {
    navigate(`/comments/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Votes</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(({ _id, title, upVote = 0, downVote = 0, commentsCount = 0 }) => (
                <tr key={_id}>
                  <td>{title}</td>
                  <td>{upVote - downVote}</td>
                  <td>{commentsCount}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleViewComments(_id)}
                      className="btn btn-sm btn-info"
                    >
                      Comments
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
