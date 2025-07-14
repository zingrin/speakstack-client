import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/announcements").then((res) => {
      setAnnouncements(res.data);
    });
  }, [axiosSecure]);

  if (announcements.length === 0) return null;

  return (
    <div className="bg-yellow-100 p-6 rounded mt-10">
      <h2 className="text-xl font-bold mb-4">📢 Announcements</h2>
      <div className="space-y-3">
        {announcements.map((item) => (
          <div key={item._id} className="border p-3 bg-white rounded">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={item.authorImage}
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold">{item.authorName}</p>
            </div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.createdAt}</p>
          </div>
        ))}
      </div>
      <MakeAnnouncement></MakeAnnouncement>
    </div>
  );
};

export default AnnouncementSection;
