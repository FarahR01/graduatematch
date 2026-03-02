import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { ROUTES } from '@/config/routes.config';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

/**
 * Main navigation bar component
 * Used in the root layout for public pages
 */
export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href={ROUTES.JOBS}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Browse Jobs
          </Link>
          <Link
            href="/companies"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Companies
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href={ROUTES.LOGIN}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Sign In
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
