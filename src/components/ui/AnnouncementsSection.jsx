import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AnnouncementCard from "./AnnouncementCard";

const AnnouncementsSection = () => {
  const axiosSecure = useAxiosSecure();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosSecure
      .get("/api/announcements")
      .then((res) => {
        setAnnouncements(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch announcements");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <p>Loading announcements...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!announcements.length) return null;

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
