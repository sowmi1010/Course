import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    //Persist theme in localStorage
    return localStorage.getItem("theme") === "dark";
  });

  //Apply theme to body class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
