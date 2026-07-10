import Link from "next/link";
import { Job } from "@/lib/types";

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => `₹${(n / 100000).toFixed(1)}L`;
  return `${fmt(min)} – ${fmt(max)}`;
}

const remoteColor: Record<Job["remote"], string> = {
  Onsite: "text-amber",
  Hybrid: "text-signal",
  Remote: "text-signal",
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line px-5 py-5 transition hover:bg-panel md:grid-cols-[100px_1fr_auto]"
    >
      <span className="hidden font-mono text-xs text-white/35 md:block">{job.code}</span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-base font-medium text-paper group-hover:text-signal">
            {job.title}
          </h3>
          {job.custom && (
            <span className="rounded-sm border border-signal/40 px-1.5 py-0.5 font-mono text-[10px] text-signal">
              NEW
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-white/60">
          {job.company} · {job.location}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {job.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden text-right font-mono text-xs md:block">
        <div className={remoteColor[job.remote]}>● {job.remote}</div>
        <div className="mt-1 text-white/50">{formatSalary(job.salaryMin, job.salaryMax)}</div>
      </div>
    </Link>
  );
}
