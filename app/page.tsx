"use client";

import { useEffect, useMemo, useState } from "react";
import { Job } from "@/lib/types";
import { getAllJobs } from "@/lib/storage";
import JobCard from "@/components/JobCard";
import SearchFilters from "@/components/SearchFilters";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    setJobs(getAllJobs());
  }, []);

  const filtered = useMemo(() => {
    let result = jobs.filter((job) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((t) => t.toLowerCase().includes(q));
      const matchesRemote = !remote || job.remote === remote;
      const matchesLevel = !level || job.level === level;
      return matchesQuery && matchesRemote && matchesLevel;
    });

    if (sort === "salaryHigh") result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
    if (sort === "salaryLow") result = [...result].sort((a, b) => a.salaryMin - b.salaryMin);
    if (sort === "recent")
      result = [...result].sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

    return result;
  }, [jobs, query, remote, level, sort]);

  return (
    <div>
      <section className="border-b border-line px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs text-signal">{jobs.length} OPEN REQS · UPDATED LIVE</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-paper md:text-5xl">
            Roles worth interrupting your build for.
          </h1>
          <p className="mt-4 max-w-xl text-white/60">
            A focused board for engineering roles — no noise, no spam applications.
            Search, filter, and apply in under a minute.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl">
        <SearchFilters
          query={query}
          setQuery={setQuery}
          remote={remote}
          setRemote={setRemote}
          level={level}
          setLevel={setLevel}
          sort={sort}
          setSort={setSort}
          resultCount={filtered.length}
        />

        <div>
          {filtered.length === 0 ? (
            <div className="px-5 py-16 text-center text-white/50">
              <p className="font-display text-lg">Nothing matches those filters.</p>
              <p className="mt-2 text-sm">Try clearing a filter or searching a different term.</p>
            </div>
          ) : (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
}
