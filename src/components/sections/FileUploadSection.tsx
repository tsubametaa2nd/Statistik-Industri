"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  Database,
} from "lucide-react";
import { parseFile, downloadSampleFile, ParseError } from "@/lib/fileParser";

interface FileUploadSectionProps {
  onDataLoaded: (data: Record<string, number>[], variables: string[]) => void;
}

export default function FileUploadSection({
  onDataLoaded,
}: FileUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParseError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const result = await parseFile(file);
        onDataLoaded(result.data, result.variables);
        setFileName(file.name);
        setSuccess(
          `Berhasil memuat ${result.rowCount} baris data dengan ${result.variables.length} variabel`,
        );
      } catch (err) {
        const parseError = err as ParseError;
        setError(parseError);
        setFileName(null);
      } finally {
        setIsLoading(false);
      }
    },
    [onDataLoaded],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Upload Data Statistik
        </h2>
        <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">
          Unggah file CSV, JSON, atau XLSX untuk memulai perhitungan dan
          analisis data statistik secara instan.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${
            isDragging
              ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 shadow-[0_0_20px_var(--glow-blue)] scale-[1.01]"
              : "border-slate-800 bg-[var(--bg-secondary)]/60 hover:border-slate-700 hover:bg-slate-800/30"
          }
          ${isLoading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv,.json,.xlsx,.xls"
          onChange={handleFileInput}
          disabled={isLoading}
        />

        <div className="space-y-5">
          <div className="flex justify-center">
            {isLoading ? (
              <div className="relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--accent-blue)]"></div>
                <Database className="w-6 h-6 text-[var(--accent-blue)] absolute animate-pulse" />
              </div>
            ) : (
              <div className="p-4 bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/10 rounded-2xl transition-transform hover:scale-105 duration-300">
                <Upload className="w-12 h-12 text-[var(--accent-blue)]" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-100">
              {isLoading
                ? "Memproses berkas..."
                : "Seret & letakkan file di sini"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">atau</p>
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--accent-blue)] hover:bg-blue-600 text-white text-sm font-semibold rounded-xl cursor-pointer shadow-lg shadow-blue-500/10 transition-all hover:shadow-blue-500/20 active:scale-95"
            >
              <Upload className="w-4 h-4" />
              Pilih Berkas
            </label>
          </div>

          <div className="text-xs text-[var(--text-muted)] space-y-1">
            <p>Format yang didukung: CSV, JSON, XLSX, XLS</p>
            <p>Pastikan file berisi data numerik</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-start gap-3.5 p-4.5 bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-[var(--accent-green)] flex-shrink-0 mt-0.5 pulse-glow" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-100">Proses Berhasil</p>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {success}
            </p>
            {fileName && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--accent-green)]/20 text-[var(--accent-green)] border border-[var(--accent-green)]/10 rounded text-[10px] font-mono">
                FILE: {fileName}
              </span>
            )}
          </div>
          <button
            onClick={clearMessages}
            className="text-[var(--text-muted)] hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3.5 p-4.5 bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-[var(--accent-red)] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-100">{error.message}</p>
            {error.details && (
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-mono text-xs bg-slate-950/30 p-2.5 rounded border border-slate-900">
                {error.details}
              </p>
            )}
          </div>
          <button
            onClick={clearMessages}
            className="text-[var(--text-muted)] hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Demo Datasets */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border-2 border-[var(--accent-purple)]/30">
        <div className="flex items-center gap-2.5 text-slate-200">
          <Database className="w-5 h-5 text-[var(--accent-purple)]" />
          <h3 className="font-semibold text-sm tracking-tight">
            Coba Dataset Demo
          </h3>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Langsung coba aplikasi dengan dataset contoh yang sudah kami siapkan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <button
            onClick={async () => {
              const response = await fetch(
                "/data/json/employee-performance.json",
              );
              const blob = await response.blob();
              const file = new File([blob], "employee-performance.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/40 text-slate-300 hover:text-white rounded-xl hover:border-purple-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-[var(--accent-purple)] group-hover:scale-110 transition-transform" />
              <span className="font-bold">Kinerja Karyawan</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              30 data evaluasi karyawan dengan 5 metrik kinerja
            </p>
          </button>

          <button
            onClick={async () => {
              const response = await fetch("/data/json/student-grades.json");
              const blob = await response.blob();
              const file = new File([blob], "student-grades.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-700/40 text-slate-300 hover:text-white rounded-xl hover:border-cyan-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-[var(--accent-cyan)] group-hover:scale-110 transition-transform" />
              <span className="font-bold">Nilai Siswa</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              25 data nilai siswa untuk 5 mata pelajaran
            </p>
          </button>

          <button
            onClick={async () => {
              const response = await fetch("/data/json/fitness-tracker.json");
              const blob = await response.blob();
              const file = new File([blob], "fitness-tracker.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/40 text-slate-300 hover:text-white rounded-xl hover:border-green-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-[var(--accent-green)] group-hover:scale-110 transition-transform" />
              <span className="font-bold">Fitness Tracker</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              30 data aktivitas harian dengan 5 metrik kesehatan
            </p>
          </button>

          <button
            onClick={async () => {
              const response = await fetch("/data/json/product-sales.json");
              const blob = await response.blob();
              const file = new File([blob], "product-sales.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/40 text-slate-300 hover:text-white rounded-xl hover:border-blue-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-[var(--accent-blue)] group-hover:scale-110 transition-transform" />
              <span className="font-bold">Penjualan Produk</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              20 data penjualan dengan 5 metrik bisnis
            </p>
          </button>

          <button
            onClick={async () => {
              const response = await fetch("/data/json/website-analytics.json");
              const blob = await response.blob();
              const file = new File([blob], "website-analytics.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-700/40 text-slate-300 hover:text-white rounded-xl hover:border-orange-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Analitik Website</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              25 data traffic website dengan 5 metrik digital
            </p>
          </button>

          <button
            onClick={async () => {
              const response = await fetch(
                "/data/json/customer-satisfaction.json",
              );
              const blob = await response.blob();
              const file = new File([blob], "customer-satisfaction.json", {
                type: "application/json",
              });
              handleFile(file);
            }}
            className="flex flex-col items-start gap-2 p-4 bg-gradient-to-br from-pink-900/40 to-pink-800/20 border border-pink-700/40 text-slate-300 hover:text-white rounded-xl hover:border-pink-600/60 transition-all text-xs font-medium group"
          >
            <div className="flex items-center gap-2 w-full">
              <Database className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Kepuasan Pelanggan</span>
            </div>
            <p className="text-[10px] text-slate-400 text-left">
              25 data survei kepuasan dengan 5 aspek layanan
            </p>
          </button>
        </div>
      </div>

      {/* Sample Files */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-slate-200">
          <FileText className="w-5 h-5 text-[var(--accent-cyan)]" />
          <h3 className="font-semibold text-sm tracking-tight">
            Belum Memiliki Dataset Sampel?
          </h3>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Unduh contoh berkas di bawah ini untuk melihat struktur kolom dan
          format data statistik deskriptif yang valid:
        </p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <button
            onClick={() => downloadSampleFile("csv")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-all text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            Sampel CSV
          </button>
          <button
            onClick={() => downloadSampleFile("json")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-all text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
            Sampel JSON
          </button>
          <button
            onClick={() => downloadSampleFile("xlsx")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-all text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-green)]" />
            Sampel XLSX
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/5 rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold text-sm text-[var(--accent-blue)] tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Panduan Struktur Kolom Dataset:
        </h3>
        <ul className="text-xs text-[var(--text-secondary)] space-y-2 list-none">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-blue)] font-bold mt-0.5">
              •
            </span>
            <span>
              Setiap kolom mewakili satu variabel numerik (misal: Kecepatan,
              Usabilitas, Kepuasan).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-blue)] font-bold mt-0.5">
              •
            </span>
            <span>Setiap baris mewakili satu nilai observasi/responden.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-blue)] font-bold mt-0.5">
              •
            </span>
            <span>Baris pertama wajib berisi header (nama variabel).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-blue)] font-bold mt-0.5">
              •
            </span>
            <span>
              Nilai kosong akan diabaikan dari komputasi statistik secara
              otomatis.
            </span>
          </li>
        </ul>
        <div className="mt-3 pt-3 border-t border-slate-900 flex flex-wrap gap-2 text-[10px] text-[var(--text-muted)] font-mono">
          <span className="font-bold text-slate-400">
            Kolom diabaikan otomatis:
          </span>
          <span>NO, ID, INDEX, #, RESPONDEN (dan variasinya)</span>
        </div>
      </div>
    </div>
  );
}
