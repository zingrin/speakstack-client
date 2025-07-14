import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const feedbackOptions = [
  "Spam or irrelevant",
  "Offensive content",
  "False or misleading",
];

const PostComments = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reportState, setReportState] = useState({});

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}`);
      return res.data;
    },
  });

  const handleReport = async (commentId) => {
    const selectedFeedback = reportState[commentId]?.feedback;
    if (!selectedFeedback) return;

    try {
      await axiosSecure.post("/report", {
        commentId,
        postId,
        reporterEmail: user?.email,
        feedback: selectedFeedback,
      });

      setReportState((prev) => ({
        ...prev,
        [commentId]: { ...prev[commentId], reported: true },
      }));

      Swal.fire("Reported!", "Comment has been reported.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to report comment.", "error");
    }
  };

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Comments for this post</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => {
              const isLong = comment.text.length > 20;
              const shortText = isLong ? comment.text.slice(0, 20) + "..." : comment.text;

              return (
                <tr key={comment._id}>
                  <td>{comment.authorEmail}</td>
                  <td>
                    {shortText}
                    {isLong && (
                      <button
                        className="text-blue-600 ml-2"
                        onClick={() =>
                          Swal.fire({
                            title: "Full Comment",
                            text: comment.text,
                            confirmButtonText: "Close",
                          })
                        }
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={reportState[comment._id]?.feedback || ""}
                      onChange={(e) =>
                        setReportState((prev) => ({
                          ...prev,
                          [comment._id]: {
                            ...prev[comment._id],
                            feedback: e.target.value,
                          },
                        }))
                      }
                      disabled={reportState[comment._id]?.reported}
                    >
                      <option value="">Select feedback</option>
                      {feedbackOptions.map((fb, i) => (
                        <option key={i} value={fb}>
                          {fb}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      disabled={
                        !reportState[comment._id]?.feedback ||
                        reportState[comment._id]?.reported
                      }
                      onClick={() => handleReport(comment._id)}
                    >
                      {reportState[comment._id]?.reported ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostComments;
