import React, { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // TODO: API থেকে রিপোর্ট ডাটা আনবে
    setReports([
      {
        id: 1,
        postTitle: "How to start with React?",
        comment: "This is spam comment",
        reporterEmail: "user1@example.com",
        feedback: "Spam",
        resolved: false,
      },
      {
        id: 2,
        postTitle: "Firebase auth issues",
        comment: "Offensive language",
        reporterEmail: "user2@example.com",
        feedback: "Offensive",
        resolved: true,
      },
    ]);
  }, []);

  const handleResolve = (id) => {
    // TODO: API কল করে রিপোর্ট রিজলভড করে দেবে
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, resolved: true } : report
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Reported Comments/Activities</h3>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Comment</th>
                <th>Reporter Email</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(({ id, postTitle, comment, reporterEmail, feedback, resolved }) => (
                <tr key={id} className={resolved ? "bg-green-100" : ""}>
                  <td>{postTitle}</td>
                  <td>{comment.length > 20 ? comment.slice(0, 20) + "..." : comment}</td>
                  <td>{reporterEmail}</td>
                  <td>{feedback}</td>
                  <td>{resolved ? "Resolved" : "Pending"}</td>
                  <td>
                    {!resolved && (
                      <button
                        onClick={() => handleResolve(id)}
                        className="btn btn-sm btn-success"
                      >
                        Mark Resolved
                      </button>
                    )}
                    {resolved && <span className="text-green-600 font-semibold">Done</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
