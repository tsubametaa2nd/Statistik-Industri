"use client";

import { useEffect, useState } from "react";
import { BarChart3, Database, HelpCircle, Download } from "lucide-react";

interface NavbarProps {
  hasData?: boolean;
  rowCount?: number;
  onDownloadPDF?: () => void;
  isGenerating?: boolean;
}

export default function Navbar({
  hasData = false,
  rowCount = 0,
  onDownloadPDF,
  isGenerating = false,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState("pendahuluan");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: "pendahuluan", label: "Pendahuluan" },
    { id: "dataset", label: "Dataset" },
    { id: "metodologi", label: "Metodologi" },
    { id: "hasil", label: "Hasil & Analisis" },
    { id: "kesimpulan", label: "Kesimpulan" },
    { id: "rekomendasi", label: "Rekomendasi" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Offset to trigger earlier
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-secondary)]/90 backdrop-blur-xl border-b border-[var(--border)] transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold flex items-center gap-2.5 tracking-tight">
              <div className="p-2 bg-[var(--accent-blue)]/10 rounded-lg border border-[var(--accent-blue)]/20">
                <BarChart3 className="w-5 h-5 text-[var(--accent-blue)]" />
              </div>
              <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Amertastat
              </span>
            </div>

            {/* Dataset status badge */}
            <div className="hidden xs:flex items-center">
              {hasData ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 text-[var(--accent-green)] text-xs font-medium font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-green)] pulse-glow" />
                  <Database className="w-3 h-3" />
                  <span>DATASET: {rowCount} BARIS</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--text-muted)]/10 border border-[var(--text-muted)]/30 text-[var(--text-secondary)] text-xs font-medium font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]" />
                  <span>MENUNGGU DATA</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-slate-100 border border-transparent hover:bg-slate-800/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {hasData && onDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-cyan)] to-[var(--accent-green)] hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 text-white text-[11px] font-bold rounded-lg transition-all shadow-md cursor-pointer border border-blue-400/20"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3 h-3 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                    <span>Unduh...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-slate-950">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-cyan)] to-[var(--accent-green)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}
