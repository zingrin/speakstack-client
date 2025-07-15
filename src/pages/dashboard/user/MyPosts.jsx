import React, { useState, useEffect } from "react";

const MyPosts = () => {
  // ফেক পোস্ট ডাটা (পরে API থেকে আনবে)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // এখানে API কল করে ইউজারের পোস্ট আনবে
    // উদাহরণ সরুপ:
    setPosts([
      {
        id: "1",
        title: "How to start with React?",
        upVote: 10,
        downVote: 2,
        commentsCount: 4,
      },
      {
        id: "2",
        title: "Firebase auth issues",
        upVote: 5,
        downVote: 1,
        commentsCount: 2,
      },
    ]);
  }, []);

  const handleDelete = (id) => {
    // TODO: API কল করে পোস্ট ডিলিট করো
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  const handleViewComments = (id) => {
    // TODO: রিডাইরেক্ট করো /comments/{postId} পেজে
    window.location.href = `/comments/${id}`;
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
              {posts.map(({ id, title, upVote, downVote, commentsCount }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{upVote - downVote}</td>
                  <td>{commentsCount}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleViewComments(id)}
                      className="btn btn-sm btn-info"
                    >
                      Comments
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
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
