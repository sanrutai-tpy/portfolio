// FilterPanel.jsx — Search & filter controls
import { Search, RotateCcw } from "lucide-react";
import { contractors, serviceTypes, pricingMethods } from "../data/mockData";

export default function FilterPanel({ filters, onChange, onSearch, onReset }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Filter Services</p>
      <div className="flex flex-wrap gap-3 items-end">
        {/* Contractor dropdown */}
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-xs text-slate-500 font-medium">Contractor</label>
          <select
            value={filters.contractor}
            onChange={(e) => onChange("contractor", e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          >
            <option value="">All Contractors</option>
            {contractors.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Service type dropdown */}
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-xs text-slate-500 font-medium">Service Type</label>
          <select
            value={filters.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          >
            <option value="">All Categories</option>
            {serviceTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Pricing method dropdown */}
        <div className="flex flex-col gap-1 min-w-[155px]">
          <label className="text-xs text-slate-500 font-medium">Pricing Method</label>
          <select
            value={filters.pricingMethod}
            onChange={(e) => onChange("pricingMethod", e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          >
            <option value="">All Methods</option>
            {pricingMethods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Status dropdown */}
        <div className="flex flex-col gap-1 min-w-[130px]">
          <label className="text-xs text-slate-500 font-medium">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onChange("status", e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={onSearch}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
