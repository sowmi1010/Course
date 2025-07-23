import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

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
          ? "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-orange-100"
      }`}
    >
      {label}
    </button>
  );

  const renderCodeBlock = (code, language) => (
    <div>
      <button
        onClick={() => handleCopy(code)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mb-3"
      >
        Copy Code
      </button>
      <SyntaxHighlighter
        language={language}
        style={dracula}
        customStyle={{
          borderRadius: "8px",
          fontSize: "15px",
          padding: "16px",
          background: "#1e1e1e",
          color: "#dcdcdc",
          maxHeight: "450px",
          overflowX: "auto",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-4xl mx-auto">
      {/* Title & Subtitle */}
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{topic.title}</h2>
      <p className="text-gray-600 mb-6">{topic.subtitle}</p>

      {/* Image */}
      {topic.image && (
        <img
          src={topic.image}
          alt={topic.title}
          className="w-full h-64 object-cover mb-6 rounded-lg shadow"
        />
      )}

      {/* Tabs */}
      <div className="flex space-x-3 mb-4">
        {topic.language === "javascript" ? (
          ["preview", "html", "css", "js"].map((tab) => (
            <TabButton key={tab} tab={tab} label={tab.toUpperCase()} />
          ))
        ) : (
          <>
            <TabButton tab="preview" label="PREVIEW" />
            <TabButton tab="code" label="CODE" />
          </>
        )}
      </div>

      {/* Code Section */}
      {topic.language === "javascript" ? (
        activeTab === "preview" ? (
          <iframe
            sandbox="allow-scripts"
            className="w-full h-[400px] rounded-lg border border-gray-300 bg-white shadow"
            srcDoc={`<html><head><style>${topic.cssCode}</style></head><body>${topic.htmlCode}<script>${topic.jsCode}<\/script></body></html>`}
          />
        ) : (
          renderCodeBlock(
            activeTab === "html"
              ? topic.htmlCode
              : activeTab === "css"
              ? topic.cssCode
              : topic.jsCode,
            activeTab
          )
        )
      ) : activeTab === "preview" &&
        (topic.language === "html" || topic.language === "css") ? (
        <iframe
          sandbox="allow-scripts"
          className="w-full h-[400px] rounded-lg border border-gray-300 bg-white shadow"
          srcDoc={topic.code}
        />
      ) : activeTab === "code" ? (
        renderCodeBlock(topic.code, topic.language)
      ) : (
        <p className="text-gray-500">
          Preview not available for {topic.language}.
        </p>
      )}

      {/* ✅ Subtopics Section */}
      {topic.subtopics && topic.subtopics.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Subtopics
          </h3>
          <div className="space-y-6">
            {topic.subtopics.map((sub, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm"
              >
                <h4 className="text-xl font-bold text-gray-700 mb-2">
                  {sub.title}
                </h4>
                <p className="text-gray-600 mb-3">{sub.description}</p>

                {sub.syntax && (
                  <div className="mb-3">
                    <p className="text-gray-700 font-semibold">Syntax:</p>
                    <SyntaxHighlighter language="javascript" style={dracula}>
                      {sub.syntax}
                    </SyntaxHighlighter>
                  </div>
                )}

                {/* Examples */}
                {sub.examples && sub.examples.length > 0 && (
                  <div>
                    <p className="text-gray-700 font-semibold mb-2">
                      Examples:
                    </p>
                    {sub.examples.map((ex, exIndex) => (
                      <div
                        key={exIndex}
                        className="border p-3 rounded mb-2 bg-white"
                      >
                        <h5 className="font-semibold text-gray-800">
                          {ex.title}
                        </h5>
                        <p className="text-gray-600 mb-2">{ex.description}</p>
                        <SyntaxHighlighter language="javascript" style={dracula}>
                          {ex.code}
                        </SyntaxHighlighter>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
