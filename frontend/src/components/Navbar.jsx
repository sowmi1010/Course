import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      className={`p-4 flex justify-between items-center shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left: Logo */}
      <div className="text-2xl font-bold">
        <Link to="/dashboard" className="text-orange-500 hover:opacity-80">
          MyDocs
        </Link>
      </div>

      {/* Center: Links */}
      <div className="flex space-x-6 text-lg">
        <Link
          to="/dashboard"
          className="hover:text-orange-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="hover:text-orange-500 transition-colors"
        >
          ❤️ Favorites
        </Link>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <FaSun className="text-orange-500 text-xl" />
          ) : (
            <FaMoon className="text-orange-500 text-xl" />
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
