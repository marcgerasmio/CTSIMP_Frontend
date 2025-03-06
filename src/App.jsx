import { Routes, Route } from "react-router-dom";
import Home from "./components/Auth/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Dashboards from "./components/User/Dashboards.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import Carousel from "./components/User/Carousel.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/carousel" element={<Carousel />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
