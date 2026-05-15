// Header.jsx — Top navigation bar with profile and notifications
import { Bell, Search } from "lucide-react";
import { useState } from "react";

export default function Header({ pageTitle }) {
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, text: "Contract #007 expires in 7 days",       time: "2m ago",  dot: "bg-orange-400" },
    { id: 2, text: "New service request from NorthStar Eng.", time: "1h ago",  dot: "bg-blue-400" },
    { id: 3, text: "Monthly report is ready to download",    time: "3h ago",  dot: "bg-green-400" },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Page title */}
      <div>
        <h1 className="text-base font-semibold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {pageTitle}
        </h1>
        <p className="text-xs text-slate-400">Service Management System · Demo</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Global search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-52">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search…"
            className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {/* Unread badge */}
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          {/* Notification dropdown */}
          {showNotif && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-700">Notifications</p>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-xs text-slate-700 leading-relaxed">{n.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 border-t border-slate-100">
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Profile */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">ST</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 leading-tight">Sanrutai T.</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
