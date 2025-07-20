import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Comments = ({ postId }) => {
  const {user} = useAuth();
  const [text, setText] = useState("");

  const {
    data: comments = [],
    isLoading,
    refetch, 
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/comments/${postId}`);
      return res.data;
    },
  });

  const { mutate: postComment, isLoading: isPosting } = useMutation({
    mutationFn: async (newComment) => {
      const res = await axios.post("http://localhost:5000/comments", newComment);
      return res.data;
    },
    onSuccess: async () => {
      await refetch(); 
      setText("");
      Swal.fire({
        icon: "success",
        title: "Comment Posted!",
        text: "Your comment has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not post your comment. Please try again.",
      });
    },
  });

  const handleComment = () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Comment",
        text: "Please write something before commenting.",
      });
      return;
    }

    const comment = {
      postId,
      user: user?.email || "anonymous",
      text,
      createdAt: new Date().toISOString(),
    };

    postComment(comment);
  };
console.log(comments);
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows="3"
        placeholder="Write your comment..."
        disabled={isPosting}
      />
      <button onClick={handleComment} className="btn btn-primary" disabled={isPosting}>
        {isPosting ? "Posting..." : "Comment"}
      </button>

      {isLoading ? (
        <p className="mt-4 text-gray-500">Loading comments...</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-600">{c.user}</p>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
