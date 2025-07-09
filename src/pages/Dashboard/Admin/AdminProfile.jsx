import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

const AdminProfile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ usersCount: 0, postsCount: 0, commentsCount: 0 });

  useEffect(() => {
    useAxiosSecure.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  const chartData = [
    { name: "Users", value: stats.usersCount },
    { name: "Posts", value: stats.postsCount },
    { name: "Comments", value: stats.commentsCount },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded shadow">
        <img src={user?.photoURL} alt="Admin" className="w-24 h-24 rounded-full border" />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">📊 Site Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProfile;


















