import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import Comments from "../components/comments/Comments";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleVote = (type) => {
    fetch(`http://localhost:5000/posts/vote/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }), // 'upVote' or 'downVote'
    })
      .then((res) => res.json())
      .then((data) => setPost(data));
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  const shareUrl = `${window.location.origin}/post/${post._id}`;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <IoArrowBackSharp /> Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4 mb-4">
          <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-bold">{post.author}</h3>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-60 object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">#{tag}</span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-6">
          <button
            className="flex items-center gap-2 text-green-600"
            onClick={() => handleVote("upVote")}
          >
            <FaThumbsUp /> {post.upVote}
          </button>

          <button
            className="flex items-center gap-2 text-red-600"
            onClick={() => handleVote("downVote")}
          >
            <FaThumbsDown /> {post.downVote}
          </button>

          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>

      <Comments postId={post._id} />
    </div>
  );
};

export default PostDetails;
