import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Favorites ❤️", path: "/favorites" },
    { name: "Add Topic", path: "/topics/add" },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col shadow-lg bg-white text-gray-800">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold text-center text-orange-600">
        MyDocs
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-md font-medium transition ${
                  location.pathname === item.path
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-gray-500">
        © 2025 MyDocs
      </div>
    </aside>
  );
}
