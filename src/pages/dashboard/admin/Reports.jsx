import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosSecure.get("https://speak-stack-server.vercel.app/api/reports");
        setReports(res.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [axiosSecure]);

  const handleResolve = async (id) => {
    const confirm = await Swal.fire({
      title: "Resolve Report?",
      text: "Are you sure you want to mark this report as resolved?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/api/reports/${id}`, {
          resolved: true,
        });

        if (res.data.modifiedCount > 0) {
          setReports((prev) =>
            prev.map((report) =>
              report._id === id ? { ...report, resolved: true } : report
            )
          );
          Swal.fire("Success", "Report marked as resolved.", "success");
        }
      } catch (error) {
        console.error("Failed to resolve report:", error);
        Swal.fire("Error", "Failed to resolve report.", "error");
      }
    }
  };

  if (loading)
    return <div className="text-center my-10 text-lg">Loading reports...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-bold mb-4 text-center sm:text-left">🚩 Reported Comments</h3>

      {reports.length === 0 ? (
        <p className="text-center">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[700px]">
            <thead>
              <tr className="text-sm sm:text-base">
                <th>#</th>
                <th>Post Title</th>
                <th>Reporter Email</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={report._id}
                  className={`text-sm sm:text-base ${report.resolved ? "bg-green-50" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td>{report.postTitle || "N/A"}</td>
                  
                  <td className="break-all">{report.reporterEmail}</td>
                  <td className="max-w-[150px] truncate">{report.feedback}</td>
                  <td className="font-semibold">
                    {report.resolved ? (
                      <span className="text-green-600">Resolved</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td>
                    {!report.resolved ? (
                      <button
                        onClick={() => handleResolve(report._id)}
                        className="btn btn-xs btn-success whitespace-nowrap"
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold text-xs">✔ Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Read More Modal */}
      {selectedComment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedComment(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded p-6 w-11/12 sm:w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-bold mb-2">Full Comment</h4>
            <p className="text-gray-800 dark:text-gray-100 text-sm whitespace-pre-line">
              {selectedComment}
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedComment(null)}
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

export default Reports;
