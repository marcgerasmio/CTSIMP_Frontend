import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";

const ADMIN_EMAIL = "admin@sys.cs"; // Replace with your actual admin email

const Login = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = { email, password };

    try {
      const response = await fetch("http://tourism-backend.test/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.token) {
        // Save JWT & user data
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        sessionStorage.setItem("name", data.user.name);

        // Redirect based on user role (email-based check)
        if (data.user.email === ADMIN_EMAIL) {
          navigate("/admin"); // Redirect to Admin Dashboard
        } else {
          navigate("/dashboard"); // Redirect to User Dashboard
        }
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-10 rounded-lg text-black bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200">
      <div className="justify-start flex">
        <NavLink to="/">
          <button className="w-15 font-bold text-white btn-sm btn-error bg-red-500 rounded-lg">
            <IoArrowBack size={22} />
          </button>
        </NavLink>
        <h1 className="text-3xl font-bold text-center text-white tracking-widest ms-20">
          SIGN IN
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              className="grow"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 border-gray-300 rounded focus:ring-blue-500"
            />
            Show Password
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="w-full btn btn-warning px-4 py-3 font-bold text-white bg-yellow-500 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>

      <div className="divider before:bg-white after:bg-white text-white">or</div>
      <button
        className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
        onClick={onToggle}
      >
        Create an Account
      </button>
    </div>
  );
};

export default Login; // ✅ Exporting the component properly
