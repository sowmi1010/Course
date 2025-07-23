import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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

  useEffect(() => {
    fetchTopics();
  }, [language]);

  const fetchTopics = async () => {
    try {
      const { data } = await api.get(`/topics/${language}`);
      setTopics(data);
      setFilteredTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(term)
    );
    setFilteredTopics(filtered);
  };

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

  const toggleFavorite = async (id) => {
    try {
      await api.patch(`/topics/favorite/${id}`);
      setTopics((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isFavorite: !t.isFavorite } : t
        )
      );
      setFilteredTopics((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isFavorite: !t.isFavorite } : t
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
    <div className="p-6 bg-white rounded-lg shadow max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {language.toUpperCase()} Topics
        </h2>
        <Link
          to={`/topics/add/${language}`}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
        >
          + Add Topic
        </Link>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <Listbox value={sortOrder} onChange={handleSort}>
          <div className="relative w-full md:w-64">
            <Listbox.Button className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
              {sortOrder.label}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? "bg-orange-500 text-white" : "text-gray-800"
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

      {/* Topics List */}
      {filteredTopics.length === 0 ? (
        <p className="text-gray-500">No topics found.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => {
            const hasCode =
              topic.language === "javascript"
                ? topic.htmlCode || topic.cssCode || topic.jsCode
                : topic.code;

            return (
              <li
                key={topic._id}
                className="bg-gray-50 hover:bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
              >
                {/* Title & Actions */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xl text-gray-800">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFavorite(topic._id)}
                      className="text-red-500 text-2xl hover:scale-110 transition"
                      title="Add to Favorites"
                    >
                      {topic.isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{topic.subtitle}</p>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-4 text-sm font-medium">
                  <Link
                    to={`/topics/view/${topic._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/topics/edit/${topic._id}`}
                    className="text-green-500 hover:text-green-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(topic._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>

                {/* Code Preview */}
                {hasCode && (
                  <div className="rounded overflow-x-auto border border-gray-300">
                    <SyntaxHighlighter
                      language={
                        topic.language === "javascript"
                          ? "html"
                          : topic.language
                      }
                      style={vscDarkPlus}
                      customStyle={{
                        maxHeight: "200px",
                        fontSize: "14px",
                        borderRadius: "6px",
                        margin: 0,
                        background: "#1e1e1e",
                      }}
                    >
                      {topic.language === "javascript"
                        ? `${topic.htmlCode || ""}\n${topic.cssCode || ""}\n${
                            topic.jsCode || ""
                          }`
                        : topic.code || ""}
                    </SyntaxHighlighter>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
