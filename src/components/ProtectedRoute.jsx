import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("jwt"); // Correct key

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
