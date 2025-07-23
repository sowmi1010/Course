import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react";
import { FaChevronDown, FaChevronUp, FaTrash, FaPlus } from "react-icons/fa";

export default function TopicEditor() {
  const { id, language } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [topicLanguage, setTopicLanguage] = useState(language || "");
  const [code, setCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    if (id) {
      api.get(`/topics/view/${id}`).then(({ data }) => {
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setTopicLanguage(data.language);
        setCode(data.code || "");
        setHtmlCode(data.htmlCode || "");
        setCssCode(data.cssCode || "");
        setJsCode(data.jsCode || "");
        setSubtopics(data.subtopics || []);
      });
    }
  }, [id]);

  const handleAddSubtopic = () => {
    setSubtopics([
      ...subtopics,
      { title: "", description: "", syntax: "", examples: [], open: true },
    ]);
  };

  const toggleSubtopic = (index) => {
    const updated = [...subtopics];
    updated[index].open = !updated[index].open;
    setSubtopics(updated);
  };

  const handleRemoveSubtopic = (index) => {
    setSubtopics(subtopics.filter((_, i) => i !== index));
  };

  const handleSubtopicChange = (index, key, value) => {
    const updated = [...subtopics];
    updated[index][key] = value;
    setSubtopics(updated);
  };

  const handleAddExample = (subIndex) => {
    const updated = [...subtopics];
    updated[subIndex].examples.push({ title: "", description: "", code: "" });
    setSubtopics(updated);
  };

  const handleExampleChange = (subIndex, exIndex, key, value) => {
    const updated = [...subtopics];
    updated[subIndex].examples[exIndex][key] = value;
    setSubtopics(updated);
  };

  const handleRemoveExample = (subIndex, exIndex) => {
    const updated = [...subtopics];
    updated[subIndex].examples.splice(exIndex, 1);
    setSubtopics(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      subtitle,
      language: topicLanguage,
      code,
      htmlCode,
      cssCode,
      jsCode,
      subtopics,
    };

    try {
      if (id) {
        await api.put(`/topics/${id}`, payload);
        toast.success("✅ Topic updated successfully!");
      } else {
        await api.post("/topics", payload);
        toast.success("✅ Topic created successfully!");
      }
      navigate(`/topics/${topicLanguage}`);
    } catch (error) {
      toast.error("❌ Error saving topic.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {id ? "Edit Topic" : "Add New Topic"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Code Editors */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-lg mb-4 text-gray-700">Code Editor</h3>
          {topicLanguage === "javascript" ? (
            <>
              <Editor
                height="150px"
                defaultLanguage="html"
                theme="vs-dark"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || "")}
              />
              <Editor
                height="150px"
                defaultLanguage="css"
                theme="vs-dark"
                value={cssCode}
                onChange={(value) => setCssCode(value || "")}
              />
              <Editor
                height="150px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={jsCode}
                onChange={(value) => setJsCode(value || "")}
              />
            </>
          ) : (
            <Editor
              height="200px"
              defaultLanguage={topicLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
            />
          )}
        </div>

        {/* Subtopics Section */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Subtopics</h3>
            <button
              type="button"
              onClick={handleAddSubtopic}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus /> Add Subtopic
            </button>
          </div>

          {subtopics.map((sub, i) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-lg mb-4 p-4 shadow-inner"
            >
              {/* Accordion Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSubtopic(i)}
              >
                <h4 className="font-semibold text-lg text-gray-700">
                  {sub.title || `Subtopic ${i + 1}`}
                </h4>
                {sub.open ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {sub.open && (
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder={`Subtopic ${i + 1} Title`}
                    value={sub.title}
                    onChange={(e) =>
                      handleSubtopicChange(i, "title", e.target.value)
                    }
                    className="border px-4 py-2 rounded w-full"
                  />
                  <textarea
                    placeholder="Description"
                    value={sub.description}
                    onChange={(e) =>
                      handleSubtopicChange(i, "description", e.target.value)
                    }
                    className="border px-4 py-2 rounded w-full"
                  />
                  <input
                    type="text"
                    placeholder="Syntax"
                    value={sub.syntax}
                    onChange={(e) =>
                      handleSubtopicChange(i, "syntax", e.target.value)
                    }
                    className="border px-4 py-2 rounded w-full"
                  />

                  {/* Examples */}
                  <div className="bg-white border rounded p-3">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-semibold">Examples</h5>
                      <button
                        type="button"
                        onClick={() => handleAddExample(i)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <FaPlus /> Add Example
                      </button>
                    </div>

                    {sub.examples.map((ex, j) => (
                      <div
                        key={j}
                        className="border p-3 rounded mb-3 bg-gray-100 shadow-inner"
                      >
                        <input
                          type="text"
                          placeholder="Example Title"
                          value={ex.title}
                          onChange={(e) =>
                            handleExampleChange(i, j, "title", e.target.value)
                          }
                          className="border px-3 py-2 rounded w-full mb-2"
                        />
                        <textarea
                          placeholder="Example Description"
                          value={ex.description}
                          onChange={(e) =>
                            handleExampleChange(
                              i,
                              j,
                              "description",
                              e.target.value
                            )
                          }
                          className="border px-3 py-2 rounded w-full mb-2"
                        />
                        <Editor
                          height="150px"
                          defaultLanguage="javascript"
                          theme="vs-dark"
                          value={ex.code}
                          onChange={(value) =>
                            handleExampleChange(i, j, "code", value || "")
                          }
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExample(i, j)}
                          className="text-red-500 mt-2 flex items-center gap-1"
                        >
                          <FaTrash /> Remove Example
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSubtopic(i)}
                    className="text-red-600 mt-2 flex items-center gap-1"
                  >
                    <FaTrash /> Remove Subtopic
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full md:w-auto"
        >
          {id ? "Update Topic" : "Create Topic"}
        </button>
      </form>
    </div>
  );
}
