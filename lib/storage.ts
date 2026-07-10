"use client";

import { Job, Application } from "./types";
import seedJobs from "@/data/jobs.json";

const CUSTOM_JOBS_KEY = "jobboard.customJobs";
const APPLICATIONS_KEY = "jobboard.applications";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getCustomJobs(): Job[] {
  if (typeof window === "undefined") return [];
  return safeParse<Job[]>(localStorage.getItem(CUSTOM_JOBS_KEY), []);
}

export function addCustomJob(job: Job) {
  const jobs = getCustomJobs();
  jobs.unshift(job);
  localStorage.setItem(CUSTOM_JOBS_KEY, JSON.stringify(jobs));
}

export function getAllJobs(): Job[] {
  const custom = getCustomJobs();
  return [...custom, ...(seedJobs as Job[])];
}

export function getJobById(id: string): Job | undefined {
  return getAllJobs().find((j) => j.id === id);
}

export function getApplications(): Application[] {
  if (typeof window === "undefined") return [];
  return safeParse<Application[]>(localStorage.getItem(APPLICATIONS_KEY), []);
}

export function addApplication(app: Application) {
  const apps = getApplications();
  apps.unshift(app);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

export function hasApplied(jobId: string): boolean {
  return getApplications().some((a) => a.jobId === jobId);
}

export function nextJobId(): string {
  return `custom-${Date.now()}`;
}

export function nextJobCode(): string {
  const n = 500 + Math.floor(Math.random() * 400);
  return `JOB-${n}`;
}
