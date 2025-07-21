import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import CodeEditor from "../components/CodeEditor";

export default function TopicEditor() {
  const { id, language: defaultLang } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [language, setLanguage] = useState(defaultLang || "html");
  const [singleCode, setSingleCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [activeTab, setActiveTab] = useState("html");

  useEffect(() => {
    if (id) {
      api.get(`/topics/view/${id}`).then(({ data }) => {
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setLanguage(data.language);
        if (data.language === "javascript") {
          setHtmlCode(data.htmlCode || "");
          setCssCode(data.cssCode || "");
          setJsCode(data.jsCode || "");
        } else {
          setSingleCode(data.code || "");
        }
      });
    }
  }, [id]);

  const handleSave = async () => {
    const topicData =
      language === "javascript"
        ? { title, subtitle, language, htmlCode, cssCode, jsCode }
        : { title, subtitle, language, code: singleCode };

    if (id) {
      await api.put(`/topics/${id}`, topicData);
    } else {
      await api.post("/topics", topicData);
    }
    navigate(`/topics/${language}`);
  };

  return (
    <div className="p-6  shadow rounded-lg transition-colors">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        {id ? "Edit" : "Add"} Topic
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Subtitle"
        rows="4"
        className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      ></textarea>

      <select
        className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500
             bg-white text-gray-900
             dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
        <option value="tailwind">Tailwind CSS</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="node">Node.js</option>
        <option value="express">Express.js</option>
        <option value="mongodb">MongoDB</option>
        <option value="mysql">MySQL</option>
      </select>

      {language === "javascript" ? (
        <div>
          <div className="flex space-x-3 mb-4">
            {["html", "css", "js"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          {activeTab === "html" && (
            <CodeEditor value={htmlCode} onChange={setHtmlCode} />
          )}
          {activeTab === "css" && (
            <CodeEditor value={cssCode} onChange={setCssCode} />
          )}
          {activeTab === "js" && (
            <CodeEditor value={jsCode} onChange={setJsCode} />
          )}
        </div>
      ) : (
        <CodeEditor value={singleCode} onChange={setSingleCode} />
      )}

      <button
        onClick={handleSave}
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Save Topic
      </button>
    </div>
  );
}
