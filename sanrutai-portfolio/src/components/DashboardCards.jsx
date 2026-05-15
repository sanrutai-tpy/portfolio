// DashboardCards.jsx — Summary KPI stat cards
import { motion } from "framer-motion";
import { Wrench, FileCheck, TrendingUp, Users } from "lucide-react";
import { services, contractors } from "../data/mockData";

// Compute stats from mock data
const totalServices   = services.length;
const activeContracts = services.filter((s) => s.status === "Active").length;
const monthlyRevenue  = services
  .filter((s) => s.status === "Active")
  .reduce((sum, s) => sum + s.price, 0);
const totalContractors = contractors.length;

const CARDS = [
  {
    label:   "Total Services",
    value:   totalServices,
    icon:    Wrench,
    color:   "blue",
    trend:   "+3 this month",
    positive: true,
  },
  {
    label:   "Active Contracts",
    value:   activeContracts,
    icon:    FileCheck,
    color:   "green",
    trend:   "+1 this week",
    positive: true,
  },
  {
    label:   "Monthly Revenue",
    value:   `฿${monthlyRevenue.toLocaleString()}`,
    icon:    TrendingUp,
    color:   "violet",
    trend:   "+8.2% vs last month",
    positive: true,
  },
  {
    label:   "Total Contractors",
    value:   totalContractors,
    icon:    Users,
    color:   "amber",
    trend:   "No change",
    positive: null,
  },
];

// Color map for Tailwind (must be static strings for purge to work)
const COLOR_MAP = {
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-100",   text: "text-blue-600",   trend: "text-blue-500"  },
  green:  { bg: "bg-green-50",  icon: "bg-green-100",  text: "text-green-600",  trend: "text-green-500" },
  violet: { bg: "bg-violet-50", icon: "bg-violet-100", text: "text-violet-600", trend: "text-violet-500"},
  amber:  { bg: "bg-amber-50",  icon: "bg-amber-100",  text: "text-amber-600",  trend: "text-slate-400" },
};

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card, i) => {
        const c = COLOR_MAP[card.color];
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg ${c.icon} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${c.text}`} />
              </div>
              {/* Sparkline placeholder dots */}
              <div className="flex items-end gap-0.5 h-6">
                {[3, 5, 4, 6, 5, 7, 6].map((h, idx) => (
                  <div
                    key={idx}
                    className={`w-1 rounded-sm ${c.bg} opacity-70`}
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 leading-none mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {card.value}
            </p>
            <p className="text-xs text-slate-500 mb-2">{card.label}</p>
            <p className={`text-[10px] font-medium ${card.positive ? c.trend : "text-slate-400"}`}>
              {card.trend}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
