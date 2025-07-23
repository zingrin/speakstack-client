import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#4ade80", "#60a5fa", "#f472b6"]; // Pie chart colors

const AdminProfile = () => {
  const [adminStats, setAdminStats] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Fetch admin stats (posts, comments, users)
  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => {
      setAdminStats(res.data);
    });
  }, [axiosSecure]);

  // Handle Tag Submit
  const onSubmit = (data) => {
    const trimmedName = data.name?.trim();
    if (!trimmedName) {
      Swal.fire("Error", "Tag name cannot be empty", "error");
      return;
    }

    axiosSecure
      .post("/tags", { name: trimmedName })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("✅ Tag Added!", "", "success");
          reset();
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          Swal.fire("⚠ Duplicate Tag", "This tag already exists!", "warning");
        } else {
          Swal.fire("Error", "Failed to add tag", "error");
        }
      });
  };

  if (!adminStats) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const { name, email, image, totalPosts, totalComments, totalUsers } = adminStats;

  const chartData = [
    { name: "Posts", value: totalPosts },
    { name: "Comments", value: totalComments },
    { name: "Users", value: totalUsers },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* 🔹 Admin Info */}
      <div className="bg-base-100 p-6 rounded-2xl shadow">
        <div className="flex items-center gap-6">
          <img src={image} alt={name} className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
            <div className="mt-4 flex gap-4 flex-wrap">
              <span className="badge badge-primary">Posts: {totalPosts}</span>
              <span className="badge badge-secondary">Comments: {totalComments}</span>
              <span className="badge badge-accent">Users: {totalUsers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Pie Chart */}
      <div className="bg-base-100 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">📊 Site Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Tag Submission */}
      <div className="bg-base-100 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">🏷️ Add a New Tag</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Enter tag name"
            {...register("name", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
