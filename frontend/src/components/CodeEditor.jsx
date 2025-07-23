import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange, language = "html" }) {
  return (
    <div className="w-full">
      <div className="mb-2">
        <span className="font-bold text-orange-500">Code Editor (Light Mode)</span>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="300px"
        language={language}
        value={value}
        onChange={onChange}
        theme="orange-light"
        beforeMount={(monaco) => {
          // ✅ Define Orange Light Theme
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
