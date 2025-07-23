export default function PreviewPane({ code }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-300 bg-white">
      <iframe
        title="preview"
        sandbox="allow-scripts"
        style={{
          width: "100%",
          height: "300px",
          border: "none",
          backgroundColor: "#ffffff", // Always white
        }}
        srcDoc={code}
      />
    </div>
  );
}
