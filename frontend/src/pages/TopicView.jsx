import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify"; 

export default function TopicView() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    api.get(`/topics/view/${id}`).then(({ data }) => setTopic(data));
  }, [id]);

  if (!topic) return <p className="text-center text-gray-500">Loading...</p>;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("✅ Code copied to clipboard!");
  };

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        activeTab === tab
          ? "bg-orange-500 text-white shadow"
          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-600"
      }`}
    >
      {label}
    </button>
  );

  const renderTabs = () => {
    if (topic.language === "javascript") {
      return (
        <div>
          {/* Tabs */}
          <div className="flex space-x-3 mb-4">
            {["preview", "html", "css", "js"].map((tab) => (
              <TabButton key={tab} tab={tab} label={tab.toUpperCase()} />
            ))}
          </div>

          {/* Content */}
          {activeTab === "preview" && (
            <iframe
              sandbox="allow-scripts"
              className="w-full h-[400px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow"
              srcDoc={`<html><head><style>${topic.cssCode}</style></head><body>${topic.htmlCode}<script>${topic.jsCode}<\/script></body></html>`}
            />
          )}

          {activeTab !== "preview" && (
            <div>
              <button
                onClick={() =>
                  handleCopy(
                    activeTab === "html"
                      ? topic.htmlCode
                      : activeTab === "css"
                      ? topic.cssCode
                      : topic.jsCode
                  )
                }
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mb-3"
              >
                Copy {activeTab.toUpperCase()}
              </button>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-100 shadow">
                <code>
                  {activeTab === "html"
                    ? topic.htmlCode
                    : activeTab === "css"
                    ? topic.cssCode
                    : topic.jsCode}
                </code>
              </pre>
            </div>
          )}
        </div>
      );
    }

    // For other languages
    return (
      <div>
        <div className="flex space-x-3 mb-4">
          <TabButton tab="preview" label="PREVIEW" />
          <TabButton tab="code" label="CODE" />
        </div>

        {activeTab === "preview" &&
        (topic.language === "html" || topic.language === "css") ? (
          <iframe
            sandbox="allow-scripts"
            className="w-full h-[400px] rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow"
            srcDoc={topic.code}
          />
        ) : activeTab === "preview" ? (
          <p className="text-gray-500 dark:text-gray-300">
            Preview not available for {topic.language}.
          </p>
        ) : (
          <div>
            <button
              onClick={() => handleCopy(topic.code)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mb-3"
            >
              Copy Code
            </button>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-100 shadow">
              <code>{topic.code}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors">
      <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        {topic.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{topic.subtitle}</p>

      {topic.image && (
        <img
          src={topic.image}
          alt={topic.title}
          className="w-full max-w-lg h-64 object-cover mb-6 rounded-lg shadow"
        />
      )}

      {renderTabs()}
    </div>
  );
}
