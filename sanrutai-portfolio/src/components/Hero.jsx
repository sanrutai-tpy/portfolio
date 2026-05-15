import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="Home"
      className="h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-teal-500 dark:text-teal-400 mb-4"
      >
        Sanrutai Tangpriyarak
      </motion.h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
        Junior Software Developer | React & Frontend Development
      </p>

      <p className="max-w-xl text-gray-500 dark:text-gray-400 mb-6">
        Engineering graduate with hands-on experience in React, frontend
        development, and embedded IoT systems.
      </p>

      <div className="flex gap-4 items-center">
        <a
          href="#Projects"
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition"
        >
          View Projects
        </a>
        <a
          href="#Contact"
          className="border border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400 rounded-lg px-5 py-2 hover:bg-teal-500 hover:text-white transition"
        >
          Contact Me
        </a>
        <a href="https://github.com/sanrutai-tpy" target="_blank" rel="noreferrer">
          <FaGithub className="w-7 h-7 text-gray-500 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
        </a>
      </div>
    </section>
  );
}
