"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { DescriptiveStats, getVariableColor } from "@/types";
import { getFrequencyDistribution } from "@/lib/statistics";

interface HistogramChartProps {
  data: Record<string, number>[];
  stats: DescriptiveStats[];
}

export default function HistogramChart({ data, stats }: HistogramChartProps) {
  const [selectedVariable, setSelectedVariable] = useState(
    stats[0]?.variable || "",
  );

  const chartData = useMemo(() => {
    if (!selectedVariable || !data.length) return [];
    const variableData = data
      .map((row) => row[selectedVariable])
      .filter((val) => val !== undefined && val !== null && !isNaN(val));
    return getFrequencyDistribution(variableData);
  }, [data, selectedVariable]);

  const currentStats = stats.find((s) => s.variable === selectedVariable);

  if (!stats.length) {
    return null;
  }

  return (
    <div id="histogram-section" className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">
          Histogram Distribusi Frekuensi
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          Visualisasi frekuensi kemunculan nilai observasi per interval data.
        </p>
      </div>

      {/* Variable selector */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 border border-slate-900 rounded-xl mb-6 max-w-max">
        {stats.map((stat, index) => (
          <button
            key={stat.variable}
            onClick={() => setSelectedVariable(stat.variable)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedVariable === stat.variable
                ? "text-white shadow-md"
                : "text-[var(--text-secondary)] hover:text-slate-200 hover:bg-slate-900/30"
            }`}
            style={{
              backgroundColor:
                selectedVariable === stat.variable
                  ? getVariableColor(stat.variable, index)
                  : undefined,
            }}
          >
            {stat.variable}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="value"
              stroke="var(--text-muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--text-secondary)" }}
              label={{
                value: "Nilai Data",
                position: "insideBottom",
                offset: -5,
                fill: "var(--text-muted)",
                fontSize: 10,
                fontWeight: "bold",
              }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--text-secondary)" }}
              label={{
                value: "Frekuensi",
                angle: -90,
                position: "insideLeft",
                offset: 5,
                fill: "var(--text-muted)",
                fontSize: 10,
                fontWeight: "bold",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(13, 18, 34, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
              labelStyle={{
                color: "#f8fafc",
                fontWeight: "bold",
                fontSize: 11,
              }}
              itemStyle={{ color: "var(--text-secondary)", fontSize: 11 }}
              formatter={(value: any, name: any) => {
                if (name === "count") return [value, "Frekuensi"];
                return [value, name];
              }}
              labelFormatter={(label) => `Nilai: ${label}`}
            />
            <Bar
              dataKey="count"
              name="Frekuensi"
              fill={getVariableColor(
                selectedVariable,
                stats.findIndex((s) => s.variable === selectedVariable),
              )}
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
            {currentStats && (
              <>
                <ReferenceLine
                  x={currentStats.mean}
                  stroke="var(--accent-red)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{
                    value: `x̄ (Mean): ${currentStats.mean.toFixed(2)}`,
                    fill: "var(--accent-red)",
                    position: "top",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                />
                <ReferenceLine
                  x={currentStats.median}
                  stroke="var(--accent-blue)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{
                    value: `Me (Median): ${currentStats.median}`,
                    fill: "var(--accent-blue)",
                    position: "top",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interpretation */}
      {currentStats && (
        <div className="mt-6 p-4 bg-slate-950/40 rounded-xl border border-slate-900/60 flex items-start gap-2.5 text-xs">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-slate-200">Komentar Analis:</strong>{" "}
            Distribusi data pada variabel{" "}
            <span className="text-slate-100 font-bold">{selectedVariable}</span>{" "}
            menunjukkan bentuk penyebaran yang cenderung{" "}
            <span className="text-[var(--accent-cyan)] font-bold">
              {currentStats.interpretation}
            </span>{" "}
            dengan nilai pemusatan rata-rata (mean){" "}
            {currentStats.mean.toFixed(2)} dan standar deviasi sebesar{" "}
            {currentStats.stdDev.toFixed(2)}.
            {currentStats.skewness > 0.5 &&
              " Karena nilai kemencengan (skewness) positif yang signifikan (> 0.5), distribusi data condong ke kiri dengan ekor memanjang ke kanan (positive skewness), menandakan mayoritas responden memberikan nilai di bawah rata-rata."}
            {currentStats.skewness < -0.5 &&
              " Karena nilai kemencengan (skewness) negatif yang signifikan (< -0.5), distribusi data condong ke kanan dengan ekor memanjang ke kiri (negative skewness), menandakan mayoritas responden memberikan nilai yang cukup tinggi di atas rata-rata."}
            {Math.abs(currentStats.skewness) <= 0.5 &&
              " Nilai kemencengan berada di kisaran netral (-0.5 s/d 0.5), mengindikasikan sebaran data yang relatif simetris dan mendekati bentuk kurva normal standar."}
          </p>
        </div>
      )}
    </div>
  );
}
