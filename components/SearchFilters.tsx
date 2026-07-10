"use client";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  remote: string;
  setRemote: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  resultCount: number;
};

const selectClass =
  "border border-line bg-panel px-3 py-2 font-mono text-xs text-white/70 focus:border-signal";

export default function SearchFilters({
  query,
  setQuery,
  remote,
  setRemote,
  level,
  setLevel,
  sort,
  setSort,
  resultCount,
}: Props) {
  return (
    <div className="border-b border-line bg-ink px-5 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, company, or tag…"
          className="w-full flex-1 border border-line bg-panel px-3 py-2 font-body text-sm text-paper placeholder:text-white/30 focus:border-signal"
          aria-label="Search jobs"
        />
        <div className="flex flex-wrap gap-2">
          <select value={remote} onChange={(e) => setRemote(e.target.value)} className={selectClass} aria-label="Filter by work mode">
            <option value="">All modes</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass} aria-label="Filter by level">
            <option value="">All levels</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass} aria-label="Sort jobs">
            <option value="recent">Newest</option>
            <option value="salaryHigh">Salary: high to low</option>
            <option value="salaryLow">Salary: low to high</option>
          </select>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-white/35">
        {resultCount} {resultCount === 1 ? "role" : "roles"} matching
      </p>
    </div>
  );
}
