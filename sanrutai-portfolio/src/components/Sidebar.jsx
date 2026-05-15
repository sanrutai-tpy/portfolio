// Sidebar.jsx — Left navigation panel

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";

import { NAV_ITEMS } from "../constants/navItems";

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 224 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col bg-white border-r border-slate-200 shadow-sm overflow-hidden flex-shrink-0"
    >

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Wrench className="w-4 h-4 text-white" />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
            >
              <p className="text-sm font-bold text-slate-800">
                ServiceMS
              </p>
              <p className="text-[10px] text-slate-400">
                Management System
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
                ${isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}
              `}
            >
              {/* Active bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-600 rounded-r-full" />
              )}

              <Icon className="w-4 h-4 flex-shrink-0" />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

    </motion.aside>
  );
}