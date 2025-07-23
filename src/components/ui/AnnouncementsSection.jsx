import React, { useEffect, useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AnnouncementsSection = () => {
  const axiosSecure = useAxiosSecure();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/announcements");
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAnnouncements(sorted);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  },[]);

  if (loading) {
    return (
      <div className="text-center p-6">
        <span className="loading loading-spinner text-primary"></span>
        <p className="mt-2 text-gray-500">Loading announcements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          onClick={fetchAnnouncements}
          className="mt-3 btn btn-sm btn-outline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div className="text-center text-gray-500 p-6">
        <p>No announcements yet.</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Announcements</h2>
      <div className="space-y-4">
        {announcements.map((ann) => (
          <AnnouncementCard key={ann._id} announcement={ann} />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
