"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Application } from "@/lib/types";
import { getApplications } from "@/lib/storage";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    setApps(getApplications());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-paper">My applications</h1>
      <p className="mt-2 text-white/60">Stored locally in your browser — nothing leaves your device.</p>

      {apps.length === 0 ? (
        <div className="mt-10 border border-line px-6 py-12 text-center">
          <p className="text-white/50">You haven&apos;t applied to anything yet.</p>
          <Link href="/" className="mt-3 inline-block font-mono text-sm text-signal">
            Browse open roles →
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {apps.map((app, i) => (
            <div key={i} className="border border-line p-4">
              <div className="flex items-center justify-between">
                <Link href={`/jobs/${app.jobId}`} className="font-display font-medium text-paper hover:text-signal">
                  {app.jobTitle}
                </Link>
                <span className="font-mono text-[11px] text-white/40">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">{app.company}</p>
              {app.note && <p className="mt-2 text-sm text-white/60">&quot;{app.note}&quot;</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
