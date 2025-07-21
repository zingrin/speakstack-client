import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TAG_OPTIONS = [
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "CSS", label: "CSS" },
  { value: "Node.js", label: "Node.js" },
  { value: "MongoDB", label: "MongoDB" },
];

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    authorImage: "",
    author: "",
    authorEmail: "",
    title: "",
    content: "",
    tags: [],
    upVote: 0,
    downVote: 0,
  });

  useEffect(() => {
    if (!user) return;

    const getPostCount = async () => {
      try {
        const response = await axiosSecure.get(
          `/posts/count?userEmail=${user.email}`
        );
        setPostCount(response.data.count || 0);
      } catch (error) {
        setPostCount(0);
        Swal.fire({
          icon: "error",
          title: "Error Loading Posts Count",
          text: "Could not load your posts count. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    getPostCount();

    setFormData((prev) => ({
      ...prev,
      author: user.displayName || "",
      authorEmail: user.email,
      authorImage: user.photoURL || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      formData.tags.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in title, content, and select at least one tag.",
      });
      return;
    }

    const newPost = {
      authorImage: formData.authorImage,
      author: formData.author,
      authorEmail: formData.authorEmail,
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
      upVoters: [],
      downVoters: [],
      commentsCount: 0,
      image: "", // Optional image URL
    };

    try {
      await axiosSecure.post("/posts", newPost);
      Swal.fire({
        icon: "success",
        title: "Post Created",
        text: "Your post has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not create post, please try again.",
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (postCount >= 5) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <p className="mb-4 text-lg font-semibold">
          You have reached the free post limit (5 posts).
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/membership")}
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author Image */}
        <div>
          <label className="block font-semibold mb-1">Author Image URL</label>
          <input
            type="text"
            name="authorImage"
            value={formData.authorImage}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
            required
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-semibold mb-1">Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Author Email */}
        <div>
          <label className="block font-semibold mb-1">Author Email</label>
          <input
            type="email"
            name="authorEmail"
            value={formData.authorEmail}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            readOnly
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block font-semibold mb-1">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Post Description */}
        <div>
          <label className="block font-semibold mb-1">Post Description</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Write your post content"
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1">Tags</label>
          <Select
            options={TAG_OPTIONS}
            isMulti
            value={TAG_OPTIONS.filter((tag) =>
              formData.tags.includes(tag.value)
            )}
            onChange={handleTagChange}
            placeholder="Select tags"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
