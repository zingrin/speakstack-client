import { useState } from "react";
import axiosSecure from "../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    authorImage: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosSecure.post("/announcements", formData);
    alert("Announcement posted!");
    setFormData({ authorName: "", authorImage: "", title: "", description: "" });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make an Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          type="text"
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          type="text"
          name="authorImage"
          placeholder="Author Image URL"
          value={formData.authorImage}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          placeholder="Description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-full" type="submit">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
