// ServiceTable.jsx — Sortable, paginated data table for services
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronsUpDown, Eye, Pencil, Trash2, Search } from "lucide-react";

// ── Status Badge ──────────────────────────────────────────────
const STATUS_STYLES = {
  Active:  "bg-green-50 text-green-700 border border-green-200",
  Expired: "bg-orange-50 text-orange-700 border border-orange-200",
  Pending: "bg-blue-50 text-blue-700 border border-blue-200",
};

function StatusBadge({ status }) {
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

// ── Sort Icon ─────────────────────────────────────────────────
function SortIcon({ col, sortBy, dir }) {
  if (sortBy !== col) return <ChevronsUpDown className="w-3 h-3 text-slate-300" />;
  return dir === "asc"
    ? <ChevronUp className="w-3 h-3 text-blue-500" />
    : <ChevronDown className="w-3 h-3 text-blue-500" />;
}

// ── Columns definition ────────────────────────────────────────
const COLUMNS = [
  { key: "name",          label: "Service Name",   sortable: true  },
  { key: "contractor",    label: "Contractor",      sortable: true  },
  { key: "category",      label: "Category",        sortable: true  },
  { key: "startDate",     label: "Start Date",      sortable: true  },
  { key: "endDate",       label: "End Date",        sortable: true  },
  { key: "price",         label: "Price (฿/mo)",    sortable: true  },
  { key: "status",        label: "Status",          sortable: true  },
  { key: "actions",       label: "Actions",         sortable: false },
];

const PAGE_SIZE_OPTIONS = [5, 10, 15];

export default function ServiceTable({ data }) {
  const [search,   setSearch]   = useState("");
  const [sortBy,   setSortBy]   = useState("name");
  const [sortDir,  setSortDir]  = useState("asc");
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Handle column sort click
  const handleSort = (col) => {
    if (!COLUMNS.find((c) => c.key === col)?.sortable) return;
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
    setPage(1);
  };

  // Filter + sort
  const processed = useMemo(() => {
    let rows = [...data];
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.contractor.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }
    // Sort
    rows.sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [data, search, sortBy, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const pageData   = processed.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <div>
          <p className="text-sm font-semibold text-slate-700">Service Records</p>
          <p className="text-xs text-slate-400">{processed.length} records found</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search within table */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search table…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-36"
            />
          </div>
          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(+e.target.value); setPage(1); }}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white focus:outline-none"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>Show {n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap select-none
                    ${col.sortable ? "cursor-pointer hover:text-slate-700 hover:bg-slate-100 transition-colors" : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon col={col.key} sortBy={sortBy} dir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="text-center py-12 text-slate-400 text-sm">
                  No records match your search.
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  {/* Service Name */}
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-800 text-sm">{row.name}</span>
                  </td>
                  {/* Contractor */}
                  <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{row.contractor}</td>
                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {row.category}
                    </span>
                  </td>
                  {/* Start Date */}
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{row.startDate}</td>
                  {/* End Date */}
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{row.endDate}</td>
                  {/* Price */}
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    ฿{row.price.toLocaleString()}
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-400">
          Showing {Math.min((page - 1) * pageSize + 1, processed.length)}–{Math.min(page * pageSize, processed.length)} of {processed.length} records
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-white transition-colors"
          >«</button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2.5 py-1 text-xs rounded border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-white transition-colors"
          >‹</button>
          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-slate-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                    page === p
                      ? "bg-blue-600 border-blue-600 text-white font-semibold"
                      : "border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2.5 py-1 text-xs rounded border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-white transition-colors"
          >›</button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-white transition-colors"
          >»</button>
        </div>
      </div>
    </div>
  );
}
