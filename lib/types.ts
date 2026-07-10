export type Job = {
  id: string;
  code: string;
  title: string;
  company: string;
  location: string;
  remote: "Onsite" | "Hybrid" | "Remote";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  level: "Junior" | "Mid" | "Senior" | "Lead";
  salaryMin: number;
  salaryMax: number;
  tags: string[];
  postedAt: string; // ISO date
  description: string;
  responsibilities: string[];
  requirements: string[];
  custom?: boolean; // true if added by user via "Post a job"
};

export type Application = {
  jobId: string;
  jobTitle: string;
  company: string;
  name: string;
  email: string;
  note: string;
  appliedAt: string;
};
