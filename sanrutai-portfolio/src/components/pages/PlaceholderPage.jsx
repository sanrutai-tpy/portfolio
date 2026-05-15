// PlaceholderPage.jsx — Generic placeholder for unimplemented nav pages
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function PlaceholderPage({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-64 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Construction className="w-6 h-6 text-slate-400" />
      </div>
      <h2 className="text-base font-semibold text-slate-700 mb-1">{title}</h2>
      <p className="text-sm text-slate-400 max-w-xs">
        This section is under development. Navigate to <strong>Dashboard</strong> to see the full demo.
      </p>
    </motion.div>
  );
}
