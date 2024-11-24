import { Routes, Route } from "react-router-dom";
import Home from "./components/Auth/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Dashboards from "./components/User/Dashboards.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import Carousel from "./components/User/Carousel.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboards />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/carousel" element={<Carousel />} />
    </Routes>
  );
};

export default App;
