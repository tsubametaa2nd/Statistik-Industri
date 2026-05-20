"use client";

import { useState } from "react";
import { DescriptiveStats } from "@/types";
import { VARIABLE_COLORS } from "@/types";
import { Info, HelpCircle } from "lucide-react";

interface TabelStatistikProps {
  stats: DescriptiveStats[];
}

export default function TabelStatistik({ stats }: TabelStatistikProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatValue = (value: number | number[]) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return typeof value === "number" ? value.toFixed(2) : value;
  };

  const maxMean = Math.max(...stats.map((s) => s.mean));
  const maxOutliers = Math.max(...stats.map((s) => s.outliers.length));

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">Tabel Distribusi Statistik Deskriptif</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Parameter komputasi pemusatan, penyebaran, dan bentuk distribusi.</p>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-800 hover:text-white transition-all shadow-sm active:scale-95"
        >
          {showAdvanced ? "Sembunyikan" : "Tampilkan"} Metrik Lanjutan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-900 text-[var(--text-muted)] font-mono uppercase tracking-wider text-[10px]">
              <th className="py-4 px-4 font-semibold text-slate-400">Parameter Statistik</th>
              {stats.map((stat) => (
                <th
                  key={stat.variable}
                  className="py-4 px-4 font-bold text-center border-l border-slate-900/50"
                  style={{ minWidth: "120px" }}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{
                        backgroundColor: VARIABLE_COLORS[stat.variable],
                      }}
                    />
                    <span className="text-slate-200">{stat.variable}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/50 font-medium">
            <tr className="hover:bg-slate-900/20 transition-colors" title="Jumlah total responden / observasi data (N)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Ukuran Sampel</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">N</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {stat.n}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Rata-rata aritmatika dari data (x̄)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Mean (Rata-rata)</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">x̄</span>
              </td>
              {stats.map((stat) => (
                <td
                  key={stat.variable}
                  className={`text-center py-3.5 px-4 font-mono font-bold ${
                    stat.mean === maxMean
                      ? "text-[var(--accent-gold)] bg-[var(--accent-gold)]/5 font-extrabold"
                      : "text-slate-100"
                  }`}
                >
                  {formatValue(stat.mean)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Nilai tengah setelah data diurutkan (Me)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Median (Nilai Tengah)</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">Me</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {formatValue(stat.median)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Nilai yang paling sering muncul dalam data (Mo)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Modus</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">Mo</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {formatValue(stat.mode)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Akar kuadrat dari varians, mengukur dispersi data (s)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Simpangan Baku (Std Dev)</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">s</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {formatValue(stat.stdDev)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Rata-rata kuadrat penyimpangan data dari mean (s²)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Varians</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">s²</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {formatValue(stat.variance)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Nilai observasi paling rendah (Xmin)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Nilai Minimum</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">X_min</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {stat.min}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Nilai observasi paling tinggi (Xmax)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Nilai Maksimum</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">X_max</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {stat.max}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-900/20 transition-colors" title="Selisih antara nilai maksimum dan minimum (R)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Rentang (Range)</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">R</span>
              </td>
              {stats.map((stat) => (
                <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                  {stat.range}
                </td>
              ))}
            </tr>

            {showAdvanced && (
              <>
                <tr className="hover:bg-slate-900/20 transition-colors border-t border-slate-900" title="Derajat ketidaksimetrisan bentuk distribusi (g₁)">
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <span>Skewness (Kemencengan)</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">g₁</span>
                  </td>
                  {stats.map((stat) => (
                    <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                      {formatValue(stat.skewness)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors" title="Derajat keruncingan kurva distribusi frekuensi (g₂)">
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <span>Kurtosis (Keruncingan)</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">g₂</span>
                  </td>
                  {stats.map((stat) => (
                    <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                      {formatValue(stat.kurtosis)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors" title="Kuartil Bawah / persentil ke-25 (Q₁)">
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <span>Kuartil Bawah</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">Q₁</span>
                  </td>
                  {stats.map((stat) => (
                    <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                      {formatValue(stat.q1)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors" title="Kuartil Atas / persentil ke-75 (Q₃)">
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <span>Kuartil Atas</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">Q₃</span>
                  </td>
                  {stats.map((stat) => (
                    <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                      {formatValue(stat.q3)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors" title="Rentang interkuartil Q₃ - Q₁ (IQR)">
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <span>Interquartile Range</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">IQR</span>
                  </td>
                  {stats.map((stat) => (
                    <td key={stat.variable} className="text-center py-3.5 px-4 text-slate-100 font-mono">
                      {formatValue(stat.iqr)}
                    </td>
                  ))}
                </tr>
              </>
            )}

            <tr className="hover:bg-slate-900/20 transition-colors border-t border-slate-900" title="Jumlah nilai ekstrem/pencilan terdeteksi (Out)">
              <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                <span>Pencilan (Outliers)</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono font-normal">Out</span>
              </td>
              {stats.map((stat) => (
                <td
                  key={stat.variable}
                  className={`text-center py-3.5 px-4 font-mono font-bold ${
                    stat.outliers.length === maxOutliers && maxOutliers > 0
                      ? "text-[var(--accent-red)] bg-[var(--accent-red)]/5 font-extrabold"
                      : "text-slate-100"
                  }`}
                >
                  {stat.outliers.length}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

