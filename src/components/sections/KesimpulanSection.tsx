import { DescriptiveStats } from "@/types";
import SectionCard from "@/components/ui/SectionCard";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Search,
  Zap,
} from "lucide-react";

interface KesimpulanSectionProps {
  stats: DescriptiveStats[];
}

export default function KesimpulanSection({ stats }: KesimpulanSectionProps) {
  const nVal = stats[0]?.n || 0;
  const totalVars = stats.length;
  const totalDataPoints = nVal * totalVars;

  const avgMean = stats.reduce((sum, s) => sum + s.mean, 0) / totalVars;
  const avgStdDev = stats.reduce((sum, s) => sum + s.stdDev, 0) / totalVars;
  const totalOutliers = stats.reduce((sum, s) => sum + s.outliers.length, 0);
  const highestStat = stats.reduce((max, s) => (s.mean > max.mean ? s : max));
  const lowestStat = stats.reduce((min, s) => (s.mean < min.mean ? s : min));

  const conclusions = [
    {
      Icon: CheckCircle,
      title: "Penilaian Keseluruhan Positif",
      description: `Rata-rata kumulatif variabel sebesar ${avgMean.toFixed(2)} mengindikasikan tingkat kepuasan/kinerja yang solid secara agregat.`,
      badge: "Positif",
      badgeColor: "var(--accent-green)",
      iconColor: "text-[var(--accent-green)]",
    },
    {
      Icon: highestStat.mean > 3.8 ? CheckCircle : AlertTriangle,
      title: `Kekuatan Utama: ${highestStat.variable}`,
      description: `Mencatat skor rata-rata tertinggi sebesar ${highestStat.mean.toFixed(2)}, merepresentasikan indikator keunggulan utama.`,
      badge: highestStat.category,
      badgeColor: highestStat.mean > 3.8 ? "var(--accent-green)" : "var(--accent-gold)",
      iconColor: highestStat.mean > 3.8 ? "text-[var(--accent-green)]" : "text-[var(--accent-gold)]",
    },
    {
      Icon: lowestStat.mean < 3.4 ? AlertTriangle : BarChart3,
      title: `Prioritas Perbaikan: ${lowestStat.variable}`,
      description: `Dengan skor rata-rata ${lowestStat.mean.toFixed(2)}, aspek ini menuntut tindakan evaluasi dan peningkatan segera.`,
      badge: lowestStat.category,
      badgeColor: lowestStat.mean < 3.4 ? "var(--accent-red)" : "var(--accent-gold)",
      iconColor: lowestStat.mean < 3.4 ? "text-[var(--accent-red)]" : "text-[var(--accent-gold)]",
    },
    {
      Icon: BarChart3,
      title: avgStdDev < 0.8 ? "Konsistensi Persepsi" : "Heterogenitas Persepsi",
      description: `Standar deviasi rata-rata sebesar ${avgStdDev.toFixed(2)} mencerminkan ${
        avgStdDev < 0.8 ? "kesamaan pandangan (konsensus)" : "keberagaman opini responden"
      } yang moderat.`,
      badge: avgStdDev < 0.8 ? "Konsisten" : "Variatif",
      badgeColor: avgStdDev < 0.8 ? "var(--accent-green)" : "var(--accent-gold)",
      iconColor: avgStdDev < 0.8 ? "text-[var(--accent-green)]" : "text-[var(--accent-gold)]",
    },
    {
      Icon: totalOutliers / totalDataPoints < 0.02 ? Search : Zap,
      title: "Identifikasi Data Pencilan (Outliers)",
      description: `Sebanyak ${totalOutliers} dari total ${totalDataPoints} titik observasi (${((totalOutliers / totalDataPoints) * 100).toFixed(1)}%) terdeteksi sebagai data pencilan ekstrem.`,
      badge: `${((totalOutliers / totalDataPoints) * 100).toFixed(1)}%`,
      badgeColor: totalOutliers / totalDataPoints < 0.02 ? "var(--accent-green)" : "var(--accent-gold)",
      iconColor: totalOutliers / totalDataPoints < 0.02 ? "text-[var(--accent-green)]" : "text-[var(--accent-gold)]",
    },
  ];

  return (
    <section id="kesimpulan" className="max-w-7xl mx-auto px-6 py-20 border-b border-[var(--border)]/40">
      <SectionTitle number="4.">Kesimpulan Strategis</SectionTitle>

      <div className="grid md:grid-cols-2 gap-6">
        {conclusions.map((conclusion, index) => {
          const IconComponent = conclusion.Icon;
          return (
            <SectionCard key={index} className="flex flex-col justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl bg-slate-900/60 border border-slate-800 ${conclusion.iconColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-200">
                      {conclusion.title}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase border"
                      style={{
                        backgroundColor: `${conclusion.badgeColor}15`,
                        color: conclusion.badgeColor,
                        borderColor: `${conclusion.badgeColor}30`,
                      }}
                    >
                      {conclusion.badge}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                    {conclusion.description}
                  </p>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard className="mt-6">
        <h3 className="text-sm font-bold mb-3 text-[var(--accent-blue)] tracking-wide uppercase font-mono">
          Ringkasan Eksekutif (Executive Summary)
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Berdasarkan hasil analisis deskriptif inferensial terhadap{" "}
          <strong className="text-slate-200 font-bold font-mono">{nVal}</strong> responden dengan{" "}
          <strong className="text-slate-200 font-bold font-mono">{totalVars}</strong> variabel pengukuran numerik bebas bias, 
          secara agregat kinerja sistem dinilai berada pada tingkat yang{" "}
          <span className="text-[var(--accent-green)] font-bold">{avgMean > 3.5 ? "SANGAT BAIK" : "CUKUP BAIK"}</span>. 
          Variabel <strong className="text-slate-200 font-bold">{highestStat.variable}</strong> diidentifikasi sebagai pilar kekuatan dominan (skor {highestStat.mean.toFixed(2)}), 
          sementara variabel <strong className="text-slate-200 font-bold">{lowestStat.variable}</strong> (skor {lowestStat.mean.toFixed(2)}) ditetapkan sebagai area intervensi utama guna meminimalisasi ketimpangan kualitas pelayanan.
        </p>
      </SectionCard>
    </section>
  );
}
