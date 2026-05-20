import SectionCard from "@/components/ui/SectionCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { DescriptiveStats, getVariableColor } from "@/types";
import { Database, Layers, CheckCircle2, Calendar, FileText } from "lucide-react";

interface DatasetSectionProps {
  rowCount?: number;
  variableCount?: number;
  variables?: string[];
  stats?: DescriptiveStats[];
}

export default function DatasetSection({
  rowCount = 100,
  variableCount = 5,
  variables = ["Usability", "UI/UX", "Speed", "Features", "Satisfaction"],
  stats = [],
}: DatasetSectionProps) {
  // Format current date
  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="dataset" className="max-w-7xl mx-auto px-6 py-20 border-b border-[var(--border)]/40">
      <SectionTitle number="1.">Profil & Struktur Dataset</SectionTitle>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Metadata Card */}
        <SectionCard className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] bg-clip-text text-transparent flex items-center gap-2">
              <Database className="w-5 h-5 text-[var(--accent-blue)]" />
              <span>Metadata Publikasi</span>
            </h3>
            
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-[var(--text-secondary)]">KODE LAPORAN:</span>
                <span className="text-slate-200 font-bold">REP-DESK-2026-V2</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-[var(--text-secondary)]">UKURAN SAMPEL (N):</span>
                <span className="text-[var(--accent-green)] font-bold">{rowCount} Responden</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-[var(--text-secondary)]">JUMLAH VARIABEL (K):</span>
                <span className="text-[var(--accent-cyan)] font-bold">{variableCount} Variabel</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-[var(--text-secondary)]">TANGGAL ANALISIS:</span>
                <span className="text-slate-300">{currentDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-[var(--text-secondary)]">KLASIFIKASI:</span>
                <span className="px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-800 rounded text-[10px]">
                  UNCLASSIFIED
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-950/50 border border-slate-900 rounded-lg flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-mono">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)] flex-shrink-0" />
            <span>Semua observasi telah melalui verifikasi rentang & pembersihan data kosong.</span>
          </div>
        </SectionCard>

        {/* Variables List Card */}
        <SectionCard className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] bg-clip-text text-transparent flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--accent-cyan)]" />
            <span>Daftar Indikator / Variabel</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
            {variables.map((variable, index) => {
              const varStat = stats.find((s) => s.variable === variable);
              const color = getVariableColor(variable, index);

              return (
                <div
                  key={index}
                  className="p-4 bg-slate-950/40 border border-slate-900/80 rounded-xl hover:border-slate-800 transition-all hover:bg-slate-900/30 flex items-start justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-bold text-slate-200 text-sm tracking-tight">{variable}</span>
                    </div>
                    
                    {varStat && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono text-[var(--text-secondary)]">
                        <div>Rata-rata: <span className="text-slate-300 font-semibold">{varStat.mean.toFixed(2)}</span></div>
                        <div>Outlier: <span className={varStat.outliers.length > 0 ? "text-[var(--accent-red)] font-semibold" : "text-slate-400"}>{varStat.outliers.length}</span></div>
                        <div className="col-span-2">Rentang: <span className="text-slate-300 font-semibold">{varStat.min} - {varStat.max}</span></div>
                      </div>
                    )}
                  </div>

                  {varStat && (
                    <span
                      className="px-2 py-0.5 text-[9px] font-bold rounded"
                      style={{
                        backgroundColor: `${color}15`,
                        color: color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {varStat.category}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </section>
  );
}

