import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16">
        {/* mt-16 = 64px (same as navbar height) */}
        <Outlet />
      </main>
    </div>
  );
}
