"use client";

import { useMemo } from "react";
import { DescriptiveStats, getVariableColor } from "@/types";
import { VARIABLE_COLORS } from "@/types";
import { Info } from "lucide-react";

interface BoxplotChartProps {
  stats: DescriptiveStats[];
}

export default function BoxplotChart({ stats }: BoxplotChartProps) {
  // Find global min and max with buffer for dynamic scaling
  const { minVal, maxVal } = useMemo(() => {
    if (!stats.length) return { minVal: 0, maxVal: 5 };
    const allMins = stats.map((s) => s.min);
    const allMaxs = stats.map((s) => s.max);
    const allOutliers = stats.flatMap((s) => s.outliers || []);

    const absoluteMin = Math.min(...allMins, ...allOutliers);
    const absoluteMax = Math.max(...allMaxs, ...allOutliers);
    const range = absoluteMax - absoluteMin;

    // Add 10% buffer top and bottom
    const buffer = range === 0 ? 1 : range * 0.1;
    return {
      minVal: absoluteMin - buffer,
      maxVal: absoluteMax + buffer,
    };
  }, [stats]);

  // Scale value dynamically to Y coordinates (350 to 70)
  const scale = (value: number) => {
    const range = maxVal - minVal;
    if (range === 0) return 210; // Midpoint
    return 350 - ((value - minVal) / range) * 280;
  };

  // Generate 5 dynamic grid ticks
  const ticks = useMemo(() => {
    const range = maxVal - minVal;
    return Array.from({ length: 6 }, (_, i) => minVal + (range * i) / 5);
  }, [minVal, maxVal]);

  if (!stats.length) {
    return null;
  }

  const maxOutliers = Math.max(...stats.map((s) => s.outliers.length));

  return (
    <div id="boxplot-section" className="glass-card rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">
          Box & Whisker Plot
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          Analisis perbandingan distribusi kuartil, sebaran, dan identifikasi
          pencilan secara visual.
        </p>
      </div>

      {/* Main Boxplot Chart */}
      <div className="relative bg-slate-950/40 border border-slate-900/60 rounded-xl p-6 mb-6 overflow-hidden">
        <svg
          width="100%"
          height="320"
          viewBox="0 0 800 360"
          preserveAspectRatio="xMidYMid meet"
          className="mx-auto"
        >
          {/* Grid lines */}
          <g>
            {ticks.map((tickVal, index) => {
              const y = scale(tickVal);
              return (
                <g key={index}>
                  <line
                    x1="80"
                    y1={y}
                    x2="760"
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="65"
                    y={y + 4}
                    textAnchor="end"
                    fill="var(--text-muted)"
                    className="font-mono"
                    fontSize="10"
                  >
                    {tickVal.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Y-axis label */}
          <text
            x="20"
            y="180"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
            fontWeight="bold"
            transform="rotate(-90, 20, 180)"
          >
            NILAI SKALA
          </text>

          {/* Boxplots */}
          {stats.map((stat, index) => {
            const totalVars = stats.length;
            const chartWidth = 680; // 760 - 80
            const spacing = chartWidth / totalVars;

            // Adjust box width dynamically based on count
            const boxWidth = Math.min(60, spacing * 0.4);
            const xPos = 80 + spacing * index + spacing / 2 - boxWidth / 2;

            const minY = scale(stat.min);
            const q1Y = scale(stat.q1);
            const medianY = scale(stat.median);
            const q3Y = scale(stat.q3);
            const maxY = scale(stat.max);

            const color = getVariableColor(stat.variable, index);

            return (
              <g
                key={stat.variable}
                className="group cursor-pointer transition-opacity"
              >
                {/* Whisker line (min to Q1) */}
                <line
                  x1={xPos + boxWidth / 2}
                  y1={minY}
                  x2={xPos + boxWidth / 2}
                  y2={q1Y}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Whisker line (Q3 to max) */}
                <line
                  x1={xPos + boxWidth / 2}
                  y1={q3Y}
                  x2={xPos + boxWidth / 2}
                  y2={maxY}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Min cap */}
                <line
                  x1={xPos + boxWidth / 4}
                  y1={minY}
                  x2={xPos + (3 * boxWidth) / 4}
                  y2={minY}
                  stroke={color}
                  strokeWidth="2"
                />

                {/* Max cap */}
                <line
                  x1={xPos + boxWidth / 4}
                  y1={maxY}
                  x2={xPos + (3 * boxWidth) / 4}
                  y2={maxY}
                  stroke={color}
                  strokeWidth="2"
                />

                {/* Box (Q1 to Q3) */}
                <rect
                  x={xPos}
                  y={q3Y}
                  width={boxWidth}
                  height={Math.max(2, q1Y - q3Y)}
                  fill={color}
                  fillOpacity="0.1"
                  stroke={color}
                  strokeWidth="2"
                  className="transition-all group-hover:fill-opacity-20"
                  rx="2"
                />

                {/* Median line */}
                <line
                  x1={xPos}
                  y1={medianY}
                  x2={xPos + boxWidth}
                  y2={medianY}
                  stroke={color}
                  strokeWidth="3.5"
                />

                {/* Outliers */}
                {stat.outliers?.map((outlier, oidx) => (
                  <circle
                    key={oidx}
                    cx={xPos + boxWidth / 2}
                    cy={scale(outlier)}
                    r="4"
                    fill="var(--accent-red)"
                    stroke="var(--bg-primary)"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Variable label */}
                <text
                  x={xPos + boxWidth / 2}
                  y="345"
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {stat.variable}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Statistical summary table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-900 text-[var(--text-muted)] font-mono uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 font-semibold text-slate-400">
                Variabel
              </th>
              <th className="text-center py-3 px-4 font-semibold">Min</th>
              <th className="text-center py-3 px-4 font-semibold">Q1</th>
              <th className="text-center py-3 px-4 font-semibold">
                Median (Q2)
              </th>
              <th className="text-center py-3 px-4 font-semibold">Q3</th>
              <th className="text-center py-3 px-4 font-semibold">Max</th>
              <th className="text-center py-3 px-4 font-semibold">IQR</th>
              <th className="text-center py-3 px-4 font-semibold">Pencilan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/50 font-medium">
            {stats.map((stat, index) => (
              <tr
                key={stat.variable}
                className="hover:bg-slate-900/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: getVariableColor(stat.variable, index),
                      }}
                    />
                    <span className="font-bold text-slate-200">
                      {stat.variable}
                    </span>
                  </div>
                </td>
                <td className="text-center py-3 px-4 text-slate-300 font-mono">
                  {stat.min}
                </td>
                <td className="text-center py-3 px-4 text-slate-300 font-mono">
                  {stat.q1.toFixed(2)}
                </td>
                <td className="text-center py-3 px-4 font-mono font-bold text-[var(--accent-blue)]">
                  {stat.median}
                </td>
                <td className="text-center py-3 px-4 text-slate-300 font-mono">
                  {stat.q3.toFixed(2)}
                </td>
                <td className="text-center py-3 px-4 text-slate-300 font-mono">
                  {stat.max}
                </td>
                <td className="text-center py-3 px-4 text-slate-300 font-mono">
                  {stat.iqr.toFixed(2)}
                </td>
                <td className="text-center py-3 px-4">
                  <span
                    className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      stat.outliers.length > 0
                        ? "text-[var(--accent-red)] bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20"
                        : "text-slate-400"
                    }`}
                  >
                    {stat.outliers.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interpretation */}
      <div className="mt-6 p-4 bg-slate-950/40 rounded-xl border border-slate-900/60 flex items-start gap-2.5 text-xs">
        <Info className="w-5 h-5 text-[var(--accent-cyan)] flex-shrink-0 mt-0.5" />
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-slate-200">
            Panduan Interpretasi Boxplot:
          </strong>{" "}
          Bagian kotak (box) menggambarkan rentang 50% data tengah
          (Interquartile Range, Q1 ke Q3). Garis horizontal tebal di dalam kotak
          adalah nilai median. Garis vertikal terputus (whiskers) memanjang ke
          nilai minimum dan maksimum data non-ekstrem. Titik merah terpisah
          menunjukkan nilai pencilan (outliers) yang berada di luar batas Tukey
          (1.5×IQR).
        </p>
      </div>
    </div>
  );
}
