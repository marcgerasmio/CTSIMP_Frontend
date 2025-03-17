"use client"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const SignInButton = ({ className }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Animation entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleSignIn = (e) => {
    // Stop event propagation to prevent it from affecting other elements
    e.stopPropagation()
    console.log("Sign in button clicked")

    // Add click animation
    const button = e.currentTarget
    button.classList.add("scale-95")
    setTimeout(() => {
      button.classList.remove("scale-95")
      // Navigate to auth page after the animation
      setTimeout(() => {
        navigate("/auth")
      }, 100)
    }, 150)
  }

  return (
    <button
      onClick={handleSignIn}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        px-6 py-2 rounded-full 
        bg-gradient-to-r from-emerald-600 to-teal-600 
        hover:from-emerald-500 hover:to-teal-500
        text-white font-medium 
        transition-all duration-300 
        shadow-md hover:shadow-lg hover:shadow-emerald-500/20
        flex items-center z-20 relative
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        hover:-translate-y-1 active:translate-y-0 active:scale-95
        ${className || ""}
      `}
      style={{
        transformOrigin: "center",
        boxShadow: isHovered ? "0 10px 15px -3px rgba(16, 185, 129, 0.2), 0 4px 6px -4px rgba(16, 185, 129, 0.2)" : "",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/0 via-teal-300/10 to-emerald-400/0 bg-[length:200%_100%] animate-[shimmerButton_3s_infinite]"></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 mr-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
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

      <span className="relative">
        Sign In
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isHovered ? "w-full" : "w-0"}`}
        ></span>
      </span>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes shimmerButton {
          0% { background-position: 100% 0; }
          50% { background-position: 0 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </button>
  )
}

export default SignInButton

