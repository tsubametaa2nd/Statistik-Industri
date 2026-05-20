import { VARIABLE_COLORS } from "@/types";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  stats: Array<{ variable: string; mean: number }>;
}

export default function HeroSection({ stats = [] }: HeroSectionProps) {
  return (
    <section
      id="pendahuluan"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-slate-100 max-w-3xl">
          Analisis Kinerja &
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-cyan)] to-[var(--accent-green)]">
            Statistik Deskriptif
          </span>
        </h1>

        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
          Kajian komprehensif data observasi kuesioner untuk mengukur tingkat efektivitas, kepuasan, dan reliabilitas platform digital.
        </p>

        {/* Variable cards */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16 w-full max-w-3xl">
            {stats.map((stat, index) => (
              <div
                key={stat.variable}
                className="glass-card rounded-xl p-4 transition-all duration-300 flex flex-col justify-between"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.variable}
                  </span>
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: VARIABLE_COLORS[stat.variable] || "var(--accent-blue)" }}
                  />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide">Mean Score</div>
                  <div className="text-xl font-bold font-mono text-slate-100">{stat.mean.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 animate-bounce">
          <a
            href="#dataset"
            className="flex flex-col items-center gap-1.5 text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase hover:text-slate-200 transition-colors"
          >
            Eksplorasi Data
            <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
          </a>
        </div>
      </div>
    </section>
  );
}
