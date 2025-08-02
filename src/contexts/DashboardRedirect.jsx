import React, { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "./AuthContexts";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userRole = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "user";
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (userRole === "admin") {
    return <Navigate to="/dashboard/admin-profile" replace />;
  } 
   else {
    return <Navigate to="/dashboard/user/profile" replace />;
  }
};

export default DashboardRedirect;
