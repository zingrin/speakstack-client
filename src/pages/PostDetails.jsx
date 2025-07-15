import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FaUserCircle, FaComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const dummyPosts = [
  {
    _id: "1",
    title: "How to start with React?",
    content:
      "React is a JavaScript library for building user interfaces. It allows you to create reusable UI components...",
    author: {
      name: "Jerin",
      image: "https://i.ibb.co/3FfR4yL/user1.png",
    },
    tags: ["react", "beginner"],
    time: "2025-07-15T08:30:00Z",
    upVote: 10,
    downVote: 2,
    comments: 4,
  },
  {
    _id: "2",
    title: "Firebase auth issues",
    content:
      "When working with Firebase Authentication, sometimes you might encounter issues like token expiration...",
    author: {
      name: "Tonmoy",
      image: "https://i.ibb.co/3FfR4yL/user1.png",
    },
    tags: ["firebase", "auth"],
    time: "2025-07-14T10:00:00Z",
    upVote: 5,
    downVote: 1,
    comments: 2,
  },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // এখানে তুমি API call করতে পারো। এখন ডামি ডাটা থেকে খুঁজছি।
    const foundPost = dummyPosts.find((p) => p._id === postId);
    setPost(foundPost);
  }, [postId]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex items-center mb-4 space-x-4">
        {post.author.image ? (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-400" />
        )}
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500">{formatDate(post.time)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="badge badge-outline cursor-pointer"
          >
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
          <span>{post.comments} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
