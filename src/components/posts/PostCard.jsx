import { Link } from "react-router";
import VoteButtons from "./VoteButtons";

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    authorImage,
    authorName,
    tags,
    upVote,
    downVote,
    createdAt,
    commentsCount,
    contentPreview
  } = post;

  return (
    <div className="card bg-base-100 shadow hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="card-body">
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-2">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={authorImage || "https://i.ibb.co/3FfR4yL/user1.png"} alt={authorName} />
            </div>
          </div>
          <span className="font-medium text-sm">{authorName}</span>
        </div>

        {/* Content */}
        <Link to={`/post/${_id}`} className="hover:no-underline">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">{contentPreview}</p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-outline badge-sm">#{tag}</span>
          ))}
          {tags.length > 3 && (
            <span className="badge badge-ghost badge-sm">+{tags.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center">
          <VoteButtons postId={_id} initialUpvotes={upVote} initialDownvotes={downVote} compact />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              <i className="fas fa-comment mr-1"></i> {commentsCount}
            </span>
            <Link to={`/post/${_id}`} className="btn btn-xs btn-ghost">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;