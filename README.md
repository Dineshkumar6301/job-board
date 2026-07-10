# Signal — Job Board

A focused, fast job board built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. Built as part of a technical assessment: designed with AI assistance, deployed via a GitHub Actions CI/CD pipeline to Vercel.

## Live Demo

- **App:** https://job-board-rho-six.vercel.app  
- **Repository:** https://github.com/Dineshkumar6301/job-board

## Features

### 1. Job listings with live search and filters
The home page (`app/page.tsx`) lists every open role and lets a visitor narrow the list in real time:
- **Search** by job title, company name, or any tag (e.g. "Django", "React").
- **Filter by work mode** — Onsite, Hybrid, or Remote.
- **Filter by seniority level** — Junior, Mid, Senior, or Lead.
- **Sort** by newest posting, or by salary (high→low / low→high).
- A live result count shows how many roles match the current filters.
- An empty state guides the user to adjust their search when nothing matches.

### 2. Job detail pages
Each role has its own page at `/jobs/[id]` showing the full description, responsibilities, requirements, salary range, seniority, employment type, and posting date. A prominent **Apply now** button opens the application flow.

### 3. Apply flow
Clicking **Apply now** opens a modal (`components/ApplyModal.tsx`) collecting name, email, and an optional note. Submitted applications are saved to the browser's `localStorage`, and the job page then shows a confirmation state so a visitor can see at a glance which roles they've already applied to.

### 4. Post a role
`/post` lets anyone publish a new listing through a validated form (title, company, location, work mode, type, level, salary range, tags, description, responsibilities, requirements). New roles are tagged **NEW**, stored in `localStorage`, and appear at the top of the listings immediately — no backend required.

### 5. My applications
`/applications` lists every application the current visitor has submitted in this browser, with the role, company, date applied, and their note, plus a link back to the original listing.

### 6. Design system
- **Palette:** near-black ink background (`#0B0E11`) with a signal-green accent (`#00D9A3`) and an amber highlight for onsite roles — a "status board / terminal" feel appropriate for an engineering audience.
- **Type:** Space Grotesk for display headings, Inter for body copy, JetBrains Mono for data (job codes, tags, metadata) — reinforcing the "ticket/queue" visual language of the job codes (e.g. `JOB-0417`).
- **Accessibility:** visible focus states on all interactive elements, `prefers-reduced-motion` respected, semantic labels on all form fields.
- Fully responsive from mobile to desktop.

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Zero-config deploys to Vercel, file-based routing |
| Language | TypeScript | Type safety across components and data models |
| Styling | Tailwind CSS | Fast, consistent design-token-driven styling |
| Data | Static JSON seed (`data/jobs.json`) + `localStorage` | No database to provision — fast to build and deploy within a tight deadline, while still demonstrating full CRUD-style flows (post a job, apply, view applications) |
| Fonts | next/font (Google Fonts) | Self-hosted, zero layout shift |

## Project Structure

```
app/
  page.tsx                 → Home: listings, search, filters
  jobs/[id]/page.tsx        → Job detail + apply flow
  post/page.tsx              → Post a new role
  applications/page.tsx      → View my submitted applications
  layout.tsx / globals.css   → Shared shell, fonts, design tokens
components/
  Navbar.tsx, JobCard.tsx, SearchFilters.tsx, ApplyModal.tsx
lib/
  types.ts     → Shared TypeScript types (Job, Application)
  storage.ts   → localStorage read/write helpers
data/
  jobs.json    → Seed listings
.github/workflows/deploy.yml → CI/CD: lint, build, deploy to Vercel
```

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deployment (CI/CD)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that, on every push to `main`:
1. Installs dependencies and runs `next lint`
2. Runs `next build` to verify the production build compiles
3. If the build succeeds, builds and deploys to Vercel using the Vercel CLI

**One-time setup required** (see `DEPLOY.md` for the exact commands):
- Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as GitHub repository secrets.

## Notes on scope

Given the 3-day turnaround, data persistence uses `localStorage` instead of a hosted database — this keeps the deploy pipeline dependency-free while still fully demonstrating the required UX flows (search/filter, apply, post a job, view applications). Swapping in a real database (e.g. Postgres via Vercel Postgres or Supabase) would mean replacing `lib/storage.ts` with API routes backed by that database — the component layer wouldn't need to change.
