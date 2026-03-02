import { SkeletonCard } from '@/components/ui/skeleton';

/**
 * Loading state for jobs page
 */
export default function JobsLoading() {
  return (
    <>
      {/* Header skeleton */}
      <div className="pb-6">
        <div className="h-8 w-32 rounded bg-muted animate-pulse" />
        <div className="mt-2 h-4 w-64 rounded bg-muted animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="mb-6 flex gap-2">
        <div className="h-10 w-48 rounded-md bg-muted animate-pulse" />
        <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
      </div>

      {/* Job cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </>
  );
}
