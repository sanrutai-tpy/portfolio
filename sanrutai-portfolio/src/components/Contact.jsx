import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Contact() {
  const info = [
    { icon: <Mail />, text: "sanrutai.tpy@gmail.com" },
    { icon: <Phone />, text: "+95 982 7860" },
    { icon: <FaGithub />, text: "github.com/sanrutai-tpy" },
    { icon: <MessageCircle />, text: "Line ID: lupin.srt" },
  ];

  return (
    <section id="Contact" className="max-w-5xl mx-auto text-center px-6 pt-10 transition-colors duration-300">
      <h2 className="text-3xl font-semibold text-teal-500 dark:text-teal-400 mb-6">Contact</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-10">
        Feel free to reach out for collaboration or opportunities.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {info.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-center items-center gap-3 transition-colors duration-300"
          >
            <span className="text-teal-500 dark:text-teal-400">{c.icon}</span>
            <span className="text-gray-700 dark:text-gray-200">{c.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
