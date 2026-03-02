import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: {
    default: 'Authentication',
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Sign in or create an account',
};

/**
 * Auth layout - centered card layout for login/register pages
 * Uses route group (auth) to share layout without affecting URL
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
