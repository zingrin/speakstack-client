import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/comments/${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [postId]);

  const handleComment = () => {
    if (!text.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Comment",
        text: "Please write something before commenting.",
      });
      return;
    }

    fetch(`http://localhost:5000/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, text, user: "user@example.com" }), // update user info as needed
    })
      .then((res) => res.json())
      .then((newComment) => {
        setComments([...comments, newComment]);
        setText("");
        Swal.fire({
          icon: "success",
          title: "Comment Posted!",
          text: "Your comment has been added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Could not post the comment. Please try again.",
        });
      });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows="3"
        placeholder="Write your comment..."
      ></textarea>
      <button onClick={handleComment} className="btn btn-primary">Comment</button>

      <ul className="mt-4 space-y-3">
        {comments.map((c, i) => (
          <li key={i} className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-600">{c.user}</p>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
