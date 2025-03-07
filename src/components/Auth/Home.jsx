import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{
        backgroundImage: "url(bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      {/* Navigation */}
      <header className="absolute w-full z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Map Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span className="text-white font-bold text-xl tracking-wider">Caraga Tourism</span>
        </div>

        <NavLink
          to="/auth"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-200 shadow-md flex items-center"
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
        </NavLink>
      </header>

      {/* Hero Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-widest text-white mb-6 leading-tight">
            Caraga Tourist Spot Interactive Map Portal
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover the rich cultural heritage and natural wonders of the Caraga region. Explore historical landmarks,
            breathtaking landscapes, and vibrant local traditions, all in one convenient platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/carousel">
              <button className="px-8 py-3 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg transition-all duration-200 shadow-lg flex items-center justify-center">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Explore
              </button>
            </NavLink>

            <a
              href="https://beta.tourism.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-md bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-lg transition-all duration-200 flex items-center justify-center"
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Visit Official Site
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-white/70">
        <p className="text-sm">
          © {new Date().getFullYear()} Department of Tourism - Caraga Region. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home

