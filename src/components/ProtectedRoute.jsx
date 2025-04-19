import { Navigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@sys.cs"; // Replace with your actual admin email

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/auth" />; // Redirect if not logged in
  }

  if (adminOnly && user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" />; // Block non-admin users from /admin
  }

  return children;
};

export default ProtectedRoute;
