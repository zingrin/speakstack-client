import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CommentList = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reportedComments, setReportedComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}`);
      return res.data;
    },
  });

  const feedbackOptions = [
    "Inappropriate language",
    "Irrelevant comment",
    "Harassment or spam",
  ];

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({ ...prev, [commentId]: feedback }));
  };

  const handleReport = async (comment) => {
    try {
      await axiosSecure.post("/api/reports", {
        commentId: comment._id,
        postId,
        Email: comment.user, 
        feedback: selectedFeedback[comment._id],
        text: comment.commentText,
      });

      setReportedComments((prev) => [...prev, comment._id]);
      Swal.fire("Reported!", "The comment has been reported.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to report the comment.", "error");
    }
  };

  const openModal = (text) => {
    setModalContent(text);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent("");
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p>No comments found for this post.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>Email</th>
                <th>Comment</th>
                <th>Feedback</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => {
                const isReported = reportedComments.includes(comment._id);
                const feedbackSelected = selectedFeedback[comment._id];
                const shortText =
                  comment.commentText.length > 20
                    ? `${comment.commentText.slice(0, 20)}... `
                    : comment.commentText;

                return (
                  <tr key={comment._id}>
                    <td>{comment.user}</td>
                    <td>
                      {comment.commentText.length > 20 ? (
                        <>
                          {shortText}
                          <button
                            onClick={() => openModal(comment.commentText)}
                            className="link text-blue-600 hover:underline"
                          >
                            Read More
                          </button>
                        </>
                      ) : (
                        comment.commentText
                      )}
                    </td>
                    <td>
                      <select
                        className="select select-sm select-bordered"
                        value={feedbackSelected || ""}
                        onChange={(e) =>
                          handleFeedbackChange(comment._id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Feedback
                        </option>
                        {feedbackOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-error text-white"
                        disabled={!feedbackSelected || isReported}
                        onClick={() => handleReport(comment)}
                      >
                        {isReported ? "Reported" : "Report"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for full comment */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Full Comment</h3>
            <p className="mb-4">{modalContent}</p>
            <button className="btn btn-sm btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
