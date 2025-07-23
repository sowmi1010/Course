import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { FaHeart } from "react-icons/fa";

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-6 text-gray-900 flex items-center gap-3">
        <FaHeart className="text-red-500" /> Favorite Topics
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Here are your favorite topics saved for quick access.
      </p>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="bg-gray-100 text-gray-500 p-8 rounded-lg shadow text-center text-lg">
          ❤️ No favorites yet. Start exploring and add some topics!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((topic) => (
            <div
              key={topic._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 p-5 transition-all transform hover:scale-105"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 truncate">
                {topic.title}
              </h3>

              {/* Subtitle */}
              {topic.subtitle && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {topic.subtitle}
                </p>
              )}

              {/* Action */}
              <Link
                to={`/topics/view/${topic._id}`}
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-medium"
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
