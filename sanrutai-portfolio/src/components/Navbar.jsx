import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const menu = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Research",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-teal-500 dark:text-teal-400">
          Sanrutai
        </h1>

        <div className="hidden md:flex items-center gap-6">
          {menu.map((m) => (
            <Link
              key={m}
              to={m}
              smooth
              offset={-60}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300 cursor-pointer transition-colors"
            >
              {m}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-300 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-gray-300"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex flex-col py-2 md:hidden transition-colors duration-300">
          {menu.map((m) => (
            <Link
              key={m}
              to={m}
              smooth
              offset={-60}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300 py-2 text-center transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {m}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
