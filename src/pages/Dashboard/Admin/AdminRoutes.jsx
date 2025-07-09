import { Navigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user?.role === "admin") return children;

  return <Navigate to="/" />;
};

export default AdminRoute;
