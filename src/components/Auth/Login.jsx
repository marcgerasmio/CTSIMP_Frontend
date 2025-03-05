import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const Login = ({ onToggle, openModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the login data
    const loginData = {
      email,
      password,
    };

    try {
      // Send login request
      const response = await fetch("http://Tourism_Backend.test/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data.user.name);
      if (response.ok) {
        sessionStorage.setItem("name", data.user.name)
        
        if (data.user.name === "Admin") {
          window.location.href = "/admin"; 
        } else {
          window.location.href = "/dashboard"; 
        }

      } else {

        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-10 rounded-lg text-black bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200">
      <div className="justify-start flex">
        <NavLink to="/">
        <button
        className="w-15 font-bold text-white btn-sm btn-error bg-red-500 rounded-lg"
      >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
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
            className="w-full btn btn-warning px-4 py-3 font-bold text-white bg-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loading loading-spinner bg-white rounded-full w-3 h-3"></div>
                <span className="ml-2 text-white">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <div className="divider before:bg-white after:bg-white text-white">
        or
      </div>
      <button
        className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
        onClick={onToggle}
      >
        Create an Account
      </button>
    </div>
  );
};

export default Login;
