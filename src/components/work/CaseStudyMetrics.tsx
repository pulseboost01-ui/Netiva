import { BarChart3 } from "lucide-react";
import type { CaseStudyMetric } from "@/data";
import { FadeIn } from "@/components/ui/FadeIn";

export default function CaseStudyMetrics({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <FadeIn className="mb-16">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
        <BarChart3 size={12} /> By the numbers
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-5 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.03]"
          >
            <p className="text-3xl font-display mb-1 text-neutral-900 leading-snug">{metric.value}</p>
            <p className="text-xs text-neutral-500 leading-snug">{metric.label}</p>
            {metric.context ? (
              <p className="mt-1 text-[11px] text-neutral-400 leading-snug">{metric.context}</p>
            ) : null}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
