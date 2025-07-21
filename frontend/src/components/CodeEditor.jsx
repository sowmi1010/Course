import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function CodeEditor({ value, onChange, language = "html" }) {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  //Toggle Mode Handler
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-orange-500">
          Code Editor ({isDarkMode ? "Dark" : "Light"} Mode)
        </span>
        <button
          onClick={toggleTheme}
          className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
        >
          Toggle Mode
        </button>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="300px"
        language={language}
        value={value}
        onChange={onChange}
        theme={isDarkMode ? "orange-dark" : "orange-light"} 
        beforeMount={(monaco) => {
          //Define Orange Dark Theme
          monaco.editor.defineTheme("orange-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [{ token: "", background: "1E1E1E" }],
            colors: {
              "editor.background": "#1E1E1E",
              "editorLineNumber.foreground": "#FF9800",
              "editorCursor.foreground": "#FF9800",
              "editor.selectionBackground": "#FFB74D55",
              "editor.foreground": "#ffffff",
            },
          });

          //Define Orange Light Theme
          monaco.editor.defineTheme("orange-light", {
            base: "vs",
            inherit: true,
            rules: [],
            colors: {
              "editor.background": "#FFFFFF",
              "editorLineNumber.foreground": "#FF9800",
              "editorCursor.foreground": "#FF9800",
              "editor.selectionBackground": "#FFE0B255",
              "editor.foreground": "#000000",
            },
          });
        }}
      />
    </div>
  );
}
