"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DescriptiveStats } from "@/types";
import { VARIABLE_COLORS } from "@/types";
import SectionCard from "@/components/ui/SectionCard";

interface AnalisisNarasiProps {
  stats: DescriptiveStats[];
}

export default function AnalisisNarasi({ stats }: AnalisisNarasiProps) {
  // Data untuk mean comparison
  const meanData = stats
    .map((stat) => ({
      variable: stat.variable,
      mean: stat.mean,
      category: stat.category,
    }))
    .sort((a, b) => b.mean - a.mean);

  // Data untuk std dev comparison
  const stdDevData = stats
    .map((stat) => ({
      variable: stat.variable,
      stdDev: stat.stdDev,
    }))
    .sort((a, b) => b.stdDev - a.stdDev);

  // Data untuk outlier pie chart
  const outlierData = stats
    .filter((stat) => stat.outliers.length > 0)
    .map((stat) => ({
      name: stat.variable,
      value: stat.outliers.length,
      color: VARIABLE_COLORS[stat.variable],
    }));

  const totalOutliers = outlierData.reduce((sum, item) => sum + item.value, 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sangat Tinggi":
        return "var(--accent-green)";
      case "Tinggi":
        return "var(--accent-cyan)";
      case "Sedang":
        return "var(--accent-gold)";
      case "Rendah":
        return "var(--accent-red)";
      default:
        return "var(--text-secondary)";
    }
  };

  return (
    <div className="space-y-6">
      {/* Card 1: Nilai Rata-Rata */}
      <SectionCard>
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
          Analisis Nilai Rata-Rata
        </h3>

        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={meanData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
              <XAxis
                type="number"
                stroke="var(--text-muted)"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--text-secondary)" }}
              />
              <YAxis
                type="category"
                dataKey="variable"
                stroke="var(--text-muted)"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--text-secondary)" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(13, 18, 34, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                }}
                labelStyle={{ color: "#f8fafc", fontWeight: "bold", fontSize: 11 }}
                itemStyle={{ color: "var(--text-secondary)", fontSize: 11 }}
              />
              <Bar dataKey="mean" name="Mean" radius={[0, 6, 6, 0]} animationDuration={800}>
                {meanData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={VARIABLE_COLORS[entry.variable]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4.5 bg-slate-950/40 rounded-xl border border-slate-900/60 space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
          <p>
            Aspek <span className="text-slate-100 font-bold">{meanData[0].variable}</span>{" "}
            mencatat skor rata-rata tertinggi sebesar{" "}
            <span className="text-[var(--accent-green)] font-extrabold font-mono">
              {meanData[0].mean.toFixed(2)}
            </span>{" "}
            yang masuk dalam kriteria penilaian{" "}
            <span
              style={{ color: getCategoryColor(meanData[0].category) }}
              className="font-bold uppercase tracking-wide"
            >
              {meanData[0].category}
            </span>
            . Ini menunjukkan performa atau kepuasan yang sangat optimal pada indikator tersebut.
          </p>
          <p>
            Sebaliknya, aspek <span className="text-slate-100 font-bold">{meanData[meanData.length - 1].variable}</span>{" "}
            memiliki skor rata-rata terendah sebesar{" "}
            <span className="text-[var(--accent-red)] font-extrabold font-mono">
              {meanData[meanData.length - 1].mean.toFixed(2)}
            </span>
            . Hasil ini mengidentifikasikan bahwa aspek tersebut memerlukan perhatian khusus atau intervensi perbaikan yang prioritas.
          </p>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-900/60">
            {meanData.map((item) => (
              <div
                key={item.variable}
                className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5"
                style={{
                  backgroundColor: `${getCategoryColor(item.category)}10`,
                  color: getCategoryColor(item.category),
                  border: `1px solid ${getCategoryColor(item.category)}20`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }} />
                {item.variable}: {item.category}
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Card 2: Variasi Data */}
      <SectionCard>
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] bg-clip-text text-transparent">
          Analisis Variasi Data
        </h3>

        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stdDevData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-muted)" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--text-secondary)" }} />
              <YAxis
                type="category"
                dataKey="variable"
                stroke="var(--text-muted)"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "var(--text-secondary)" }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(13, 18, 34, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                }}
                labelStyle={{ color: "#f8fafc", fontWeight: "bold", fontSize: 11 }}
                itemStyle={{ color: "var(--text-secondary)", fontSize: 11 }}
              />
              <Bar dataKey="stdDev" name="Std Dev" radius={[0, 6, 6, 0]} animationDuration={800}>
                {stdDevData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={VARIABLE_COLORS[entry.variable]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4.5 bg-slate-950/40 rounded-xl border border-slate-900/60 space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
          <p>
            Aspek <span className="text-slate-100 font-bold">{stdDevData[0].variable}</span>{" "}
            mencatatkan nilai standar deviasi tertinggi (
            <span className="text-[var(--accent-gold)] font-extrabold font-mono">
              SD = {stdDevData[0].stdDev.toFixed(2)}
            </span>
            ). Tingginya nilai standar deviasi ini menunjukkan adanya variasi persepsi atau tanggapan responden yang cukup lebar. Pendapat responden pada indikator ini cenderung lebih tersebar dan heterogen.
          </p>
          <p>
            Sebaliknya, aspek <span className="text-slate-100 font-bold">{stdDevData[stdDevData.length - 1].variable}</span>{" "}
            mencatat standar deviasi terendah (
            <span className="text-[var(--accent-green)] font-extrabold font-mono">
              SD = {stdDevData[stdDevData.length - 1].stdDev.toFixed(2)}
            </span>
            ). Hal ini mengindikasikan adanya keseragaman persepsi di antara responden (konsensus opini tinggi), di mana penilaian responden terkonsentrasi mendekati nilai rata-rata.
          </p>
        </div>
      </SectionCard>

      {/* Card 3: Deteksi Outlier */}
      <SectionCard>
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-red)] bg-clip-text text-transparent">
          Deteksi Pencilan (Outliers)
        </h3>

        {totalOutliers > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 flex justify-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={outlierData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) =>
                        `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={75}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={800}
                    >
                      {outlierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(13, 18, 34, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                      }}
                      itemStyle={{ color: "var(--text-secondary)", fontSize: 11 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 space-y-4">
                <div className="p-4 bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-xl">
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Berdasarkan perhitungan menggunakan batas pagar luar Tukey, sebanyak{" "}
                    <span className="text-[var(--accent-red)] font-bold text-sm font-mono">
                      {totalOutliers}
                    </span>{" "}
                    pencilan data berhasil diidentifikasi dari total{" "}
                    <span className="text-slate-100 font-bold font-mono">
                      {stats[0]?.n || 0}
                    </span>{" "}
                    responden. Nilai-nilai pencilan ini menggambarkan perilaku penilaian ekstrem yang signifikan menyimpang dari tren responden umum.
                  </p>
                </div>

                <div className="space-y-2">
                  {outlierData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--accent-red)] bg-[var(--accent-red)]/10 px-2 py-0.5 rounded border border-[var(--accent-red)]/20">
                        {item.value} OUTLIERS
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-3.5 bg-slate-950/40 rounded-xl border border-slate-900 border-dashed">
            <div className="text-4xl text-[var(--accent-green)] pulse-glow">✓</div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-100">Konsistensi Data Sempurna</p>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                Tidak ada data pencilan (outliers) yang terdeteksi di seluruh variabel. Semua responden memberikan jawaban dalam batas persepsi normal.
              </p>
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
