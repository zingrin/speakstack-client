import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const shareUrl = `${window.location.origin}/post/${id}`;

  const { data: post = {} } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data;
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (type) => {
      await axiosSecure.patch(`/posts/vote/${id}`, { type });
    },
    onSuccess: () => queryClient.invalidateQueries(["post", id]),
  });

  const handleComment = async () => {
    if (!user || !commentText.trim()) return;

    const newComment = {
      postId: id,
      postTitle: post.title,
      userEmail: user.email,
      userImage: user.photoURL,
      text: commentText,
      createdAt: new Date(),
    };

    await axiosSecure.post("/comments", newComment);
    setCommentText("");
    refetchComments();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="border p-4 rounded shadow bg-white">
        <div className="flex items-center gap-2 mb-2">
          <img src={post.authorImage} className="w-10 h-10 rounded-full" />
          <span className="font-semibold">{post.authorName}</span>
        </div>

        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="my-4">{post.description}</p>
        <div className="flex gap-2 text-sm mb-4">
          {post.tags?.map((tag, i) => (
            <span key={i} className="bg-gray-200 rounded px-2 py-1">#{tag}</span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Posted: {new Date(post.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-4 items-center text-sm">
          <span>⬆️ {post.upVote || 0} Upvotes</span>
          <span>⬇️ {post.downVote || 0} Downvotes</span>

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
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">💬 Comments</h3>

        {user ? (
          <div className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Write your comment..."
            ></textarea>
            <button
              onClick={handleComment}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Login to comment.</p>
        )}

        <div className="space-y-4 mt-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-3 rounded">
              <div className="flex items-center gap-2 mb-1">
                <img src={comment.userImage} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-semibold">{comment.userEmail}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
