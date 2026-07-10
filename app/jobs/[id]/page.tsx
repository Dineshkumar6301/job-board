"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Job } from "@/lib/types";
import { getJobById, hasApplied } from "@/lib/storage";
import ApplyModal from "@/components/ApplyModal";

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => `₹${(n / 100000).toFixed(1)}L`;
  return `${fmt(min)} – ${fmt(max)} / year`;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const found = getJobById(id);
    setJob(found ?? null);
    if (found) setApplied(hasApplied(found.id));
  }, [id]);

  if (job === undefined) return null;

  if (job === null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-display text-xl text-paper">Role not found.</p>
        <Link href="/" className="mt-4 inline-block font-mono text-sm text-signal">
          ← Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="font-mono text-xs text-white/50 hover:text-signal">
        ← Back to listings
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-signal">{job.code}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-paper">{job.title}</h1>
          <p className="mt-2 text-white/60">
            {job.company} · {job.location} · {job.remote}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="rounded-sm bg-white/5 px-2.5 py-1 font-mono text-xs text-white/60">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border border-line p-5 font-mono text-xs sm:grid-cols-4">
        <div>
          <p className="text-white/40">LEVEL</p>
          <p className="mt-1 text-paper">{job.level}</p>
        </div>
        <div>
          <p className="text-white/40">TYPE</p>
          <p className="mt-1 text-paper">{job.type}</p>
        </div>
        <div>
          <p className="text-white/40">SALARY</p>
          <p className="mt-1 text-paper">{formatSalary(job.salaryMin, job.salaryMax)}</p>
        </div>
        <div>
          <p className="text-white/40">POSTED</p>
          <p className="mt-1 text-paper">{job.postedAt}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-paper">About the role</h2>
        <p className="mt-2 leading-relaxed text-white/70">{job.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-paper">What you&apos;ll do</h2>
        <ul className="mt-3 space-y-2">
          {job.responsibilities.map((r, i) => (
            <li key={i} className="flex gap-2 text-white/70">
              <span className="text-signal">›</span> {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-paper">What we&apos;re looking for</h2>
        <ul className="mt-3 space-y-2">
          {job.requirements.map((r, i) => (
            <li key={i} className="flex gap-2 text-white/70">
              <span className="text-signal">›</span> {r}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 border-t border-line pt-6">
        {applied ? (
          <p className="font-mono text-sm text-signal">✓ Application submitted for this role.</p>
        ) : (
          <button
            onClick={() => setShowApply(true)}
            className="bg-signal px-6 py-3 font-mono text-sm font-medium text-ink transition hover:bg-signal/80"
          >
            Apply now
          </button>
        )}
      </div>

      {showApply && (
        <ApplyModal
          job={job}
          onClose={() => setShowApply(false)}
          onApplied={() => {
            setApplied(true);
            setShowApply(false);
          }}
        />
      )}
    </div>
  );
}
