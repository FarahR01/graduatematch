import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { ROUTES } from '@/config/routes.config';

export const metadata: Metadata = {
  title: 'Job Feed',
  description: 'Browse jobs matched to your skills',
};

/**
 * Job feed page
 * Shows personalized job recommendations ranked by match score
 */
export default function JobsPage() {
  return (
    <>
      <PageHeader
        title="Job Feed"
        description="Jobs matched to your skills and preferences"
        actions={
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent">
            Filters
          </button>
        }
      />

      {/* Filters Bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site</option>
        </select>
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {/* TODO: Replace with actual job data and JobCard components */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/5"
          >
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={ROUTES.JOB_DETAIL(`job-${i}`)}
                  className="text-lg font-semibold hover:underline"
                >
                  Junior Software Engineer
                </Link>
                <p className="text-sm text-muted-foreground">Tech Company Inc. • London, UK</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-800">
                85% Match
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              We&apos;re looking for a junior software engineer to join our growing team.
              You&apos;ll work on exciting projects using modern technologies...
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
                React
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
                TypeScript
              </span>
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                Docker (missing)
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Posted 2 days ago</span>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
