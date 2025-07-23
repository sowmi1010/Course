import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHeart } from "react-icons/fa";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* ✅ Logo */}
        <div>
          <Link
            to="/dashboard"
            className="text-3xl font-extrabold text-orange-500 hover:text-orange-600 transition"
          >
            MyDocs
          </Link>
        </div>

        {/* ✅ Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          <Link
            to="/dashboard"
            className="text-lg font-medium text-gray-700 hover:text-orange-500 transition"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-orange-500 transition"
          >
            <FaHeart className="text-red-500" /> Favorites
          </Link>
          <button
            onClick={logout}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
          >
            Logout
          </button>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-3xl text-gray-800 hover:text-orange-500 transition"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col items-start px-6 py-4 gap-4">
            <Link
              to="/dashboard"
              className="text-lg font-medium text-gray-700 hover:text-orange-500 transition w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-orange-500 transition w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHeart className="text-red-500" /> Favorites
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow w-full transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
