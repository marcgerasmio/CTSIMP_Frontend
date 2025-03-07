import { useState } from "react";
import { useNavigate } from "react-router-dom";

// If you're using Lucide React icons, import them like this:
// import { Eye, EyeOff, Loader2, User, Mail, Lock, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
// If not, the SVG icons are included inline below

const Register = ({ onToggle, openModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    // Prepare the registration data
    const registrationData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://tourism-backend.test/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        setRegistrationSuccess(true);
        // Show success state for 2 seconds before toggling to login
        setTimeout(() => {
          onToggle();
        }, 2000);
      } else {
        const error = await response.json();
        setErrors({
          ...errors,
          form: error.message || "Registration failed. Please try again."
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      setErrors({
        ...errors,
        form: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-emerald-500";
    return "bg-green-600";
  };

  // Get strength text
  const getStrengthText = () => {
    if (!formData.password) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  if (registrationSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto p-10 rounded-lg bg-emerald-50 shadow-lg border border-emerald-200 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* CheckCircle Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2 className="text-2xl font-bold text-emerald-800">Registration Successful!</h2>
          <p className="text-emerald-700">Welcome to Mindanao Tourism! Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xxl mx-auto p-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg border border-emerald-200">
      <div className="flex items-center justify-center mb-6">
        {/* Palm Tree Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8"></path>
          <path d="M4.3 10H2c0 5.5 4.5 10 10 10s10-4.5 10-10h-2.3"></path>
          <path d="M8 10c0-4.4 3.6-8 8-8"></path>
          <path d="M16 10c0-4.4-3.6-8-8-8"></path>
          <path d="M9.4 22l2.6-8 2.6 8"></path>
        </svg>
        <h1 className="text-2xl font-bold text-center text-emerald-800">
          Discover Mindanao
        </h1>
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-emerald-700">Create an Account</h2>
        <p className="text-sm text-emerald-600 mt-1">Join us to explore the beauty of Mindanao</p>
      </div>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          {/* AlertCircle Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{errors.form}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-sm font-medium text-emerald-700 block">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* User Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.fullName ? "border-red-500" : "border-emerald-300"} bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-emerald-700 block">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Mail Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-emerald-300"} bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              placeholder="example@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-emerald-700 block">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Lock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-emerald-300"} bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                /* EyeOff Icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                /* Eye Icon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-emerald-700">Password strength:</div>
                <div className="text-xs font-medium" style={{ color: passwordStrength > 2 ? "#047857" : "#ca8a04" }}>
                  {getStrengthText()}
                </div>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`} 
                  style={{ width: `${passwordStrength * 25}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-emerald-700">
                Use 8+ characters with a mix of letters, numbers & symbols
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-emerald-700 block">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Lock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-emerald-300"} bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              placeholder="Confirm your password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-200 flex items-center justify-center shadow-md"
        >
          {isLoading ? (
            <>
              {/* Loader Icon */}
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Join Mindanao Tourism"
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-emerald-700">Already have an account?</p>
          <button 
            type="button"
            onClick={onToggle} 
            className="mt-1 text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center justify-center mx-auto"
          >
            {/* MapPin Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Sign in to continue your journey
          </button>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-emerald-200 text-center">
        <p className="text-xs text-emerald-700">
          Department of Tourism - Mindanao Region
        </p>
        <p className="text-xs text-emerald-600 mt-1">
          Discover the beauty and culture of Mindanao
        </p>
      </div>
    </div>
  );
};

export default Register;
