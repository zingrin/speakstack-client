import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddPost = () => {
  const [postCount, setPostCount] = useState(0);
  const [isMember, setIsMember] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // user.email এর জন্য

  useEffect(() => {
    // POST count and membership status আনো
    axiosSecure.get(`/user/post-info?email=${user?.email}`).then((res) => {
      setPostCount(res.data.count);
      setIsMember(res.data.isMember);
    });
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: formData.title,
      content: formData.description,
      tags: [formData.tag],
      author: {
        name: user?.displayName || "Anonymous",
        image: user?.photoURL || "",
        email: user?.email,
      },
      time: new Date(),
      upVote: 0,
      downVote: 0,
    };

    try {
      const res = await axiosSecure.post("/posts", postData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Post submitted successfully!", "success");
        setFormData({ title: "", description: "", tag: "" });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit post", "error");
    }
  };

  if (!isMember && postCount >= 5) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Post Limit Reached</h2>
        <p className="mb-6">
          You have reached your 5 post limit. Become a member to add more posts.
        </p>
        <button
          onClick={() => (window.location.href = "/membership")}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Post Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
            placeholder="Write your post description"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tag</label>
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select a tag</option>
            <option value="react">React</option>
            <option value="firebase">Firebase</option>
            <option value="auth">Auth</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
