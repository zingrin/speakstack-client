import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCommentCount from "./useCommentCount";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const commentCount = useCommentCount(post.title);
  const totalVotes = (post.upVote || 0) - (post.downVote || 0);
  const shareUrl = `${window.location.origin}/post/${post._id}`;

  const voteMutation = useMutation({
    mutationFn: async (type) => {
      await axiosSecure.patch(`/posts/vote/${post._id}`, { type });
    },
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  return (
    <div className="border rounded p-4 shadow bg-white">
      <div className="flex items-center gap-3 mb-2">
        <img src={post.authorImage} alt="Author" className="w-10 h-10 rounded-full" />
        <span className="font-semibold">{post.authorName}</span>
      </div>

      <Link to={`/post/${post._id}`}>
        <h3 className="text-xl font-bold hover:text-blue-600">{post.title}</h3>
      </Link>

      <div className="flex gap-2 mt-2 mb-1 text-sm">
        {post.tags?.map((tag, i) => (
          <span key={i} className="bg-gray-200 px-2 py-1 rounded">#{tag}</span>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-2">
        Posted: {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="flex flex-wrap gap-4 items-center mt-2 text-sm">
        <span>🗨️ Comments: {commentCount}</span>
        <span>⬆️ Upvotes: {post.upVote || 0}</span>
        <span>⬇️ Downvotes: {post.downVote || 0}</span>
        <span>🔥 Score: {totalVotes}</span>

        {user && (
          <>
            <button
              onClick={() => voteMutation.mutate("upvote")}
              className="text-green-600 hover:underline"
            >
              👍 Upvote
            </button>
            <button
              onClick={() => voteMutation.mutate("downvote")}
              className="text-red-600 hover:underline"
            >
              👎 Downvote
            </button>
          </>
        )}

        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={28} round />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default PostCard;
