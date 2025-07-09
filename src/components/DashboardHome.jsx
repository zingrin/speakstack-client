import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../pages/Dashboard/Admin/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const [isAdmin, loadingAdmin] = useAdmin();
  const [stats, setStats] = useState({
    totalUsers: 0,
    reportsPending: 0,
    announcements: 0,
    activeParcels: 0,
    userPosts: 0,
  });
  const axiosSecure = useAxiosSecure();
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  // Fetch dashboard stats from backend API
  useEffect(() => {
    if (!loadingAdmin) {
      const fetchStats = async () => {
        try {
          if (isAdmin) {
            // Admin stats API
            const res = await axiosSecure.get("/admin/stats");
            setStats({
              totalUsers: res.data.totalUsers,
              reportsPending: res.data.reportsPending,
              announcements: res.data.announcements,
            });
          } else if (user?.email) {
            // Normal user stats API
            const res = await axiosSecure.get(`/api/user/${user.email}/stats`);
            setStats({
              activeParcels: res.data.activeParcels,
              userPosts: res.data.userPosts,
            });
          }
          setLoadingStats(false);
        } catch (error) {
          console.error("Failed to load dashboard stats", error);
          setLoadingStats(false);
        }
      };
      fetchStats();
    }
  }, [isAdmin, loadingAdmin, user]);

  if (loadingAdmin || loadingStats) {
    return <p className="p-4 text-lg font-medium">Loading dashboard...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.displayName || "User"}!
      </h2>

      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">👥 Total Users</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">🚨 Reports Pending</h3>
            <p className="text-3xl font-bold mt-2">{stats.reportsPending}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">📢 Announcements</h3>
            <p className="text-3xl font-bold mt-2">{stats.announcements}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg">
            You have{" "}
            <span className="font-semibold text-blue-700">
              {stats.activeParcels}
            </span>{" "}
            active parcels and{" "}
            <span className="font-semibold text-blue-700">{stats.userPosts}</span>{" "}
            posts awaiting comments.
          </p>

          <div className="flex gap-4">
           
            <button
              onClick={() => navigate("/dashboard/create-post")}
              className="btn btn-secondary"
            >
              📝 Create New Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
