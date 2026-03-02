import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Sidebar } from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: `%s | ${siteConfig.name}`,
  },
};

/**
 * Dashboard layout for authenticated graduate users
 * Includes sidebar navigation and main content area
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 pl-64 transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            {/* Breadcrumb or search could go here */}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* TODO: Add notifications bell */}
            {/* TODO: Add user dropdown menu */}
            <div className="h-8 w-8 rounded-full bg-muted" />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
