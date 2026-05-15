// layouts/PortfolioLayout.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Research from "../components/Research";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function PortfolioLayout({ setMode }) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Switch button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMode("dashboard")}
          className="px-4 py-2 rounded-xl bg-black text-white text-sm shadow-lg"
        >
          Switch to Dashboard Demo
        </button>
      </div>

      <Navbar />

      <main className="pt-20 space-y-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
