/**
 * Chick Food Mixer Prototype — Portfolio Showcase
 * Demo version using mock data only (no backend required)
 * Author: SleptDino | Thesis Project Portfolio Piece
 *
 * Features: Dark / Light theme toggle
 */

import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─────────────────────────────────────────────
// Theme Tokens — Dark & Light
// ─────────────────────────────────────────────
const DARK = {
  bg0:    "#0b0f1a",
  bg1:    "#111827",
  bg2:    "#1a2235",
  bg3:    "#1f2d42",
  border: "rgba(99,179,237,0.12)",
  accent: "#38bdf8",
  accent2:"#6ee7b7",
  accent3:"#f59e0b",
  text:   "#e2e8f0",
  muted:  "#8899b0",
  green:  "#34d399",
  red:    "#f87171",
  yellow: "#fbbf24",
  shadow: "none",
  chartGrid: "rgba(99,179,237,0.08)",
};

const LIGHT = {
  bg0:    "#f0f4f8",
  bg1:    "#ffffff",
  bg2:    "#ffffff",
  bg3:    "#f1f5f9",
  border: "rgba(14,116,144,0.14)",
  accent: "#0ea5e9",
  accent2:"#10b981",
  accent3:"#d97706",
  text:   "#0f172a",
  muted:  "#64748b",
  green:  "#10b981",
  red:    "#ef4444",
  yellow: "#d97706",
  shadow: "0 1px 4px rgba(0,0,0,0.07)",
  chartGrid: "rgba(14,116,144,0.08)",
};

// ─────────────────────────────────────────────
// Theme Context
// ─────────────────────────────────────────────
const ThemeCtx = createContext({ C: DARK, isDark: true, toggle: () => {} });
const useTheme = () => useContext(ThemeCtx);

// ─────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────
const BASE_SENSOR = {
  riceBran: 3.4, brokenRice: 5.2, chickFeed: 1.8,
  servoStatus: "Running", systemStatus: "Online",
  temperature: 29, mixingProgress: 72,
  humidity: 64, motorRPM: 1420, uptime: "04:32:17",
};
const BRAN_HISTORY = [2.8, 3.0, 3.1, 3.4, 3.2, 3.5, 3.4];
const RICE_HISTORY = [4.9, 5.0, 5.1, 5.0, 5.2, 5.3, 5.2];
const FEED_HISTORY = [1.5, 1.6, 1.7, 1.8, 1.7, 1.9, 1.8];

// ─────────────────────────────────────────────
// Theme Toggle Button (used in sidebar & login)
// ─────────────────────────────────────────────
const ThemeToggle = () => {
  const { C, isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 12px", borderRadius: 999,
        background: isDark ? C.bg3 : "#e0f2fe",
        border: `1px solid ${C.border}`,
        color: C.text, fontSize: 12, fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit",
        transition: "all 0.25s",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 15 }}>{isDark ? "☀️" : "🌙"}</span>
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

// ─────────────────────────────────────────────
// Reusable Primitives
// ─────────────────────────────────────────────
const Card = ({ children, style = {}, glow }) => {
  const { C } = useTheme();
  return (
    <div style={{
      background: C.bg2,
      border: `1px solid ${glow ? C.accent + "55" : C.border}`,
      borderRadius: 16,
      padding: "1.25rem 1.5rem",
      boxShadow: glow ? `0 0 24px ${C.accent}22` : C.shadow,
      transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      ...style,
    }}>
      {children}
    </div>
  );
};

const Badge = ({ children, color }) => {
  const { C } = useTheme();
  const c = color || C.accent;
  return (
    <span style={{
      background: c + "22", color: c,
      border: `1px solid ${c}44`, borderRadius: 999,
      padding: "2px 10px", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.06em", textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
};

const StatusDot = ({ online }) => {
  const { C } = useTheme();
  const col = online ? C.green : C.red;
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8,
      borderRadius: "50%", background: col,
      marginRight: 6, boxShadow: `0 0 6px ${col}`,
    }} />
  );
};

const ProgressBar = ({ value, color, label }) => {
  const { C } = useTheme();
  const c = color || C.accent;
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
          <span style={{ fontSize: 12, color: C.text }}>{value}%</span>
        </div>
      )}
      <div style={{ height: 6, background: C.bg3, borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%",
          background: `linear-gradient(90deg, ${c}88, ${c})`,
          borderRadius: 999,
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
};

const WeightGauge = ({ value, max, label, color }) => {
  const { C } = useTheme();
  const r = 36, circ = 2 * Math.PI * r;
  const dash = Math.min(value / max, 1) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle cx={45} cy={45} r={r} fill="none" stroke={C.bg3} strokeWidth={7} />
        <circle cx={45} cy={45} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text x={45} y={48} textAnchor="middle" fill={C.text} fontSize={13} fontWeight={600}>{value}</text>
        <text x={45} y={60} textAnchor="middle" fill={C.muted} fontSize={9}>kg</text>
      </svg>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{label}</div>
    </div>
  );
};

const Sparkline = ({ data, color, height = 40 }) => {
  const w = 120, h = height;
  const mn = Math.min(...data), mx = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - mn) / (mx - mn || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <path d={`M${pts.join(" L")} L${w},${h} L0,${h} Z`} fill={color + "22"} />
      <path d={`M${pts.join(" L")}`} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

// ─────────────────────────────────────────────
// Page: Login
// ─────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const { C, isDark } = useTheme();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!user || !pass) { setError("Please fill in both fields."); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: C.bg3, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "10px 14px",
    color: C.text, fontSize: 14, outline: "none",
    fontFamily: "inherit", transition: "background 0.3s, border-color 0.3s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Mono', monospace",
      transition: "background 0.3s",
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${C.accent}08 1px, transparent 1px),
                          linear-gradient(90deg, ${C.accent}08 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Theme toggle — top right */}
      <div style={{ position: "fixed", top: 20, right: 24, zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div style={{ width: "100%", maxWidth: 400, padding: "0 1.5rem", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: "0 auto 1rem",
            background: C.accent + "22", border: `1.5px solid ${C.accent}55`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
          }}>🐥</div>
          <h1 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            ChickFeed Mixer
          </h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>
            Prototype Control System · Demo Mode
          </p>
          <div style={{ marginTop: 8 }}>
            <Badge color={C.accent2}>● System Online</Badge>
          </div>
        </div>

        <Card glow>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Username</label>
            <input value={user} onChange={e => setUser(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="admin" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••" style={inputStyle} />
          </div>
          {error && <p style={{ color: C.red, fontSize: 12, margin: "-0.75rem 0 1rem", textAlign: "center" }}>{error}</p>}
          <button onClick={handleSubmit} style={{
            width: "100%", padding: "12px", borderRadius: 10,
            background: loading ? C.accent + "66" : C.accent,
            border: "none", color: isDark ? "#0b0f1a" : "#ffffff",
            fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", letterSpacing: "0.04em", transition: "all 0.2s",
          }}>
            {loading ? "Authenticating…" : "Sign In"}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: "1rem" }}>
            Demo mode — any credentials accepted
          </p>
        </Card>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
          {["Raspberry Pi","ESP32","Node.js","HX711","Servo"].map(t => (
            <span key={t} style={{
              fontSize: 10, color: C.muted, background: C.bg2,
              border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 8px",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────
const NAV = [
  { id: "dashboard",  label: "Dashboard",    icon: "⊞" },
  { id: "control",    label: "Feed Control", icon: "⚙" },
  { id: "monitoring", label: "Monitoring",   icon: "📡" },
];

const Sidebar = ({ active, onNav, onLogout, sensorData }) => {
  const { C } = useTheme();
  return (
    <aside style={{
      width: 230, flexShrink: 0,
      background: C.bg1, borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      fontFamily: "'IBM Plex Mono', monospace",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🐥</span>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>ChickFeed</div>
            <div style={{ color: C.muted, fontSize: 10 }}>Mixer Control</div>
          </div>
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
          <StatusDot online={sensorData.systemStatus === "Online"} />
          <span style={{ fontSize: 11, color: C.muted }}>System {sensorData.systemStatus}</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "0.75rem 0" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => onNav(n.id)} style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "10px 1.25rem",
            background: active === n.id ? C.accent + "18" : "transparent",
            border: "none", borderLeft: `2px solid ${active === n.id ? C.accent : "transparent"}`,
            color: active === n.id ? C.accent : C.muted,
            fontSize: 13, fontWeight: active === n.id ? 600 : 400,
            cursor: "pointer", textAlign: "left",
            fontFamily: "inherit", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 14 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: "0.75rem 1.25rem", borderTop: `1px solid ${C.border}` }}>
        {/* Theme toggle inside sidebar */}
        <ThemeToggle />
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, color: C.muted }}>UPTIME</div>
          <div style={{ fontSize: 14, color: C.accent, fontWeight: 600 }}>{sensorData.uptime}</div>
        </div>
        <button onClick={onLogout} style={{
          marginTop: 10, width: "100%", padding: "8px",
          background: "transparent", border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.muted, fontSize: 12,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          ⎋ Sign Out
        </button>
      </div>
    </aside>
  );
};

// ─────────────────────────────────────────────
// Page: Dashboard
// ─────────────────────────────────────────────
const Dashboard = ({ data }) => {
  const { C } = useTheme();
  const weights = [
    { label: "Rice Bran",   value: data.riceBran,   max: 10, color: C.accent,  hist: BRAN_HISTORY },
    { label: "Broken Rice", value: data.brokenRice, max: 10, color: C.accent2, hist: RICE_HISTORY },
    { label: "Chick Feed",  value: data.chickFeed,  max: 10, color: C.accent3, hist: FEED_HISTORY },
  ];
  return (
    <div style={{ padding: "1.5rem", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: C.text, margin: 0, fontSize: 20, fontWeight: 700 }}>System Dashboard</h2>
        <p style={{ color: C.muted, margin: "4px 0 0", fontSize: 12 }}>
          Last updated: {new Date().toLocaleTimeString()} · Demo Mode
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.25rem" }}>
        {[
          { label: "System Status", value: data.systemStatus, color: C.green },
          { label: "Servo",         value: data.servoStatus,  color: C.accent },
          { label: "Temperature",   value: `${data.temperature}°C`, color: C.accent3 },
          { label: "Humidity",      value: `${data.humidity}%`,     color: C.accent2 },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: s.color }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Load Cell Readings</div>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {weights.map(w => (
            <div key={w.label} style={{ textAlign: "center" }}>
              <WeightGauge value={w.value} max={w.max} label={w.label} color={w.color} />
              <div style={{ marginTop: 8 }}><Sparkline data={w.hist} color={w.color} /></div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
        <Card glow>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Mixing Progress</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.accent, marginBottom: 8 }}>{data.mixingProgress}%</div>
          <ProgressBar value={data.mixingProgress} color={C.accent} />
          <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
            {data.mixingProgress < 100 ? "Batch in progress…" : "Batch complete ✓"}
          </p>
        </Card>
        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Motor RPM</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.accent2 }}>{data.motorRPM}</div>
          <ProgressBar value={(data.motorRPM / 2000) * 100} color={C.accent2} />
          <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>Target: 1500 RPM · ESP32 PWM</p>
        </Card>
      </div>

      <Card>
        <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>System Log</div>
        {[
          { t: "11:02:41", msg: "Servo motor started — batch #7",       type: "info" },
          { t: "11:01:18", msg: "Load cell calibration OK",             type: "ok" },
          { t: "10:58:03", msg: "Wi-Fi reconnected (192.168.1.45)",     type: "warn" },
          { t: "10:50:00", msg: "Batch #6 completed — 1.8 kg produced", type: "ok" },
          { t: "10:44:31", msg: "System boot via Raspberry Pi",         type: "info" },
        ].map((e, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, padding: "6px 0", fontSize: 11,
            borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
          }}>
            <span style={{ color: C.muted, flexShrink: 0 }}>{e.t}</span>
            <span style={{ color: e.type === "ok" ? C.green : e.type === "warn" ? C.yellow : C.text }}>{e.msg}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────
// Page: Feed Control
// ─────────────────────────────────────────────
const FeedControl = ({ data, onUpdate }) => {
  const { C, isDark } = useTheme();
  const [ratio, setRatio] = useState({ bran: 50, rice: 35, feed: 15 });
  const [amount, setAmount] = useState(5.0);
  const [schedTime, setSchedTime] = useState("06:00");
  const [servoRunning, setServoRunning] = useState(false);
  const [servoMsg, setServoMsg] = useState("");
  const [schedActive, setSchedActive] = useState(false);
  const ratioTotal = ratio.bran + ratio.rice + ratio.feed;

  const startServo = () => {
    setServoRunning(true);
    setServoMsg("Servo command sent via Wi-Fi to ESP32…");
    onUpdate({ servoStatus: "Running", mixingProgress: 0 });
    let p = 0;
    const iv = setInterval(() => {
      p += 5;
      onUpdate({ mixingProgress: Math.min(p, 100) });
      if (p >= 100) {
        clearInterval(iv);
        setServoRunning(false);
        setServoMsg("✓ Batch complete — servo stopped.");
        onUpdate({ servoStatus: "Idle" });
      }
    }, 400);
  };

  const stopServo = () => {
    setServoRunning(false);
    setServoMsg("⛔ Emergency stop sent to ESP32.");
    onUpdate({ servoStatus: "Stopped" });
  };

  return (
    <div style={{ padding: "1.5rem", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ color: C.text, margin: 0, fontSize: 20, fontWeight: 700 }}>Feed Control</h2>
        <p style={{ color: C.muted, margin: "4px 0 0", fontSize: 12 }}>Servo & ratio management · Simulated</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Feed Ratio Settings</div>
          {[
            { key: "bran", label: "Rice Bran",   color: C.accent },
            { key: "rice", label: "Broken Rice",  color: C.accent2 },
            { key: "feed", label: "Chick Feed",   color: C.accent3 },
          ].map(r => (
            <div key={r.key} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <label style={{ fontSize: 12, color: C.text }}>{r.label}</label>
                <span style={{ fontSize: 12, color: r.color, fontWeight: 600 }}>{ratio[r.key]}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={ratio[r.key]}
                onChange={e => setRatio(prev => ({ ...prev, [r.key]: +e.target.value }))}
                style={{ width: "100%", accentColor: r.color }} />
            </div>
          ))}
          <div style={{
            background: C.bg3, borderRadius: 8, padding: "8px 12px",
            fontSize: 11, color: ratioTotal === 100 ? C.green : C.red,
          }}>
            Total: {ratioTotal}% {ratioTotal === 100 ? "✓ Valid" : "⚠ Must sum to 100"}
          </div>
        </Card>

        <Card glow={servoRunning}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Servo Motor Control</div>
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", margin: "0 auto 10px",
              background: C.bg3, border: `2px solid ${servoRunning ? C.accent : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
              boxShadow: servoRunning ? `0 0 20px ${C.accent}44` : "none",
              animation: servoRunning ? "spin 1s linear infinite" : "none",
            }}>⚙</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <Badge color={servoRunning ? C.green : C.muted}>
              {servoRunning ? "● Running" : "● Idle"}
            </Badge>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: "1rem" }}>
            <button onClick={startServo} disabled={servoRunning} style={{
              flex: 1, padding: "10px", borderRadius: 10,
              background: servoRunning ? C.bg3 : C.accent,
              border: "none", color: servoRunning ? C.muted : (isDark ? "#0b0f1a" : "#fff"),
              fontSize: 12, fontWeight: 700, cursor: servoRunning ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}>▶ Start Mix</button>
            <button onClick={stopServo} disabled={!servoRunning} style={{
              flex: 1, padding: "10px", borderRadius: 10,
              background: !servoRunning ? C.bg3 : C.red + "22",
              border: `1px solid ${!servoRunning ? C.border : C.red + "66"}`,
              color: !servoRunning ? C.muted : C.red,
              fontSize: 12, fontWeight: 700, cursor: !servoRunning ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}>■ Stop</button>
          </div>
          {servoMsg && <p style={{ fontSize: 11, color: C.muted, marginTop: 8, textAlign: "center" }}>{servoMsg}</p>}
        </Card>

        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Feed Amount Target</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.accent3, marginBottom: 8 }}>
            {amount.toFixed(1)} <span style={{ fontSize: 16, color: C.muted }}>kg</span>
          </div>
          <input type="range" min={0.5} max={20} step={0.5} value={amount}
            onChange={e => setAmount(+e.target.value)}
            style={{ width: "100%", accentColor: C.accent3 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginTop: 4 }}>
            <span>0.5 kg</span><span>20 kg</span>
          </div>
          <div style={{ marginTop: "1rem", fontSize: 11, color: C.muted }}>
            <div>Rice Bran: <strong style={{ color: C.accent }}>{(amount * ratio.bran / 100).toFixed(2)} kg</strong></div>
            <div>Broken Rice: <strong style={{ color: C.accent2 }}>{(amount * ratio.rice / 100).toFixed(2)} kg</strong></div>
            <div>Chick Feed: <strong style={{ color: C.accent3 }}>{(amount * ratio.feed / 100).toFixed(2)} kg</strong></div>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Auto Schedule</div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4 }}>Daily Mixing Time</label>
            <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)}
              style={{
                background: C.bg3, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "8px 12px",
                color: C.text, fontSize: 14, fontFamily: "inherit", outline: "none",
              }} />
          </div>
          <button onClick={() => setSchedActive(v => !v)} style={{
            width: "100%", padding: "10px",
            background: schedActive ? C.accent2 + "22" : C.bg3,
            border: `1px solid ${schedActive ? C.accent2 + "66" : C.border}`,
            borderRadius: 10, color: schedActive ? C.accent2 : C.muted,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>
            {schedActive ? `✓ Scheduled at ${schedTime}` : "Enable Schedule"}
          </button>
          {schedActive && (
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
              System will auto-start mixing at {schedTime} daily via Raspberry Pi cron.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Page: Monitoring
// ─────────────────────────────────────────────
const Monitoring = ({ data }) => {
  const { C } = useTheme();
  const [chartData, setChartData] = useState({
    bran: [...BRAN_HISTORY], rice: [...RICE_HISTORY], feed: [...FEED_HISTORY],
    labels: ["10:00","10:10","10:20","10:30","10:40","10:50","11:00"],
  });
  const canvasRef = useRef();

  useEffect(() => {
    const iv = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      const j = () => (Math.random() - 0.5) * 0.3;
      setChartData(prev => ({
        bran:   [...prev.bran.slice(-6),   +(prev.bran.at(-1)  + j()).toFixed(2)],
        rice:   [...prev.rice.slice(-6),   +(prev.rice.at(-1)  + j()).toFixed(2)],
        feed:   [...prev.feed.slice(-6),   +(prev.feed.at(-1)  + j()).toFixed(2)],
        labels: [...prev.labels.slice(-6), now],
      }));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  // Re-draw chart when data OR theme changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 580, H = 200;
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    const pL = 36, pR = 16, pT = 16, pB = 28;
    const cW = W - pL - pR, cH = H - pT - pB;
    const series = [
      { data: chartData.bran, color: C.accent },
      { data: chartData.rice, color: C.accent2 },
      { data: chartData.feed, color: C.accent3 },
    ];
    const all = series.flatMap(s => s.data);
    const mn = Math.min(...all) - 0.3, mx = Math.max(...all) + 0.3;
    const n = chartData.bran.length;

    ctx.strokeStyle = C.chartGrid; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pT + (cH / 4) * i;
      ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(pL + cW, y); ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = "9px monospace"; ctx.textAlign = "right";
      ctx.fillText((mx - ((mx - mn) / 4) * i).toFixed(1), pL - 4, y + 3);
    }
    chartData.labels.forEach((l, i) => {
      ctx.fillStyle = C.muted; ctx.font = "9px monospace"; ctx.textAlign = "center";
      ctx.fillText(l, pL + (cW / (n - 1)) * i, H - 6);
    });
    series.forEach(s => {
      const pts = s.data.map((v, i) => ({
        x: pL + (cW / (n - 1)) * i,
        y: pT + cH - ((v - mn) / (mx - mn)) * cH,
      }));
      ctx.beginPath(); ctx.moveTo(pts[0].x, pT + cH);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts.at(-1).x, pT + cH); ctx.closePath();
      ctx.fillStyle = s.color + "18"; ctx.fill();
      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.stroke();
      const last = pts.at(-1);
      ctx.beginPath(); ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = s.color; ctx.fill();
    });
  }, [chartData, C]);

  return (
    <div style={{ padding: "1.5rem", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: C.text, margin: 0, fontSize: 20, fontWeight: 700 }}>Live Monitoring</h2>
          <p style={{ color: C.muted, margin: "4px 0 0", fontSize: 12 }}>Simulated sensor stream · updates every 2.5s</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: C.green,
            display: "inline-block", boxShadow: `0 0 8px ${C.green}`,
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
          <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }`}</style>
          <span style={{ fontSize: 12, color: C.green }}>Live</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.25rem" }}>
        {[
          { label: "Rice Bran",   value: data.riceBran,   color: C.accent,  hist: chartData.bran },
          { label: "Broken Rice", value: data.brokenRice, color: C.accent2, hist: chartData.rice },
          { label: "Chick Feed",  value: data.chickFeed,  color: C.accent3, hist: chartData.feed },
        ].map(s => (
          <Card key={s.label} style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>
              {s.hist.at(-1)?.toFixed(2)} <span style={{ fontSize: 12, color: C.muted }}>kg</span>
            </div>
            <div style={{ marginTop: 6 }}><Sparkline data={s.hist} color={s.color} height={36} /></div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Weight History</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Rice Bran", C.accent], ["Broken Rice", C.accent2], ["Chick Feed", C.accent3]].map(([l, c]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: C.muted }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />{l}
              </span>
            ))}
          </div>
        </div>
        <canvas ref={canvasRef} width={580} height={200} style={{ width: "100%", height: 200, display: "block" }} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Sensor Health</div>
          {[
            { label: "HX711 Load Cell A", status: true,  reading: `${data.riceBran} kg` },
            { label: "HX711 Load Cell B", status: true,  reading: `${data.brokenRice} kg` },
            { label: "HX711 Load Cell C", status: true,  reading: `${data.chickFeed} kg` },
            { label: "ESP32 Wi-Fi",       status: true,  reading: "192.168.1.45" },
            { label: "Servo Encoder",     status: data.servoStatus === "Running", reading: `${data.motorRPM} RPM` },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "5px 0", borderBottom: `1px solid ${C.border}`, fontSize: 11,
            }}>
              <span style={{ color: C.text, display: "flex", alignItems: "center" }}>
                <StatusDot online={s.status} />{s.label}
              </span>
              <span style={{ color: C.muted }}>{s.reading}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Environment</div>
          {[
            { label: "Temperature", value: data.temperature, unit: "°C", max: 50,  color: C.accent3 },
            { label: "Humidity",    value: data.humidity,    unit: "%",  max: 100, color: C.accent2 },
            { label: "Mixing",      value: data.mixingProgress, unit: "%", max: 100, color: C.accent },
          ].map(e => (
            <div key={e.label} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                <span style={{ color: C.text }}>{e.label}</span>
                <span style={{ color: e.color }}>{e.value}{e.unit}</span>
              </div>
              <ProgressBar value={(e.value / e.max) * 100} color={e.color} />
            </div>
          ))}
          <div style={{ marginTop: "0.75rem", padding: "8px 10px", background: C.bg3, borderRadius: 8, fontSize: 10, color: C.muted }}>
            Pi CPU: 34°C · RAM: 412 MB / 1 GB · Wi-Fi: -68 dBm
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  // Auto-sync กับ Navbar toggle โดยฟัง html class เปลี่ยน
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const [page, setPage] = useState("login");
  const [nav,  setNav]  = useState("dashboard");
  const [sensor, setSensor] = useState(BASE_SENSOR);

  const C = isDark ? DARK : LIGHT;
  const toggle = () => setIsDark(v => !v);

  const tick = useRef(0);
  useEffect(() => {
    if (page !== "app") return;
    const iv = setInterval(() => {
      tick.current++;
      setSensor(prev => ({
        ...prev,
        riceBran:    +(prev.riceBran    + (Math.random() - 0.5) * 0.05).toFixed(2),
        brokenRice:  +(prev.brokenRice  + (Math.random() - 0.5) * 0.05).toFixed(2),
        chickFeed:   +(prev.chickFeed   + (Math.random() - 0.5) * 0.03).toFixed(2),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity:    +(prev.humidity    + (Math.random() - 0.5) * 0.3).toFixed(1),
        uptime: (() => {
          const d = new Date(0);
          d.setSeconds(tick.current * 3 + 16337);
          return d.toISOString().substr(11, 8);
        })(),
      }));
    }, 3000);
    return () => clearInterval(iv);
  }, [page]);

  return (
    <ThemeCtx.Provider value={{ C, isDark, toggle }}>
      <div style={{
        minHeight: "100vh", background: C.bg0,
        transition: "background 0.3s",
        fontFamily: "'IBM Plex Mono', monospace",
      }}>
        {page === "login" ? (
          <Login onLogin={() => setPage("app")} />
        ) : (
          <div style={{ display: "flex", minHeight: "100vh", color: C.text }}>
            <Sidebar
              active={nav} onNav={setNav}
              onLogout={() => setPage("login")}
              sensorData={sensor}
            />
            <main style={{
              flex: 1, overflowY: "auto", maxHeight: "100vh",
              background: C.bg0, transition: "background 0.3s",
            }}>
              {nav === "dashboard"  && <Dashboard data={sensor} />}
              {nav === "control"    && <FeedControl data={sensor} onUpdate={u => setSensor(p => ({ ...p, ...u }))} />}
              {nav === "monitoring" && <Monitoring data={sensor} />}
            </main>
          </div>
        )}
      </div>
    </ThemeCtx.Provider>
  );
}