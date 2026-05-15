// layouts/DashboardLayout.jsx

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ServiceDashboard from "../components/pages/ServiceDashboard";
import PlaceholderPage from "../components/pages/PlaceholderPage";

const PAGE_TITLES = {
  dashboard: "Service Management Dashboard",
  contractors: "Contractors",
  projects: "Projects",
  services: "Services",
  policies: "Policies",
  contracts: "Contracts",
  reports: "Reports",
  settings: "Settings",
};

export default function DashboardLayout({
  setMode,
  activePage,
  setActivePage,
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <Header pageTitle={PAGE_TITLES[activePage]} />

        {/* Back button */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setMode("portfolio")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm shadow-lg"
          >
            Back to Portfolio
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activePage === "dashboard" ? (
            <ServiceDashboard />
          ) : (
            <PlaceholderPage title={PAGE_TITLES[activePage]} />
          )}
        </main>
      </div>
    </div>
  );
}
