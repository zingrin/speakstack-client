import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../../contexts/AuthContexts";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/join" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
