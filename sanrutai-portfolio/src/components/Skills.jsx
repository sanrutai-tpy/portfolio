import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";

const SkillCard = ({ title, list }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
  >
    <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400 mb-3">{title}</h3>
    <ul className="flex flex-wrap gap-2">
      {list.map((item) => (
        <li
          key={item}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm transition-colors duration-300"
        >
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Skills() {
  return (
    <section id="Skills" className="max-w-6xl mx-auto px-6 pt-10 transition-colors duration-300">
      <h2 className="text-3xl text-center font-semibold text-teal-500 dark:text-teal-400 mb-8">
        Skills
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, list]) => (
          <SkillCard key={category} title={category} list={list} />
        ))}
      </div>
    </section>
  );
}
