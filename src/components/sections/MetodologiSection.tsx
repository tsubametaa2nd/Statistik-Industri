import SectionCard from "@/components/ui/SectionCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { BookOpen, Sigma, Percent, AlertCircle } from "lucide-react";

export default function MetodologiSection() {
  return (
    <section id="metodologi" className="max-w-7xl mx-auto px-6 py-20 border-b border-[var(--border)]/40">
      <SectionTitle number="2.">Metodologi & Landasan Teori</SectionTitle>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Pemusatan */}
        <SectionCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[var(--accent-blue)]/10 rounded-lg text-[var(--accent-blue)]">
                <Sigma className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Ukuran Pemusatan Data</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Digunakan untuk mengidentifikasi nilai tunggal yang mewakili pusat distribusi data observasi.
            </p>

            <ul className="space-y-3.5 text-xs text-[var(--text-secondary)] font-mono">
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Rata-rata (Mean) — x̄</span>
                <span>x̄ = Σx_i / n</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Nilai Tengah (Median) — Me</span>
                <span>Nilai tengah setelah data diurutkan dari terkecil ke terbesar.</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Modus — Mo</span>
                <span>Nilai observasi yang paling sering muncul (frekuensi tertinggi).</span>
              </li>
            </ul>
          </div>
        </SectionCard>

        {/* Card 2: Penyebaran */}
        <SectionCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[var(--accent-cyan)]/10 rounded-lg text-[var(--accent-cyan)]">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Ukuran Penyebaran Data</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Melihat sejauh mana nilai-nilai observasi menyebar dari rata-rata hitungnya.
            </p>

            <ul className="space-y-3.5 text-xs text-[var(--text-secondary)] font-mono">
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Standar Deviasi — s</span>
                <span>s = √[ Σ(x_i - x̄)² / (n - 1) ]</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Varians — s²</span>
                <span>Kuadrat simpangan baku, mengukur rata-rata penyimpangan kuadrat.</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Interquartile Range — IQR</span>
                <span>IQR = Q₃ - Q₁ (Kuartil Atas dikurangi Kuartil Bawah).</span>
              </li>
            </ul>
          </div>
        </SectionCard>

        {/* Card 3: Bentuk */}
        <SectionCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[var(--accent-gold)]/10 rounded-lg text-[var(--accent-gold)]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Distribusi & Pencilan</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Mengukur kelengkungan bentuk distribusi frekuensi dan mengidentifikasi anomali data.
            </p>

            <ul className="space-y-3.5 text-xs text-[var(--text-secondary)] font-mono">
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Skewness (Kemencengan)</span>
                <span>Mengukur ketidaksimetrisan. Nilai &gt; 0.5 menunjukkan kemencengan kanan.</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-slate-200">Kurtosis (Keruncingan)</span>
                <span>Mengukur ketinggian puncak kurva frekuensi dibanding kurva normal.</span>
              </li>
              <li className="flex flex-col gap-1 p-2 bg-slate-950/50 rounded-lg border border-slate-900/60">
                <span className="font-bold text-[var(--accent-red)]">Deteksi Outlier (Tukey's Rule)</span>
                <span className="text-[10px] text-slate-300">Batas: [Q₁ - 1.5×IQR, Q₃ + 1.5×IQR]</span>
              </li>
            </ul>
          </div>
        </SectionCard>
      </div>

      {/* Note footer */}
      <div className="mt-6 p-4 bg-slate-950/30 rounded-xl border border-slate-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[var(--accent-blue)] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-slate-200">Keterangan Teknis:</strong> Seluruh pengolahan data numerik 
          dihitung secara real-time pada browser menggunakan metode sampel statistik bebas bias (unbiased variance estimator, 
          derajat kebebasan df = n-1 untuk simpangan baku dan varians). Deteksi pencilan (outliers) dihitung secara eksklusif menggunakan metode IQR Pagar Luar/Dalam Tukey.
        </p>
      </div>
    </section>
  );
}

