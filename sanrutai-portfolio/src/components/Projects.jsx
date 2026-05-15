import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import ChickFeedPortfolio from "./ChickFeedPortfolio";

export default function Projects() {
  const [showDemo, setShowDemo] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="Projects" className="max-w-6xl mx-auto px-6 pt-10 transition-colors duration-300">
      <h2 className="text-3xl text-center font-semibold text-teal-500 dark:text-teal-400 mb-10">
        Featured Project
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-300"
      >
        <h3 className="text-2xl text-teal-500 dark:text-teal-300 mb-3">
          Chick Food Mixer Prototype (Thesis 2025)
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Developed a web-based application to control servo motors and monitor
          load cell data using Raspberry Pi, ESP32, Node.js, and Wi-Fi
          communication. Includes dashboard visualization and live monitoring.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="border border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-lg hover:bg-teal-500 hover:text-white transition"
          >
            Case Study
          </button>
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="border border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-500 hover:text-white transition"
          >
            <PlayCircle className="w-5 h-5" />
            {showDemo ? "Hide Demo" : "Live Demo"}
          </button>
          <a href="https://github.com/sanrutai-tpy" target="_blank" rel="noreferrer" className="flex items-center">
            <FaGithub className="w-6 h-6 text-gray-500 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
            <h4 className="text-teal-500 dark:text-teal-300">Servo Motor</h4>
            <p className="text-gray-700 dark:text-gray-200 text-lg">Rotating 45°</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
            <h4 className="text-teal-500 dark:text-teal-300">Load Cell</h4>
            <p className="text-gray-700 dark:text-gray-200 text-lg">Weight: 1.23 kg</p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
            <h4 className="text-teal-500 dark:text-teal-300">Wi-Fi Status</h4>
            <p className="text-green-500 dark:text-green-400 text-lg">Connected</p>
          </div>
        </div>

        {showDemo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <ChickFeedPortfolio externalIsDark={isDark} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
