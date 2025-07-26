import { Link } from "react-router";
import { FaArrowUp, FaArrowDown, FaRegComments } from "react-icons/fa";

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    authorImage,
    author,
    tags,
    upVote = 0,
    downVote = 0,
    createdAt,
    commentsCount = 0,
  } = post;

  const voteCount = upVote - downVote;
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-2xl mx-auto card bg-base-100 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-200 mb-6">
      <div className="card-body px-6 py-4">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={authorImage}
            alt="author"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="font-semibold text-sm text-gray-700">{author}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>

        {/* Title */}
        <Link to={`/post/${_id}`}>
          <h2 className="card-title text-lg hover:underline leading-snug">{title}</h2>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="badge badge-outline badge-sm hover:badge-info cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaArrowUp className="text-green-500" />
            <span>{upVote}</span>
            <FaArrowDown className="text-red-500" />
            <span>{downVote}</span>
            <span className="ml-2 font-semibold">Total: {voteCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaRegComments className="text-blue-500" />
            <span>{commentsCount} Comments</span>
          </div>
        </div>

        {/* Details Button */}
        <div className="mt-4 text-right">
          <Link to={`/post/${_id}`} className="btn btn-sm btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
