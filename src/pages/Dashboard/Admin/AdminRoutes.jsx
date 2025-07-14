import { Navigate } from "react-router";
import useAdmin from "./useAdmin";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  // এখনো loading হলে কিছু দেখাই
  if (loading || adminLoading) {
    return <div className="p-4 text-center text-lg">Loading...</div>;
  }

  // যদি admin হয়, তাহলে children show করো
  if (user && isAdmin) {
    return children;
  }

  // না হলে redirect করে দাও homepage এ
  return <Navigate to="/" replace />;
};

export default AdminRoute;
