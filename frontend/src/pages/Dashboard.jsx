import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";

export default function Dashboard() {
  const languages = [
    { name: "HTML", path: "/topics/html" },
    { name: "CSS", path: "/topics/css" },
    { name: "JavaScript", path: "/topics/javascript" },
    { name: "Tailwind CSS", path: "/topics/tailwind" },
    { name: "Node Js", path: "/topics/node" },
    { name: "Express Js", path: "/topics/express" },
    { name: "MongoDB", path: "/topics/mongodb" },
    { name: "React Js", path: "/topics/reactjs" },
    { name: "MySQL", path: "/topics/mysql" },
    { name: "Java", path: "/topics/java" },
    { name: "Python", path: "/topics/python" },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
        Developer Dashboard
      </h1>
      <p className="text-gray-600 mb-8 text-center text-lg">
        Select a topic to explore detailed tutorials and examples.
      </p>

      {/* Language Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {languages.map((lang) => (
          <Link
            key={lang.name}
            to={lang.path}
            className="bg-white shadow-md hover:shadow-2xl rounded-xl p-6 flex flex-col items-center justify-center gap-3
                       text-center font-semibold text-lg transition-all transform hover:scale-105 
                       text-gray-800 border border-gray-200 hover:bg-orange-500 hover:text-white duration-300"
          >
            <FaCode className="text-3xl text-orange-500 group-hover:text-white" />
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
