import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/config/site.config';
import { ROUTES } from '@/config/routes.config';

/**
 * Landing page
 * Public homepage with value proposition and CTA
 */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Get matched with jobs that <span className="text-primary">actually fit</span> your
                skills
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {siteConfig.description}. Stop guessing and start getting interviews with our
                AI-powered skill matching.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={ROUTES.REGISTER}
                  className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  Get Started Free
                </Link>
                <Link href={ROUTES.JOBS} className="text-sm font-semibold leading-6">
                  Browse Jobs <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="border-t py-20">
          <div className="container">
            <h2 className="text-center text-3xl font-bold">Why GraduateMatch?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              We&apos;re not another job board. We&apos;re your career accelerator.
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Smart Matching */}
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">AI Skill Matching</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  See your exact match percentage for every job. Know exactly what skills you have
                  and what&apos;s missing.
                </p>
              </div>

              {/* Verified Skills */}
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Verified Badges</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prove your skills with assessments. Stand out from the crowd with verified badges
                  that employers trust.
                </p>
              </div>

              {/* Skill Gap Analysis */}
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Skill Gap Analysis</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Know exactly what to learn next. We analyze your target jobs and recommend a
                  learning path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t bg-muted/30 py-20">
          <div className="container">
            <h2 className="text-center text-3xl font-bold">How It Works</h2>

            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  step: '1',
                  title: 'Create Profile',
                  desc: 'Add your skills, degree, and preferences',
                },
                {
                  step: '2',
                  title: 'Get Matched',
                  desc: 'See jobs ranked by your match percentage',
                },
                {
                  step: '3',
                  title: 'Apply Smart',
                  desc: 'Apply to jobs where you have the best fit',
                },
                {
                  step: '4',
                  title: 'Track & Learn',
                  desc: 'Track applications and close skill gaps',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Ready to find your fit?</h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of graduates who found their dream jobs through skill-based matching.
              </p>
              <Link
                href={ROUTES.REGISTER}
                className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
