import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onToggle, openModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    // Prepare the registration data
    const registrationData = {
      name: fullName,
      email: email,
      password: password,
    };

    try {
      // Send the registration request using fetch
      const response = await fetch("http://tourism-backend.test/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        // Handle successful registration
        const result = await response.json();
        console.log("Registration successful:", result);
       alert("Registration Successfull");
       onToggle();
      } else {
        // Handle errors during registration
        const error = await response.json();
        alert("Registration failed: " + error.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-10 rounded-lg text-black bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-white tracking-widest">
        CREATE AN ACCOUNT
      </h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-2">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4.5 7a.5.5 0 0 0 .5-.5c0-1.597-1.01-3.07-2.663-3.868C9.682 10.257 8.876 10 8 10c-.876 0-1.682.257-2.337.632C4.01 11.43 3 12.903 3 14.5a.5.5 0 0 0 .5.5h9z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
        </div>

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
              type="email"
              className="grow"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-2">
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
              placeholder="Confirm Password"
              className="grow"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>Loading...</span>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
