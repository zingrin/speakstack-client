import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { FaThumbsUp, FaThumbsDown, FaFlag } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import Comments from "../components/comments/Comments";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  // Fetch post details
  useEffect(() => {
    fetch(`https://speak-stack-server.vercel.app/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  // Vote handler
  const handleVote = (type) => {
    fetch(`https://speak-stack-server.vercel.app/posts/vote/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then((res) => res.json())
      .then((data) => setPost(data));
  };

  // Report handler
  const handleReport = async () => {
    const { value: reason } = await Swal.fire({
      title: "Report this post",
      input: "textarea",
      inputLabel: "Reason for report",
      inputPlaceholder: "Type your reason here...",
      inputAttributes: { "aria-label": "Reason" },
      showCancelButton: true,
    });

    if (reason) {
      const reportData = {
        postId: post._id,
        postTitle: post.title,
        reporterEmail: user?.email,
        comment: "", 
        feedback: reason,
        reportedAt: new Date(),
      };

      fetch("https://speak-stack-server.vercel.app/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire("Reported!", "Thanks for your feedback.", "success");
          } else {
            Swal.fire("Error", "Something went wrong", "error");
          }
        });
    }
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  const shareUrl = `${window.location.origin}/post/${post._id}`;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <IoArrowBackSharp /> Back
      </button>

      {/* Post Content */}
      <div className="bg-white p-6 rounded-xl shadow">
        {/* Author */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-bold">{post.author}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-60 object-cover rounded-md mb-4"
        />

        {/* Title & Content */}
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>

        {/* Vote, Share, Report */}
        <div className="mt-6 flex items-center gap-6 flex-wrap">
          <button
            onClick={() => handleVote("upVote")}
            className="flex items-center gap-2 text-green-600 hover:underline"
          >
            <FaThumbsUp /> {post.upVote}
          </button>

          <button
            onClick={() => handleVote("downVote")}
            className="flex items-center gap-2 text-red-600 hover:underline"
          >
            <FaThumbsDown /> {post.downVote}
          </button>

          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          {/* Report */}
          <button
            onClick={handleReport}
            className="flex items-center gap-2 text-red-500 hover:underline"
            title="Report Post"
          >
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <Comments postId={post._id} postTitle={post.title} />

    </div>
  );
};

export default PostDetails;
