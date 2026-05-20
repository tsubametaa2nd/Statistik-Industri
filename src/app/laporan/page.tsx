"use client";

import { computeAllStats } from "@/lib/statistics";
import { generatePDFReport } from "@/lib/pdfGenerator";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import DatasetSection from "@/components/sections/DatasetSection";
import MetodologiSection from "@/components/sections/MetodologiSection";
import TabelStatistik from "@/components/sections/TabelStatistik";
import HistogramChart from "@/components/sections/HistogramChart";
import BoxplotChart from "@/components/sections/BoxplotChart";
import AnalisisNarasi from "@/components/sections/AnalisisNarasi";
import KesimpulanSection from "@/components/sections/KesimpulanSection";
import RekomendasiSection from "@/components/sections/RekomendasiSection";
import FileUploadSection from "@/components/sections/FileUploadSection";
import { BarChart3, TrendingUp, Search, Upload } from "lucide-react";
import { useState } from "react";

export default function LaporanPage() {
  const [rawData, setRawData] = useState<Record<string, number>[]>([]);
  const [variables, setVariables] = useState<string[]>([]);
  const [hasData, setHasData] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const allStats = hasData ? computeAllStats(rawData) : [];

  const handleDataLoaded = (data: Record<string, number>[], vars: string[]) => {
    setRawData(data);
    setVariables(vars);
    setHasData(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById("hasil")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Show loading message
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      loadingToast.textContent = "Membuat PDF... Mohon tunggu";
      document.body.appendChild(loadingToast);

      await generatePDFReport(allStats, rawData);

      // Remove loading toast
      document.body.removeChild(loadingToast);

      // Show success message
      const successToast = document.createElement("div");
      successToast.className =
        "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successToast.textContent = "PDF berhasil didownload!";
      document.body.appendChild(successToast);

      setTimeout(() => {
        document.body.removeChild(successToast);
      }, 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar
        hasData={hasData}
        rowCount={rawData.length}
        onDownloadPDF={handleDownloadPDF}
        isGenerating={isGenerating}
      />

      {/* Upload Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-[var(--border)]/40">
        <FileUploadSection onDataLoaded={handleDataLoaded} />
      </section>

      {/* Show message if no data */}
      {!hasData && (
        <section id="pendahuluan" className="max-w-4xl mx-auto px-6 py-20">
          <div className="glass-card rounded-2xl p-12 text-center border border-dashed border-[var(--accent-blue)]/30">
            <Upload className="w-16 h-16 text-[var(--accent-blue)] mx-auto mb-6 pulse-glow" />
            <h3 className="text-2xl font-bold text-slate-100 mb-3">
              Upload Data Untuk Memulai Analisis
            </h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Silakan unggah file CSV, JSON, atau XLSX di atas untuk melihat
              laporan interaktif dan hasil analisis statistik deskriptif.
            </p>
          </div>
        </section>
      )}

      {/* Show results only if data is loaded */}
      {hasData && (
        <>
          <HeroSection
            stats={allStats.map((s) => ({
              variable: s.variable,
              mean: s.mean,
            }))}
          />

          <DatasetSection
            rowCount={rawData.length}
            variableCount={variables.length}
            variables={variables}
            stats={allStats}
          />

          <MetodologiSection />

          {/* Hasil Section */}
          <section id="hasil" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
              <span className="text-[var(--accent-blue)]">3.</span>
              <span>Hasil & Pembahasan</span>
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-[var(--accent-blue)]" />
                  <span>Statistik Deskriptif</span>
                </h3>
                <TabelStatistik stats={allStats} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-[var(--accent-cyan)]" />
                  <span>Visualisasi Data</span>
                </h3>
                <div className="space-y-6">
                  <HistogramChart data={rawData} stats={allStats} />
                  <BoxplotChart stats={allStats} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Search className="w-7 h-7 text-[var(--accent-gold)]" />
                  <span>Analisis</span>
                </h3>
                <AnalisisNarasi stats={allStats} />
              </div>
            </div>
          </section>

          <KesimpulanSection stats={allStats} />

          <RekomendasiSection />
        </>
      )}
    </main>
  );
}
