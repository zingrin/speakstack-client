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
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
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
      <div className="bg-base-100 p-6 rounded-2xl shadow flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <span className="badge badge-primary text-base px-4 py-2">
              Posts: {totalPosts}
            </span>
            <span className="badge badge-secondary text-base px-4 py-2">
              Comments: {totalComments}
            </span>
            <span className="badge badge-accent text-base px-4 py-2">
              Users: {totalUsers}
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Pie Chart */}
      <div className="bg-base-100 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-center md:text-left">📊 Site Overview</h3>
        <div className="h-64 sm:h-80 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
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
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ marginTop: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Tag Submission */}
      <div className="bg-base-100 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-center md:text-left">🏷️ Add a New Tag</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Enter tag name"
            {...register("name", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
