import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get("/topics/favorites/all");
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 dark:text-white ">
        ❤️ Favorite Topics
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((topic) => (
            <div
              key={topic._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg p-5 transition transform hover:scale-105
                         border border-orange-500"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {topic.title}
              </h3>
              <Link
                to={`/topics/view/${topic._id}`}
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
