import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="About" className="max-w-5xl mx-auto px-6 pt-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-teal-500 dark:text-teal-400 text-center mb-6"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          🎓 Engineering graduate from{" "}
          <b>Suan Sunandha Rajabhat University (2020–2025)</b>.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          💻 Experienced in frontend development and responsive web
          applications.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          🚀 Interested in Frontend Development, Full-stack Development, and IoT
          systems.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          💡 Passionate about problem-solving and continuous learning.
        </p>
      </motion.div>
    </section>
  );
}
