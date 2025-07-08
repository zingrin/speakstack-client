import React from "react";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router";

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    description = "",
    tags = [],
    authorImage,
    authorName,
    createdAt,
    upVote = 0,
    downVote = 0,
    commentCount = 0,
  } = post;

  const totalVotes = upVote - downVote;

  // Example share URL
  const shareUrl = `${window.location.origin}/post/${_id}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 text-black">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={authorImage}
          alt={`${authorName} avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-sm">{authorName}</h4>
          <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Title */}
      <Link to={`/post/${_id}`}>
        <h2 className="text-xl font-bold mb-2 text-primary hover:underline">
          {title}
        </h2>
      </Link>

      {/* Post Description Snippet */}
      <p className="text-gray-700 mb-4">{description.slice(0, 100)}...</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Vote, Comment, Share */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <FaArrowUp className="text-green-500 cursor-pointer" />
          <span>{upVote}</span>
          <FaArrowDown className="text-red-500 cursor-pointer" />
          <span>{downVote}</span>
          <span className="ml-2 font-semibold">Total: {totalVotes}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaCommentDots />
            <span>{commentCount} Comments</span>
          </div>

          <button
            onClick={() => navigator.share ? navigator.share({ url: shareUrl }) : alert("Share not supported")}
            aria-label="Share Post"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
