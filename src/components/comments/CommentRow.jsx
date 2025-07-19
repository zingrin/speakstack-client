import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CommentRow = ({ comment }) => {
  const { _id, commenterEmail, comment: text, createdAt, feedback, reported } =
    comment;

  const [selectedFeedback, setSelectedFeedback] = useState(feedback || "Neutral");
  const [hasReported, setHasReported] = useState(reported);

  const [showFull, setShowFull] = useState(false);

  const handleReport = async () => {
    if (!selectedFeedback) {
      return Swal.fire("Select feedback before reporting", "", "warning");
    }

    try {
      await axios.patch(`/comments/${_id}/report`, {
        feedback: selectedFeedback,
      });
      setHasReported(true);
      Swal.fire("Reported!", "The comment has been reported.", "success");
    } catch (err) {
      console.error("Failed to report:", err);
      Swal.fire("Error", "Failed to report comment", "error");
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{commenterEmail}</span>
        <span className="text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</span>
      </div>

      <p className="text-gray-800">
        {text.length > 20 && !showFull ? (
          <>
            {text.slice(0, 20)}...
            <button
              className="text-blue-500 text-sm ml-2 underline"
              onClick={() => setShowFull(true)}
            >
              Read More
            </button>
          </>
        ) : (
          text
        )}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <select
          className="select select-sm select-bordered"
          value={selectedFeedback}
          onChange={(e) => setSelectedFeedback(e.target.value)}
          disabled={hasReported}
        >
          <option value="Helpful">Helpful</option>
          <option value="Neutral">Neutral</option>
          <option value="Offensive">Offensive</option>
        </select>

        <button
          onClick={handleReport}
          disabled={hasReported}
          className={`btn btn-sm ${hasReported ? "btn-disabled" : "btn-error"}`}
        >
          {hasReported ? "Reported" : "Report"}
        </button>
      </div>
    </div>
  );
};

export default CommentRow;
