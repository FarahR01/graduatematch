import { Skeleton } from '@/components/ui/skeleton';

/**
 * Global loading state
 * Shows while the page is loading
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="flex-1">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <Skeleton className="mx-auto h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
