"use client"

import { useNavigate } from "react-router-dom"

const SignInButton = ({ className }) => {
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    // Stop event propagation to prevent it from affecting other elements
    e.stopPropagation()
    console.log("Sign in button clicked")

    // Navigate to auth page
    navigate("/auth")
  }

  return (
    <button
      onClick={handleSignIn}
      className={`px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-200 shadow-md flex items-center z-20 relative ${className || ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
      Sign In
    </button>
  )
}

export default SignInButton

