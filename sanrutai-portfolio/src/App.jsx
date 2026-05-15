// App.jsx — Unified Portfolio + Dashboard Application

import { useState } from "react";

// Portfolio Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Dashboard Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ServiceDashboard from "./components/pages/ServiceDashboard";
import PlaceholderPage from "./components/pages/PlaceholderPage";

// Page mapping
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

export default function App() {
  // Mode: portfolio | dashboard
  const [mode, setMode] = useState("portfolio");

  // Active dashboard page
  const [activePage, setActivePage] = useState("dashboard");

  // =========================
  // Helper: open dashboard from anywhere
  // =========================
  const openDashboard = (page = "dashboard") => {
    // Switch system first
    setMode("dashboard");

    // Then set active page
    setActivePage(page);
  };

  // =========================
  // DASHBOARD PAGE RENDER
  // =========================
  const renderDashboardPage = () => {
    if (activePage === "dashboard") return <ServiceDashboard />;
    return <PlaceholderPage title={PAGE_TITLES[activePage]} />;
  };

  // =========================
  // PORTFOLIO MODE
  // =========================
  if (mode === "portfolio") {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

        {/* Dev switch */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => openDashboard("dashboard")}
            className="px-4 py-2 rounded-xl bg-black text-white text-sm shadow-lg"
          >
            Open Dashboard Demo
          </button>
        </div>

        <Navbar />

        <main className="pt-20 space-y-24">
          <Hero />


          <About />
          <Skills />
          <Projects />
          <Experience openDashboard={openDashboard}/>
          <Research />
          <Contact />
        </main>

        <Footer />
      </div>
    );
  }

  // =========================
  // DASHBOARD MODE
  // =========================
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Noto Sans Thai', sans-serif" }}>

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main */}
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

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderDashboardPage()}
        </main>

      </div>
    </div>
  );
}