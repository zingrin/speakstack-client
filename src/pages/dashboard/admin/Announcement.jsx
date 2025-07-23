import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    authorName: "",
    authorImage: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/announcements", dataToSend);

      Swal.fire({
        icon: "success",
        title: "Announcement submitted!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/announcements");
      });

      setFormData({
        authorName: "",
        authorImage: "",
        title: "",
        description: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Make Announcement</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="authorImage"
          placeholder="Author Image URL"
          value={formData.authorImage}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default Announcement;
