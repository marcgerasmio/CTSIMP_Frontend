import { FaSignOutAlt, FaTrashAlt, FaBars } from "react-icons/fa";

const Header = ({ onOpenModal }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-semibold text-gray-800 tracking-wider">
      | Enter Place Information
    </h1>
    <div className="flex gap-3">
      <button
        type="button"
        className="btn btn-circle btn-ghost"
        aria-label="Sign Out"
      >
        <FaSignOutAlt size={22} />
      </button>
      <button
        type="button"
        className="btn btn-circle btn-ghost"
        aria-label="Delete"
      >
        <FaTrashAlt size={22} />
      </button>
      <button
        type="button"
        className="btn btn-circle btn-ghost"
        aria-label="Open Table Modal"
        onClick={onOpenModal}
      >
        <FaBars size={22} />
      </button>
    </div>
  </div>
);

export default Header;
