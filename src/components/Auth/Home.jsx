"use client"

import { NavLink } from "react-router-dom"
import SignInButton from "./SignInButton"
import { useEffect, useState } from "react"

const Home = () => {
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className="min-h-screen relative flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url(bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      {/* Animated particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-white/10 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-[15%] left-[15%] w-1 h-1 bg-white/20 rounded-full animate-[float_12s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-[25%] right-[10%] w-2 h-2 bg-white/10 rounded-full animate-[float_9s_ease-in-out_infinite_0.5s]"></div>
        <div className="absolute top-[40%] right-[20%] w-1 h-1 bg-white/20 rounded-full animate-[float_11s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-white/10 rounded-full animate-[float_10s_ease-in-out_infinite_2s]"></div>
      </div>

      {/* Navigation with slide-down animation */}
      <header
        className={`absolute w-full z-10 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center group">
          {/* Map Icon with pulse animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-2 transition-transform duration-500 group-hover:scale-110 group-hover:text-emerald-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon
              points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
              className="animate-[pulse_3s_infinite]"
            ></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span className="text-white font-bold text-base sm:text-xl tracking-wider group-hover:text-emerald-300 transition-colors duration-300">
            Caraga Tourism
          </span>
        </div>

        {/* Using the separate SignInButton component with higher z-index */}
        <div
          className={`relative z-20 transition-all duration-700 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <SignInButton />
        </div>
      </header>

      {/* Hero Overlay with animated gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>

      {/* Main Content with staggered fade-in animations */}
      <div className="relative z-5 flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 md:py-0">
        <div className="max-w-4xl text-center mt-16 sm:mt-0">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wider sm:tracking-widest text-white mb-4 sm:mb-6 leading-tight transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              transform: `translateY(${scrollY * -0.2}px)`,
            }}
          >
            <span className="inline-block animate-[shimmer_3s_infinite]">Caraga Tourist Spot</span>
            <span className="block">Interactive Map Portal</span>
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            Discover the rich cultural heritage and natural wonders of the Caraga region. Explore historical landmarks,
            breathtaking landscapes, and vibrant local traditions, all in one convenient platform.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <NavLink to="/carousel" className="w-full sm:w-auto">
              <button className="w-full px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center relative z-10 hover:shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform duration-500 group-hover:rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span className="relative">
                  Explore
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </button>
            </NavLink>

            <a
              href="https://beta.tourism.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-md bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center relative z-10 hover:shadow-white/20 hover:-translate-y-1 active:translate-y-0 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span className="relative">
                Visit Official Site
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      {/* Footer with fade-in animation */}
      <footer
        className={`relative z-10 py-3 sm:py-4 text-center text-white/70 mt-4 sm:mt-0 transition-all duration-1000 delay-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="text-xs sm:text-sm animate-[pulse_4s_infinite]">
          © {new Date().getFullYear()} Department of Tourism - Caraga Region. All rights reserved.
        </p>
      </footer>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes shimmer {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.1), 0 0 10px rgba(255,255,255,0.1); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2); }
          100% { text-shadow: 0 0 5px rgba(255,255,255,0.1), 0 0 10px rgba(255,255,255,0.1); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default Home

