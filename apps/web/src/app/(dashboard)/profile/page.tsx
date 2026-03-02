import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { SkillBadge } from '@/components/shared/skill-badge';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your graduate profile',
};

/**
 * Graduate profile page
 * View and edit profile, skills, and preferences
 */
export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your profile and skills"
        actions={
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
            Edit Profile
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-muted" />
              <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">
                Computer Science, 2025
              </p>
              <p className="text-sm text-muted-foreground">
                Looking for: Backend, Full-Stack
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span>London, UK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Willing to Relocate</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Profile Completion</span>
                <span className="text-green-600">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technical Skills */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Technical Skills</h3>
              <button className="text-sm text-primary hover:underline">
                + Add Skill
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <SkillBadge name="TypeScript" level="proficient" isVerified />
              <SkillBadge name="React" level="proficient" isVerified />
              <SkillBadge name="Node.js" level="intermediate" />
              <SkillBadge name="PostgreSQL" level="intermediate" />
              <SkillBadge name="Python" level="learning" />
              <SkillBadge name="Git" level="proficient" />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Earned Badges</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete skill assessments to earn verified badges
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* TODO: Replace with actual badges */}
              <div className="flex flex-col items-center rounded-lg border p-4">
                <div className="h-12 w-12 rounded-full bg-blue-100" />
                <p className="mt-2 text-sm font-medium">TypeScript</p>
                <p className="text-xs text-muted-foreground">Advanced</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-4">
                <div className="h-12 w-12 rounded-full bg-cyan-100" />
                <p className="mt-2 text-sm font-medium">React</p>
                <p className="text-xs text-muted-foreground">Advanced</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-dashed p-4 opacity-50">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <p className="mt-2 text-sm font-medium">Docker</p>
                <p className="text-xs text-muted-foreground">Take Test</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-dashed p-4 opacity-50">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <p className="mt-2 text-sm font-medium">AWS</p>
                <p className="text-xs text-muted-foreground">Take Test</p>
              </div>
            </div>
          </div>

          {/* Portfolio Links */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Links</h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">GitHub</span>
                <a
                  href="https://github.com/johndoe"
                  className="text-primary hover:underline"
                >
                  github.com/johndoe
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">LinkedIn</span>
                <a
                  href="https://linkedin.com/in/johndoe"
                  className="text-primary hover:underline"
                >
                  linkedin.com/in/johndoe
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">Portfolio</span>
                <a
                  href="https://johndoe.dev"
                  className="text-primary hover:underline"
                >
                  johndoe.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
