import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { ApplicationStatusTracker } from '@/components/shared/application-status-tracker';

export const metadata: Metadata = {
  title: 'Applications',
  description: 'Track your job applications',
};

/**
 * Applications tracking page
 * Shows all applications with status, stats, and filtering
 */
export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Applications"
        description="Track the status of your job applications"
      />

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Applied', value: '12', color: 'text-slate-900' },
          { label: 'Under Review', value: '5', color: 'text-blue-600' },
          { label: 'Interviews', value: '2', color: 'text-green-600' },
          { label: 'Offers', value: '1', color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex gap-2 border-b">
        {['All', 'Applied', 'Reviewed', 'Interview', 'Offered', 'Rejected'].map(
          (tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                tab === 'All'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {/* TODO: Replace with actual application data */}
        {[
          { status: 'interview' as const, company: 'Tech Corp', role: 'Frontend Developer' },
          { status: 'reviewed' as const, company: 'Startup Inc', role: 'Full Stack Engineer' },
          { status: 'applied' as const, company: 'Big Company', role: 'Junior Developer' },
        ].map((app, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{app.role}</h3>
                <p className="text-sm text-muted-foreground">{app.company}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                Applied Jan {20 + i}, 2026
              </span>
            </div>

            <div className="mt-4">
              <ApplicationStatusTracker
                status={app.status}
                size="sm"
                orientation="horizontal"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
