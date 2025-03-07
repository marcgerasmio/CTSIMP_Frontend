import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen relative"
        style={{ backgroundImage: "url(bg.jpg)", fontFamily: "'Lexend', sans-serif" }}
      >
        {/* Add top-right link button */}
        <NavLink
          to="/auth"
          className="absolute top-4 right-4 btn btn-link font-bold text-white text-lg tracking-wider"
        >
          Sign In
        </NavLink>

        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="w-2/3">
            <h1 className="mb-5 text-3xl font-extrabold tracking-widest">
              Caraga Tourist Spot Interactive Map Portal
            </h1>
            <p className="mb-6 text-lg">
              Discover the rich cultural heritage and natural wonders of the
              Caraga region. Explore historical landmarks, breathtaking
              landscapes, and vibrant local traditions, all in one convenient
              platform.
            </p>
            <NavLink to="/carousel">
              <button className="btn btn-warning bg-yellow-500 font-bold text-white w-1/4">
                Explore
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
