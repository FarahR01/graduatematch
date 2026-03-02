'use client';

import { useEffect } from 'react';

/**
 * Global error boundary
 * Catches errors in the app and shows a friendly message
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="mt-2 text-muted-foreground">
            We apologize for the inconvenience. Please try again.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
