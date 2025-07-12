import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    authorImage: "",
    title: "",
  message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description) {
      return Swal.fire("Missing Fields", "Title & description are required.", "warning");
    }

    try {
      setLoading(true);
      await useAxiosSecure.post("/announcements", formData);
      Swal.fire("Success!", "Announcement posted!", "success");
      setFormData({
        authorName: "",
        authorImage: "",
        title: "",
        message: "",
      });
    } catch (error) {
      console.error("Error posting announcement:", error);
      Swal.fire("Error", "Failed to post announcement", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">📢 Make an Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input input-bordered w-full"
          type="text"
          name="authorName"
          placeholder="Author Name (optional)"
          value={formData.authorName}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          type="text"
          name="authorImage"
          placeholder="Author Image URL (optional)"
          value={formData.authorImage}
          onChange={handleChange}
        />
        <input
          className="input input-bordered w-full"
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="textarea textarea-bordered w-full"
          name="description"
          placeholder="Announcement Description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
