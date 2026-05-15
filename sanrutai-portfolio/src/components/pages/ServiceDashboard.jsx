// ServiceDashboard.jsx — Main page combining all dashboard sections
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardCards from "../DashboardCards";
import Charts        from "../Charts";
import FilterPanel   from "../FilterPanel";
import ServiceTable  from "../ServiceTable";
import { services }  from "../../data/mockData";

const EMPTY_FILTERS = { contractor: "", category: "", pricingMethod: "", status: "" };

export default function ServiceDashboard() {
  const [filters,  setFilters]  = useState(EMPTY_FILTERS);
  const [applied,  setApplied]  = useState(EMPTY_FILTERS);

  const handleChange = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  const handleSearch = () => setApplied({ ...filters });

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
  };

  // Apply filters to services data
  const filtered = services.filter((s) => {
    if (applied.contractor   && s.contractor   !== applied.contractor)   return false;
    if (applied.category     && s.category     !== applied.category)     return false;
    if (applied.pricingMethod && s.pricingMethod !== applied.pricingMethod) return false;
    if (applied.status       && s.status       !== applied.status)       return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* ── KPI Cards ── */}
      <DashboardCards />

      {/* ── Charts ── */}
      <Charts />

      {/* ── Filter Panel ── */}
      <FilterPanel
        filters={filters}
        onChange={handleChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* ── Data Table ── */}
      <ServiceTable data={filtered} />
    </motion.div>
  );
}
