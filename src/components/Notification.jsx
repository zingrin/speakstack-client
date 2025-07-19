import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
const axiosSecure = useAxiosSecure();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosSecure.get("/notifications");

        // ✅ Support both formats: [] or { data: [] }
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setNotifications(data);

        const unread = data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
        setNotifications([]); // fallback
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };
console.log(notifications);
  const markAsRead = async (id) => {
    try {
      await axiosSecure.post(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <div className="badge badge-secondary badge-sm absolute top-0 right-0">
            {unreadCount}
          </div>
        )}
      </button>

      {showList && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg z-50 overflow-auto max-h-80">
          <h4 className="font-semibold p-3 border-b">Notifications</h4>
          {Array.isArray(notifications) && notifications.length === 0 && (
            <p className="p-3 text-center text-gray-500">No notifications</p>
          )}

          <ul>
            {Array.isArray(notifications) &&
              notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-3 cursor-pointer border-b hover:bg-gray-700 ${
                    !n.read ? "bg-blue-300 font-semibold" : ""
                  }`}
                  onClick={() => markAsRead(n._id)}
                  title={n.title}
                >
                  <p className="truncate">{n.title}</p>
                  <small className="text-xs text-gray-400">
                    {new Date(n.date).toLocaleString()}
                  </small>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
