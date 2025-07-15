import { useState } from "react";
import Swal from "sweetalert2";

const CommentRow = ({ comment }) => {
  const [feedback, setFeedback] = useState("");
  const [reported, setReported] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleReport = () => {
    if (!feedback) return;

    // এখানে API call হবে
    Swal.fire({
      icon: "success",
      title: "Reported",
      text: "Comment has been reported successfully!",
    });

    setReported(true);
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow mb-3">
      <p className="font-medium text-sm text-primary">
        {comment.authorEmail}
      </p>

      {/* Truncated comment */}
      <p className="mt-1 text-gray-700">
        {comment.text.length > 20
          ? (
            <>
              {comment.text.slice(0, 20)}...
              <span
                onClick={() => setShowModal(true)}
                className="text-blue-500 ml-1 cursor-pointer underline"
              >
                Read More
              </span>
            </>
          )
          : comment.text}
      </p>

      {/* Feedback dropdown */}
      <select
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="select select-bordered mt-2 w-full max-w-xs"
        disabled={reported}
      >
        <option value="">Select feedback</option>
        <option value="Spam">Spam</option>
        <option value="Offensive">Offensive</option>
        <option value="Irrelevant">Irrelevant</option>
      </select>

      {/* Report Button */}
      <button
        onClick={handleReport}
        disabled={!feedback || reported}
        className="btn btn-error btn-sm mt-2 ml-2"
      >
        {reported ? "Reported" : "Report"}
      </button>

      {/* Read More Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">Full Comment</h2>
            <p className="text-gray-800">{comment.text}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentRow;
