"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import { addApplication } from "@/lib/storage";

export default function ApplyModal({ job, onClose, onApplied }: { job: Job; onClose: () => void; onApplied: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    addApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name,
      email,
      note,
      appliedAt: new Date().toISOString(),
    });
    onApplied();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply to ${job.title}`}
    >
      <div className="w-full max-w-md border border-line bg-panel p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-paper">Apply to {job.title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-white/50 hover:text-signal">
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-white/50">{job.company} · {job.location}</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block font-mono text-[11px] text-white/50">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-paper focus:border-signal"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[11px] text-white/50">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-paper focus:border-signal"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[11px] text-white/50">
              Note to hiring team (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full border border-line bg-ink px-3 py-2 text-sm text-paper focus:border-signal"
              placeholder="Anything you'd like them to know"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full bg-signal py-2 font-mono text-sm font-medium text-ink transition hover:bg-signal/80"
          >
            Submit application
          </button>
        </form>
      </div>
    </div>
  );
}
