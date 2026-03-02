import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Skill Gaps',
  description: 'Analyze your skill gaps and get learning recommendations',
};

/**
 * Skill gap analysis page
 * Shows missing skills based on applied jobs with learning resources
 */
export default function SkillGapsPage() {
  return (
    <>
      <PageHeader
        title="Skill Gap Analysis"
        description="Skills you need to learn based on jobs you've applied to"
      />

      {/* Summary Card */}
      <div className="mb-6 rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Your Learning Path</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on 12 job applications, we recommend focusing on these skills:
        </p>

        <div className="mt-4 flex gap-4">
          <div className="flex-1 rounded-lg bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">Critical (3)</p>
            <p className="text-xs text-red-600">
              Required by 80%+ of your target jobs
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-yellow-50 p-4">
            <p className="text-sm font-medium text-yellow-800">Important (5)</p>
            <p className="text-xs text-yellow-600">
              Required by 50%+ of your target jobs
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-800">Nice to Have (4)</p>
            <p className="text-xs text-slate-600">
              Would improve your match scores
            </p>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {/* TODO: Replace with actual skill gap data */}
        {[
          {
            name: 'Docker',
            priority: 'Critical',
            jobs: 8,
            time: '2 weeks',
            color: 'red',
          },
          {
            name: 'Kubernetes',
            priority: 'Critical',
            jobs: 6,
            time: '3 weeks',
            color: 'red',
          },
          {
            name: 'AWS',
            priority: 'Important',
            jobs: 5,
            time: '4 weeks',
            color: 'yellow',
          },
        ].map((skill) => (
          <div
            key={skill.name}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      skill.color === 'red'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {skill.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Required by {skill.jobs} jobs you&apos;ve applied to
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Est. {skill.time}</p>
                <p className="text-xs text-muted-foreground">to learn</p>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="mt-4">
              <p className="text-sm font-medium">Recommended Resources:</p>
              <div className="mt-2 flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  📹 YouTube Tutorial
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  📚 Official Docs
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  🎓 Udemy Course
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
