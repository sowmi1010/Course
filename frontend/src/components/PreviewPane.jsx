export default function PreviewPane({ code, isDarkMode }) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md border ${
        isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
      }`}
    >
      <iframe
        title="preview"
        sandbox="allow-scripts"
        style={{
          width: "100%",
          height: "300px",
          border: "none",
          backgroundColor: isDarkMode ? "#1f2937" : "#ffffff", // dark gray or white
        }}
        srcDoc={code}
      />
    </div>
  );
}
