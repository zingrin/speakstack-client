import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentRow from "./CommentRow";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CommentsPage = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const res = await axiosSecure.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
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
