// Charts.jsx — Monthly activity bar chart + revenue line chart + contract status donut
import { motion } from "framer-motion";
import { monthlyActivity, contractStatus } from "../data/mockData";

// ── Bar Chart ────────────────────────────────────────────────
function BarChart() {
  const maxVal = Math.max(...monthlyActivity.map((d) => d.services));
  const W = 480, H = 140, padL = 28, padB = 24, padT = 10, padR = 12;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW   = (chartW / monthlyActivity.length) * 0.55;
  const gap    = chartW / monthlyActivity.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">Monthly Service Activity</p>
          <p className="text-xs text-slate-400">Services logged per month</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">2025</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = padT + chartH * (1 - f);
          return (
            <g key={f}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
              <text x={padL - 4} y={y + 3.5} textAnchor="end" fontSize={8} fill="#94a3b8">
                {Math.round(maxVal * f)}
              </text>
            </g>
          );
        })}
        {/* Bars */}
        {monthlyActivity.map((d, i) => {
          const barH = (d.services / maxVal) * chartH;
          const x    = padL + i * gap + gap / 2 - barW / 2;
          const y    = padT + chartH - barH;
          return (
            <g key={d.month}>
              {/* Base bar (pale) */}
              <rect x={x} y={padT} width={barW} height={chartH} rx={4} fill="#eff6ff" />
              {/* Value bar */}
              <motion.rect
                x={x} y={y} width={barW} height={barH} rx={4}
                fill="url(#barGrad)"
                initial={{ scaleY: 0, transformOrigin: `0 ${padT + chartH}px` }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
              />
              {/* Value label */}
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={8} fill="#3b82f6" fontWeight={600}>
                {d.services}
              </text>
              {/* Month label */}
              <text x={padL + i * gap + gap / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="#94a3b8">
                {d.month}
              </text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────
function LineChart() {
  const W = 480, H = 140, padL = 40, padB = 24, padT = 10, padR = 12;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const revenues = monthlyActivity.map((d) => d.revenue);
  const minR = Math.min(...revenues), maxR = Math.max(...revenues);
  const toX = (i) => padL + (i / (revenues.length - 1)) * chartW;
  const toY = (v) => padT + chartH - ((v - minR) / (maxR - minR)) * chartH;
  const pts = revenues.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
  const areaClose = `L${toX(revenues.length - 1)},${padT + chartH} L${padL},${padT + chartH} Z`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">Revenue Trend</p>
          <p className="text-xs text-slate-400">Monthly active contract revenue (฿)</p>
        </div>
        <span className="text-xs bg-violet-50 text-violet-600 px-2.5 py-1 rounded-full font-medium">6 months</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        {/* Horizontal guides */}
        {[0, 0.5, 1].map((f) => {
          const y = padT + chartH * (1 - f);
          return (
            <g key={f}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
              <text x={padL - 5} y={y + 3.5} textAnchor="end" fontSize={8} fill="#94a3b8">
                {Math.round((minR + (maxR - minR) * f) / 1000)}k
              </text>
            </g>
          );
        })}
        {/* Area fill */}
        <path d={`M${pts} ${areaClose}`} fill="url(#lineAreaGrad)" />
        {/* Line */}
        <motion.polyline
          points={pts} fill="none" stroke="#8b5cf6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {/* Dots */}
        {revenues.map((v, i) => (
          <g key={i}>
            <circle cx={toX(i)} cy={toY(v)} r={3.5} fill="#8b5cf6" />
            <circle cx={toX(i)} cy={toY(v)} r={2} fill="white" />
          </g>
        ))}
        {/* Month labels */}
        {monthlyActivity.map((d, i) => (
          <text key={d.month} x={toX(i)} y={H - 4} textAnchor="middle" fontSize={9} fill="#94a3b8">
            {d.month}
          </text>
        ))}
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────
function DonutChart() {
  const total = contractStatus.reduce((s, d) => s + d.value, 0);
  const R = 52, cx = 70, cy = 70, stroke = 20;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  const slices = contractStatus.map((d) => {
    const pct   = d.value / total;
    const dash  = pct * circumference;
    const slice = { ...d, dashArray: `${dash} ${circumference - dash}`, dashOffset: -offset };
    offset += dash;
    return slice;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-700">Contract Status</p>
        <p className="text-xs text-slate-400">Breakdown by current status</p>
      </div>
      <div className="flex items-center gap-6">
        <svg width={140} height={140} viewBox="0 0 140 140" className="flex-shrink-0">
          {/* Track */}
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
          {slices.map((s, i) => (
            <motion.circle
              key={s.label}
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={s.dashArray}
              strokeDashoffset={s.dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            />
          ))}
          {/* Center label */}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1e293b">{total}</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize={9} fill="#94a3b8">Total</text>
        </svg>
        {/* Legend */}
        <div className="space-y-3">
          {contractStatus.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <div>
                <p className="text-xs font-medium text-slate-700">{d.label}</p>
                <p className="text-[10px] text-slate-400">{d.value} contracts · {Math.round((d.value / total) * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1"><BarChart /></div>
      <div className="lg:col-span-1"><LineChart /></div>
      <div className="lg:col-span-1"><DonutChart /></div>
    </div>
  );
}
