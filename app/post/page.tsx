"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Job } from "@/lib/types";
import { addCustomJob, nextJobId, nextJobCode } from "@/lib/storage";

const inputClass =
  "w-full border border-line bg-panel px-3 py-2 text-sm text-paper placeholder:text-white/30 focus:border-signal";
const labelClass = "mb-1 block font-mono text-[11px] text-white/50";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    remote: "Onsite" as Job["remote"],
    type: "Full-time" as Job["type"],
    level: "Mid" as Job["level"],
    salaryMin: "",
    salaryMax: "",
    tags: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.location.trim()) {
      setError("Title, company, and location are required.");
      return;
    }

    const job: Job = {
      id: nextJobId(),
      code: nextJobCode(),
      title: form.title,
      company: form.company,
      location: form.location,
      remote: form.remote,
      type: form.type,
      level: form.level,
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      postedAt: new Date().toISOString().slice(0, 10),
      description: form.description || "No description provided.",
      responsibilities: form.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
      requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
      custom: true,
    };

    addCustomJob(job);
    router.push(`/jobs/${job.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-paper">Post a role</h1>
      <p className="mt-2 text-white/60">
        Roles you post here are saved locally in your browser and appear at the top of the listings.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Job title *</label>
            <input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Backend Engineer" />
          </div>
          <div>
            <label className={labelClass}>Company *</label>
            <input className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="e.g. Globalco" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Location *</label>
          <input className={inputClass} value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Hitech City, Hyderabad" />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Work mode</label>
            <select className={inputClass} value={form.remote} onChange={(e) => update("remote", e.target.value as Job["remote"])}>
              <option>Onsite</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select className={inputClass} value={form.type} onChange={(e) => update("type", e.target.value as Job["type"])}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Level</label>
            <select className={inputClass} value={form.level} onChange={(e) => update("level", e.target.value as Job["level"])}>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Salary min (₹/year)</label>
            <input type="number" className={inputClass} value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} placeholder="900000" />
          </div>
          <div>
            <label className={labelClass}>Salary max (₹/year)</label>
            <input type="number" className={inputClass} value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} placeholder="1400000" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input className={inputClass} value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="Python, Django, PostgreSQL" />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={3} className={inputClass} value={form.description} onChange={(e) => update("description", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Responsibilities (one per line)</label>
          <textarea rows={3} className={inputClass} value={form.responsibilities} onChange={(e) => update("responsibilities", e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Requirements (one per line)</label>
          <textarea rows={3} className={inputClass} value={form.requirements} onChange={(e) => update("requirements", e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" className="bg-signal px-6 py-3 font-mono text-sm font-medium text-ink transition hover:bg-signal/80">
          Publish role
        </button>
      </form>
    </div>
  );
}
