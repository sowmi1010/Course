import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Listbox } from "@headlessui/react";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
];

export default function TopicList() {
  const { language } = useParams();
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(sortOptions[0]);

  //Detect Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  //Fetch topics
  const fetchTopics = async () => {
    try {
      const { data } = await api.get(`/topics/${language}`);
      setTopics(data);
      setFilteredTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [language]);

  //Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(term)
    );
    setFilteredTopics(filtered);
  };

  //Sort handler
  const handleSort = (selected) => {
    setSortOrder(selected);
    let sorted = [...filteredTopics];

    if (selected.value === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selected.value === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (selected.value === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selected.value === "za") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredTopics(sorted);
  };

  //Toggle Favorite
  const toggleFavorite = async (id) => {
    try {
      const { data } = await api.patch(`/topics/favorite/${id}`);
      setTopics((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isFavorite: data.topic.isFavorite } : t
        )
      );
      setFilteredTopics((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isFavorite: data.topic.isFavorite } : t
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await api.delete(`/topics/${id}`);
        fetchTopics();
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {language.toUpperCase()} Topics
      </h2>

      {/* Add Topic */}
      <Link
        to={`/topics/add/${language}`}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow mb-4 inline-block transition"
      >
        + Add Topic
      </Link>

      {/* Search */}
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/*Custom Dropdown using Headless UI */}
      <div className="mb-6">
        <Listbox value={sortOrder} onChange={handleSort}>
          <div className="relative">
            <Listbox.Button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-left text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500">
              {sortOrder.label}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active
                        ? "bg-orange-500 text-white"
                        : "text-gray-800 dark:text-gray-100"
                    }`
                  }
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {filteredTopics.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No topics found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTopics.map((topic) => (
            <li
              key={topic._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Title + Actions */}
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  {topic.title}
                </span>
                <div className="flex items-center gap-3">
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(topic._id)}
                    className="text-red-500 text-xl hover:scale-110 transition"
                    title="Add to Favorites"
                  >
                    {topic.isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <Link
                    to={`/topics/view/${topic._id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    to={`/topics/edit/${topic._id}`}
                    className="text-green-500 hover:text-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(topic._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/*Syntax Highlighted Snippet */}
              <div className="rounded overflow-x-auto border border-gray-300 dark:border-gray-700">
                <SyntaxHighlighter
                  language={
                    topic.language === "javascript" ? "html" : topic.language
                  }
                  style={isDarkMode ? atomDark : coy}
                  customStyle={{
                    maxHeight: "150px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    margin: 0,
                  }}
                >
                  {topic.language === "javascript"
                    ? `${topic.htmlCode || ""}\n${topic.cssCode || ""}\n${
                        topic.jsCode || ""
                      }`
                    : topic.code || ""}
                </SyntaxHighlighter>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
