import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Comments = ({ postId, postTitle }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`https://speak-stack-server.vercel.app/comments/${postId}`);
      return res.data;
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await axios.post("https://speak-stack-server.vercel.app/comments", newComment);
      return res.data;
    },
    onSuccess: () => {
      setText("");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to post comment", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!user?.email) {
      return Swal.fire("Login Required", "Please log in to comment.", "warning");
    }

    const comment = {
      postId,
      user: user.email,
      commentText: text,
      createdAt: new Date(),
    };

    commentMutation.mutate(comment);
  };

  const handleReportComment = async (commentObj) => {
    if (!user?.email) {
      return Swal.fire("Login Required", "Please log in to report.", "warning");
    }

    const { value: reason } = await Swal.fire({
      title: "Report this comment",
      input: "textarea",
      inputLabel: "Reason for report",
      inputPlaceholder: "Type your reason here...",
      showCancelButton: true,
    });

    if (reason) {
      const reportData = {
        postId,
        postTitle,
        reporterEmail: user.email,
        comment: commentObj,
        feedback: reason,
        reportedAt: new Date(),
      };

      try {
        const res = await axios.post("https://speak-stack-server.vercel.app/reports", reportData);
        if (res.data.insertedId) {
          Swal.fire("Reported!", "Thanks for your feedback.", "success");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to report comment.", "error");
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      <form onSubmit={handleSubmit} className="flex flex-col mb-4">
        <textarea
          className="border rounded p-2 mb-2"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={commentMutation.isLoading}
          className={`bg-blue-600 text-white px-4 py-2 rounded w-fit ${
            commentMutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {commentMutation.isLoading ? "Posting..." : "Submit"}
        </button>
      </form>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="bg-gray-100 p-3 rounded relative shadow">
              <p className="text-sm text-gray-600 mb-1">{c.user}</p>
              <p>{c.commentText}</p>

              <button
                onClick={() => handleReportComment(c)}
                className="absolute top-2 right-2 text-red-600 text-xs hover:underline"
              >
                Report
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
