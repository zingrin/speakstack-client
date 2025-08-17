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
        const res = await axiosSecure.get("/announcements");
        const announcements = Array.isArray(res.data) ? res.data : res.data.data || [];

        const today = new Date().toISOString().slice(0, 10); 

        const todayNotifications = announcements
          .filter((a) => a.date?.slice(0, 10) === today)
          .map((a) => ({
            ...a,
            read: false, 
          }));

        setNotifications(todayNotifications);
        const unread = todayNotifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
        setNotifications([]);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));
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
        <div className="absolute right-0 mt-2 w-72 rounded shadow-lg z-50 overflow-auto max-h-80">
          <h4 className="font-semibold p-3 border-b bg-amber-200">Notifications</h4>
          {notifications.length === 0 ? (
            <p className="p-3 text-center text-gray-500">No notifications</p>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-3 cursor-pointer border-b hover:bg-gray-700 ${
                    !n.read ? "bg-amber-300 font-semibold" : ""
                  }`}
                  onClick={() => markAsRead(n._id)}
                  title={n.title}
                >
                  <p className="truncate">{n.title}</p>
                  <small className="text-xs text-gray-500">
                    {new Date(n.date).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
