import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postMutation = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosSecure.post("/posts", postData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Post added successfully!", "success");
      setTitle("");
      setDescription("");
      queryClient.invalidateQueries(["myPosts", user?.email]);
    },
    onError: () => {
      Swal.fire("❌ Error", "Failed to add post", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }

    const postData = {
      title,
      description,
      upvote: 0,
      downvote: 0,
      userEmail: user?.email,
    };

    postMutation.mutate(postData);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Post Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={postMutation.isPending}
        >
          {postMutation.isPending ? "Posting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
