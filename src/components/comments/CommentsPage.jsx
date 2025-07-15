import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CommentRow from "./CommentRow";

const CommentsPage = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axiosSecure.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }
    fetchComments();
  }, [postId, axiosSecure]);

  return (
    <div>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <CommentRow key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsPage;
