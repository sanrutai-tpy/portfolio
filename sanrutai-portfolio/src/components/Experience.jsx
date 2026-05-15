import { motion } from "framer-motion";
import { experience } from "../data/portfolioData";

export default function Experience({ openDashboard }) {
  return (
    <section
      id="Experience"
      className="max-w-6xl mx-auto px-6 pt-10 transition-colors duration-300"
    >
      <h2 className="text-3xl text-center font-semibold text-teal-500 dark:text-teal-400 mb-10">
        Experience
      </h2>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <h3 className="text-xl text-teal-500 dark:text-teal-300 font-medium">
              {exp.company}
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              {exp.role} — {exp.duration}
            </p>

            <ul className="list-disc ml-6 mt-3 text-gray-600 dark:text-gray-300 space-y-1">
              {exp.details.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>

            {/* Button Section */}
            {exp.hasDemo && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => openDashboard(exp.demoTarget || "services")}
                  className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium shadow-md transition-all duration-200"
                >
                  View Demo
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}