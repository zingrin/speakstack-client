import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts", user?.email]);
      Swal.fire("Deleted!", "Your post has been deleted.", "success");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Votes</th>
            <th>Comments</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.upvote - post.downvote}</td>
              <td>
                <Link to={`/comments/${post._id}`}>
                  <button className="btn btn-sm btn-info">Comments</button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      showCancelButton: true,
                      confirmButtonText: "Yes, delete",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        deleteMutation.mutate(post._id);
                      }
                    })
                  }
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;
