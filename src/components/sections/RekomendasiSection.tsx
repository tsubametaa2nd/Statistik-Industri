import SectionCard from "@/components/ui/SectionCard";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Rocket,
  Zap,
  Palette,
  Settings,
  Bell,
  Smartphone,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function RekomendasiSection() {
  const recommendations = [
    {
      priority: "HIGH",
      Icon: Rocket,
      title: "Optimasi Kecepatan Loading Aplikasi",
      description:
        "Implementasi lazy loading, code splitting, dan kompresi aset multi-format untuk meningkatkan performa FCP/LCP secara substansial.",
      timeline: "Q2 2026",
      priorityColor: "var(--accent-red)",
      iconColor: "text-[var(--accent-red)]",
    },
    {
      priority: "HIGH",
      Icon: Zap,
      title: "Peningkatan Responsivitas Sistem",
      description:
        "Optimasi query database terindeks, implementasi redis caching layer, dan peningkatan konkurensi infrastruktur server cloud.",
      timeline: "Q2 2026",
      priorityColor: "var(--accent-red)",
      iconColor: "text-[var(--accent-red)]",
    },
    {
      priority: "MEDIUM",
      Icon: Palette,
      title: "Tingkatkan Konsistensi UI/UX",
      description:
        "Standardisasi design system terpusat, perbaikan alur navigasi pengguna, serta pemenuhan standar WCAG accessibility.",
      timeline: "Q3 2026",
      priorityColor: "var(--accent-gold)",
      iconColor: "text-[var(--accent-gold)]",
    },
    {
      priority: "MEDIUM",
      Icon: Settings,
      title: "Tambah Fitur Kustomisasi Dashboard",
      description:
        "Pengembangan fitur widget seret-lepas (drag-and-drop) berbasis prefensi personalisasi pengguna akhir.",
      timeline: "Q3 2026",
      priorityColor: "var(--accent-gold)",
      iconColor: "text-[var(--accent-gold)]",
    },
    {
      priority: "MEDIUM",
      Icon: Bell,
      title: "Sistem Notifikasi Real-time",
      description:
        "Integrasi web socket dan push notification untuk memberikan pembaruan data secara instan tanpa membebani polling.",
      timeline: "Q3 2026",
      priorityColor: "var(--accent-gold)",
      iconColor: "text-[var(--accent-gold)]",
    },
    {
      priority: "LOW",
      Icon: Smartphone,
      title: "Perkuat Dokumentasi & Onboarding",
      description:
        "Pembuatan panduan interaktif, video panduan singkat, serta dokumentasi API terstruktur untuk kemudahan adopsi.",
      timeline: "Q4 2026",
      priorityColor: "var(--accent-cyan)",
      iconColor: "text-[var(--accent-cyan)]",
    },
    {
      priority: "LOW",
      Icon: Globe,
      title: "Dukungan Internasionalisasi (i18n)",
      description:
        "Penerapan pustaka i18n untuk lokalisasi bahasa dan format zona waktu global yang adaptif.",
      timeline: "Q4 2026",
      priorityColor: "var(--accent-cyan)",
      iconColor: "text-[var(--accent-cyan)]",
    },
  ];

  return (
    <section id="rekomendasi" className="max-w-7xl mx-auto px-6 py-20 mb-20">
      <SectionTitle number="5.">Rekomendasi Aksi</SectionTitle>

      <div className="mb-8 p-4.5 bg-slate-950/40 border border-slate-900 rounded-xl text-xs text-[var(--text-secondary)] leading-relaxed">
        Berdasarkan hasil pengolahan data statistik deskriptif dan identifikasi anomali, berikut disajikan peta jalan rekomendasi perbaikan taktis dan strategis yang diprioritaskan guna mendongkrak kepuasan pengguna:
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.Icon;
          return (
            <SectionCard key={index}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 ${rec.iconColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-bold font-mono border"
                        style={{
                          backgroundColor: `${rec.priorityColor}15`,
                          color: rec.priorityColor,
                          borderColor: `${rec.priorityColor}30`,
                        }}
                      >
                        {rec.priority}
                      </span>
                      <h3 className="text-sm font-bold text-slate-200">{rec.title}</h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-xs">
                      <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase">
                        Target Timeline:
                      </span>
                      <span className="px-2 py-0.5 bg-slate-900/50 border border-slate-800 rounded text-[var(--accent-blue)] font-mono text-[10px] font-bold">
                        {rec.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard className="mt-8">
        <h3 className="text-sm font-bold mb-4 text-[var(--accent-blue)] tracking-wide uppercase font-mono">
          Langkah Tindak Lanjut (Next Steps)
        </h3>
        <div className="space-y-3.5 text-xs text-[var(--text-secondary)]">
          <div className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0 mt-0.5" />
            <p>Implementasikan rekomendasi berskala prioritas <span className="text-[var(--accent-red)] font-bold">HIGH</span> sebagai milestones utama dalam siklus pengembangan terdekat.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0 mt-0.5" />
            <p>Lakukan pemantauan berkala (continuous monitoring) terhadap stabilitas aplikasi pasca-optimasi kecepatan loading.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0 mt-0.5" />
            <p>Adopsi sistem pengumpulan survei berkala yang terintegrasi secara asinkron untuk memperbarui database kepuasan responden secara dinamis.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <ArrowRight className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0 mt-0.5" />
            <p>Lakukan tinjauan ulang (review) dan pembaruan rencana strategis setiap kuartal berdasarkan perubahan metrik deviasi data.</p>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}
