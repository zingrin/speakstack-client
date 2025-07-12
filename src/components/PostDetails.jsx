import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FacebookShareButton } from "react-share";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data: post = {}, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  const shareUrl = `${window.location.origin}/post/${id}`;

  const upvoteMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/posts/${id}/upvote`),
    onSuccess: () => queryClient.invalidateQueries(["post", id])
  });

  const downvoteMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/posts/${id}/downvote`),
    onSuccess: () => queryClient.invalidateQueries(["post", id])
  });

  const commentMutation = useMutation({
    mutationFn: () => axiosSecure.post(`/posts/${id}/comments`, {
      commenter: { name: user?.displayName, email: user?.email },
      comment,
      time: new Date().toLocaleString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
      setComment("");
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <img src={post?.author?.image} alt="Author" className="w-10 h-10 rounded-full" />
          <span className="font-semibold">{post?.author?.name}</span>
        </div>

        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">{post.description}</p>
        <p className="text-sm text-blue-500 mb-2">#{post.tag}</p>
        <p className="text-sm text-gray-500 mb-4">Posted on: {post.time}</p>

        <div className="flex gap-4 items-center mb-4">
          <button onClick={() => user && upvoteMutation.mutate()} disabled={!user}>
            👍 {post.upvote}
          </button>
          <button onClick={() => user && downvoteMutation.mutate()} disabled={!user}>
            👎 {post.downvote}
          </button>
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <hr className="my-4" />

        {/* Comments */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {user ? (
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded mb-2"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => commentMutation.mutate()}
              >
                Comment
              </button>
            </div>
          ) : (
            <p className="text-sm text-red-500 mb-4">Please log in to comment.</p>
          )}

          <div className="space-y-3">
            {post?.comments?.map((cmt, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p className="text-sm font-medium">{cmt.commenter.name}</p>
                <p className="text-gray-600">{cmt.comment}</p>
                <p className="text-xs text-gray-400">{cmt.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
