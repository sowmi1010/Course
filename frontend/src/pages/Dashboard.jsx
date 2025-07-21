import { Link } from "react-router-dom";

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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {languages.map((lang) => (
          <Link
            key={lang.name}
            to={lang.path}
            className="bg-white dark:bg-gray-800 shadow hover:shadow-lg rounded-xl p-6 text-center font-semibold text-lg transition transform hover:scale-105 
                       text-gray-800 dark:text-gray-100 border border-orange-500 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500"
          >
            {lang.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
