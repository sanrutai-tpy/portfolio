import { motion } from "framer-motion";
import { research } from "../data/portfolioData";
import certificate from "../assets/certificate.jpg";

export default function Research() {
  return (
    <section
      id="Research"
      className="max-w-6xl mx-auto px-6 pt-10 transition-colors duration-300"
    >
      <h2 className="text-3xl text-center font-semibold text-teal-500 dark:text-teal-400 mb-10">
        Research & Conferences
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {research.map((r, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            {/* Certificate Image */}
            <div>
              <img
                src={certificate}
                alt="ICPEI 2025 Certificate"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
            <h3 className="text-xl text-teal-500 dark:text-teal-300 mb-2">
              {r.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-2">{r.event}</p>
            <p className="text-gray-600 dark:text-gray-300">{r.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
