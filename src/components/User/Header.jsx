import { FaSignOutAlt, FaTrashAlt, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = ({ onOpenModal }) => {
  const handleSignOut = () => {
    localStorage.clear(); // Clear local storage on sign out
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold text-gray-800 tracking-wider">
        | Enter Place Information
      </h1>
      <div className="flex gap-3">
        <button
          type="button"
          className="btn btn-circle btn-ghost"
          aria-label="Open Table Modal"
          onClick={onOpenModal}
        >
          <FaBars size={22} />
        </button>
        <NavLink to="/">
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            aria-label="Sign Out"
            onClick={handleSignOut} // Attach sign-out handler
          >
            <FaSignOutAlt size={22} />
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
