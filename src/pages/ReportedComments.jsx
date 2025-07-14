import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/report/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reportedComments"]);
      Swal.fire("Updated", "Report status updated", "success");
    },
  });

  const deleteComment = async (commentId) => {
    try {
      await axiosSecure.delete(`/comments/${commentId}`);
      Swal.fire("Deleted", "Comment removed successfully", "success");
      queryClient.invalidateQueries(["reportedComments"]);
    } catch {
      Swal.fire("Error", "Failed to delete comment", "error");
    }
  };

  if (isLoading) return <p>Loading reports...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Reporter</th>
            <th>Feedback</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td>{r.reporterEmail}</td>
              <td>{r.feedback}</td>
              <td>
                <button
                  className="text-blue-600 underline"
                  onClick={() =>
                    Swal.fire("Comment", r.commentText, "info")
                  }
                >
                  View Comment
                </button>
              </td>
              <td>
                <span className="badge badge-info">{r.status}</span>
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => resolveMutation.mutate({ id: r._id, status: "resolved" })}
                >
                  Resolve
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteComment(r.commentId)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => resolveMutation.mutate({ id: r._id, status: "ignored" })}
                >
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedComments;
